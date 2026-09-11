"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

export interface PlansHeaderProps {
  isInView?: boolean;
}

export function PlansHeader({ isInView = true }: PlansHeaderProps) {
  const { locale } = useLocale();

  return (
    <div className="head head--center text-center">
      {/* Eyebrow */}
      <div
        className={cn(
          "eyebrow text-red-brand mb-5 flex items-center justify-center gap-2.5 text-center text-xs font-bold tracking-[0.16em] uppercase transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-12 opacity-0 blur-[6px]"
        )}
      >
        <span
          className="bg-red-brand inline-block h-[2px] w-[26px] rounded-full"
          aria-hidden="true"
        />
        <span className={cn(locale === "ar" && "text-[13px] tracking-normal")}>
          {locale === "ar" ? "العضوية" : "MEMBERSHIP"}
        </span>
      </div>

      {/* Headline */}
      <h2
        className={cn(
          "h2 mx-auto mb-4 max-w-[820px] text-center text-[clamp(30px,3.6vw,48px)] leading-[1.14] font-bold text-[#16162c] transition-all delay-150 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          locale === "ar" && "leading-[1.38] tracking-normal",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-12 opacity-0 blur-[6px]"
        )}
      >
        {locale === "ar"
          ? "اختر كيف تعمل المنصة في مساندتك."
          : "Choose how you work with the Hub."}
      </h2>

      {/* Lead */}
      <p
        className={cn(
          "lead mx-auto mb-16 max-w-[66ch] text-center text-[clamp(16px,1.3vw,18.5px)] leading-relaxed text-[#3e3e5c] transition-all delay-300 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-12 opacity-0 blur-[6px]"
        )}
      >
        {locale === "ar"
          ? "ثلاثة مستويات للعضوية، يبني كل مستوى منها على ما قبله — وتبدأ بعضوية Essential مجاناً بمجرد التسجيل."
          : "Three membership levels. Everything above builds on the level before it — and you start on Essential, free, the moment you register."}
      </p>
    </div>
  );
}
