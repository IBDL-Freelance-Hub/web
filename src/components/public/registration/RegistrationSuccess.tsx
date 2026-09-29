import React, { useMemo } from "react";
import Link from "next/link";
import { Mail, Lock, KeyRound } from "lucide-react";
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

      {/* 3. Mandated Bilingual Activation & Assessment Instructions (Issue #4) */}
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50/80 p-5 text-start shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
            <Lock className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-sky-950">
              {isAr
                ? "تفعيل الحساب وبيانات التقييم (PQP™)"
                : "Account Activation & Assessment Access"}
            </h4>
            <p className="text-xs leading-relaxed font-medium text-sky-900">
              {isAr
                ? "تم إنشاء حسابك بنجاح. يرجى مراجعة بريدك الإلكتروني لتفعيل الحساب وتعيين كلمة المرور للوصول إلى لوحة التحكم وبيانات التقييم."
                : "Your account has been created. Please check your email to activate your account and set your password to access your assessment credentials."}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-sky-800">
              <KeyRound className="h-3.5 w-3.5 shrink-0" />
              <span>
                {isAr
                  ? "يتم إتاحة بيانات الدخول للتقييم فور تفعيل الحساب داخل ملفك الشخصي."
                  : "Assessment credentials will be unlocked in your member profile upon account activation."}
              </span>
            </div>
          </div>
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
