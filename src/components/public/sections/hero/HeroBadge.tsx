"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export function HeroBadge() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="hero__anim-1 mb-8 inline-flex items-center gap-2.5 self-start rounded-full border border-white/10 bg-[#1d1d39]/80 px-3.5 py-1.5 text-[12.5px] font-medium text-white/80 backdrop-blur-md">
      <span
        className="h-2 w-2 animate-pulse rounded-full bg-[#5cb374]"
        aria-hidden="true"
      />
      <span>
        {isArabic
          ? "مدعوم من مجموعة IBDL للتعلم"
          : "Powered by IBDL Learning Group"}
      </span>
    </div>
  );
}
