"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

export interface ServicesHeaderProps {
  isInView?: boolean;
}

export function ServicesHeader({ isInView = true }: ServicesHeaderProps) {
  const { locale } = useLocale();

  return (
    <div className="head head--center text-center">
      {/* Eyebrow */}
      <div
        className={cn(
          "eyebrow text-red-brand mb-5 flex items-center justify-center gap-2.5 text-center text-xs font-bold tracking-[0.16em] uppercase transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-10 opacity-0 blur-[4px]"
        )}
      >
        <span
          className="bg-red-brand inline-block h-[2px] w-[26px] rounded-full"
          aria-hidden="true"
        />
        <span className={cn(locale === "ar" && "text-[13px] tracking-normal")}>
          {locale === "ar" ? "خدمات المنصة الأساسية" : "CORE HUB SERVICES"}
        </span>
      </div>

      {/* Headline */}
      <h2
        className={cn(
          "h2 mx-auto mb-5 max-w-[820px] text-center text-[clamp(30px,3.6vw,48px)] leading-[1.15] font-bold text-white transition-all delay-100 duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          locale === "ar" && "leading-[1.38] tracking-normal",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-10 opacity-0 blur-[4px]"
        )}
      >
        {locale === "ar"
          ? "كل ما تحتاجه لبناء حلول تدريبية استثنائية."
          : "Everything you need to build better training solutions."}
      </h2>

      {/* Lead */}
      <p
        className={cn(
          "lead mx-auto mb-14 max-w-[66ch] text-center text-[clamp(16px,1.3vw,18.5px)] leading-relaxed text-white/75 transition-all delay-200 duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-10 opacity-0 blur-[4px]"
        )}
      >
        {locale === "ar"
          ? "اثنتا عشرة خدمة مهنية ترافق دورة عملك التجارية والتدريبية بالكامل — بدءاً من تحديد احتياجات العميل، وتصميم الحقيبة، وتقديم العرض، وحتى جودة التنفيذ وإثبات العائد على الاستثمار."
          : "Twelve professional services that follow your complete commercial and learning-solution lifecycle — from identifying the client's need, to designing the solution, submitting the proposal, delivering it well, and proving what changed."}
      </p>
    </div>
  );
}
