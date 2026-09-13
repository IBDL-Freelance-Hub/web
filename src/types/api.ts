export type ActionResponse<T = unknown> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export interface ApiErrorResponse {
  success: false;
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

export interface UserSessionDto {
  id: string;
  email: string;
  userType: "MEMBER" | "STAFF";
  status: string;
  member?: {
    id: string;
    fullNameEn: string;
    fullNameAr?: string | null;
    phone: string;
  } | null;
}

export interface AuthSuccessPayload {
  sessionToken: string;
  user: UserSessionDto;
}
