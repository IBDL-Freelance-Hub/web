import type { MembershipTier } from "@/types/member";

export type DirectoryBadgeType = "PRIORITY" | "FEATURED" | "STANDARD";

/**
 * Summary record for public directory card listing.
 * Strictly omits private PII (email, phone, national ID, internal notes, CV documents).
 */
export interface PublicTrainerListItem {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  fullNameEn?: string;
  fullNameAr?: string | null;
  titleEn: string | null;
  titleAr: string | null;
  bioEn: string | null;
  bioAr: string | null;
  photoUrl: string | null;
  country: string;
  city: string | null;
  areasOfExpertise: string[];
  industriesServed: string[];
  languages: string[];
  tier: MembershipTier;
  badgeType: DirectoryBadgeType;
  yearsOfExperience?: string | null;
  directoryOptIn?: boolean;
}

/**
 * Detailed record for public trainer profile view (/directory/[id]).
 */
export interface PublicTrainerProfile extends PublicTrainerListItem {
  yearsOfExperience: string | null;
  linkedinUrl: string | null;
}

/**
 * Filter and search criteria for directory search queries.
 */
export interface DirectorySearchParams {
  q?: string;
  search?: string;
  expertise?: string;
  industry?: string;
  language?: string;
  tier?: MembershipTier;
  page?: string | number;
  limit?: string | number;
}

/**
 * Paginated directory search results envelope.
 */
export interface DirectorySearchResult {
  trainers: PublicTrainerListItem[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Direct inquiry payload from contact modal.
 */
export interface TrainerInquiryPayload {
  trainerId: string;
  trainerName: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  organization?: string;
  subject: string;
  message: string;
}
