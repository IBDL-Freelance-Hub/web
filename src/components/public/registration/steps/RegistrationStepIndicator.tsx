"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegistrationStepIndicatorProps {
  step: number | string;
  isAr: boolean;
}

export function RegistrationStepIndicator({
  step,
  isAr,
}: RegistrationStepIndicatorProps) {
  if (typeof step !== "number" || step > 3) return null;

  return (
    <div className="rm__prog flex items-center justify-between overflow-x-auto border-b border-[#e2e2ec] bg-[#f6f6fa] px-3 py-3 sm:justify-start sm:gap-8 sm:px-12 sm:py-4">
      {/* Step 1 */}
      <div className="rm__pstep flex shrink-0 items-center gap-1.5 sm:gap-2.5">
        <div
          className={cn(
            "rm__pnum grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-300 ease-out sm:h-7 sm:w-7",
            step === 1
              ? "bg-[#e11119] text-white shadow-[0_4px_12px_rgba(225,17,25,0.34)]"
              : step > 1
                ? "bg-[#419257] text-white"
                : "bg-[#ececf3] text-[#6a6a86]"
          )}
        >
          {step > 1 ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : "1"}
        </div>
        <span
          className={cn(
            "rm__plab text-[11px] font-bold whitespace-nowrap transition-all duration-300 ease-out sm:text-sm",
            step >= 1 ? "text-[#1d1d39]" : "text-[#6a6a86]"
          )}
        >
          {isAr ? "بياناتك الشخصية" : "Your details"}
        </span>
      </div>

      <div className="hidden h-px w-4 bg-[#d0d0e0] sm:block" />

      {/* Step 2 */}
      <div className="rm__pstep flex shrink-0 items-center gap-1.5 sm:gap-2.5">
        <div
          className={cn(
            "rm__pnum grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-300 ease-out sm:h-7 sm:w-7",
            step === 2
              ? "bg-[#e11119] text-white shadow-[0_4px_12px_rgba(225,17,25,0.34)]"
              : step > 2
                ? "bg-[#419257] text-white"
                : "bg-[#ececf3] text-[#6a6a86]"
          )}
        >
          {step > 2 ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : "2"}
        </div>
        <span
          className={cn(
            "rm__plab text-[11px] font-bold whitespace-nowrap transition-all duration-300 ease-out sm:text-sm",
            step >= 2 ? "text-[#1d1d39]" : "text-[#6a6a86]"
          )}
        >
          {isAr ? "ممارستك المهنية" : "Your practice"}
        </span>
      </div>

      <div className="hidden h-px w-4 bg-[#d0d0e0] sm:block" />

      {/* Step 3 */}
      <div className="rm__pstep flex shrink-0 items-center gap-1.5 sm:gap-2.5">
        <div
          className={cn(
            "rm__pnum grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-300 ease-out sm:h-7 sm:w-7",
            step === 3
              ? "bg-[#e11119] text-white shadow-[0_4px_12px_rgba(225,17,25,0.34)]"
              : "bg-[#ececf3] text-[#6a6a86]"
          )}
        >
          3
        </div>
        <span
          className={cn(
            "rm__plab text-[11px] font-bold whitespace-nowrap transition-all duration-300 ease-out sm:text-sm",
            step === 3 ? "text-[#1d1d39]" : "text-[#6a6a86]"
          )}
        >
          {isAr ? "التأكيد" : "Confirm"}
        </span>
      </div>
    </div>
  );
}
