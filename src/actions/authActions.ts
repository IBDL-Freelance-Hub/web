"use server";

import { z } from "zod";
import { api } from "../lib/api";
import {
  setSessionCookie,
  clearSessionCookie,
  getSessionCookie,
} from "../lib/session";
import {
  ActionResponse,
  AuthSuccessPayload,
  SessionItem,
  UserSessionDto,
} from "../types/api";
import {
  activateAccountSchema,
  resendActivationSchema,
} from "../lib/validations/auth";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
});

const GENERIC_AUTH_FAILURE_MESSAGE =
  "That email address and password do not match an account. 4 attempts remaining before your account is temporarily locked.";

export async function loginAction(
  payload: unknown
): Promise<ActionResponse<UserSessionDto>> {
  // Phase 1: Format/Schema Validation (Pre-DB check)
  const validated = loginSchema.safeParse(payload);
  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Please check your inputs and try again.",
      fieldErrors: fieldErrors as Record<string, string[]>,
    };
  }

  // Phase 2: Database Authentication Check
  try {
    const response = await api.post<{
      success: boolean;
      data: AuthSuccessPayload;
    }>("/auth/login", validated.data);

    if (!response?.success || !response?.data?.sessionToken) {
      return {
        success: false,
        error: GENERIC_AUTH_FAILURE_MESSAGE,
      };
    }

    // Set flh_session HttpOnly cookie with dynamic maxAge from SecurityConfig
    await setSessionCookie(
      response.data.sessionToken,
      response.data.sessionTimeoutMinutes
    );

    return {
      success: true,
      data: response.data.user,
    };
  } catch (err: unknown) {
    const errorObj = err as Error & {
      title?: string;
      code?: string;
      fieldErrors?: Record<string, string[]>;
    };
    const message = errorObj?.message || GENERIC_AUTH_FAILURE_MESSAGE;
    return {
      success: false,
      error: message,
      title: errorObj?.title,
      code: errorObj?.code,
      fieldErrors: errorObj?.fieldErrors,
    };
  }
}

export async function logoutAction(): Promise<ActionResponse<null>> {
  const token = await getSessionCookie();
  if (token) {
    try {
      await api.post("/auth/logout", { sessionToken: token });
    } catch (err: unknown) {
      console.error("[Logout Server Revocation Failed]", err);
    }
  }

  await clearSessionCookie();

  return {
    success: true,
    data: null,
    message: "Logged out successfully",
  };
}

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export async function forgotPasswordAction(
  payload: unknown
): Promise<ActionResponse<null>> {
  try {
    const validated = forgotPasswordSchema.safeParse(payload);
    if (!validated.success) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }

    const response = await api.post<{ success: boolean; message?: string }>(
      "/auth/forgot-password",
      validated.data
    );

    return {
      success: true,
      data: null,
      message:
        response.message ||
        "Reset link sent successfully to your email address.",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to send reset link.";
    return {
      success: false,
      error: message,
    };
  }
}

export async function listSessionsAction(): Promise<ActionResponse<SessionItem[]>> {
  try {
    const response = await api.get<{
      success: boolean;
      data: { sessions: SessionItem[] };
    }>("/auth/sessions");

    return {
      success: true,
      data: response?.data?.sessions || [],
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to retrieve active sessions.";
    return {
      success: false,
      error: message,
    };
  }
}

export async function revokeSessionAction(
  sessionId: string
): Promise<ActionResponse<null>> {
  try {
    await api.delete(`/auth/sessions/${sessionId}`);
    return {
      success: true,
      data: null,
      message: "Session revoked successfully",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to revoke session.";
    return {
      success: false,
      error: message,
    };
  }
}


export async function activateAccountAction(
  payload: unknown
): Promise<ActionResponse<null>> {
  const validated = activateAccountSchema.safeParse(payload);
  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Please check your inputs and try again.",
      fieldErrors: fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const response = await api.post<{
      success: boolean;
      message?: string;
    }>("/auth/activate", validated.data);

    return {
      success: true,
      data: null,
      message: response.message || "Account activated successfully!",
    };
  } catch (err: unknown) {
    const errorObj = err as Error;
    return {
      success: false,
      error: errorObj?.message || "Invalid or expired activation link.",
    };
  }
}

export async function resendActivationLinkAction(
  payload: unknown
): Promise<ActionResponse<null>> {
  const validated = resendActivationSchema.safeParse(payload);
  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Please enter a valid email address.",
      fieldErrors: fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const response = await api.post<{
      success: boolean;
      message?: string;
    }>("/auth/resend-activation", validated.data);

    return {
      success: true,
      data: null,
      message:
        response.message ||
        "An activation link has been sent to your registered email address. Please check your inbox.",
    };
  } catch (err: unknown) {
    const errorObj = err as Error;
    return {
      success: false,
      error: errorObj?.message || "Failed to send activation link.",
    };
  }
}

export async function revokeAllOtherSessionsAction(): Promise<ActionResponse<null>> {
  try {
    await api.delete("/auth/sessions");
    return {
      success: true,
      data: null,
      message: "All other sessions revoked successfully",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Failed to revoke all other sessions.";
    return {
      success: false,
      error: message,
    };
  }
}
