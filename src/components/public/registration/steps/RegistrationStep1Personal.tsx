"use client";

import React, { useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRegistration } from "../RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { COUNTRIES } from "@/data/registrationFormData";
import { CustomSelect } from "./CustomSelect";
import { cn } from "@/lib/utils";
import { RequiredIndicator } from "@/components/ui/RequiredIndicator";

interface RegistrationStep1PersonalProps {
  setShowTopErrorBanner: (show: boolean) => void;
}

export function RegistrationStep1Personal({
  setShowTopErrorBanner,
}: RegistrationStep1PersonalProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const {
    formData,
    emailError,
    phoneError,
    fieldErrors,
    isSubmitting,
    setStep,
    updateFormData,
    validateStep1,
    checkDuplicate,
  } = useRegistration();

  const [step1Attempted, setStep1Attempted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1Attempted(true);
    setShowTopErrorBanner(false);

    if (validateStep1(locale as "en" | "ar")) {
      startTransition(async () => {
        const isClear = await checkDuplicate(locale as "en" | "ar");
        if (isClear) {
          setStep(2);
        }
      });
    } else {
      setShowTopErrorBanner(true);
      setTimeout(() => {
        const firstErrorEl = document.querySelector(".border-\\[\\#e11119\\]");
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
    }
  };

  return (
    <form onSubmit={handleNextStep1} noValidate className="animate-step-enter">
      <h3 className="mb-6 text-lg font-bold text-[#16162c]">
        {isAr ? "بياناتك الشخصية" : "Your details"}
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
            {isAr ? "الاسم الكامل" : "Full Name"}
            <RequiredIndicator />
          </label>
          <input
            type="text"
            maxLength={100}
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            placeholder={isAr ? "اسمك الكامل" : "Your full name"}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50",
              (step1Attempted && !formData.fullName.trim()) ||
                Boolean(fieldErrors?.fullName)
                ? "border-[#e11119] ring-2 ring-red-500/20"
                : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
            )}
          />
          {fieldErrors?.fullName?.[0] ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {fieldErrors.fullName[0]}
            </p>
          ) : step1Attempted && !formData.fullName.trim() ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {isAr ? "هذا الحقل مطلوب" : "Full name is required"}
            </p>
          ) : null}
        </div>

        {/* Email Address */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
            {isAr ? "البريد الإلكتروني" : "Email Address"}
            <RequiredIndicator />
          </label>
          <input
            type="email"
            maxLength={254}
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="you@example.com"
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50",
              (step1Attempted &&
                (!formData.email.trim() ||
                  !/\S+@\S+\.\S+/.test(formData.email.trim()))) ||
                emailError ||
                fieldErrors?.email
                ? "border-[#e11119] ring-2 ring-red-500/20"
                : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
            )}
          />
          {fieldErrors?.email?.[0] ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {fieldErrors.email[0]}
            </p>
          ) : emailError ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {emailError}
            </p>
          ) : step1Attempted &&
            (!formData.email.trim() ||
              !/\S+@\S+\.\S+/.test(formData.email.trim())) ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {isAr
                ? "بريد إلكتروني صحيح مطلوب"
                : "Valid email address is required"}
            </p>
          ) : null}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
            {isAr ? "رقم الجوال" : "Mobile Number"}
            <RequiredIndicator />
          </label>
          <input
            type="tel"
            maxLength={25}
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="+20 100 000 0000"
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50",
              (step1Attempted &&
                (!formData.phone.trim() ||
                  formData.phone.replace(/[\s\-\(\)\+]/g, "").length < 7)) ||
                phoneError ||
                fieldErrors?.mobile
                ? "border-[#e11119] ring-2 ring-red-500/20"
                : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
            )}
          />
          {fieldErrors?.mobile?.[0] ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {fieldErrors.mobile[0]}
            </p>
          ) : phoneError ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {phoneError}
            </p>
          ) : step1Attempted &&
            (!formData.phone.trim() ||
              formData.phone.replace(/[\s\-\(\)\+]/g, "").length < 7) ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {isAr ? "رقم جوال صحيح مطلوب" : "Valid phone number is required"}
            </p>
          ) : null}
        </div>

        {/* Country Selection */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
            {isAr ? "الدولة" : "Country"}
            <RequiredIndicator />
          </label>
          <CustomSelect
            id="reg-country-select"
            value={formData.country}
            onChange={(val) => updateFormData({ country: val })}
            options={COUNTRIES}
            placeholder={isAr ? "اختر الدولة" : "Select Country"}
            hasError={
              (step1Attempted && !formData.country) ||
              Boolean(fieldErrors?.country)
            }
          />
          {fieldErrors?.country?.[0] ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {fieldErrors.country[0]}
            </p>
          ) : step1Attempted && !formData.country ? (
            <p className="mt-1.5 text-xs font-medium text-[#e11119]">
              {isAr ? "اختر الدولة" : "Country is required"}
            </p>
          ) : null}
        </div>

        {/* LinkedIn URL (Span Full Width) */}
        <div className="sm:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-bold tracking-wider text-[#16162c] uppercase">
              {isAr ? "رابط لينكد إن" : "LinkedIn URL"}
            </label>
            <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
              {isAr ? "اختياري" : "optional"}
            </span>
          </div>
          <input
            type="text"
            maxLength={200}
            value={formData.linkedInUrl}
            onChange={(e) => updateFormData({ linkedInUrl: e.target.value })}
            placeholder="linkedin.com/in/yourprofile"
            className="w-full rounded-xl border border-[#e2e2ec] bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50 focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
          />
        </div>
      </div>

      {/* Step 1 Footer Actions */}
      <div className="rm__foot -mx-6 mt-8 -mb-6 flex items-center justify-between border-t border-[#e2e2ec] bg-[#f6f6fa] p-6 sm:-mx-10 sm:-mb-10 sm:px-10">
        <span className="text-[11px] text-[#6a6a86]">
          {isAr
            ? "عرض توضيحي للمنصة — لا يتم طلب بطاقة أئتمان."
            : "Prototype demonstration — no data is transmitted or stored."}
        </span>

        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-[#e11119] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:scale-[1.01] hover:bg-[#b60d14] disabled:opacity-50"
        >
          {isPending || isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{isAr ? "جاري التحقق..." : "Checking…"}</span>
            </>
          ) : (
            <>
              <span>{isAr ? "المتابعة" : "Continue"}</span>
              <ArrowIcon className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
