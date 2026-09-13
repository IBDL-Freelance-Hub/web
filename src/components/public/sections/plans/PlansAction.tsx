"use client";

import React from "react";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface PlansActionProps {
  isInView?: boolean;
}

export function PlansAction({ isInView = true }: PlansActionProps) {
  const { openRegistration } = useRegistration();
  const { locale } = useLocale();

  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div
      className={cn(
        "mt-12 flex flex-col items-center justify-center text-center transition-all delay-[750ms] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-12 opacity-0 blur-[6px]"
      )}
    >
      <button
        type="button"
        onClick={openRegistration}
        className="group relative inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-[#e11119] px-10 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:scale-[1.02] hover:bg-[#b60d14] active:scale-95 sm:px-12 sm:py-4.5 sm:text-lg"
      >
        <span>{isAr ? "انضم إلى المنصة — مجاناً" : "Join the Hub — free"}</span>
        <ArrowIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </button>
      <p className="mt-3 text-xs text-[#6a6a86]">
        {isAr
          ? "المرحلة الأولى · تسجيل مجاني بدون بطاقة ائتمان"
          : "Phase 1 · Free registration, no credit card required"}
      </p>
    </div>
  );
}
