import type {
  MembershipTierCatalogItem,
  UpgradeTierPayload,
  UpgradeTierResponseData,
} from "@/types/membership";
import type { ActionResponse } from "@/types/api";

export type CheckoutStatusType =
  "idle" | "submitting" | "success" | "declined" | "error";

export type CheckoutState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; data: UpgradeTierResponseData }
  | { status: "declined"; data: UpgradeTierResponseData }
  | { status: "error"; message: string };

export interface UpgradeCheckoutModalProps {
  tier: MembershipTierCatalogItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess?: (result: UpgradeTierResponseData) => void;
  onUpgradeAction?: (
    payload: UpgradeTierPayload
  ) => Promise<ActionResponse<UpgradeTierResponseData>>;
}
