"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/components/common/DirectionProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function BackHomeCard() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowRight : ArrowLeft;

  return (
    <Link
      href="/"
      className="backhome group mx-auto mt-16 mb-6 flex max-w-[520px] items-center gap-4 rounded-[24px] border border-[#e2e2ec] bg-white p-[20px_24px] text-start transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#f6f6fa] text-[#1d1d39] transition-colors duration-300 group-hover:bg-[#e11119] group-hover:text-white">
        <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
      </div>

      <div className="flex-1">
        <b className="block text-[16.4px] font-bold text-[#16162c] transition-colors group-hover:text-[#e11119]">
          {isArabic ? "العودة للمنصة الرئيسية" : "Back to the Freelancers Hub"}
        </b>
        <small className="mt-0.5 block text-[13.4px] text-[#6a6a86]">
          {isArabic
            ? "استكشف خدمات وحلول المنصة المتكاملة"
            : "Explore the complete platform proposition"}
        </small>
      </div>
    </Link>
  );
}
