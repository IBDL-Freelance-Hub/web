import type { MembershipStatus } from "./member";

export type ActionResponse<T = unknown> =
  | { success: true; data: T; message?: string }
  | {
      success: false;
      error: string;
      title?: string;
      code?: string;
      status?: number;
      fieldErrors?: Record<string, string[]>;
    };

export interface ApiErrorResponse {
  success: false;
  code?: string;
  title?: string;
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

export interface MemberDto {
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
}

export interface MembershipDto {
  tier: "ESSENTIAL" | "PROFESSIONAL" | "MASTER" | string;
  status: MembershipStatus | string;
  startDate: string;
  endDate: string;
}

export interface AuthMeData {
  user: {
    id: string;
    email: string;
    status: string;
  };
  member: MemberDto;
  membership: MembershipDto | null;
}

export interface MemberProfileDto {
  id?: string;
  fullNameEn: string;
  fullNameAr?: string | null;
  phone: string;
  country?: string;
  city?: string | null;
  yearsOfExperience?: string;
  areasOfExpertise?: string[];
  industriesServed?: string[];
  languages?: string[];
  bioEn?: string | null;
  bioAr?: string | null;
  linkedinUrl?: string | null;
  photoFileId?: string | null;
  directoryOptIn?: boolean;
  profileCompletionRate?: number;
  tier?: string;
}

export interface UserSessionDto {
  id: string;
  email: string;
  userType: "MEMBER" | "STAFF";
  status: string;
  staffRole?: string | null;
  memberId?: string | null;
  member?: MemberProfileDto | null;
}

export interface AuthSuccessPayload {
  sessionToken: string;
  sessionTimeoutMinutes?: number;
  user: UserSessionDto;
}

export interface SessionItem {
  id: string;
  ipAddress: string | null;
  userAgent: string | null;
  lastActivityAt: string;
  createdAt: string;
  isCurrent: boolean;
}
