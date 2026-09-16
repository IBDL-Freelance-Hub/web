"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";

export function HeroCTAButtons() {
  const { openRegistration } = useRegistration();
  const { locale, isRTL } = useLocale();
  const isArabic = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="hero__anim-4 mb-16 flex flex-wrap items-center gap-4">
      {/* Primary Action (Pill Button with red outer shadow) */}
      <button
        type="button"
        onClick={openRegistration}
        className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#e11119] px-8 py-4 text-sm font-bold text-white shadow-[0_12px_32px_rgba(225,17,25,0.55)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#b60d14] hover:shadow-[0_16px_40px_rgba(225,17,25,0.7)] active:scale-95 sm:text-base"
      >
        <span>
          {isArabic ? "احصل على التقييم المجاني" : "Get Your Free Assessment"}
        </span>
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </button>

      {/* Secondary Action (Ghost Dark Pill Link) */}
      <Link
        href="#services"
        className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold text-white/90 transition-all duration-300 hover:border-white/30 hover:bg-white/10 sm:text-base"
      >
        {isArabic ? "اكتشف خدمات المنصة" : "See what the Hub does"}
      </Link>
    </div>
  );
}
