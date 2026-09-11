"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { StepItemData } from "@/data/nextStepsData";
import { cn } from "@/lib/utils";

export interface NextStepCardProps {
  step: StepItemData;
  index?: number;
  isInView?: boolean;
}

export function NextStepCard({
  step,
  index = 0,
  isInView = true,
}: NextStepCardProps) {
  const { locale, formatNumber } = useLocale();
  const isArabic = locale === "ar";
  const delayMs = Math.min(index * 100, 300);

  return (
    <div
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "group relative flex cursor-pointer flex-col items-start text-start transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {/* Step Number Pill Box (Green style triggers on HOVER) */}
      <div className="relative z-10 mb-6 flex h-12 w-14 items-center justify-center rounded-2xl border border-[#e2e8f0] bg-white text-sm font-bold text-[#16162c] shadow-xs transition-all duration-300 group-hover:border-[#419257] group-hover:bg-[#f0fdf4] group-hover:text-[#1b7a43] group-hover:ring-4 group-hover:ring-emerald-500/10">
        {formatNumber(step.num)}
      </div>

      {/* Step Content */}
      <h3 className="mb-2 text-base font-bold text-[#16162c] transition-colors duration-300 group-hover:text-[#1b7a43]">
        {isArabic ? step.titleAr : step.titleEn}
      </h3>

      <p className="text-xs leading-relaxed text-[#6b7280]">
        {isArabic ? step.bodyAr : step.bodyEn}
      </p>
    </div>
  );
}

export interface NextStepsGridProps {
  steps: StepItemData[];
  isInView?: boolean;
}

export function NextStepsGrid({ steps, isInView = true }: NextStepsGridProps) {
  return (
    <div className="relative">
      {/* Connecting Horizontal Line (Desktop) */}
      <div
        className="pointer-events-none absolute inset-x-8 top-6 hidden h-[2px] bg-[#419257]/30 lg:block"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <NextStepCard
            key={step.num}
            step={step}
            index={idx}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}
