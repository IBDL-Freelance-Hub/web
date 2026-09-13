"use server";

import { api } from "@/lib/api";
import { ActionResponse } from "@/types/api";
import {
  CheckDuplicateInput,
  CheckDuplicateResponseData,
  RegisterMemberInput,
  RegisterMemberResponseData,
} from "@/types/registration";
import {
  getCheckDuplicateSchema,
  getRegisterMemberSchema,
  normalizeMobile,
} from "@/lib/validations/registration";
import {
  getLocalizedErrorMessage,
  Locale,
} from "@/lib/validations/registrationErrors";

/**
 * Check Duplicate Action (SCR-18)
 * Checks if an account with given email, mobile, or country already exists.
 */
export async function checkDuplicateAction(
  payload: CheckDuplicateInput
): Promise<ActionResponse<CheckDuplicateResponseData>> {
  const activeLocale: Locale = payload.locale === "ar" ? "ar" : "en";

  try {
    const schema = getCheckDuplicateSchema(activeLocale);
    const validation = schema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors: Record<string, string[]> = {};
      validation.error.issues.forEach((err) => {
        const path = err.path.join(".");
        if (path) {
          if (!fieldErrors[path]) fieldErrors[path] = [];
          fieldErrors[path].push(err.message);
        }
      });
      return {
        success: false,
        error:
          activeLocale === "ar"
            ? "يرجى تصحيح الأخطاء الموضحة أدناه."
            : "Please correct the errors below.",
        fieldErrors,
      };
    }

    const { email, mobile, country } = validation.data;
    const normalizedPayload = {
      email:
        email && email.trim().length > 0
          ? email.trim().toLowerCase()
          : undefined,
      mobile:
        mobile && mobile.trim().length > 0
          ? normalizeMobile(mobile)
          : undefined,
      country:
        country && country.trim().length > 0 ? country.trim() : undefined,
    };

    const res = await api.post<{
      success: boolean;
      data: CheckDuplicateResponseData;
    }>("/members/check-duplicate", normalizedPayload);

    return {
      success: true,
      data: res.data,
    };
  } catch (err: unknown) {
    const errorObj = err as Error & {
      status?: number;
      fieldErrors?: Record<string, string[]>;
    };
    return {
      success: false,
      error:
        errorObj.message ||
        (activeLocale === "ar"
          ? "حدث خطأ غير متوقع أثناء الفحص."
          : "An unexpected error occurred during duplicate check."),
      fieldErrors: errorObj.fieldErrors,
    };
  }
}

/**
 * Register Member Action (SCR-16 / SCR-19)
 * Submits freelancer application payload to Express backend.
 */
export async function registerMemberAction(
  payload: RegisterMemberInput
): Promise<ActionResponse<RegisterMemberResponseData>> {
  const activeLocale: Locale = payload.locale === "ar" ? "ar" : "en";

  try {
    const schema = getRegisterMemberSchema(activeLocale);
    const validation = schema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors: Record<string, string[]> = {};
      validation.error.issues.forEach((err) => {
        const path = err.path.join(".");
        if (path) {
          if (!fieldErrors[path]) fieldErrors[path] = [];
          fieldErrors[path].push(err.message);
        }
      });
      return {
        success: false,
        error:
          activeLocale === "ar"
            ? "يرجى تصحيح الأخطاء الموضحة أدناه."
            : "Please correct the errors below.",
        fieldErrors,
      };
    }

    const res = await api.post<{
      success: boolean;
      data: RegisterMemberResponseData;
      message?: string;
    }>("/members/register", validation.data);

    return {
      success: true,
      data: res.data,
      message:
        res.message ||
        (activeLocale === "ar"
          ? "تم التسجيل بنجاح"
          : "Registration successful"),
    };
  } catch (err: unknown) {
    const errorObj = err as Error & {
      status?: number;
      fieldErrors?: Record<string, string[]>;
      errors?: Array<{ field: string; message: string }>;
    };

    const fieldErrors: Record<string, string[]> = errorObj.fieldErrors || {};

    if (errorObj.errors && Array.isArray(errorObj.errors)) {
      errorObj.errors.forEach((e) => {
        if (e.field) {
          if (!fieldErrors[e.field]) fieldErrors[e.field] = [];
          const localizedMsg = getLocalizedErrorMessage(
            e.field,
            "invalid",
            activeLocale
          );
          fieldErrors[e.field].push(localizedMsg || e.message);
        }
      });
    }

    const isDuplicate =
      errorObj.status === 409 ||
      errorObj.message?.toLowerCase().includes("already registered");

    if (isDuplicate) {
      const duplicateMsg =
        activeLocale === "ar"
          ? "يوجد حساب مسجل بالفعل بهذا البريد الإلكتروني أو رقم الهاتف."
          : "An account with this email or mobile number is already registered.";
      return {
        success: false,
        error: duplicateMsg,
        fieldErrors: {
          email: [duplicateMsg],
          mobile: [duplicateMsg],
        },
      };
    }

    return {
      success: false,
      error:
        errorObj.message ||
        (activeLocale === "ar"
          ? "فشل التسجيل. يرجى المحاولة مرة أخرى."
          : "Registration failed. Please try again."),
      fieldErrors:
        Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    };
  }
}
