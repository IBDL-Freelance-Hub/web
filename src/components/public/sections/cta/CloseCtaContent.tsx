"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function CloseCtaContent() {
  const { locale } = useLocale();
  const { openRegistration } = useRegistration();

  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="band__in relative z-10 mx-auto flex max-w-[820px] flex-col items-center justify-center">
      {/* Main Heading */}
      <h2 className="mx-auto mb-8 max-w-[26ch] text-center text-[clamp(26px,3.2vw,40px)] leading-[1.25] font-bold tracking-tight text-white">
        {isArabic
          ? "انضم إلى المنصة. عزز حضورك المهني. طوّر حلولك التدريبية. ونمّ أعمالك باستدامة."
          : "Join the Hub. Build your visibility. Strengthen your solutions. Grow your training business."}
      </h2>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={openRegistration}
        className="btn--red group mb-7 inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#e11119] px-8 py-4 text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.38)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#b60d14] active:scale-[0.99]"
      >
        <span>
          {isArabic ? "سجل كمدرب مستقل" : "Register as a freelance trainer"}
        </span>
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </button>

      {/* Supporting Lead Footnote */}
      <p className="m-0 mx-auto max-w-[58ch] text-center text-[14px] leading-[1.65] text-white/70 sm:text-[15.5px]">
        {isArabic
          ? "احصل على الأدوات والدعم وشبكة العلاقات المهنية والظهور الذي تحتاجه للمنافسة بقوة واحترافية في سوق التدريب الخليجي."
          : "Access the tools, support, professional network and visibility you need to compete more effectively across the GCC training market."}
      </p>
    </div>
  );
}
