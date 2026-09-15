"use client";

import React, { useRef, useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRegistration } from "./RegistrationProvider";
import { RegistrationSuccess } from "./RegistrationSuccess";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";
import {
  X,
  Check,
  UploadCloud,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Trash2,
  ChevronDown,
  AlertTriangle,
  Loader2,
  FileCheck,
} from "lucide-react";

import {
  EXPERTISE_OPTIONS,
  EXPERIENCE_BANDS,
  INDUSTRY_OPTIONS,
  COUNTRIES,
} from "@/data/registrationFormData";

function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  hasError?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} id={id} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none",
          hasError
            ? "border-[#e11119] ring-2 ring-red-500/20"
            : isOpen
              ? "border-[#419257] ring-4 ring-[#419257]/15"
              : "border-[#e2e2ec] hover:border-[#6a6a86]"
        )}
      >
        <span className={cn(!value && "text-[#6a6a86]/70")}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[#6a6a86] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute start-0 end-0 top-full z-50 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-[#e2e2ec] bg-white p-1.5 shadow-xl duration-150">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="w-full rounded-lg px-3 py-2 text-start text-xs font-semibold text-[#6a6a86] hover:bg-[#f6f6fa]"
          >
            {placeholder}
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-start text-sm transition-colors",
                value === opt
                  ? "bg-[#419257]/10 font-bold text-[#419257]"
                  : "text-[#16162c] hover:bg-[#f6f6fa]"
              )}
            >
              <span>{opt}</span>
              {value === opt && <Check className="h-4 w-4 text-[#419257]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function RegistrationModal() {
  const { locale } = useLocale();
  const {
    isOpen,
    step,
    formData,
    emailError,
    phoneError,
    fieldErrors,
    duplicateClashLead,
    isSubmitting,
    closeRegistration,
    safeCloseRegistration,
    setStep,
    updateFormData,
    toggleExpertise,
    toggleIndustry,
    validateStep1,
    validateStep2,
    checkDuplicate,
    submitRegistration,
    restoreStep1FromDuplicate,
  } = useRegistration();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [step1Attempted, setStep1Attempted] = useState(false);
  const [step2Attempted, setStep2Attempted] = useState(false);
  const [showTopErrorBanner, setShowTopErrorBanner] = useState(false);

  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

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

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep2Attempted(true);
    setShowTopErrorBanner(false);

    if (validateStep2(locale as "en" | "ar")) {
      setStep(3);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ cvFileName: file.name });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      updateFormData({ cvFileName: e.dataTransfer.files[0].name });
    }
  };

  const ArrowIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="ov animate-in fade-in fixed inset-0 z-[1000] flex min-h-screen items-center justify-center overflow-y-auto bg-[#0a0a18]/65 p-3 backdrop-blur-[9px] duration-200 sm:p-8">
      <div className="sheet sheet--reg animate-in fade-in zoom-in-95 relative my-auto w-full max-w-[840px] overflow-hidden rounded-2xl bg-white shadow-[0_28px_70px_rgba(20,20,40,0.16)] duration-300 sm:rounded-[34px]">
        {/* Close Button (.sheet__x) */}
        <button
          onClick={safeCloseRegistration}
          aria-label="Close registration modal"
          className="sheet__x absolute end-3 top-3 z-30 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/90 text-[#16162c] shadow-sm transition-all hover:rotate-90 sm:end-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Modal Header (.rm__head) */}
        <div className="rm__head relative overflow-hidden bg-[#1d1d39] p-5 pe-12 text-start sm:p-10 sm:pe-16">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(225,17,25,0.35),transparent_70%)]" />

          <h2 className="mb-1 text-lg font-bold tracking-tight text-white sm:text-2xl">
            {locale === "ar"
              ? "التسجيل في منصة المستقلين"
              : "Register with the Freelancer Hub"}
          </h2>
          <p className="text-xs leading-relaxed text-white/65 sm:text-sm">
            {locale === "ar"
              ? "التسجيل المرحلة الأولى · استخدام مجاني لمرة واحدة لـ ٣ تقييمات تشخيصية"
              : "Phase 1 registration · 1 free use for 3 diagnostic assessments"}
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#419257]/50 bg-[#419257]/20 px-3 py-1 text-[11px] font-bold text-[#8fe0a7] sm:mt-4 sm:px-3.5 sm:py-1.5 sm:text-xs">
            <span className="shrink-0">✦</span>
            <span>
              {locale === "ar"
                ? "يتضمن استخداماً مجانياً لمرة واحدة لـ ٣ تقييمات تشخيصية (PQP™، CPAT™، Management Drives®)"
                : "includes 1 free use for 3 diagnostic assessments (PQP™, CPAT™, Management Drives®)"}
            </span>
          </div>
        </div>

        {/* Progress Stepper Bar (.rm__prog) */}
        {typeof step === "number" && step <= 3 && (
          <div className="rm__prog flex items-center justify-between overflow-x-auto border-b border-[#e2e2ec] bg-[#f6f6fa] px-3 py-3 sm:justify-start sm:gap-8 sm:px-12 sm:py-4">
            {/* Step 1 */}
            <div className="rm__pstep flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <div
                className={cn(
                  "rm__pnum grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold transition-all sm:h-7 sm:w-7",
                  step === 1
                    ? "bg-[#e11119] text-white shadow-[0_4px_12px_rgba(225,17,25,0.34)]"
                    : step > 1
                      ? "bg-[#419257] text-white"
                      : "bg-[#ececf3] text-[#6a6a86]"
                )}
              >
                {step > 1 ? (
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  "1"
                )}
              </div>
              <span
                className={cn(
                  "rm__plab text-[11px] font-bold whitespace-nowrap transition-all sm:text-sm",
                  step >= 1 ? "text-[#1d1d39]" : "text-[#6a6a86]"
                )}
              >
                {locale === "ar" ? "بياناتك الشخصية" : "Your details"}
              </span>
            </div>

            <div className="hidden h-px w-4 bg-[#d0d0e0] sm:block" />

            {/* Step 2 */}
            <div className="rm__pstep flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <div
                className={cn(
                  "rm__pnum grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold transition-all sm:h-7 sm:w-7",
                  step === 2
                    ? "bg-[#e11119] text-white shadow-[0_4px_12px_rgba(225,17,25,0.34)]"
                    : step > 2
                      ? "bg-[#419257] text-white"
                      : "bg-[#ececf3] text-[#6a6a86]"
                )}
              >
                {step > 2 ? (
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  "2"
                )}
              </div>
              <span
                className={cn(
                  "rm__plab text-[11px] font-bold whitespace-nowrap transition-all sm:text-sm",
                  step >= 2 ? "text-[#1d1d39]" : "text-[#6a6a86]"
                )}
              >
                {locale === "ar" ? "ممارستك المهنية" : "Your practice"}
              </span>
            </div>

            <div className="hidden h-px w-4 bg-[#d0d0e0] sm:block" />

            {/* Step 3 */}
            <div className="rm__pstep flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <div
                className={cn(
                  "rm__pnum grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold transition-all sm:h-7 sm:w-7",
                  step === 3
                    ? "bg-[#e11119] text-white shadow-[0_4px_12px_rgba(225,17,25,0.34)]"
                    : "bg-[#ececf3] text-[#6a6a86]"
                )}
              >
                3
              </div>
              <span
                className={cn(
                  "rm__plab text-[11px] font-bold whitespace-nowrap transition-all sm:text-sm",
                  step === 3 ? "text-[#1d1d39]" : "text-[#6a6a86]"
                )}
              >
                {locale === "ar" ? "التأكيد" : "Confirm"}
              </span>
            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 text-start sm:p-10">
          {/* Top Error Banner when validation fails */}
          {showTopErrorBanner && typeof step === "number" && step <= 3 && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-[#e11119]">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>
                {locale === "ar"
                  ? "يرجى استكمال الحقول المحددة باللون الأحمر للمتابعة."
                  : "Please complete the highlighted fields."}
              </span>
            </div>
          )}

          {/* STEP 1: Your Details (SCR-14) */}
          {step === 1 && (
            <form onSubmit={handleNextStep1} noValidate>
              <h3 className="mb-6 text-lg font-bold text-[#16162c]">
                {locale === "ar" ? "بياناتك الشخصية" : "Your details"}
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
                    {locale === "ar" ? "الاسم الكامل *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.fullName}
                    onChange={(e) =>
                      updateFormData({ fullName: e.target.value })
                    }
                    placeholder={
                      locale === "ar" ? "اسمك الكامل" : "Your full name"
                    }
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
                      {locale === "ar"
                        ? "هذا الحقل مطلوب"
                        : "Full name is required"}
                    </p>
                  ) : null}
                </div>

                {/* Email Address */}
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
                    {locale === "ar"
                      ? "البريد الإلكتروني *"
                      : "Email Address *"}
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
                      {locale === "ar"
                        ? "بريد إلكتروني صحيح مطلوب"
                        : "Valid email address is required"}
                    </p>
                  ) : null}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
                    {locale === "ar" ? "رقم الجوال *" : "Mobile Number *"}
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
                          formData.phone.replace(/[\s\-\(\)\+]/g, "").length <
                            7)) ||
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
                      formData.phone.replace(/[\s\-\(\)\+]/g, "").length <
                        7) ? (
                    <p className="mt-1.5 text-xs font-medium text-[#e11119]">
                      {locale === "ar"
                        ? "رقم جوال صحيح مطلوب"
                        : "Valid phone number is required"}
                    </p>
                  ) : null}
                </div>

                {/* Country Selection */}
                <div>
                  <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
                    {locale === "ar" ? "الدولة *" : "Country *"}
                  </label>
                  <CustomSelect
                    id="reg-country-select"
                    value={formData.country}
                    onChange={(val) => updateFormData({ country: val })}
                    options={COUNTRIES}
                    placeholder={
                      locale === "ar" ? "اختر الدولة" : "Select Country"
                    }
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
                      {locale === "ar" ? "اختر الدولة" : "Country is required"}
                    </p>
                  ) : null}
                </div>

                {/* LinkedIn URL (Span Full Width) */}
                <div className="sm:col-span-2">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs font-bold tracking-wider text-[#16162c] uppercase">
                      {locale === "ar" ? "رابط لينكد إن" : "LinkedIn URL"}
                    </label>
                    <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
                      {locale === "ar" ? "اختياري" : "optional"}
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={200}
                    value={formData.linkedInUrl}
                    onChange={(e) =>
                      updateFormData({ linkedInUrl: e.target.value })
                    }
                    placeholder="linkedin.com/in/yourprofile"
                    className="w-full rounded-xl border border-[#e2e2ec] bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50 focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
                  />
                </div>
              </div>

              {/* Step 1 Footer Actions */}
              <div className="rm__foot -mx-6 mt-8 -mb-6 flex items-center justify-between border-t border-[#e2e2ec] bg-[#f6f6fa] p-6 sm:-mx-10 sm:-mb-10 sm:px-10">
                <span className="text-[11px] text-[#6a6a86]">
                  {locale === "ar"
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
                      <span>
                        {locale === "ar" ? "جاري التحقق..." : "Checking…"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{locale === "ar" ? "المتابعة" : "Continue"}</span>
                      <ArrowIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP DUPLICATE: SCR-18 Duplicate Registration */}
          {step === "duplicate" && (
            <div className="py-4 text-start">
              <div className="mb-6 flex h-14 w-14 place-items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-50 text-amber-600 shadow-sm">
                <AlertTriangle className="h-7 w-7" />
              </div>

              <h3 className="mb-2 text-xl font-bold tracking-tight text-[#16162c] sm:text-2xl">
                {locale === "ar"
                  ? "أنت مسجل بالفعل في المنصة"
                  : "You are already registered"}
              </h3>

              <p className="mb-3 text-sm font-bold text-amber-700">
                {duplicateClashLead ||
                  (locale === "ar"
                    ? "يوجد حساب مسجل بالفعل ببيانات التواصل هذه."
                    : "An account with this email address or mobile number already exists.")}
              </p>

              <p className="mb-8 max-w-2xl text-xs leading-relaxed text-[#6a6a86] sm:text-sm">
                {locale === "ar"
                  ? "لا داعي للتسجيل مرة أخرى. تسجيلك الأصلي هو الأساس لحسابك في منصة المستقلين — يمكنك تفعيله وتسجيل الدخول دون الحاجة لإعادة إدخال بياناتك المهنية."
                  : "There is no need to register again. Your original registration is the foundation of your Hub account — you can activate it and sign in without re-entering your professional details."}
              </p>

              <div className="flex flex-col gap-3.5 sm:flex-row">
                <Link
                  href="/login?activate=1"
                  onClick={closeRegistration}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#e11119] px-7 py-3.5 text-xs font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:bg-[#b60d14] sm:text-sm"
                >
                  <span>
                    {locale === "ar"
                      ? "تفعيل الحساب أو تسجيل الدخول"
                      : "Activate or sign in to the Hub"}
                  </span>
                  <ArrowIcon className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={restoreStep1FromDuplicate}
                  className="cursor-pointer rounded-full border border-[#e2e2ec] bg-white px-6 py-3.5 text-xs font-bold text-[#1d1d39] transition-all hover:bg-[#f6f6fa] sm:text-sm"
                >
                  {locale === "ar"
                    ? "استخدام بيانات مختلفة"
                    : "Use different details"}
                </button>
              </div>

              <div className="mt-8 border-t border-[#e2e2ec] pt-4 text-[11px] text-[#6a6a86]">
                <span>
                  {locale === "ar"
                    ? "هل تحتاج لمساعدة في الوصول لحسابك؟ تواصل مع الفريق عبر "
                    : "Need help accessing your account? Contact support at "}
                </span>
                <a
                  href="mailto:freelancers.hub@ibdl.net"
                  className="font-bold text-[#1d1d39] underline"
                >
                  freelancers.hub@ibdl.net
                </a>
              </div>
            </div>
          )}

          {/* STEP 2: Your Professional Practice (SCR-15) */}
          {step === 2 && (
            <form onSubmit={handleNextStep2} noValidate>
              <h3 className="mb-6 text-lg font-bold text-[#16162c]">
                {locale === "ar"
                  ? "ممارستك المهنية"
                  : "Your professional practice"}
              </h3>

              <div className="space-y-6">
                {/* Areas of Expertise (.picker) */}
                <div className="picker">
                  <div className="mb-1 flex items-center gap-2">
                    <label className="text-xs font-bold tracking-wider text-[#16162c] uppercase">
                      {locale === "ar" ? "مجالات الخبرة" : "Areas of Expertise"}
                    </label>
                    <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
                      {locale === "ar" ? "اختياري" : "optional"}
                    </span>
                  </div>
                  <p className="mb-3 text-xs text-[#6a6a86]">
                    {locale === "ar"
                      ? "اختر كل ما ينطبق"
                      : "Select all that apply"}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {EXPERTISE_OPTIONS.map((item) => {
                      const isSelected = formData.expertise.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleExpertise(item)}
                          className={cn(
                            "pick flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all select-none",
                            isSelected
                              ? "border-[#1d1d39] bg-[#1d1d39] text-white shadow-sm"
                              : "border-[#e2e2ec] bg-white text-[#3e3e5c] hover:border-[#6a6a86]"
                          )}
                        >
                          {isSelected && <span>✓</span>}
                          <span>
                            {locale === "ar" &&
                            (item === "Others" || item === "Other")
                              ? "أخرى"
                              : item}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Years of Experience & CV Upload (2 columns) */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Years of Experience Custom Dropdown */}
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
                      {locale === "ar"
                        ? "سنوات الخبرة *"
                        : "Years of Experience *"}
                    </label>
                    <CustomSelect
                      value={formData.yearsExperience}
                      onChange={(val) =>
                        updateFormData({ yearsExperience: val })
                      }
                      options={EXPERIENCE_BANDS}
                      placeholder={
                        locale === "ar"
                          ? "اختر مستوى الخبرة"
                          : "Select experience level"
                      }
                      hasError={step2Attempted && !formData.yearsExperience}
                    />
                    {step2Attempted && !formData.yearsExperience && (
                      <p className="mt-1.5 text-xs font-medium text-[#e11119]">
                        {locale === "ar"
                          ? "اختر سنوات الخبرة"
                          : "Please select your experience level"}
                      </p>
                    )}
                  </div>

                  {/* CV Upload (.cv) */}
                  <div>
                    <label className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase">
                      {locale === "ar" ? "رفع السيرة الذاتية *" : "CV Upload *"}
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {formData.cvFileName ? (
                      <div className="cv has flex items-center justify-between rounded-2xl border border-[#419257]/40 bg-[#419257]/10 p-4 text-xs font-semibold text-[#16162c]">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <FileCheck className="h-5 w-5 shrink-0 text-[#419257]" />
                          <div className="truncate">
                            <span className="block font-bold text-[#16162c]">
                              {formData.cvFileName}
                            </span>
                            <span className="block text-[10px] text-[#419257]">
                              {locale === "ar"
                                ? "جاهز للإرسال"
                                : "Ready to submit"}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateFormData({ cvFileName: "" })}
                          className="p-1 text-[#6a6a86] transition-colors hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          "cv flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-[#f6f6fa] p-6 text-center transition-all",
                          dragActive
                            ? "border-[#419257] bg-[#419257]/10"
                            : step2Attempted && !formData.cvFileName
                              ? "border-[#e11119] bg-red-50/50"
                              : "border-[#e2e2ec] hover:border-[#419257] hover:bg-[#419257]/5"
                        )}
                      >
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#419257] shadow-sm">
                          <UploadCloud className="h-5 w-5" />
                        </div>
                        <p className="text-xs text-[#3e3e5c]">
                          {locale === "ar" ? (
                            <>
                              اسحب ملف السيرة الذاتية هنا أو{" "}
                              <span className="font-bold text-[#419257] underline">
                                تصفح الملفات
                              </span>
                            </>
                          ) : (
                            <>
                              Drag your CV here or{" "}
                              <span className="font-bold text-[#419257] underline">
                                browse files
                              </span>
                            </>
                          )}
                        </p>
                        <span className="text-[10px] text-[#6a6a86]">
                          {locale === "ar"
                            ? "ملف PDF أو Word"
                            : "PDF or Word document"}
                        </span>
                      </div>
                    )}
                    {step2Attempted && !formData.cvFileName && (
                      <p className="mt-1.5 text-xs font-medium text-[#e11119]">
                        {locale === "ar"
                          ? "يرجى إرفاق السيرة الذاتية للمتابعة."
                          : "Please attach your CV to continue."}
                      </p>
                    )}
                  </div>
                </div>

                {/* Industries Served (Optional) */}
                <div className="picker">
                  <div className="mb-1 flex items-center gap-2">
                    <label className="text-xs font-bold tracking-wider text-[#16162c] uppercase">
                      {locale === "ar"
                        ? "القطاعات المخدومة"
                        : "Industries Served"}
                    </label>
                    <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
                      {locale === "ar" ? "اختياري" : "optional"}
                    </span>
                  </div>
                  <p className="mb-3 text-xs text-[#6a6a86]">
                    {locale === "ar"
                      ? "اختر كل ما ينطبق"
                      : "Select all that apply"}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {INDUSTRY_OPTIONS.map((item) => {
                      const isSelected = formData.industries.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleIndustry(item)}
                          className={cn(
                            "pick flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all select-none",
                            isSelected
                              ? "border-[#1d1d39] bg-[#1d1d39] text-white shadow-sm"
                              : "border-[#e2e2ec] bg-white text-[#3e3e5c] hover:border-[#6a6a86]"
                          )}
                        >
                          {isSelected && <span>✓</span>}
                          <span>
                            {locale === "ar" &&
                            (item === "Others" || item === "Other")
                              ? "أخرى"
                              : item}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Professional Biography (Optional) */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs font-bold tracking-wider text-[#16162c] uppercase">
                      {locale === "ar"
                        ? "نبذة عن ممارستك المهنية"
                        : "Professional Biography"}
                    </label>
                    <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
                      {locale === "ar" ? "اختياري" : "optional"}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.biography}
                    onChange={(e) =>
                      updateFormData({ biography: e.target.value })
                    }
                    placeholder={
                      locale === "ar"
                        ? "أخبرنا عن ممارستك التدريبية والعملاء والبرامج التي تقدمها..."
                        : "Tell us about your practice, the clients you serve and the programmes you deliver..."
                    }
                    className="min-h-[100px] w-full rounded-xl border border-[#e2e2ec] bg-white p-4 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50 focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
                  />
                </div>

                {/* Send Us a Message (Optional) */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs font-bold tracking-wider text-[#16162c] uppercase">
                      {locale === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
                    </label>
                    <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
                      {locale === "ar" ? "اختياري" : "optional"}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      updateFormData({ message: e.target.value })
                    }
                    placeholder={
                      locale === "ar"
                        ? "أي استفسار أو تفاصيل أخرى ترغب في مشاركتها..."
                        : "Anything else you would like to share — questions, areas of interest, or specific needs."
                    }
                    className="min-h-[90px] w-full rounded-xl border border-[#e2e2ec] bg-white p-4 text-sm text-[#16162c] transition-all outline-none placeholder:text-[#6a6a86]/50 focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
                  />
                </div>
              </div>

              {/* Step 2 Footer Actions */}
              <div className="rm__foot -mx-6 mt-8 -mb-6 flex items-center justify-between border-t border-[#e2e2ec] bg-[#f6f6fa] p-6 sm:-mx-10 sm:-mb-10 sm:px-10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="cursor-pointer px-5 py-2.5 text-xs font-bold text-[#6a6a86] transition-colors hover:text-[#16162c]"
                >
                  {locale === "ar" ? "الرجوع" : "Back"}
                </button>

                <button
                  type="submit"
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-[#e11119] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:scale-[1.01] hover:bg-[#b60d14]"
                >
                  <span>{locale === "ar" ? "المتابعة" : "Continue"}</span>
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Review & Confirm (SCR-16) */}
          {step === 3 && (
            <div>
              <h3 className="mb-4 text-lg font-bold text-[#16162c]">
                {locale === "ar"
                  ? "مراجعة البيانات والتأكيد"
                  : "Review and confirm"}
              </h3>

              {/* Essential Promise Banner (.essnote) */}
              <div className="essnote mb-6 flex items-start gap-3 rounded-xl border border-[#419257]/25 bg-[#419257]/10 p-4 text-xs text-[#3e3e5c] sm:text-sm">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#419257]" />
                <span>
                  {locale === "ar"
                    ? "✓ تنضم الآن بعضوية الأساسية (Essential) — مجاناً بالكامل. تفعل فور الإرسال، لا تتطلب بطاقة ائتمان، وتظل مجانية دائماً. الفئات المتقدمة متاحة داخل المنصة حين تجهز ممارستك لها."
                    : "✓ You are joining on the Essential Membership — free. It activates as soon as you submit, needs no card, and stays free. Professional and Master are there inside the Hub whenever your practice is ready for them."}
                </span>
              </div>

              {/* Summary Table (.rev) */}
              <div className="rev mb-6 divide-y divide-[#e2e2ec] overflow-hidden rounded-xl border border-[#e2e2ec] bg-white">
                <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "نوع العضوية" : "Membership"}
                  </dt>
                  <dd className="font-bold text-[#419257]">
                    {locale === "ar"
                      ? "العضوية الأساسية — مجاناً"
                      : "Essential Membership — Free"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "الاسم الكامل" : "Full Name"}
                  </dt>
                  <dd className="font-semibold break-words text-[#16162c]">
                    {formData.fullName || "—"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </dt>
                  <dd className="font-semibold break-words text-[#16162c]">
                    {formData.email || "—"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "رقم الجوال" : "Mobile Number"}
                  </dt>
                  <dd className="font-semibold break-words text-[#16162c]">
                    {formData.phone || "—"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "الدولة" : "Country"}
                  </dt>
                  <dd className="font-semibold break-words text-[#16162c]">
                    {formData.country || "—"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "رابط لينكد إن" : "LinkedIn URL"}
                  </dt>
                  <dd className="font-semibold break-words text-[#16162c]">
                    {formData.linkedInUrl || "—"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "مجالات الخبرة" : "Areas of Expertise"}
                  </dt>
                  <dd className="font-semibold break-words text-[#16162c]">
                    {formData.expertise.length > 0
                      ? formData.expertise.join(", ")
                      : "—"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "سنوات الخبرة" : "Years of Experience"}
                  </dt>
                  <dd className="font-semibold break-words text-[#16162c]">
                    {formData.yearsExperience || "—"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar"
                      ? "القطاعات المخدومة"
                      : "Industries Served"}
                  </dt>
                  <dd className="font-semibold break-words text-[#16162c]">
                    {formData.industries.length > 0
                      ? formData.industries.join(", ")
                      : "—"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "السيرة الذاتية" : "CV Upload"}
                  </dt>
                  <dd className="font-semibold break-words text-[#16162c]">
                    {formData.cvFileName || "—"}
                  </dd>
                </div>

                <div className="rev__r grid grid-cols-[140px_1fr] items-center bg-[#f6f6fa] p-3.5 text-xs sm:grid-cols-[180px_1fr] sm:text-sm">
                  <dt className="font-medium text-[#6a6a86]">
                    {locale === "ar" ? "الرسالة" : "Send Us a Message"}
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
                      {locale === "ar"
                        ? "تضمين اسمي في دليل المستقلين المستقبلي"
                        : "Include me in the future public Freelancer Directory"}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-[#6a6a86]">
                      {locale === "ar"
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
                      {locale === "ar"
                        ? "أوافق على تقديم بياناتي لأغراض التسجيل والتواصل في المنصة. *"
                        : "I agree to provide my information for Freelancer Hub registration and communication purposes. *"}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-[#6a6a86]">
                      {locale === "ar"
                        ? "معلوماتك آمنة ولن تستخدم إلا من قبل IBDL للتواصل حول المنصة والفرص المتعلقة بها. ولن تتم مشاركتها مع أطراف خارجية."
                        : "Your information is kept secure and will only be used by IBDL for Freelancer Hub communication and related opportunities. It will not be shared with any external parties."}
                    </span>
                    {showTopErrorBanner && !formData.consentDeclaration && (
                      <p className="mt-1.5 text-xs font-medium text-[#e11119]">
                        {locale === "ar"
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
                  {locale === "ar" ? "الرجوع" : "Back"}
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
                      const ok = await submitRegistration(
                        locale as "en" | "ar"
                      );
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
                      <span>
                        {locale === "ar" ? "جاري التسجيل..." : "Registering…"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {locale === "ar"
                          ? "إكمال التسجيل"
                          : "Complete Registration"}
                      </span>
                      <ArrowIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP SUCCESS: SCR-19 Success Screen */}
          {step === "success" && <RegistrationSuccess />}
        </div>
      </div>
    </div>
  );
}
