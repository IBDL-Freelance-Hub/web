export type MembershipTierCode = "ESSENTIAL" | "PROFESSIONAL" | "MASTER";

export interface MembershipTierCatalogItem {
  tier: MembershipTierCode;
  name: string;
  tagline: string;
  annualFee: number;
  currency: string;
  discountRate: number;
  coreHubServicesIncluded: boolean;
  accreditedProgrammes: number;
  freeTraineeCertificates: number;
  freeQuarterlyTools: number;
  trainerCertificationEligible: boolean;
  coreHubServices: string[];
  isCurrentPlan: boolean;
  canUpgrade: boolean;
}

export interface UpgradeTierPayload {
  targetTier: MembershipTierCode;
}

export interface UpgradeTierResponseData {
  paymentStatus: "SUCCESSFUL" | "DECLINED" | "PENDING";
  transactionId: string;
  failureReason?: string;
  membership: {
    id: string;
    tier: MembershipTierCode;
    status: string;
    startDate: string;
    endDate: string;
    price: number;
  };
  outstandingUpgradeAttempt?: {
    targetTier: MembershipTierCode;
    state: "declined" | "pending";
    transactionRef: string;
  };
  message: string;
}

export const TIER_HIERARCHY: Record<MembershipTierCode, number> = {
  ESSENTIAL: 1,
  PROFESSIONAL: 2,
  MASTER: 3,
};

export function getTierHierarchy(tier?: string | null): number {
  if (!tier) return 1;
  const upper = tier.toUpperCase() as MembershipTierCode;
  return TIER_HIERARCHY[upper] ?? 1;
}

export function isUpgradeAllowed(
  currentTier?: string | null,
  targetTier?: MembershipTierCode
): boolean {
  if (!targetTier) return false;
  const currentLevel = getTierHierarchy(currentTier);
  const targetLevel = getTierHierarchy(targetTier);
  return targetLevel > currentLevel;
}

export function isDowngrade(
  currentTier?: string | null,
  targetTier?: MembershipTierCode
): boolean {
  if (!targetTier) return false;
  const currentLevel = getTierHierarchy(currentTier);
  const targetLevel = getTierHierarchy(targetTier);
  return targetLevel < currentLevel;
}
