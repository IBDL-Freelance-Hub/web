"use client";

import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useRegistration } from "./RegistrationProvider";
import { RegistrationSuccess } from "./RegistrationSuccess";
import { useLocale } from "@/components/common/DirectionProvider";

import { RegistrationStepIndicator } from "./steps/RegistrationStepIndicator";
import { RegistrationStep1Personal } from "./steps/RegistrationStep1Personal";
import { RegistrationStepDuplicate } from "./steps/RegistrationStepDuplicate";
import { RegistrationStep2Practice } from "./steps/RegistrationStep2Practice";
import { RegistrationStep3Confirm } from "./steps/RegistrationStep3Confirm";

export function RegistrationModal() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const { isOpen, step, safeCloseRegistration } = useRegistration();

  const [showTopErrorBanner, setShowTopErrorBanner] = useState(false);

  if (!isOpen) return null;

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

        {/* Modal Header (.rm__head) - hidden on success screen */}
        {step !== "success" && (
          <div className="rm__head relative overflow-hidden bg-[#1d1d39] p-5 pe-12 text-start sm:p-10 sm:pe-16">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(225,17,25,0.35),transparent_70%)]" />

            <h2 className="mb-1 text-lg font-bold tracking-tight text-white sm:text-2xl">
              {isAr
                ? "التسجيل في منصة المستقلين"
                : "Register with the Freelancer Hub"}
            </h2>
            <p className="text-xs leading-relaxed text-white/65 sm:text-sm">
              {isAr
                ? "التسجيل المرحلة الأولى · استخدام مجاني لمرة واحدة لـ ٣ تقييمات تشخيصية"
                : "Phase 1 registration · 1 free use for 3 diagnostic assessments"}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#419257]/50 bg-[#419257]/20 px-3 py-1 text-[11px] font-bold text-[#8fe0a7] sm:mt-4 sm:px-3.5 sm:py-1.5 sm:text-xs">
              <span className="shrink-0">✦</span>
              <span>
                {isAr
                  ? "يتضمن استخداماً مجانياً لمرة واحدة لـ ٣ تقييمات تشخيصية (PQP™، CPAT™، Management Drives®)"
                  : "includes 1 free use for 3 diagnostic assessments (PQP™, CPAT™, Management Drives®)"}
              </span>
            </div>
          </div>
        )}

        {/* Progress Stepper Bar (.rm__prog) */}
        <RegistrationStepIndicator step={step} isAr={isAr} />

        {/* Modal Body Container */}
        <div className="p-6 text-start sm:p-10">
          {/* Top Error Banner when validation fails */}
          {showTopErrorBanner && typeof step === "number" && step <= 3 && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-[#e11119]">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>
                {isAr
                  ? "يرجى استكمال الحقول المحددة باللون الأحمر للمتابعة."
                  : "Please complete the highlighted fields."}
              </span>
            </div>
          )}

          {/* STEP 1: Your Details (SCR-14) */}
          {step === 1 && (
            <RegistrationStep1Personal
              setShowTopErrorBanner={setShowTopErrorBanner}
            />
          )}

          {/* STEP DUPLICATE: SCR-18 Duplicate Registration */}
          {step === "duplicate" && <RegistrationStepDuplicate />}

          {/* STEP 2: Your Professional Practice (SCR-15) */}
          {step === 2 && (
            <RegistrationStep2Practice
              setShowTopErrorBanner={setShowTopErrorBanner}
            />
          )}

          {/* STEP 3: Review & Confirm (SCR-16) */}
          {step === 3 && (
            <RegistrationStep3Confirm
              showTopErrorBanner={showTopErrorBanner}
              setShowTopErrorBanner={setShowTopErrorBanner}
            />
          )}

          {/* STEP SUCCESS: SCR-19 Success Screen */}
          {step === "success" && <RegistrationSuccess />}
        </div>
      </div>
    </div>
  );
}
