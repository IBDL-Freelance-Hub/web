"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

export interface OfferPillarsHeaderProps {
  isInView?: boolean;
}

export function OfferPillarsHeader({
  isInView = true,
}: OfferPillarsHeaderProps) {
  const { locale } = useLocale();

  return (
    <div className="head head--center text-center">
      {/* Eyebrow */}
      <div
        className={cn(
          "eyebrow text-red-brand mb-5 flex items-center justify-center gap-2.5 text-center text-xs font-bold tracking-[0.16em] uppercase transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "translate-y-10 opacity-0 blur-[5px]"
        )}
      >
        <span
          className="bg-red-brand inline-block h-[2px] w-[26px] rounded-full"
          aria-hidden="true"
        />
        <span className={cn(locale === "ar" && "text-[13px] tracking-normal")}>
          {locale === "ar" ? "أدوات IBDL المتخصصة" : "SPECIALIZED IBDL TOOLS"}
        </span>
      </div>

      {/* Headline */}
      <h2
        className={cn(
          "h2 mx-auto mb-5 max-w-[820px] text-center text-[clamp(30px,3.6vw,48px)] leading-[1.15] font-bold text-white transition-all delay-100 duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          locale === "ar" && "leading-[1.38] tracking-normal",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "translate-y-10 opacity-0 blur-[5px]"
        )}
      >
        {locale === "ar"
          ? "الأدوات المعتمدة خلف الحلول التي تصممها."
          : "The instruments behind the solutions you design."}
      </h2>

      {/* Lead */}
      <p
        className={cn(
          "lead mx-auto mb-16 max-w-[64ch] text-center text-[clamp(16px,1.3vw,18.5px)] leading-relaxed text-white/75 transition-all delay-200 duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "translate-y-10 opacity-0 blur-[5px]"
        )}
      >
        {locale === "ar"
          ? "إلى جانب خدمات المنصة الأساسية، يمكن للأعضاء الوصول إلى ألعاب المحاكاة، وأدوات التقييم، وبرامج الاعتماد التي طورتها مجموعة IBDL عبر عقدين من التنفيذ المؤسسي المتميز."
          : "Alongside the Core Hub Services, members can access the simulations, assessments and accreditation IBDL Learning Group has built over two decades of enterprise delivery."}
      </p>
    </div>
  );
}
