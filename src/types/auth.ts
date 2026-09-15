import type { Locale } from "@/lib/constants/authStrings";

export interface ActivateAccountPayload {
  token: string;
  password: string;
  confirmPassword: string;
  locale?: Locale;
}

export interface ResendActivationPayload {
  email: string;
  locale?: Locale;
}

export interface PasswordPolicyRequirement {
  id: string;
  labelEn: string;
  labelAr: string;
  met: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
  locale?: Locale;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
  locale?: Locale;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}
