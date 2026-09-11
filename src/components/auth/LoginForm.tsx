"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function LoginForm() {
  const { locale } = useLocale();
  const router = useRouter();

  const [view, setView] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);
    setSuccessMessage(null);

    let hasError = false;

    if (!email.trim()) {
      setEmailError(
        locale === "ar"
          ? "الرجاء إدخال البريد الإلكتروني"
          : "Email address is required."
      );
      hasError = true;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError(
        locale === "ar"
          ? "الرجاء إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email address."
      );
      hasError = true;
    }

    if (!password) {
      setPasswordError(
        locale === "ar" ? "الرجاء إدخال كلمة المرور" : "Password is required."
      );
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setGeneralError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setEmailError(
        locale === "ar"
          ? "الرجاء إدخال البريد الإلكتروني"
          : "Email address is required."
      );
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError(
        locale === "ar"
          ? "الرجاء إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email address."
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        locale === "ar"
          ? "تم إرسال رابط إعادة ضبط كلمة المرور إلى بريدك الإلكتروني."
          : "Reset link sent successfully to your email address."
      );
    }, 1000);
  };

  const ArrowIcon = locale === "ar" ? ArrowLeft : ArrowRight;
  const BackChevron = locale === "ar" ? ChevronRight : ChevronLeft;

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-white px-8 pt-6 pb-8 text-start sm:px-12 sm:pt-8 lg:min-h-full lg:px-16 lg:pt-8 lg:pb-12">
      {/* Top Header Row perfectly aligned at exact logo height */}
      <div className="relative z-20 flex h-8 w-full items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6a6a86] transition-colors hover:text-[#1d1d39]"
        >
          <span>
            {locale === "ar"
              ? "‹ العودة للموقع العام"
              : "‹ Back to the public site"}
          </span>
        </Link>
        <LanguageToggle variant="light" />
      </div>

      {/* Main Form Center Box */}
      <div className="mx-auto my-auto w-full max-w-md py-6">
        {view === "login" ? (
          <>
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

            {generalError && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{generalError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-5" noValidate>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
                >
                  {locale === "ar" ? "البريد الإلكتروني *" : "Email address *"}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border px-4 py-3.5 text-sm text-[#16162c] transition-all placeholder:text-[#6a6a86]/50 focus:outline-none ${
                    emailError
                      ? "border-red-500 ring-2 ring-red-500/20"
                      : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
                  }`}
                />
                {emailError && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
                >
                  {locale === "ar" ? "كلمة المرور *" : "Password *"}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full rounded-xl border px-4 py-3.5 text-sm text-[#16162c] transition-all focus:outline-none ${
                    passwordError
                      ? "border-red-500 ring-2 ring-red-500/20"
                      : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
                  }`}
                />
                {passwordError && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {passwordError}
                  </p>
                )}

                {/* Forgot Password Link strictly positioned BELOW the password input */}
                <div className="mt-2 text-end">
                  <button
                    type="button"
                    onClick={() => {
                      setView("forgot");
                      setEmailError(null);
                      setGeneralError(null);
                      setSuccessMessage(null);
                    }}
                    className="cursor-pointer text-xs font-semibold text-[#e11119] transition-colors hover:underline"
                  >
                    {locale === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?"}
                  </button>
                </div>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all duration-300 hover:scale-[1.01] hover:bg-[#b60d14] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {locale === "ar"
                        ? "جاري تسجيل الدخول..."
                        : "Signing in..."}
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

            {/* Account Activation Prompt */}
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
          </>
        ) : (
          /* Forgot Password View matching reference screenshot */
          <>
            {/* Back to Sign In button */}
            <button
              type="button"
              onClick={() => {
                setView("login");
                setEmailError(null);
                setGeneralError(null);
                setSuccessMessage(null);
              }}
              className="mb-8 inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#6a6a86] transition-colors hover:text-[#1d1d39]"
            >
              <BackChevron className="h-3.5 w-3.5" />
              <span>
                {locale === "ar" ? "العودة لتسجيل الدخول" : "Back to sign in"}
              </span>
            </button>

            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#16162c] sm:text-3xl">
                {locale === "ar"
                  ? "إعادة ضبط كلمة المرور"
                  : "Reset your password"}
              </h1>
              <p className="text-xs leading-relaxed text-[#6a6a86] sm:text-sm">
                {locale === "ar"
                  ? "أدخل بريدك الإلكتروني المسجل وسنرسل لك رابط إعادة الضبط."
                  : "Enter the email you registered with and we will simulate sending a reset link."}
              </p>
            </div>

            {successMessage && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {generalError && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{generalError}</span>
              </div>
            )}

            <form
              onSubmit={handleForgotSubmit}
              className="space-y-5"
              noValidate
            >
              <div>
                <label
                  htmlFor="reset-email"
                  className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
                >
                  {locale === "ar" ? "البريد الإلكتروني *" : "Email address *"}
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border px-4 py-3.5 text-sm text-[#16162c] transition-all placeholder:text-[#6a6a86]/50 focus:outline-none ${
                    emailError
                      ? "border-red-500 ring-2 ring-red-500/20"
                      : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
                  }`}
                />
                {emailError && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {emailError}
                  </p>
                )}
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
                      {locale === "ar"
                        ? "جاري إرسال الرابط..."
                        : "Sending reset link..."}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {locale === "ar"
                        ? "إرسال رابط إعادة الضبط"
                        : "Send reset link"}
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
        © 2026 IBDL Learning Group
      </div>
    </div>
  );
}
