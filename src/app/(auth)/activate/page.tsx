"use client";

import React, { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import {
  activateAccountAction,
  resendActivationLinkAction,
} from "@/actions/authActions";
import {
  Check,
  X,
  AlertCircle,
  Loader2,
  Lock,
  ArrowLeft,
  ArrowRight,
  Mail,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";

function ActivateForm() {
  const { locale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Resend Modal state
  const [resendEmail, setResendEmail] = useState("");
  const [resendModalOpen, setResendModalOpen] = useState(false);
  const [resendPending, startResendTransition] = useTransition();
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendSuccessDialog, setResendSuccessDialog] = useState(false);

  // Live password policy checks
  const policyChecks = [
    {
      id: "length",
      en: "At least 8 characters",
      ar: "8 أحرف على الأقل",
      met: password.length >= 8,
    },
    {
      id: "uppercase",
      en: "At least one uppercase letter (A-Z)",
      ar: "حرف كبير واحد على الأقل (A-Z)",
      met: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      en: "At least one lowercase letter (a-z)",
      ar: "حرف صغير واحد على الأقل (a-z)",
      met: /[a-z]/.test(password),
    },
    {
      id: "number",
      en: "At least one number (0-9)",
      ar: "رقم واحد على الأقل (0-9)",
      met: /[0-9]/.test(password),
    },
    {
      id: "match",
      en: "Passwords match",
      ar: "كلمتا المرور متطابقتان",
      met: Boolean(confirmPassword && password === confirmPassword),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setConfirmPasswordError(null);
    setServerError(null);

    if (!token) {
      setServerError(
        locale === "ar"
          ? "رمز التفعيل مفقود. يرجى طلب رابط تفعيل جديد."
          : "Activation token is missing. Please request a new activation link."
      );
      return;
    }

    let hasClientError = false;

    if (!password) {
      setPasswordError(
        locale === "ar" ? "الرجاء إدخال كلمة المرور" : "Password is required."
      );
      hasClientError = true;
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setPasswordError(
        locale === "ar"
          ? "كلمة المرور لا تستوفي الشروط المطلوبة"
          : "Password does not meet required criteria."
      );
      hasClientError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError(
        locale === "ar"
          ? "الرجاء تأكيد كلمة المرور"
          : "Please confirm your password."
      );
      hasClientError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(
        locale === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match."
      );
      hasClientError = true;
    }

    if (hasClientError) return;

    startTransition(async () => {
      const result = await activateAccountAction({
        token,
        password,
        confirmPassword,
      });

      if (!result.success) {
        if (result.fieldErrors?.password?.[0]) {
          setPasswordError(result.fieldErrors.password[0]);
        }
        if (result.fieldErrors?.confirmPassword?.[0]) {
          setConfirmPasswordError(result.fieldErrors.confirmPassword[0]);
        }
        setServerError(result.error);
      } else {
        router.push("/login?activated=true");
      }
    });
  };

  const handleResendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResendError(null);

    if (!resendEmail.trim() || !resendEmail.includes("@")) {
      setResendError(
        locale === "ar"
          ? "الرجاء إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email address."
      );
      return;
    }

    startResendTransition(async () => {
      const result = await resendActivationLinkAction({ email: resendEmail });
      if (!result.success) {
        setResendError(result.error);
      } else {
        setResendModalOpen(false);
        setResendSuccessDialog(true);
      }
    });
  };

  const BackChevron = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-white px-8 pt-6 pb-8 text-start sm:px-12 sm:pt-8 lg:min-h-full lg:px-16 lg:pt-8 lg:pb-12">
      {/* Header Bar */}
      <div className="relative z-20 flex h-8 w-full items-center justify-between">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6a6a86] transition-colors hover:text-[#1d1d39]"
        >
          <BackChevron className="h-4 w-4" />
          <span>
            {locale === "ar"
              ? "العودة لتسجيل الدخول"
              : "Back to sign in"}
          </span>
        </Link>
        <LanguageToggle variant="light" />
      </div>

      {/* Main Content Box */}
      <div className="mx-auto my-auto w-full max-w-md py-6">
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#419257]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#16162c] sm:text-3xl">
            {locale === "ar"
              ? "تفعيل حسابك وضبط كلمة المرور"
              : "Activate your account"}
          </h1>
          <p className="text-xs leading-relaxed text-[#6a6a86] sm:text-sm">
            {locale === "ar"
              ? "يرجى تعيين كلمة مرور قوية لتفعيل عضويتك والبدء في الاستفادة من منصة المستقلين."
              : "Set up a secure password to complete your membership activation."}
          </p>
        </div>

        {/* Invalid or Missing Token Banner */}
        {!token && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-xs text-amber-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-amber-950">
                  {locale === "ar" ? "رابط التفعيل غير صالح" : "Invalid Activation Link"}
                </h4>
                <p className="leading-relaxed">
                  {locale === "ar"
                    ? "رمز التفعيل مفقود أو انتهت صلاحيته. يمكنك طلب إرسال رابط تفعيل جديد إلى بريدك الإلكتروني."
                    : "The activation token is missing or has expired. You can request a new activation link to be sent to your email."}
                </p>
                <button
                  type="button"
                  onClick={() => setResendModalOpen(true)}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-amber-700"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>
                    {locale === "ar"
                      ? "إعادة إرسال رابط التفعيل"
                      : "Request new activation link"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Server Error Banner */}
        {serverError && token && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
              <div className="space-y-1">
                <p className="leading-relaxed font-medium">{serverError}</p>
                <button
                  type="button"
                  onClick={() => setResendModalOpen(true)}
                  className="mt-2 text-xs font-bold text-[#e11119] underline hover:no-underline"
                >
                  {locale === "ar"
                    ? "هل تحتاج لرابط تفعيل جديد؟ اضغط هنا"
                    : "Need a new activation link? Click here"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Activation Form */}
        {token && (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
              >
                {locale === "ar" ? "كلمة المرور الجديدة *" : "New Password *"}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={isPending}
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
              >
                {locale === "ar" ? "تأكيد كلمة المرور *" : "Confirm Password *"}
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={isPending}
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
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
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

            {/* Password Policy Strength Checklist */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 text-xs">
              <p className="font-semibold text-slate-700 mb-2">
                {locale === "ar" ? "شروط كلمة المرور:" : "Password requirements:"}
              </p>
              {policyChecks.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  {item.met ? (
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <X className="h-4 w-4 shrink-0 text-slate-400" />
                  )}
                  <span
                    className={
                      item.met
                        ? "font-medium text-emerald-700"
                        : "text-slate-500"
                    }
                  >
                    {locale === "ar" ? item.ar : item.en}
                  </span>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#419257] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#347845] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>
                    {locale === "ar" ? "جاري التفعيل..." : "Activating..."}
                  </span>
                </>
              ) : (
                <span>
                  {locale === "ar"
                    ? "تفعيل الحساب والمتابعة"
                    : "Activate Account & Proceed"}
                </span>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 text-xs font-medium text-[#6a6a86]/60">
        © 2026 IBDL Learning Group
      </div>

      {/* Resend Activation Link Modal */}
      {resendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#16162c]">
                {locale === "ar"
                  ? "طلب رابط تفعيل جديد"
                  : "Request Activation Link"}
              </h3>
              <button
                type="button"
                onClick={() => setResendModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {resendError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{resendError}</span>
              </div>
            )}

            <form onSubmit={handleResendSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#16162c]">
                  {locale === "ar"
                    ? "البريد الإلكتروني المسجل *"
                    : "Registered Email Address *"}
                </label>
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#e2e2ec] px-4 py-3 text-sm focus:border-[#419257] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setResendModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {locale === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={resendPending}
                  className="flex items-center gap-2 rounded-xl bg-[#419257] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#347845]"
                >
                  {resendPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{locale === "ar" ? "إرسال الرابط" : "Send Link"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Success Modal (Step 1 Confirmation Dialog) */}
      {resendSuccessDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-[#16162c]">
              {locale === "ar"
                ? "تم إرسال رابط التفعيل"
                : "Activation Link Sent"}
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              {locale === "ar"
                ? "تم إرسال رابط التفعيل إلى بريدك الإلكتروني المسجل. يرجى مراجعة صندوق الوارد الخاص بك."
                : "An activation link has been sent to your registered email address. Please check your inbox."}
            </p>
            <button
              type="button"
              onClick={() => setResendSuccessDialog(false)}
              className="mt-2 w-full rounded-xl bg-[#419257] py-3 text-xs font-bold text-white hover:bg-[#347845]"
            >
              {locale === "ar" ? "حسناً، فهمت" : "Got it"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ActivatePage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Left Column: Branding Panel (Desktop Only) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#141428] bg-gradient-to-br from-[#141428] via-[#1d1d39] to-[#0d0d1c] px-8 pt-6 pb-8 text-white sm:px-12 sm:pt-8 lg:flex lg:px-16 lg:pt-8 lg:pb-12">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <div className="hero__photo opacity-75" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141428] via-[#141428]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1c] via-transparent to-[#141428]/50" />
        </div>

        <div className="relative z-10 flex h-8 items-center">
          <Link href="/" className="inline-block">
            <img
              src="/Logos/FLH-white.png"
              alt="IBDL Freelancers Hub Logo"
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="relative z-10 my-auto max-w-md py-12">
          <h2 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
            Activate your profile.
          </h2>
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            Set up your credentials to access simulations, accredited tools, and your professional toolkit.
          </p>
        </div>

        <div className="relative z-10 text-xs font-medium text-white/40">
          © 2026 IBDL Learning Group
        </div>
      </div>

      {/* Right Column: Activation Form */}
      <div className="relative flex flex-col items-center justify-center bg-white">
        <Suspense fallback={<div className="p-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-[#419257]" /></div>}>
          <ActivateForm />
        </Suspense>
      </div>
    </main>
  );
}
