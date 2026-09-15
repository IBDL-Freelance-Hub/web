import { z } from "zod";
import { AUTH_STRINGS, Locale } from "@/lib/constants/authStrings";

/**
 * Forgot Password Validation Schema (Bilingual)
 */
export const getForgotPasswordSchema = (locale: Locale = "en") =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, AUTH_STRINGS.validation.emailRequired[locale])
      .email(AUTH_STRINGS.validation.emailInvalid[locale]),
  });

export const forgotPasswordSchema = getForgotPasswordSchema("en");

/**
 * Reset Password Validation Schema (Bilingual)
 * Enforces token requirement, password complexity, and confirmation match
 */
export const getResetPasswordSchema = (locale: Locale = "en") =>
  z
    .object({
      token: z.string().min(1, AUTH_STRINGS.validation.tokenRequired[locale]),
      password: z
        .string()
        .min(8, AUTH_STRINGS.policy.length[locale])
        .regex(/[A-Z]/, AUTH_STRINGS.policy.uppercase[locale])
        .regex(/[a-z]/, AUTH_STRINGS.policy.lowercase[locale])
        .regex(/[0-9]/, AUTH_STRINGS.policy.number[locale]),
      confirmPassword: z
        .string()
        .min(1, AUTH_STRINGS.validation.confirmPasswordRequired[locale]),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: AUTH_STRINGS.policy.match[locale],
      path: ["confirmPassword"],
    });

export const resetPasswordSchema = getResetPasswordSchema("en");

/**
 * Account Activation Schema (Bilingual)
 */
export const getActivateAccountSchema = (locale: Locale = "en") =>
  z
    .object({
      token: z.string().min(1, "Activation token is required."),
      password: z
        .string()
        .min(8, AUTH_STRINGS.policy.length[locale])
        .regex(/[A-Z]/, AUTH_STRINGS.policy.uppercase[locale])
        .regex(/[a-z]/, AUTH_STRINGS.policy.lowercase[locale])
        .regex(/[0-9]/, AUTH_STRINGS.policy.number[locale]),
      confirmPassword: z
        .string()
        .min(1, AUTH_STRINGS.validation.confirmPasswordRequired[locale]),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: AUTH_STRINGS.policy.match[locale],
      path: ["confirmPassword"],
    });

export const activateAccountSchema = getActivateAccountSchema("en");

export const resendActivationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
});
