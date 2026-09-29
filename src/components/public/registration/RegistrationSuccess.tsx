import React, { useMemo } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  KeyRound,
  CheckCircle2,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  SuccessHeader,
  SuccessMembershipSummary,
  SuccessCredentialsCard,
  SuccessPortalLinks,
  SuccessSafetyModal,
} from "./success";

export function RegistrationSuccess() {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  const { formData, closeRegistration } = useRegistration();

  const firstName = useMemo(() => {
    return formData.fullName.trim().split(" ")[0] || "Freelancer";
  }, [formData.fullName]);

  const { currentDateFormatted, nextYearDateFormatted } = useMemo(() => {
    const now = new Date();
    const currentDate = now.toLocaleDateString(isAr ? "ar-EG" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const nextYear = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const nextYearDate = nextYear.toLocaleDateString(isAr ? "ar-EG" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return {
      currentDateFormatted: currentDate,
      nextYearDateFormatted: nextYearDate,
    };
  }, [isAr]);

  return (
    <div className="animate-in fade-in py-2 text-start duration-300">
      {/* 1. Header & Success Ring */}
      <SuccessHeader firstName={firstName} isAr={isAr} email={formData.email} />

      {/* 2. Activated Membership Block */}
      <SuccessMembershipSummary
        currentDateFormatted={currentDateFormatted}
        nextYearDateFormatted={nextYearDateFormatted}
        isAr={isAr}
        email={formData.email}
      />

      {/* 3. Mandated 5-Step Activation Lifecycle Flow (QA Issue #4) */}
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50/70 p-5 shadow-xs">
        <div className="mb-3.5 flex items-center gap-2 text-sky-900">
          <Lock className="h-4 w-4 shrink-0 text-sky-700" />
          <h4 className="text-sm font-bold">
            {isAr
              ? "خطوات تفعيل الحساب والوصول للتقييم المهني (PQP™)"
              : "Required Steps to Activate & Unlock Assessment Access"}
          </h4>
        </div>

        <p className="mb-4 text-xs leading-relaxed font-medium text-sky-800">
          {isAr
            ? "لحماية حسابك وضمان أمان بيانات التقييم، يتم حجب بيانات الدخول حتى إتمام تفعيل الحساب عبر الخطوات التالية:"
            : "For account security, assessment credentials are locked until your account is activated through the following required steps:"}
        </p>

        {/* 5-Step Visual Flowchart */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {/* Step 1 */}
          <div className="flex flex-col rounded-xl border border-sky-100 bg-white p-3 text-start shadow-2xs">
            <div className="flex items-center justify-between gap-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white">
                1
              </span>
              <Mail className="h-3.5 w-3.5 text-sky-600" />
            </div>
            <span className="mt-2 text-xs font-bold text-slate-900">
              {isAr ? "افحص بريدك" : "Check Email"}
            </span>
            <span className="mt-0.5 text-[10px] leading-tight text-slate-500">
              {isAr ? "رابط صالح ١٠ دقائق" : "Link valid for 10 min"}
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col rounded-xl border border-sky-100 bg-white p-3 text-start shadow-2xs">
            <div className="flex items-center justify-between gap-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white">
                2
              </span>
              <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />
            </div>
            <span className="mt-2 text-xs font-bold text-slate-900">
              {isAr ? "فعّل الحساب" : "Activate Account"}
            </span>
            <span className="mt-0.5 text-[10px] leading-tight text-slate-500">
              {isAr ? "اضغط على الرابط" : "Click activation link"}
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col rounded-xl border border-sky-100 bg-white p-3 text-start shadow-2xs">
            <div className="flex items-center justify-between gap-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white">
                3
              </span>
              <KeyRound className="h-3.5 w-3.5 text-sky-600" />
            </div>
            <span className="mt-2 text-xs font-bold text-slate-900">
              {isAr ? "عيّن كلمة المرور" : "Set Password"}
            </span>
            <span className="mt-0.5 text-[10px] leading-tight text-slate-500">
              {isAr ? "أنشئ كلمة مرور" : "Create password"}
            </span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col rounded-xl border border-sky-100 bg-white p-3 text-start shadow-2xs">
            <div className="flex items-center justify-between gap-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white">
                4
              </span>
              <LogIn className="h-3.5 w-3.5 text-sky-600" />
            </div>
            <span className="mt-2 text-xs font-bold text-slate-900">
              {isAr ? "سجل الدخول" : "Sign In"}
            </span>
            <span className="mt-0.5 text-[10px] leading-tight text-slate-500">
              {isAr ? "ادخل لحسابك" : "Log in to Hub"}
            </span>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-start shadow-2xs">
            <div className="flex items-center justify-between gap-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                5
              </span>
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <span className="mt-2 text-xs font-bold text-emerald-950">
              {isAr ? "بيانات التقييم" : "Access Credentials"}
            </span>
            <span className="mt-0.5 text-[10px] leading-tight text-emerald-800">
              {isAr ? "متاحة في ملفك" : "Unlocked in Profile"}
            </span>
          </div>
        </div>

        <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-sky-100/70 p-2.5 text-[11px] font-medium text-sky-900">
          <Lock className="h-3.5 w-3.5 shrink-0 text-sky-700" />
          <span>
            {isAr
              ? "تنبيه أمني: لن تظهر بيانات الدخول أو روابط التقييم على هذه الشاشة حفاظاً على أمان حسابك حتى إتمام التفعيل."
              : "Security Notice: Assessment credentials will only be unlocked inside your Profile after your account reaches the Active state."}
          </span>
        </div>
      </div>

      {/* 4. Modal Action Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={closeRegistration}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-4 text-center text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-[#b60d14]"
        >
          <Mail className="h-4 w-4 shrink-0" />
          <span>
            {isAr
              ? "افتح بريدك الإلكتروني لتفعيل الحساب (صالح ١٠ دقائق) ←"
              : "Check Email to Activate Account (Valid 10 min) →"}
          </span>
        </button>

        <div className="flex items-center justify-center gap-1.5 py-0.5 text-xs text-[#6a6a86]">
          <span>
            {isAr
              ? "لم يصلك البريد أو انتهت صلاحيته؟"
              : "Didn't receive email or link expired?"}
          </span>
          <Link
            href="/activate"
            onClick={closeRegistration}
            className="font-bold text-amber-700 hover:underline"
          >
            {isAr ? "إعادة إرسال رابط التفعيل" : "Resend activation link"}
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 py-1 text-xs text-[#6a6a86]">
          <span>{isAr ? "هل قمت بالتفعيل بالفعل؟" : "Already activated?"}</span>
          <Link
            href="/login"
            onClick={closeRegistration}
            className="font-bold text-[#e11119] hover:underline"
          >
            {isAr ? "تسجيل الدخول" : "Sign In"}
          </Link>
        </div>

        <button
          type="button"
          onClick={closeRegistration}
          className="w-full cursor-pointer py-2 text-center text-xs font-bold text-[#6a6a86] transition-colors hover:text-[#16162c]"
        >
          {isAr ? "العودة للموقع" : "Back to the website"}
        </button>
      </div>
    </div>
  );
}

// Compound component attachments preserved for backward compatibility
RegistrationSuccess.Header = SuccessHeader;
RegistrationSuccess.MembershipSummary = SuccessMembershipSummary;
RegistrationSuccess.CredentialsCard = SuccessCredentialsCard;
RegistrationSuccess.PortalLinks = SuccessPortalLinks;
RegistrationSuccess.SafetyModal = SuccessSafetyModal;
