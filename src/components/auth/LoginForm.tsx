"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { loginAction } from "@/actions/authActions";
import { AUTH_STRINGS } from "@/lib/constants/authStrings";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

function LoginFormContent() {
  const { locale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isActivated = searchParams.get("activated") === "true";
  const isReset = searchParams.get("reset") === "true";
  const initialForgotOpen = searchParams.get("forgot") === "true";

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(initialForgotOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [lockoutTitle, setLockoutTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);
    setLockoutTitle(null);

    let hasError = false;

    if (!email.trim()) {
      setEmailError(AUTH_STRINGS.validation.emailRequired[locale]);
      hasError = true;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError(AUTH_STRINGS.validation.emailInvalid[locale]);
      hasError = true;
    }

    if (!password) {
      setPasswordError(AUTH_STRINGS.validation.passwordRequired[locale]);
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      const res = await loginAction({ email, password });
      setIsLoading(false);

      if (!res.success) {
        if (res.fieldErrors) {
          if (res.fieldErrors.email?.[0])
            setEmailError(res.fieldErrors.email[0]);
          if (res.fieldErrors.password?.[0])
            setPasswordError(res.fieldErrors.password[0]);
        }
        if (res.title || res.code === "ACCOUNT_LOCKED") {
          setLockoutTitle(res.title || AUTH_STRINGS.lockout.title[locale]);
          setGeneralError(res.error);
        } else {
          setGeneralError(res.error);
        }
      } else {
        router.push("/overview");
      }
    } catch {
      setIsLoading(false);
      setGeneralError(AUTH_STRINGS.common.somethingWentWrong[locale]);
    }
  };

  const ArrowIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-white px-8 pt-6 pb-8 text-start sm:px-12 sm:pt-8 lg:min-h-full lg:px-16 lg:pt-8 lg:pb-12">
      {/* Top Header Row aligned at logo height */}
      <div className="relative z-20 flex h-8 w-full items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6a6a86] transition-colors hover:text-[#1d1d39]"
        >
          <span>{AUTH_STRINGS.common.backToPublic[locale]}</span>
        </Link>
        <LanguageToggle variant="light" />
      </div>

      {/* Main Login Form Box */}
      <div className="mx-auto my-auto w-full max-w-md py-6">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#16162c] sm:text-3xl">
            {locale === "ar" ? "تسجيل الدخول للمنصة" : "Sign in to the Hub"}
          </h1>
          <p className="text-xs leading-relaxed text-[#6a6a86] sm:text-sm">
            {locale === "ar"
              ? "تم إنشاء حسابك في المنصة أثناء عملية تسجيلك الأساسية. لن تحتاج للتسجيل أكثر من مرة."
              : "Your Freelancer Hub account was created from your original registration. You never need to register twice."}
          </p>
        </div>

        {/* Reset Password Success Banner */}
        {isReset && !generalError && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold tracking-tight text-emerald-950">
                  {AUTH_STRINGS.resetPassword.successTitle[locale]}
                </h4>
                <p className="leading-relaxed text-emerald-800">
                  {AUTH_STRINGS.resetPassword.bannerDescription[locale]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Account Activated Banner */}
        {!isReset && isActivated && !generalError && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold tracking-tight text-emerald-950">
                  {locale === "ar"
                    ? "تم تفعيل الحساب بنجاح!"
                    : "Account Activated!"}
                </h4>
                <p className="leading-relaxed text-emerald-800">
                  {locale === "ar"
                    ? "تم تفعيل حسابك بنجاح! يمكنك الآن تسجيل الدخول."
                    : "Account activated successfully! You can now log in."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error / Lockout Banner */}
        {generalError && (
          <div
            className={`mb-6 rounded-xl border p-4 text-xs transition-all ${
              lockoutTitle
                ? "border-red-300 bg-red-50 text-red-900 shadow-sm"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div className="space-y-1">
                {lockoutTitle && (
                  <h4 className="text-sm font-bold tracking-tight text-red-900">
                    {lockoutTitle}
                  </h4>
                )}
                <p className="leading-relaxed text-red-700/90">
                  {generalError}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-5" noValidate>
          <Input
            id="email"
            label={`${AUTH_STRINGS.forgotPassword.emailLabel[locale]} *`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={emailError}
            disabled={isLoading}
          />

          <div>
            <PasswordInput
              id="password"
              label={locale === "ar" ? "كلمة المرور *" : "Password *"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              error={passwordError}
              disabled={isLoading}
              toggleLabelShow={
                locale === "ar" ? "إظهار كلمة المرور" : "Show password"
              }
              toggleLabelHide={
                locale === "ar" ? "إخفاء كلمة المرور" : "Hide password"
              }
            />

            <div className="mt-2 text-end">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="cursor-pointer text-xs font-semibold text-[#e11119] transition-colors hover:underline"
              >
                {locale === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all duration-300 hover:scale-[1.01] hover:bg-[#b60d14] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>
                  {locale === "ar" ? "جاري تسجيل الدخول..." : "Signing in..."}
                </span>
              </>
            ) : (
              <>
                <span>{locale === "ar" ? "تسجيل الدخول" : "Sign in"}</span>
                <ArrowIcon className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 block text-center text-xs text-[#6a6a86]">
          {locale === "ar"
            ? "مسجل ولم تفعل حسابك بعد؟ "
            : "Registered but never activated your account? "}
          <Link
            href="/activate"
            className="font-bold text-[#e11119] hover:underline"
          >
            {locale === "ar" ? "فعل حسابك من هنا" : "Activate it here"}
          </Link>
        </p>
      </div>

      {/* Mobile Footer Credit */}
      <div className="mt-6 text-center text-xs text-[#6a6a86] lg:hidden">
        {AUTH_STRINGS.common.copyright}
      </div>

      {/* Decoupled Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        initialEmail={email}
      />
    </div>
  );
}

export function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#419257]" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
