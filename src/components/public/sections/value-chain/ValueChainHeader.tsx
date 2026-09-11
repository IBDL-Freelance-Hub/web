"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

export interface ValueChainHeaderProps {
  isInView?: boolean;
}

export function ValueChainHeader({ isInView = true }: ValueChainHeaderProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="head max-w-[780px] text-start">
      {/* Eyebrow */}
      <div
        className={cn(
          "eyebrow mb-4 flex items-center gap-2.5 text-xs font-bold tracking-[0.14em] text-[#e11119] uppercase transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-6 opacity-0 blur-[5px]"
        )}
      >
        <span
          className="inline-block h-[2px] w-[24px] rounded-full bg-[#e11119]"
          aria-hidden="true"
        />
        <span className={cn(isArabic && "text-[13px] tracking-normal")}>
          {isArabic
            ? "كيف تدعم المنصة أعمالك التدريبية"
            : "HOW THE HUB SUPPORTS YOUR TRAINING BUSINESS"}
        </span>
      </div>

      {/* Headline */}
      <h2
        className={cn(
          "h2 mb-4 text-[clamp(32px,3.8vw,46px)] leading-[1.18] font-extrabold tracking-tight text-[#16162c] transition-all delay-100 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          isArabic && "leading-[1.35] tracking-normal",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-6 opacity-0 blur-[5px]"
        )}
      >
        {isArabic
          ? "من التحدي الحالي إلى النتيجة العملية المحققة."
          : "From the challenge you have today to the business outcome."}
      </h2>

      {/* Lead */}
      <p
        className={cn(
          "lead mb-12 text-base leading-relaxed text-[#5f6368] transition-all delay-200 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none sm:text-[17px]",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-6 opacity-0 blur-[5px]"
        )}
      >
        {isArabic
          ? "كل خدمة صُممت لتنتقل بك عبر مسار محدد نحو تحقيق أهدافك."
          : "Every service exists to move you along one of these lines."}
      </p>
    </div>
  );
}
