"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { resetPasswordAction } from "@/actions/authActions";
import { AUTH_STRINGS } from "@/lib/constants/authStrings";
import {
  Check,
  Circle,
  AlertCircle,
  Loader2,
  Lock,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

interface ResetPasswordFormProps {
  token?: string;
}

export function ResetPasswordForm({
  token: propToken,
}: ResetPasswordFormProps) {
  const { locale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = propToken || searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Dedicated VAL-142 Recovery State (for invalid, expired, or already-used token)
  const [recoveryState, setRecoveryState] = useState<{
    title?: string;
    error: string;
  } | null>(() => {
    if (!token) {
      return {
        title: AUTH_STRINGS.recovery.invalidLinkTitle[locale],
        error: AUTH_STRINGS.recovery.invalidLinkError[locale],
      };
    }
    return null;
  });

  // Password Policy Requirements using canonical AUTH_STRINGS.policy
  const policyChecks = [
    {
      id: "length",
      label: AUTH_STRINGS.policy.length[locale],
      met: password.length >= 8,
    },
    {
      id: "uppercase",
      label: AUTH_STRINGS.policy.uppercase[locale],
      met: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      label: AUTH_STRINGS.policy.lowercase[locale],
      met: /[a-z]/.test(password),
    },
    {
      id: "number",
      label: AUTH_STRINGS.policy.number[locale],
      met: /[0-9]/.test(password),
    },
    {
      id: "match",
      label: AUTH_STRINGS.policy.match[locale],
      met: Boolean(confirmPassword && password === confirmPassword),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setConfirmPasswordError(null);
    setGeneralError(null);

    if (!token) {
      setRecoveryState({
        title: AUTH_STRINGS.recovery.invalidLinkTitle[locale],
        error: AUTH_STRINGS.recovery.invalidLinkError[locale],
      });
      return;
    }

    let hasClientError = false;

    if (!password) {
      setPasswordError(AUTH_STRINGS.validation.passwordRequired[locale]);
      hasClientError = true;
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setPasswordError(AUTH_STRINGS.validation.passwordCriteriaFailed[locale]);
      hasClientError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError(
        AUTH_STRINGS.validation.confirmPasswordRequired[locale]
      );
      hasClientError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(
        AUTH_STRINGS.validation.passwordsDoNotMatch[locale]
      );
      hasClientError = true;
    }

    if (hasClientError) return;

    startTransition(async () => {
      const result = await resetPasswordAction({
        token,
        password,
        confirmPassword,
        locale,
      });

      if (!result.success) {
        if (result.code === "RESET_LINK_INVALID") {
          // VAL-142: Transition to dedicated recovery state rather than inline red error
          setRecoveryState({
            title:
              result.title || AUTH_STRINGS.recovery.invalidLinkTitle[locale],
            error: result.error,
          });
          return;
        }

        if (result.fieldErrors?.password?.[0]) {
          setPasswordError(result.fieldErrors.password[0]);
        }
        if (result.fieldErrors?.confirmPassword?.[0]) {
          setConfirmPasswordError(result.fieldErrors.confirmPassword[0]);
        }
        setGeneralError(result.error);
      } else {
        // Successful reset without writing session cookies, redirect to login with ?reset=true
        router.push("/login?reset=true");
      }
    });
  };

  const BackChevron = locale === "ar" ? ArrowRight : ArrowLeft;
  const ArrowIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-white px-8 pt-6 pb-8 text-start sm:px-12 sm:pt-8 lg:min-h-full lg:px-16 lg:pt-8 lg:pb-12">
      {/* Top Header Bar */}
      <div className="relative z-20 flex h-8 w-full items-center justify-between">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6a6a86] transition-colors hover:text-[#1d1d39]"
        >
          <BackChevron className="h-4 w-4" />
          <span>{AUTH_STRINGS.forgotPassword.backToSignIn[locale]}</span>
        </Link>
        <LanguageToggle variant="light" />
      </div>

      {/* Main Content Box */}
      <div className="mx-auto my-auto w-full max-w-md py-6">
        {recoveryState ? (
          /* FIX 1 / VAL-142: DEDICATED RECOVERY STATE (Never an inline input error) */
          <div className="space-y-6">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-6 text-start shadow-xs">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-amber-950">
                    {recoveryState.title ||
                      AUTH_STRINGS.recovery.invalidLinkTitle[locale]}
                  </h3>
                  <p className="text-xs leading-relaxed text-amber-900/90">
                    {recoveryState.error}
                  </p>
                </div>
              </div>
            </div>

            {/* Single Action: Request a new link (routes to forgot password form, clean state) */}
            <Link
              href="/login?forgot=true"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all duration-300 hover:scale-[1.01] hover:bg-[#b60d14]"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{AUTH_STRINGS.recovery.requestNewLinkAction[locale]}</span>
            </Link>
          </div>
        ) : (
          /* Active Reset Password Form */
          <>
            <div className="mb-8">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#419257]">
                <Lock className="h-6 w-6" />
              </div>
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#16162c] sm:text-3xl">
                {AUTH_STRINGS.resetPassword.pageTitle[locale]}
              </h1>
              <p className="text-xs leading-relaxed text-[#6a6a86] sm:text-sm">
                {AUTH_STRINGS.resetPassword.pageSubtitle[locale]}
              </p>
            </div>

            {/* General System / Network Error Banner (Non-token failure) */}
            {generalError && (
              <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{generalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="reset-password"
                  className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
                >
                  {AUTH_STRINGS.resetPassword.newPasswordLabel[locale]} *
                </label>
                <div className="relative">
                  <input
                    id="reset-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full rounded-xl border px-4 py-3.5 pe-11 text-sm text-[#16162c] transition-all focus:outline-none ${
                      passwordError
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label
                  htmlFor="reset-confirm-password"
                  className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
                >
                  {AUTH_STRINGS.resetPassword.confirmPasswordLabel[locale]} *
                </label>
                <div className="relative">
                  <input
                    id="reset-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full rounded-xl border px-4 py-3.5 pe-11 text-sm text-[#16162c] transition-all focus:outline-none ${
                      confirmPasswordError
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              {/* Password Complexity Checklist (WCAG 2.1 AA Compliant) */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <ul className="space-y-2">
                  {policyChecks.map((item) => (
                    <li
                      key={item.id}
                      className={`flex items-center gap-2.5 text-xs transition-colors ${
                        item.met
                          ? "font-semibold text-emerald-700"
                          : "text-slate-500"
                      }`}
                    >
                      {item.met ? (
                        <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                      )}
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit Button with useTransition */}
              <button
                type="submit"
                disabled={isPending}
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all duration-300 hover:scale-[1.01] hover:bg-[#b60d14] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {AUTH_STRINGS.resetPassword.submittingButton[locale]}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {AUTH_STRINGS.resetPassword.submitButton[locale]}
                    </span>
                    <ArrowIcon className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Footer Branding Credit (Mobile view) */}
      <div className="mt-6 text-center text-xs text-[#6a6a86] lg:hidden">
        {AUTH_STRINGS.common.copyright}
      </div>
    </div>
  );
}
