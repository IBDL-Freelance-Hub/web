"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useLocale } from "@/components/common/DirectionProvider";
import { resendActivationLinkAction } from "@/actions/authActions";
import { AUTH_STRINGS } from "@/lib/constants/authStrings";
import { Input } from "@/components/ui/Input";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export interface RequestActivationLinkFormProps {
  defaultEmail?: string;
}

export function RequestActivationLinkForm({
  defaultEmail = "",
}: RequestActivationLinkFormProps) {
  const { locale } = useLocale();
  const [email, setEmail] = useState(defaultEmail);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setServerError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError(AUTH_STRINGS.validation.emailRequired[locale]);
      return;
    }
    if (!trimmed.includes("@") || !trimmed.includes(".")) {
      setEmailError(AUTH_STRINGS.validation.emailInvalid[locale]);
      return;
    }

    startTransition(async () => {
      try {
        const res = await resendActivationLinkAction({ email: trimmed });
        if (res.success) {
          setRequestSent(true);
        } else {
          setServerError(
            res.error || AUTH_STRINGS.common.somethingWentWrong[locale]
          );
        }
      } catch {
        setServerError(AUTH_STRINGS.common.somethingWentWrong[locale]);
      }
    });
  };

  const ArrowIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#16162c] sm:text-3xl">
          {locale === "ar"
            ? "طلب رابط تفعيل الحساب"
            : "Request Activation Link"}
        </h1>
        <p className="text-xs leading-relaxed text-[#6a6a86] sm:text-sm">
          {locale === "ar"
            ? "أدخل بريدك الإلكتروني المسجل في المنصة وسنرسل لك رابطاً مباشراً لتعيين كلمة المرور وتفعيل حسابك."
            : "Enter your registered email address and we will send you a link to set your password and activate your account."}
        </p>
      </div>

      {requestSent ? (
        <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-start">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">
                {locale === "ar"
                  ? "تم إرسال الرابط بنجاح!"
                  : "Activation Link Dispatched!"}
              </h3>
              <p className="text-xs leading-relaxed text-slate-700">
                {locale === "ar"
                  ? `إذا كان هناك حساب مسجل بهذا البريد (${email}) وغير مفعل، فقد تم إرسال رابط التفعيل الآن. يرجى التحقق من صندوق الوارد أو البريد غير الهام (Spam).`
                  : `If an unactivated account exists for (${email}), an activation link has been sent. Please check your inbox or spam folder.`}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#419257] py-3 text-xs font-bold text-white transition-all hover:bg-[#347845]"
            >
              {locale === "ar" ? "العودة لتسجيل الدخول" : "Back to Sign In"}
            </Link>
          </div>
        </div>
      ) : (
        <>
          {serverError && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              id="request-email"
              label={`${locale === "ar" ? "البريد الإلكتروني المسجل" : "Registered Email"} *`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              error={emailError}
              disabled={isPending}
              startIcon={<Mail className="h-4 w-4" />}
            />

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:bg-[#b60d14] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>
                    {locale === "ar" ? "جاري الإرسال..." : "Sending..."}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {locale === "ar"
                      ? "إرسال رابط التفعيل"
                      : "Send Activation Link"}
                  </span>
                  <ArrowIcon className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </>
      )}

      <div className="text-center">
        <Link
          href="/login"
          className="text-xs font-semibold text-[#6a6a86] transition-colors hover:text-[#1d1d39]"
        >
          {locale === "ar" ? "الرجوع لتسجيل الدخول" : "Back to sign in"}
        </Link>
      </div>
    </div>
  );
}
