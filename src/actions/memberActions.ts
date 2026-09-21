"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import { updateMemberProfileSchema } from "@/lib/validations/member";
import type { ActionResponse } from "@/types/api";
import type {
  MemberDashboardResponse,
  MemberProfileData,
  UpdateProfilePayload,
} from "@/types/member";

/**
 * Fetches the live member dashboard data (entitlements, progress gauge, audit activity).
 * Queries `GET /api/v1/members/dashboard`.
 */
export async function getMemberDashboardData(): Promise<
  ActionResponse<MemberDashboardResponse>
> {
  try {
    const res = await api.get<{
      success: boolean;
      data: MemberDashboardResponse;
    }>("/members/dashboard");

    if (!res || !res.data) {
      return {
        success: false,
        error: "Failed to retrieve member dashboard data.",
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
        "The server is temporarily unavailable. Please try again later.",
      status: err?.status,
    };
  }
}

/**
 * Fetches the live member profile data.
 * Queries `GET /api/v1/members/profile`.
 */
export async function getMemberProfileData(): Promise<
  ActionResponse<MemberProfileData>
> {
  try {
    const res = await api.get<{
      success: boolean;
      data: MemberProfileData;
    }>("/members/profile");

    if (!res || !res.data) {
      return {
        success: false,
        error: "Failed to retrieve member profile data.",
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
        "The server is temporarily unavailable. Please try again later.",
      status: err?.status,
    };
  }
}

/**
 * Updates member profile information.
 * Enforces PRO-04: email is stripped and never sent to backend.
 * Issues `PATCH /api/v1/members/profile`.
 */
export async function updateMemberProfileAction(
  _prevState: unknown,
  payload: UpdateProfilePayload
): Promise<ActionResponse<MemberProfileData>> {
  // PRO-04 / VAL-50: Explicitly strip email from payload
  const rawInput = { ...(payload as Record<string, unknown>) };
  delete rawInput.email;

  // Schema validation
  const validation = updateMemberProfileSchema.safeParse(rawInput);
  if (!validation.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0] ? String(issue.path[0]) : "form";
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(issue.message);
    }
    return {
      success: false,
      error: "Please correct the highlighted errors.",
      fieldErrors,
    };
  }

  const sanitizedData = validation.data;

  try {
    const res = await api.patch<{
      success: boolean;
      data: {
        profile?: MemberProfileData;
      } & MemberProfileData;
    }>("/members/profile", sanitizedData);

    const updatedProfile = res.data?.profile || (res.data as MemberProfileData);

    revalidatePath("/profile");
    revalidatePath("/overview");

    return {
      success: true,
      data: updatedProfile,
      message: "Profile updated successfully.",
    };
  } catch (err: unknown) {
    const error = err as Error & {
      status?: number;
      code?: string;
      fieldErrors?: Record<string, string[]>;
    };

    // Handle HTTP 409 Conflict (e.g. mobile number clash)
    if (
      error.status === 409 ||
      error.code === "CONFLICT" ||
      error.code === "PHONE_IN_USE" ||
      error.message?.toLowerCase().includes("mobile") ||
      error.message?.toLowerCase().includes("phone") ||
      error.message?.toLowerCase().includes("conflict") ||
      error.message?.toLowerCase().includes("already in use")
    ) {
      return {
        success: false,
        status: 409,
        error: "This mobile number is already in use by another member.",
        fieldErrors: {
          phone: ["This mobile number is already in use by another member."],
        },
      };
    }

    if (error.fieldErrors) {
      return {
        success: false,
        status: error.status || 400,
        error: error.message || "Invalid input data.",
        fieldErrors: error.fieldErrors,
      };
    }

    return {
      success: false,
      status: error.status || 500,
      error:
        error.message ||
        "The server is temporarily unavailable. Please try again later.",
    };
  }
}

/**
 * Toggles member's directory publication status (Opt-In / Opt-Out).
 * Issues PATCH /api/v1/members/profile with { directoryOptIn }.
 */
export async function toggleDirectoryPublicationAction(
  directoryOptIn: boolean
): Promise<ActionResponse<MemberProfileData>> {
  try {
    const res = await api.patch<{
      success: boolean;
      data: MemberProfileData;
    }>("/members/profile", { directoryOptIn });

    if (!res || !res.data) {
      return {
        success: false,
        error: "Failed to update directory publication status.",
      };
    }

    revalidatePath("/profile");
    revalidatePath("/overview");

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
        "The server is temporarily unavailable. Please try again later.",
      status: err?.status,
    };
  }
}
