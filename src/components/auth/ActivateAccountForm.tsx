"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { activateAccountAction } from "@/actions/authActions";
import { AUTH_STRINGS } from "@/lib/constants/authStrings";
import { PasswordInput } from "@/components/ui/PasswordInput";
import {
  Check,
  X,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export interface ActivateAccountFormProps {
  token: string;
  onRequestNewLink: () => void;
}

export function ActivateAccountForm({
  token,
  onRequestNewLink,
}: ActivateAccountFormProps) {
  const { locale } = useLocale();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [isPending, startTransition] = useTransition();

  const policyChecks = [
    {
      id: "length",
      en: AUTH_STRINGS.policy.length.en,
      ar: AUTH_STRINGS.policy.length.ar,
      met: password.length >= 8,
    },
    {
      id: "uppercase",
      en: AUTH_STRINGS.policy.uppercase.en,
      ar: AUTH_STRINGS.policy.uppercase.ar,
      met: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      en: AUTH_STRINGS.policy.lowercase.en,
      ar: AUTH_STRINGS.policy.lowercase.ar,
      met: /[a-z]/.test(password),
    },
    {
      id: "number",
      en: AUTH_STRINGS.policy.number.en,
      ar: AUTH_STRINGS.policy.number.ar,
      met: /[0-9]/.test(password),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setConfirmPasswordError(null);
    setServerError(null);

    let hasError = false;

    if (!password) {
      setPasswordError(AUTH_STRINGS.validation.passwordRequired[locale]);
      hasError = true;
    } else {
      const allPolicyMet = policyChecks.every((c) => c.met);
      if (!allPolicyMet) {
        setPasswordError(
          locale === "ar"
            ? "يرجى استيفاء كافة شروط كلمة المرور الموضحة أدناه."
            : "Please meet all password requirements listed below."
        );
        hasError = true;
      }
    }

    if (!confirmPassword) {
      setConfirmPasswordError(
        locale === "ar"
          ? "يرجى تأكيد كلمة المرور."
          : "Please confirm your password."
      );
      hasError = true;
    } else if (password && confirmPassword !== password) {
      setConfirmPasswordError(
        AUTH_STRINGS.validation.passwordsDoNotMatch[locale]
      );
      hasError = true;
    }

    if (hasError) return;

    startTransition(async () => {
      try {
        const res = await activateAccountAction({
          token,
          password,
          confirmPassword,
        });

        if (res.success) {
          router.push("/login?activated=true");
        } else {
          if (
            res.code === "ACTIVATION_LINK_INVALID" ||
            res.code === "TOKEN_EXPIRED"
          ) {
            setIsTokenInvalid(true);
          }
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
          {locale === "ar" ? "تفعيل حسابك" : "Activate your account"}
        </h1>
        <p className="text-xs leading-relaxed text-[#6a6a86] sm:text-sm">
          {locale === "ar"
            ? "قم بتعيين كلمة المرور لحسابك في منصة المستقلين لإكمال التفعيل والدخول."
            : "Set a secure password to complete your activation and access the Hub."}
        </p>
      </div>

      {isTokenInvalid && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-start shadow-xs">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-amber-950">
                {locale === "ar"
                  ? "رابط التفعيل غير صالح أو منتهي الصلاحية"
                  : "Activation Link Expired or Invalid"}
              </h3>
              <p className="text-xs leading-relaxed text-amber-800">
                {locale === "ar"
                  ? "روابط التفعيل صالحة لمدة ١٠ دقائق لأسباب أمنية. يمكنك طلب رابط جديد وتفعيله فوراً."
                  : "Activation links expire after 10 minutes for security. You can request a fresh link now."}
              </p>
              <button
                type="button"
                onClick={onRequestNewLink}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-amber-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>
                  {locale === "ar"
                    ? "طلب رابط تفعيل جديد"
                    : "Request a new activation link"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {serverError && !isTokenInvalid && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <PasswordInput
          id="activate-password"
          label={locale === "ar" ? "كلمة المرور الجديدة *" : "New Password *"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          error={passwordError}
          disabled={isPending || isTokenInvalid}
          toggleLabelShow={
            locale === "ar" ? "إظهار كلمة المرور" : "Show password"
          }
          toggleLabelHide={
            locale === "ar" ? "إخفاء كلمة المرور" : "Hide password"
          }
        />

        {/* Live Password Policy Checklist */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <span className="mb-2 block text-[11px] font-bold tracking-wider text-slate-700 uppercase">
            {locale === "ar" ? "شروط كلمة المرور" : "Password requirements"}
          </span>
          <ul className="space-y-1.5 text-xs">
            {policyChecks.map((rule) => (
              <li
                key={rule.id}
                className={`flex items-center gap-2 transition-colors ${
                  rule.met ? "font-medium text-emerald-700" : "text-slate-500"
                }`}
              >
                {rule.met ? (
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                ) : (
                  <X className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                )}
                <span>{locale === "ar" ? rule.ar : rule.en}</span>
              </li>
            ))}
          </ul>
        </div>

        <PasswordInput
          id="activate-confirm-password"
          label={locale === "ar" ? "تأكيد كلمة المرور *" : "Confirm Password *"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••••••"
          error={confirmPasswordError}
          disabled={isPending || isTokenInvalid}
          toggleLabelShow={
            locale === "ar" ? "إظهار كلمة المرور" : "Show password"
          }
          toggleLabelHide={
            locale === "ar" ? "إخفاء كلمة المرور" : "Hide password"
          }
        />

        <button
          type="submit"
          disabled={isPending || isTokenInvalid}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:bg-[#b60d14] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>
                {locale === "ar" ? "جاري تفعيل الحساب..." : "Activating..."}
              </span>
            </>
          ) : (
            <>
              <span>
                {locale === "ar" ? "تفعيل الحساب" : "Activate account"}
              </span>
              <ArrowIcon className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
