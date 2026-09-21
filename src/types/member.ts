export type MembershipTier = "ESSENTIAL" | "PROFESSIONAL" | "MASTER";

export type MembershipStatus =
  | "PENDING_PAYMENT"
  | "ACTIVE"
  | "GRACE_PERIOD"
  | "EXPIRED"
  | "SUSPENDED"
  | "CANCELLED";

export type ActivityTone = "ok" | "now" | "stop";

export interface DashboardMemberDto {
  id: string;
  fullNameEn: string;
  fullNameAr?: string | null;
  email: string;
  city?: string | null;
  country?: string | null;
  profileCompletionRate: number;
  photoUrl?: string | null;
}

export interface DashboardMembershipDto {
  tier: MembershipTier;
  status: MembershipStatus;
  startDate: string;
  renewsOn: string;
  daysUntilRenewal: number;
}

export interface DashboardEntitlementsDto {
  tier: MembershipTier;
  tierName: string;
  status: MembershipStatus;
  isActive: boolean;
  benefits: Record<string, unknown>;
  directoryEligibility: Record<string, unknown>;
}

export interface DashboardProfileProgressDto {
  completionPercentage: number;
  missingFields: string[];
}

export interface DashboardRecentActivityItem {
  text: {
    en: string;
    ar: string;
  };
  date: string;
  tone: ActivityTone;
}

export interface MemberDashboardResponse {
  member: DashboardMemberDto;
  membership: DashboardMembershipDto | null;
  entitlements: DashboardEntitlementsDto;
  profileProgress: DashboardProfileProgressDto;
  recentActivity: DashboardRecentActivityItem[];
}

export interface MemberProfileFileDto {
  id: string;
  category: string;
  originalName: string;
  sizeBytes: number;
  mimeType: string;
  createdAt: string;
}

export interface MemberProfileData {
  id: string;
  userId: string;
  email: string;
  fullNameEn: string;
  fullNameAr?: string | null;
  phone: string;
  country: string;
  city?: string | null;
  yearsOfExperience: string;
  areasOfExpertise: string[];
  industriesServed: string[];
  languages: string[];
  bioEn?: string | null;
  bioAr?: string | null;
  linkedinUrl?: string | null;
  photoFileId?: string | null;
  directoryOptIn: boolean;
  profileCompletionRate: number;
  completionPercentage: number;
  missingFields: string[];
  missingItems: string[];
  membership: {
    id: string;
    tier: MembershipTier | string;
    status: MembershipStatus | string;
    startDate: string;
    endDate: string;
  } | null;
  files: MemberProfileFileDto[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  fullNameEn?: string;
  fullNameAr?: string | null;
  phone?: string;
  country?: string;
  city?: string;
  yearsOfExperience?: string;
  areasOfExpertise?: string[];
  industriesServed?: string[];
  languages?: string[];
  bioEn?: string | null;
  bioAr?: string | null;
  linkedinUrl?: string | null;
  directoryOptIn?: boolean;
}
