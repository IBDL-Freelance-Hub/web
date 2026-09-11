"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export function WhyHeader() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="head mb-12 text-start">
      {/* Eyebrow with leading dash line */}
      <div className="eyebrow mb-4 flex items-center gap-2.5 text-xs font-bold tracking-[0.14em] text-[#e11119] uppercase">
        <span
          className="inline-block h-[2px] w-6 rounded-full bg-[#e11119]"
          aria-hidden="true"
        />
        <span>{isArabic ? "لماذا IBDL" : "WHY IBDL"}</span>
      </div>

      {/* Main Headline */}
      <h2 className="mb-4 max-w-[760px] text-[clamp(32px,3.8vw,46px)] leading-[1.18] font-extrabold tracking-tight text-white">
        {isArabic
          ? "عقدان من تقديم الحلول المؤسسية خلف كل أداة."
          : "Two decades of enterprise delivery behind every tool."}
      </h2>

      {/* Lead Paragraph */}
      <p className="lead max-w-[620px] text-[15.5px] leading-[1.68] text-[#94a3b8]">
        {isArabic
          ? "قامت مجموعة IBDL للتعلم بتطوير واختبار وتقديم حلول تعلم عبر المنطقة وخارجها منذ عام 2006. وتفتح منصة المستقلين تلك المحفظة للمحترفين المستقلين لأول مرة."
          : "IBDL Learning Group has built, validated and delivered learning solutions across the region and beyond since 2006. The Freelancer Hub opens that portfolio to independent professionals for the first time."}
      </p>
    </div>
  );
}
