"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { WHY_REASONS_DATA } from "@/data/whyData";

export function WhyReasonsList() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="space-y-6">
      {WHY_REASONS_DATA.map((item, idx) => (
        <div
          key={idx}
          className={`pb-6 text-start ${
            idx < WHY_REASONS_DATA.length - 1 ? "border-b border-white/10" : ""
          }`}
        >
          <h3 className="mb-1.5 flex items-center gap-2.5 text-base font-bold text-white sm:text-lg">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#419257]"
              aria-hidden="true"
            />
            <span>{isArabic ? item.titleAr : item.titleEn}</span>
          </h3>
          <p className="ps-4.5 text-sm leading-relaxed text-[#94a3b8]">
            {isArabic ? item.bodyAr : item.bodyEn}
          </p>
        </div>
      ))}
    </div>
  );
}

export function WhyReasonItem() {
  return null;
}
