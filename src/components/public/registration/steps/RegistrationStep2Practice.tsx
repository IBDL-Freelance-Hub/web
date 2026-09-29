"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  Trash2,
  FileCheck,
} from "lucide-react";
import { useRegistration } from "../RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { useToast } from "@/components/ui/Toast";
import {
  EXPERTISE_OPTIONS,
  EXPERIENCE_BANDS,
  INDUSTRY_OPTIONS,
} from "@/data/registrationFormData";
import { CustomSelect } from "./CustomSelect";
import { cn } from "@/lib/utils";
import { RequiredIndicator } from "@/components/ui/RequiredIndicator";
import {
  getLocalizedErrorMessage,
  type Locale,
} from "@/lib/validations/registrationErrors";
import { scrollToAndFocusFirstError } from "@/lib/dom";
import { validateCvFile, IMAGE_EXTENSIONS } from "@/lib/validations/files";

interface RegistrationStep2PracticeProps {
  setShowTopErrorBanner: (show: boolean) => void;
}

export function RegistrationStep2Practice({
  setShowTopErrorBanner,
}: RegistrationStep2PracticeProps) {
  const { locale } = useLocale();
  const { showToast } = useToast();
  const currentLocale = (locale as Locale) || "en";
  const isAr = currentLocale === "ar";
  const {
    formData,
    fieldErrors,
    setStep,
    updateFormData,
    toggleExpertise,
    toggleIndustry,
    validateStep2,
  } = useRegistration();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [step2Attempted, setStep2Attempted] = useState(false);
  const [fileValidationError, setFileValidationError] = useState<string | null>(
    null
  );

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const yearsExperienceError =
    fieldErrors?.yearsOfExperience?.[0] ||
    (step2Attempted && !formData.yearsExperience
      ? getLocalizedErrorMessage("yearsOfExperience", "required", currentLocale)
      : null);

  const cvFileError =
    fileValidationError ||
    fieldErrors?.cvFile?.[0] ||
    (step2Attempted && !formData.cvFileName
      ? getLocalizedErrorMessage("cvFile", "required", currentLocale)
      : null);

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep2Attempted(true);
    setShowTopErrorBanner(false);

    if (!fileValidationError && validateStep2(currentLocale)) {
      setStep(3);
    } else {
      setShowTopErrorBanner(true);
      const failedFieldIds: string[] = [];
      if (!formData.yearsExperience) {
        failedFieldIds.push("reg-years-experience");
      }
      if (!formData.cvFileName || fileValidationError) {
        failedFieldIds.push("reg-cv-upload");
      }
      scrollToAndFocusFirstError(failedFieldIds);
    }
  };

  useEffect(() => {
    if (fieldErrors) {
      if (fieldErrors.yearsOfExperience) {
        scrollToAndFocusFirstError(["reg-years-experience"]);
      } else if (fieldErrors.cvFile) {
        scrollToAndFocusFirstError(["reg-cv-upload"]);
      }
    }
  }, [fieldErrors]);

  const validateAndSetCvFile = (file: File) => {
    setFileValidationError(null);

    const validation = validateCvFile(file);
    if (!validation.valid) {
      const fileExt = file.name.split(".").pop()?.toLowerCase();
      const isImg =
        Boolean(file.type && file.type.startsWith("image/")) ||
        IMAGE_EXTENSIONS.includes(fileExt || "");

      const errorMsg = isImg
        ? isAr
          ? "لا يمكن رفع صورة كـ سيرة ذاتية. يُرجى رفع ملف PDF أو Word فقط (وليس صورة)."
          : "Images cannot be uploaded as a CV. Please upload a PDF or Word document (.pdf, .docx, .doc)."
        : isAr
          ? "صيغة الملف غير مدعومة. يُرجى رفع ملف PDF أو Word فقط."
          : validation.error || "Only PDF and Word documents are supported.";

      setFileValidationError(errorMsg);
      showToast(
        "error",
        isAr ? "صيغة غير مدعومة" : "Unsupported File Format",
        errorMsg,
        "public"
      );
      updateFormData({ cvFileName: "", cvFile: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFileValidationError(null);
    updateFormData({ cvFileName: file.name, cvFile: file });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetCvFile(file);
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
      const file = e.dataTransfer.files[0];
      validateAndSetCvFile(file);
    }
  };

  return (
    <form onSubmit={handleNextStep2} noValidate className="animate-step-enter">
      <h3 className="mb-6 text-lg font-bold text-[#16162c]">
        {isAr ? "ممارستك المهنية" : "Your professional practice"}
      </h3>

      <div className="space-y-6">
        {/* Areas of Expertise (.picker) */}
        <div className="picker">
          <div className="mb-1 flex items-center gap-2">
            <label className="text-xs font-bold tracking-wider text-[#16162c] uppercase">
              {isAr ? "مجالات الخبرة" : "Areas of Expertise"}
            </label>
            <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
              {isAr ? "اختياري" : "optional"}
            </span>
          </div>
          <p className="mb-3 text-xs text-[#6a6a86]">
            {isAr ? "اختر كل ما ينطبق" : "Select all that apply"}
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
                    "pick flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-150 select-none active:scale-95 motion-reduce:transform-none",
                    isSelected
                      ? "border-[#1d1d39] bg-[#1d1d39] text-white shadow-sm"
                      : "border-[#e2e2ec] bg-white text-[#3e3e5c] hover:border-[#6a6a86]"
                  )}
                >
                  {isSelected && <span>✓</span>}
                  <span>
                    {isAr && (item === "Others" || item === "Other")
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
            <label
              htmlFor="reg-years-experience"
              className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
            >
              {isAr ? "سنوات الخبرة" : "Years of Experience"}
              <RequiredIndicator />
            </label>
            <CustomSelect
              id="reg-years-experience"
              value={formData.yearsExperience}
              onChange={(val) => updateFormData({ yearsExperience: val })}
              options={EXPERIENCE_BANDS}
              placeholder={
                isAr ? "اختر مستوى الخبرة" : "Select experience level"
              }
              hasError={Boolean(yearsExperienceError)}
              ariaDescribedBy={
                yearsExperienceError ? "reg-years-experience-error" : undefined
              }
            />
            {yearsExperienceError && (
              <p
                id="reg-years-experience-error"
                className="mt-1.5 text-xs font-medium text-[#e11119]"
              >
                {yearsExperienceError}
              </p>
            )}
          </div>

          {/* CV Upload (.cv) */}
          <div>
            <label
              htmlFor="reg-cv-upload"
              className="mb-2 block text-xs font-bold tracking-wider text-[#16162c] uppercase"
            >
              {isAr ? "رفع السيرة الذاتية" : "CV Upload"}
              <RequiredIndicator />
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />

            {formData.cvFileName ? (
              <div
                id="reg-cv-upload"
                className="cv has flex items-center justify-between rounded-2xl border border-[#419257]/40 bg-[#419257]/10 p-4 text-xs font-semibold text-[#16162c]"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <FileCheck className="h-5 w-5 shrink-0 text-[#419257]" />
                  <div className="truncate">
                    <span className="block font-bold text-[#16162c]">
                      {formData.cvFileName}
                    </span>
                    <span className="block text-[10px] text-[#419257]">
                      {isAr ? "جاهز للإرسال" : "Ready to submit"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateFormData({ cvFileName: "", cvFile: null });
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="p-1 text-[#6a6a86] transition-colors hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                id="reg-cv-upload"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                data-invalid={Boolean(cvFileError)}
                aria-describedby={cvFileError ? "reg-cv-error" : undefined}
                className={cn(
                  "cv flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-[#f6f6fa] p-6 text-center transition-all outline-none",
                  dragActive
                    ? "border-[#419257] bg-[#419257]/10"
                    : cvFileError
                      ? "border-[#e11119] bg-red-50/50 ring-2 ring-red-500/20"
                      : "border-[#e2e2ec] hover:border-[#419257] hover:bg-[#419257]/5 focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15"
                )}
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#419257] shadow-sm">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="text-xs text-[#3e3e5c]">
                  {isAr ? (
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
                  {isAr ? "ملف PDF أو Word" : "PDF or Word document"}
                </span>
              </div>
            )}
            {cvFileError && (
              <p
                id="reg-cv-error"
                className="mt-1.5 text-xs font-medium text-[#e11119]"
              >
                {cvFileError}
              </p>
            )}
          </div>
        </div>

        {/* Industries Served (Optional) */}
        <div className="picker">
          <div className="mb-1 flex items-center gap-2">
            <label className="text-xs font-bold tracking-wider text-[#16162c] uppercase">
              {isAr ? "القطاعات المخدومة" : "Industries Served"}
            </label>
            <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
              {isAr ? "اختياري" : "optional"}
            </span>
          </div>
          <p className="mb-3 text-xs text-[#6a6a86]">
            {isAr ? "اختر كل ما ينطبق" : "Select all that apply"}
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
                    "pick flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-150 select-none active:scale-95 motion-reduce:transform-none",
                    isSelected
                      ? "border-[#1d1d39] bg-[#1d1d39] text-white shadow-sm"
                      : "border-[#e2e2ec] bg-white text-[#3e3e5c] hover:border-[#6a6a86]"
                  )}
                >
                  {isSelected && <span>✓</span>}
                  <span>
                    {isAr && (item === "Others" || item === "Other")
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
              {isAr ? "نبذة عن ممارستك المهنية" : "Professional Biography"}
            </label>
            <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
              {isAr ? "اختياري" : "optional"}
            </span>
          </div>
          <textarea
            rows={3}
            value={formData.biography}
            onChange={(e) => updateFormData({ biography: e.target.value })}
            placeholder={
              isAr
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
              {isAr ? "أرسل لنا رسالة" : "Send Us a Message"}
            </label>
            <span className="rounded-full bg-[#f0f0f5] px-2 py-0.5 text-[10px] font-semibold text-[#6a6a86]">
              {isAr ? "اختياري" : "optional"}
            </span>
          </div>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => updateFormData({ message: e.target.value })}
            placeholder={
              isAr
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
          {isAr ? "الرجوع" : "Back"}
        </button>

        <button
          type="submit"
          className="flex cursor-pointer items-center gap-2 rounded-full bg-[#e11119] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:scale-[1.01] hover:bg-[#b60d14]"
        >
          <span>{isAr ? "المتابعة" : "Continue"}</span>
          <ArrowIcon className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
