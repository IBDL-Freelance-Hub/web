"use server";

import { z } from "zod";
import { cookies } from "next/headers";
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
  getForgotPasswordSchema,
  getResetPasswordSchema,
} from "../lib/validations/auth";
import { AUTH_STRINGS, Locale } from "../lib/constants/authStrings";

async function getActiveLocale(overrideLocale?: string): Promise<Locale> {
  if (overrideLocale === "ar" || overrideLocale === "en") {
    return overrideLocale;
  }
  try {
    const cookieStore = await cookies();
    const cookieLocale =
      cookieStore.get("flh_locale")?.value ||
      cookieStore.get("NEXT_LOCALE")?.value;
    if (cookieLocale === "ar" || cookieLocale === "en") {
      return cookieLocale;
    }
  } catch {
    // Fallback when executed outside request context
  }
  return "en";
}

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
      status?: number;
    };
    let message = errorObj?.message || GENERIC_AUTH_FAILURE_MESSAGE;
    if (
      message.includes("is not valid JSON") ||
      message.includes("Unexpected token")
    ) {
      message =
        "The server is temporarily unavailable. Please try again later.";
    }
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

/**
 * Forgot Password Action (SEC-23 & FIX 2 Compliant)
 * Strictly enforces anti-enumeration by returning a generic success message
 * for all standard backend responses (matching account, non-existent account,
 * or silently rate-limited). Only genuine network / 5xx failures return an error.
 */
export async function forgotPasswordAction(
  payload: unknown
): Promise<ActionResponse<null>> {
  const rawObj =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};
  const activeLocale = await getActiveLocale(
    typeof rawObj.locale === "string" ? rawObj.locale : undefined
  );
  const schema = getForgotPasswordSchema(activeLocale);
  const validated = schema.safeParse(payload);

  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      success: false,
      error: AUTH_STRINGS.validation.emailInvalid[activeLocale],
      fieldErrors: fieldErrors as Record<string, string[]>,
    };
  }

  const genericSuccessMessage =
    AUTH_STRINGS.forgotPassword.genericSuccess[activeLocale];

  try {
    await api.post<{ success: boolean; message?: string }>(
      "/auth/forgot-password",
      { email: validated.data.email }
    );
  } catch (err: unknown) {
    const errorObj = err as Error & { status?: number; code?: string };
    // The ONLY case that should NOT return the generic success message is a genuine backend/network failure
    const isNetworkOr5xx =
      !errorObj.status ||
      errorObj.status >= 500 ||
      errorObj.code === "ECONNREFUSED" ||
      errorObj.code === "ENOTFOUND" ||
      errorObj.message?.includes("fetch failed");

    if (isNetworkOr5xx) {
      console.error("[ForgotPassword API Network/5xx Error]", err);
      return {
        success: false,
        error: AUTH_STRINGS.common.somethingWentWrong[activeLocale],
      };
    }

    // For all other cases (user not found, 404, 400, silent rate limit),
    // SEC-23 anti-enumeration requires returning the generic success message.
  }

  return {
    success: true,
    data: null,
    message: genericSuccessMessage,
  };
}

/**
 * Reset Password Action (VAL-142 & FIX 1 Compliant)
 * Strictly distinguishes invalid/expired tokens (RECOVERY STATE)
 * from genuine 5xx/network errors, and never writes session cookies.
 */
export async function resetPasswordAction(
  payload: unknown
): Promise<ActionResponse<null>> {
  const rawObj =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};
  const activeLocale = await getActiveLocale(
    typeof rawObj.locale === "string" ? rawObj.locale : undefined
  );
  const schema = getResetPasswordSchema(activeLocale);
  const validated = schema.safeParse(payload);

  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      success: false,
      error: AUTH_STRINGS.validation.passwordCriteriaFailed[activeLocale],
      fieldErrors: fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const response = await api.post<{ success: boolean; message?: string }>(
      "/auth/reset-password",
      {
        token: validated.data.token,
        password: validated.data.password,
        newPassword: validated.data.password,
        confirmPassword: validated.data.confirmPassword,
      }
    );

    // Returns { success: true } without writing session cookies
    return {
      success: true,
      data: null,
      message:
        response.message ||
        AUTH_STRINGS.resetPassword.successTitle[activeLocale],
    };
  } catch (err: unknown) {
    const errorObj = err as Error & {
      status?: number;
      code?: string;
      title?: string;
      fieldErrors?: Record<string, string[]>;
    };

    // VAL-142: Invalid, expired, or already used token detection
    const isTokenIssue =
      errorObj.code === "RESET_TOKEN_INVALID" ||
      errorObj.code === "RESET_LINK_INVALID" ||
      errorObj.code === "TOKEN_EXPIRED" ||
      errorObj.code === "TOKEN_INVALID" ||
      errorObj.status === 404 ||
      errorObj.status === 410 ||
      (typeof errorObj.message === "string" &&
        /(?:token|link).*(?:expired|invalid|not found|already.*used|no longer valid)/i.test(
          errorObj.message
        ));

    if (isTokenIssue) {
      return {
        success: false,
        code: "RESET_LINK_INVALID",
        title: AUTH_STRINGS.recovery.invalidLinkTitle[activeLocale],
        error: AUTH_STRINGS.recovery.invalidLinkError[activeLocale],
      };
    }

    // Server-side validation errors (e.g. password equals email or password criteria)
    if (errorObj.fieldErrors || errorObj.code === "VALIDATION_ERROR") {
      return {
        success: false,
        error:
          errorObj.message ||
          AUTH_STRINGS.validation.passwordCriteriaFailed[activeLocale],
        fieldErrors: errorObj.fieldErrors,
      };
    }

    // Any OTHER failure (e.g. genuine 5xx / network error)
    console.error("[ResetPassword Internal Error]", err);
    return {
      success: false,
      error: AUTH_STRINGS.common.somethingWentWrong[activeLocale],
    };
  }
}

export async function listSessionsAction(): Promise<
  ActionResponse<SessionItem[]>
> {
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
      err instanceof Error
        ? err.message
        : "Failed to retrieve active sessions.";
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
  const rawObj =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};
  const activeLocale = await getActiveLocale(
    typeof rawObj.locale === "string" ? rawObj.locale : undefined
  );
  const validated = resendActivationSchema.safeParse(payload);
  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      success: false,
      error: AUTH_STRINGS.validation.emailInvalid[activeLocale],
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
        (activeLocale === "ar"
          ? "تم إرسال رابط التفعيل إلى بريدك الإلكتروني المسجل. يرجى مراجعة صندوق الوارد."
          : "An activation link has been sent to your registered email address. Please check your inbox."),
    };
  } catch (err: unknown) {
    const errorObj = err as Error & { status?: number; code?: string };
    const isNetworkOr5xx =
      !errorObj.status ||
      errorObj.status >= 500 ||
      errorObj.code === "ECONNREFUSED" ||
      errorObj.code === "ENOTFOUND" ||
      errorObj.message?.includes("fetch failed");

    if (isNetworkOr5xx) {
      console.error("[ResendActivationLink Network/5xx Error]", err);
      return {
        success: false,
        error: AUTH_STRINGS.common.somethingWentWrong[activeLocale],
      };
    }

    // Anti-enumeration: Return generic success for client-safe responses
    return {
      success: true,
      data: null,
      message:
        activeLocale === "ar"
          ? "إذا كان هناك حساب مسجل بهذا البريد وغير مفعل، فقد تم إرسال رابط التفعيل."
          : "If an account exists and is unactivated, a new link has been sent.",
    };
  }
}

export async function revokeAllOtherSessionsAction(): Promise<
  ActionResponse<null>
> {
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
