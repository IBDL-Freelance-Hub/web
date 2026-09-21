"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";
import type {
  MembershipTierCatalogItem,
  UpgradeTierPayload,
  UpgradeTierResponseData,
} from "@/types/membership";

/**
 * Fetches the canonical membership tiers catalog.
 * Calls `GET /api/v1/memberships/tiers`.
 * Authoritative prices and discount benefits are resolved server-side (SEC-33).
 */
export async function getMembershipTiersAction(): Promise<
  ActionResponse<MembershipTierCatalogItem[]>
> {
  try {
    const res = await api.get<{
      success: boolean;
      data: MembershipTierCatalogItem[];
    }>("/memberships/tiers");

    if (!res || !res.data) {
      return {
        success: false,
        error: "Failed to retrieve membership tiers catalog.",
      };
    }

    return {
      success: true,
      data: res.data,
    };
  } catch (error: unknown) {
    const err = error as Error & { status?: number };
    return {
      success: false,
      error:
        err?.message ||
        "Unable to load membership catalog. Please try again later.",
      status: err?.status,
    };
  }
}

/**
 * Initiates the membership tier upgrade order confirmation flow.
 * Calls `POST /api/v1/memberships/upgrade`.
 * Strictly adheres to server-side pricing invariants (pricing is NEVER sent from client).
 * Prepared for Paymob gateway tokenization and checkout integration.
 */
export async function upgradeMembershipAction(
  payload: UpgradeTierPayload
): Promise<ActionResponse<UpgradeTierResponseData>> {
  try {
    if (
      !payload.targetTier ||
      !["PROFESSIONAL", "MASTER"].includes(payload.targetTier)
    ) {
      return {
        success: false,
        error: "Invalid target tier selected for upgrade.",
      };
    }

    const res = await api.post<{
      success: boolean;
      data: UpgradeTierResponseData;
      message?: string;
    }>("/memberships/upgrade", {
      targetTier: payload.targetTier,
    });

    if (!res || !res.data) {
      return {
        success: false,
        error: "Failed to complete membership upgrade transaction.",
      };
    }

    // Revalidate dashboard and membership views on successful upgrade
    revalidatePath("/overview");
    revalidatePath("/membership");
    revalidatePath("/profile");

    return {
      success: true,
      data: res.data,
      message: res.data.message || res.message,
    };
  } catch (error: unknown) {
    const err = error as Error & {
      status?: number;
      data?: UpgradeTierResponseData;
    };

    // BRU-67, MEM-52: If payment was declined (HTTP 402), return structured decline payload
    if (err?.status === 402 && err.data) {
      return {
        success: true,
        data: err.data,
        message:
          err.data.message ||
          "Payment transaction was declined. Your active membership remains unchanged.",
      };
    }

    return {
      success: false,
      error:
        err?.message ||
        "The upgrade transaction could not be completed. Please try again later.",
      status: err?.status,
    };
  }
}
