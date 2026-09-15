import "server-only";
import { api } from "./api";
import { getSessionCookie } from "./session";
import { AuthMeData, UserSessionDto } from "@/types/api";

/**
 * Retrieves the full authenticated member profile + user + membership on the server.
 * Queries `GET /api/v1/auth/me`.
 * Returns `null` if unauthenticated, session expired, or no member profile.
 */
export async function getCurrentMember(): Promise<AuthMeData | null> {
  try {
    const sessionToken = await getSessionCookie();
    if (!sessionToken) {
      return null;
    }

    const response = await api.get<{
      success: boolean;
      data: AuthMeData;
    }>("/auth/me");

    if (!response?.success || !response?.data?.member) {
      return null;
    }

    return response.data;
  } catch {
    // Inactivity timeout, revoked token, unauthorized, or 404
    return null;
  }
}

/**
 * Retrieves the currently authenticated user session on the server.
 * Returns `null` if unauthenticated or if the session has expired/revoked.
 */
export async function getCurrentUser(): Promise<UserSessionDto | null> {
  try {
    const data = await getCurrentMember();
    if (!data) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email,
      userType: "MEMBER",
      status: data.user.status,
      member: {
        ...data.member,
        tier: data.membership?.tier,
      },
    };
  } catch {
    return null;
  }
}
