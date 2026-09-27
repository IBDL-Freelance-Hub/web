"use client";

import React, { useState, useTransition, useEffect } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRegistration } from "../RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { COUNTRIES } from "@/data/registrationFormData";
import { CustomSelect } from "./CustomSelect";
import { cn } from "@/lib/utils";
import { RequiredIndicator } from "@/components/ui/RequiredIndicator";
import {
  getLocalizedErrorMessage,
  type Locale,
} from "@/lib/validations/registrationErrors";
import { scrollToAndFocusFirstError } from "@/lib/dom";

interface RegistrationStep1PersonalProps {
  setShowTopErrorBanner: (show: boolean) => void;
}

export function RegistrationStep1Personal({
  setShowTopErrorBanner,
}: RegistrationStep1PersonalProps) {
  const { locale } = useLocale();
  const currentLocale = (locale as Locale) || "en";
  const isAr = currentLocale === "ar";
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

  // Error state evaluations
  const fullNameError =
    fieldErrors?.fullName?.[0] ||
    (step1Attempted &&
      (!formData.fullName.trim()
        ? getLocalizedErrorMessage("fullName", "required", currentLocale)
        : formData.fullName.trim().length < 3
          ? getLocalizedErrorMessage("fullName", "tooShort", currentLocale)
          : null));

  const emailTrim = formData.email.trim().toLowerCase();
  const emailErrorMessage =
    fieldErrors?.email?.[0] ||
    emailError ||
    (step1Attempted &&
      (!emailTrim
        ? getLocalizedErrorMessage("email", "required", currentLocale)
        : !/\S+@\S+\.\S+/.test(emailTrim)
          ? getLocalizedErrorMessage("email", "invalid", currentLocale)
          : null));

  const phoneTrim = formData.phone.trim();
  const cleanPhone = phoneTrim.replace(/[\s\-\(\)\+]/g, "");
  const mobileErrorMessage =
    fieldErrors?.mobile?.[0] ||
    phoneError ||
    (step1Attempted &&
      (!phoneTrim
        ? getLocalizedErrorMessage("mobile", "required", currentLocale)
        : !phoneTrim.startsWith("+")
          ? getLocalizedErrorMessage(
              "mobile",
              "missingCountryCode",
              currentLocale
            )
          : cleanPhone.length < 7
            ? getLocalizedErrorMessage("mobile", "invalid", currentLocale)
            : null));

  const countryErrorMessage =
    fieldErrors?.country?.[0] ||
    (step1Attempted && !formData.country.trim()
      ? getLocalizedErrorMessage("country", "required", currentLocale)
      : null);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1Attempted(true);
    setShowTopErrorBanner(false);

    if (validateStep1(currentLocale)) {
      startTransition(async () => {
        const isClear = await checkDuplicate(currentLocale);
        if (isClear) {
          setStep(2);
        }
      });
    } else {
      setShowTopErrorBanner(true);
      const failedFieldIds: string[] = [];
      if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
        failedFieldIds.push("reg-fullname");
      }
      if (!emailTrim || !/\S+@\S+\.\S+/.test(emailTrim)) {
        failedFieldIds.push("reg-email");
      }
      if (!phoneTrim || !phoneTrim.startsWith("+") || cleanPhone.length < 7) {
        failedFieldIds.push("reg-mobile");
      }
      if (!formData.country.trim()) {
        failedFieldIds.push("reg-country-select");
      }

      scrollToAndFocusFirstError(failedFieldIds);
    }
  };

  // Auto-scroll when fieldErrors are set externally (e.g. from server or duplicate check)
  useEffect(() => {
    if (fieldErrors && Object.keys(fieldErrors).length > 0) {
      const order = [
        { key: "fullName", id: "reg-fullname" },
        { key: "email", id: "reg-email" },
        { key: "mobile", id: "reg-mobile" },
        { key: "country", id: "reg-country-select" },
      ];
      const firstFailing = order.find((item) => fieldErrors[item.key]);
      if (firstFailing) {
        scrollToAndFocusFirstError([firstFailing.id]);
      }
    }
  }, [fieldErrors]);

  useEffect(() => {
    if (phoneError) {
      scrollToAndFocusFirstError(["reg-mobile"]);
    } else if (emailError) {
      scrollToAndFocusFirstError(["reg-email"]);
    }
  }, [phoneError, emailError]);

  return (
    <form onSubmit={handleNextStep1} noValidate className="animate-step-enter">
      <h3 className="mb-6 text-lg font-bold text-[#16162c]">
        {isAr ? "بياناتك الشخصية" : "Your details"}
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label
            htmlFor="reg-fullname"
            className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
          >
            {isAr ? "الاسم الكامل" : "Full Name"}
            <RequiredIndicator />
          </label>
          <input
            id="reg-fullname"
            name="fullName"
            type="text"
            maxLength={100}
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            placeholder={isAr ? "اسمك الكامل" : "Your full name"}
            aria-invalid={Boolean(fullNameError)}
            aria-describedby={fullNameError ? "reg-fullname-error" : undefined}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50",
              fullNameError
                ? "border-[#e11119] ring-2 ring-red-500/20"
                : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
            )}
          />
          {fullNameError && (
            <p
              id="reg-fullname-error"
              className="mt-1.5 text-xs font-medium text-[#e11119]"
            >
              {fullNameError}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="reg-email"
            className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
          >
            {isAr ? "البريد الإلكتروني" : "Email Address"}
            <RequiredIndicator />
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            maxLength={254}
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="you@example.com"
            aria-invalid={Boolean(emailErrorMessage)}
            aria-describedby={emailErrorMessage ? "reg-email-error" : undefined}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50",
              emailErrorMessage
                ? "border-[#e11119] ring-2 ring-red-500/20"
                : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
            )}
          />
          {emailErrorMessage && (
            <p
              id="reg-email-error"
              className="mt-1.5 text-xs font-medium text-[#e11119]"
            >
              {emailErrorMessage}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label
            htmlFor="reg-mobile"
            className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
          >
            {isAr ? "رقم الجوال" : "Mobile Number"}
            <RequiredIndicator />
          </label>
          <input
            id="reg-mobile"
            name="mobile"
            type="tel"
            maxLength={25}
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="+20 100 000 0000"
            aria-invalid={Boolean(mobileErrorMessage)}
            aria-describedby={
              mobileErrorMessage ? "reg-mobile-error" : undefined
            }
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50",
              mobileErrorMessage
                ? "border-[#e11119] ring-2 ring-red-500/20"
                : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
            )}
          />
          {mobileErrorMessage && (
            <p
              id="reg-mobile-error"
              className="mt-1.5 text-xs font-medium text-[#e11119]"
            >
              {mobileErrorMessage}
            </p>
          )}
        </div>

        {/* Country Selection */}
        <div>
          <label
            htmlFor="reg-country-select"
            className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
          >
            {isAr ? "الدولة" : "Country"}
            <RequiredIndicator />
          </label>
          <CustomSelect
            id="reg-country-select"
            value={formData.country}
            onChange={(val) => updateFormData({ country: val })}
            options={COUNTRIES.map((c) => ({
              value: c.code,
              label: isAr ? c.nameAr : c.nameEn,
            }))}
            placeholder={isAr ? "اختر الدولة" : "Select Country"}
            hasError={Boolean(countryErrorMessage)}
            ariaDescribedBy={
              countryErrorMessage ? "reg-country-error" : undefined
            }
          />
          {countryErrorMessage && (
            <p
              id="reg-country-error"
              className="mt-1.5 text-xs font-medium text-[#e11119]"
            >
              {countryErrorMessage}
            </p>
          )}
        </div>

        {/* LinkedIn URL (Span Full Width) */}
        <div className="sm:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="reg-linkedin"
              className="block text-xs font-bold tracking-wider text-[#16162c] uppercase"
            >
              {isAr ? "رابط لينكد إن" : "LinkedIn URL"}
            </label>
            <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
              {isAr ? "اختياري" : "optional"}
            </span>
          </div>
          <input
            id="reg-linkedin"
            name="linkedInUrl"
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
