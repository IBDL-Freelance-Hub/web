"use client";

import React, { useTransition } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { useRegistration } from "../RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";
import { RequiredIndicator } from "@/components/ui/RequiredIndicator";

interface RegistrationStep3ConfirmProps {
  showTopErrorBanner: boolean;
  setShowTopErrorBanner: (show: boolean) => void;
}

export function RegistrationStep3Confirm({
  showTopErrorBanner,
  setShowTopErrorBanner,
}: RegistrationStep3ConfirmProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const {
    formData,
    isSubmitting,
    setStep,
    updateFormData,
    submitRegistration,
  } = useRegistration();

  const [isPending, startTransition] = useTransition();

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="animate-step-enter">
      <h3 className="mb-4 text-lg font-bold text-[#16162c]">
        {isAr ? "مراجعة البيانات والتأكيد" : "Review and confirm"}
      </h3>

      {/* Essential Promise Banner (.essnote) */}
      <div className="essnote mb-6 flex items-start gap-3 rounded-xl border border-[#419257]/25 bg-[#419257]/10 p-4 text-xs text-[#3e3e5c] sm:text-sm">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#419257]" />
        <span>
          {isAr
            ? "✓ تنضم الآن بعضوية الأساسية (Essential) — مجاناً بالكامل. تفعل فور الإرسال، لا تتطلب بطاقة ائتمان، وتظل مجانية دائماً. الفئات المتقدمة متاحة داخل المنصة حين تجهز ممارستك لها."
            : "✓ You are joining on the Essential Membership — free. It activates as soon as you submit, needs no card, and stays free. Professional and Master are there inside the Hub whenever your practice is ready for them."}
        </span>
      </div>

      {/* Summary Table (.rev) */}
      <div className="rev mb-6 divide-y divide-[#e2e2ec] overflow-hidden rounded-xl border border-[#e2e2ec] bg-white">
        <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "نوع العضوية" : "Membership"}
          </dt>
          <dd className="font-bold text-[#419257]">
            {isAr ? "العضوية الأساسية — مجاناً" : "Essential Membership — Free"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "الاسم الكامل" : "Full Name"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.fullName || "—"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "البريد الإلكتروني" : "Email Address"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.email || "—"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "رقم الجوال" : "Mobile Number"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.phone || "—"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "الدولة" : "Country"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.country || "—"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "رابط لينكد إن" : "LinkedIn URL"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.linkedInUrl || "—"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "مجالات الخبرة" : "Areas of Expertise"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.expertise.length > 0
              ? formData.expertise.join(", ")
              : "—"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "سنوات الخبرة" : "Years of Experience"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.yearsExperience || "—"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "القطاعات المخدومة" : "Industries Served"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.industries.length > 0
              ? formData.industries.join(", ")
              : "—"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "السيرة الذاتية" : "CV Upload"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.cvFileName || "—"}
          </dd>
        </div>

        <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
          <dt className="font-medium text-[#6a6a86]">
            {isAr ? "الرسالة" : "Send Us a Message"}
          </dt>
          <dd className="font-semibold break-words text-[#16162c]">
            {formData.message || "—"}
          </dd>
        </div>
      </div>

      {/* Agreement Checkboxes (.chk) */}
      <div className="mb-6 space-y-3.5">
        {/* 1. Directory Opt-in (Optional) */}
        <label className="chk flex cursor-pointer items-start gap-3.5 rounded-xl border border-[#e2e2ec] bg-[#f6f6fa] p-4 transition-all hover:border-[#6a6a86]">
          <input
            type="checkbox"
            checked={formData.directoryOptIn}
            onChange={(e) =>
              updateFormData({ directoryOptIn: e.target.checked })
            }
            className="mt-0.5 h-4 w-4 rounded border-[#e2e2ec] text-[#e11119] focus:ring-[#e11119]"
          />
          <div>
            <span className="block text-xs font-bold text-[#16162c] sm:text-sm">
              {isAr
                ? "تضمين اسمي في دليل المستقلين المستقبلي"
                : "Include me in the future public Freelancer Directory"}
            </span>
            <span className="mt-0.5 block text-[11px] text-[#6a6a86]">
              {isAr
                ? "اختياري. الدليل مخطط له في مرحلة لاحقة — هذا لإبداء اهتمامك فقط."
                : "Optional. The directory is planned for a later phase — this simply records your interest."}
            </span>
          </div>
        </label>

        {/* 2. Data & Terms Consent (Required) */}
        <label
          className={cn(
            "chk flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 transition-all",
            formData.consentDeclaration
              ? "border-[#419257] bg-[#419257]/5"
              : showTopErrorBanner && !formData.consentDeclaration
                ? "border-[#e11119] bg-red-50/50 ring-2 ring-red-500/20"
                : "border-[#e2e2ec] bg-[#f6f6fa] hover:border-[#6a6a86]"
          )}
        >
          <input
            type="checkbox"
            checked={formData.consentDeclaration}
            onChange={(e) =>
              updateFormData({ consentDeclaration: e.target.checked })
            }
            className="mt-0.5 h-4 w-4 rounded border-[#e2e2ec] text-[#e11119] focus:ring-[#e11119]"
          />
          <div>
            <span className="block text-xs font-bold text-[#16162c] sm:text-sm">
              {isAr
                ? "أوافق على تقديم بياناتي لأغراض التسجيل والتواصل في المنصة."
                : "I agree to provide my information for Freelancer Hub registration and communication purposes."}
              <RequiredIndicator />
            </span>
            <span className="mt-0.5 block text-[11px] text-[#6a6a86]">
              {isAr
                ? "معلوماتك آمنة ولن تستخدم إلا من قبل IBDL للتواصل حول المنصة والفرص المتعلقة بها. ولن تتم مشاركتها مع أطراف خارجية."
                : "Your information is kept secure and will only be used by IBDL for Freelancer Hub communication and related opportunities. It will not be shared with any external parties."}
            </span>
            {showTopErrorBanner && !formData.consentDeclaration && (
              <p className="mt-1.5 text-xs font-medium text-[#e11119]">
                {isAr
                  ? "يجب الموافقة على الشروط والأحكام للمتابعة."
                  : "You must accept the terms and conditions."}
              </p>
            )}
          </div>
        </label>
      </div>

      {/* Step 3 Footer Actions */}
      <div className="rm__foot -mx-6 mt-8 -mb-6 flex items-center justify-between border-t border-[#e2e2ec] bg-[#f6f6fa] p-6 sm:-mx-10 sm:-mb-10 sm:px-10">
        <button
          type="button"
          onClick={() => setStep(2)}
          disabled={isSubmitting || isPending}
          className="cursor-pointer px-5 py-2.5 text-xs font-bold text-[#6a6a86] transition-colors hover:text-[#16162c] disabled:opacity-50"
        >
          {isAr ? "الرجوع" : "Back"}
        </button>

        <button
          type="button"
          disabled={isSubmitting || isPending}
          onClick={(e) => {
            e.preventDefault();
            if (!formData.consentDeclaration) {
              setShowTopErrorBanner(true);
              return;
            }
            setShowTopErrorBanner(false);
            startTransition(async () => {
              const ok = await submitRegistration(locale as "en" | "ar");
              if (!ok) {
                setShowTopErrorBanner(true);
              }
            });
          }}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-[#e11119] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:scale-[1.01] hover:bg-[#b60d14] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting || isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{isAr ? "جاري التسجيل..." : "Registering…"}</span>
            </>
          ) : (
            <>
              <span>{isAr ? "إكمال التسجيل" : "Complete Registration"}</span>
              <ArrowIcon className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
