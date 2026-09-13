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
  UserSessionDto,
} from "../types/api";

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

    // Next.js owns setting the flh_session HttpOnly cookie exclusively
    await setSessionCookie(response.data.sessionToken);

    return {
      success: true,
      data: response.data.user,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error && err.message
        ? err.message
        : GENERIC_AUTH_FAILURE_MESSAGE;
    return {
      success: false,
      error: message,
    };
  }
}

export async function logoutAction(): Promise<ActionResponse<null>> {
  try {
    const token = await getSessionCookie();
    if (token) {
      await api.post("/auth/logout", { sessionToken: token }).catch(() => {});
    }
  } finally {
    await clearSessionCookie();
  }

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
