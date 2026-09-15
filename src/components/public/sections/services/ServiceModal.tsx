"use client";

import React, { useEffect } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { X, Check, Users, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceItem } from "@/data/servicesData";

export interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const { locale } = useLocale();
  const { openRegistration } = useRegistration();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div
      className="ov animate-in fade-in fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-[#0a0a18]/75 p-3 backdrop-blur-[10px] duration-200 sm:p-8"
      onClick={onClose}
    >
      <div
        className="sheet pm animate-in fade-in zoom-in-95 relative my-auto flex max-h-[92vh] w-full max-w-[820px] flex-col overflow-hidden rounded-2xl bg-white text-start shadow-[0_28px_70px_rgba(20,20,40,0.25)] duration-300 sm:rounded-[32px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="pm__x absolute end-3 top-3 z-30 grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[#e2e2ec] bg-white/90 text-[#16162c] shadow-xs transition-all hover:rotate-90 hover:bg-white sm:end-6 sm:top-6 sm:h-9 sm:w-9"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="pm__head relative flex shrink-0 flex-col items-start gap-4 border-b border-[#e2e2ec] bg-gradient-to-br from-[#16162c] to-[#0f0f23] p-5 pe-12 text-white sm:flex-row sm:items-center sm:gap-5 sm:p-[32px_40px] sm:pe-16">
          {/* Service Number Badge */}
          <div className="border-green-brand/30 bg-green-brand/10 text-green-lit flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-xl border text-lg font-extrabold shadow-inner sm:h-[68px] sm:w-[68px] sm:rounded-2xl sm:text-xl">
            {service.num}
          </div>

          {/* Title & Eyebrow */}
          <div className="pm__meta flex-1">
            <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-extrabold tracking-[0.12em] text-white/80 uppercase backdrop-blur-xs sm:px-3 sm:py-1 sm:text-[11px]">
              <Sparkles className="h-3 w-3 text-[#419257]" />
              {isArabic
                ? "إحدى الخدمات الـ 12 الأساسية"
                : "12 Core Hub Services"}
            </span>
            <h3 className="mb-1 text-lg font-bold tracking-tight text-white sm:text-[25px]">
              {isArabic ? service.titleAr : service.titleEn}
            </h3>
            <p className="mb-0 text-xs leading-relaxed text-white/70 sm:text-[14px]">
              {isArabic ? service.descAr : service.descEn}
            </p>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="pm__body space-y-6 overflow-y-auto p-5 sm:space-y-7 sm:p-[32px_40px]">
          {/* Service Description */}
          <div>
            <span className="pm__lbl mb-2.5 block text-[11px] font-extrabold tracking-[0.14em] text-[#419257] uppercase sm:text-[11.5px]">
              {isArabic
                ? "تفاصيل الخدمة والقيمة المضافة"
                : "SERVICE OVERVIEW & VALUE"}
            </span>
            <p className="text-xs leading-[1.7] text-[#3e3e5c] sm:text-[15px]">
              {isArabic ? service.longDescAr : service.longDescEn}
            </p>
          </div>

          {/* Key Deliverables & Output */}
          <div>
            <span className="pm__lbl mb-3.5 block text-[11px] font-extrabold tracking-[0.14em] text-[#419257] uppercase sm:text-[11.5px]">
              {isArabic
                ? "المخرجات والنماذج المشمولة"
                : "KEY DELIVERABLES & OUTPUTS"}
            </span>
            <ul className="grid grid-cols-1 gap-3 p-0 sm:grid-cols-1">
              {(isArabic ? service.deliverablesAr : service.deliverablesEn).map(
                (item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-[#e2e2ec] bg-[#fbfbfe] p-3 text-xs font-medium text-[#16162c] sm:p-3.5 sm:text-[14px]"
                  >
                    <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#419257]/15 text-[#419257]">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Target Audience */}
          <div>
            <span className="pm__lbl mb-3 block text-[11px] font-extrabold tracking-[0.14em] text-[#e11119] uppercase sm:text-[11.5px]">
              {isArabic
                ? "الفئات المستفيدة من هذه الخدمة"
                : "TARGET BENEFICIARIES"}
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {(isArabic
                ? service.targetAudienceAr
                : service.targetAudienceEn
              ).map((aud, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e2e2ec] bg-[#f6f6fa] px-3.5 py-1.5 text-xs font-semibold text-[#3e3e5c] sm:px-4 sm:py-2 sm:text-[13px]"
                >
                  <Users className="h-3.5 w-3.5 text-[#e11119]" />
                  <span>{aud}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex shrink-0 flex-col-reverse gap-2.5 border-t border-[#e2e2ec] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-[20px_40px]">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-full border border-[#e2e2ec] px-6 py-2.5 text-xs font-bold text-[#3e3e5c] transition-all hover:bg-[#f6f6fa] sm:w-auto sm:text-sm"
          >
            {isArabic ? "إغلاق" : "Close"}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              openRegistration();
            }}
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#e11119] px-7 py-3 text-xs font-bold text-white shadow-[0_10px_25px_rgba(225,17,25,0.3)] transition-all hover:bg-[#b60d14] active:scale-95 sm:w-auto sm:text-sm"
          >
            <span>
              {isArabic
                ? "انضم للمنصة للحصول على هذه الخدمة"
                : "Join the Hub to Access This Service"}
            </span>
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
