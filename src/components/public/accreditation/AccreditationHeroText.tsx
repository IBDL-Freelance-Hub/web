"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export function AccreditationHeroText() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <>
      {/* Eyebrow */}
      <div className="eyebrow mb-5 flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-[#e11119] uppercase">
        <span className="inline-block h-[2px] w-[26px] rounded-full bg-[#e11119]" />
        <span>
          {isArabic
            ? "مسار الاعتراف المهني"
            : "PROFESSIONAL RECOGNITION PATHWAY"}
        </span>
      </div>

      {/* Main Heading (h2) */}
      <h2 className="mb-5 text-[clamp(28px,3.4vw,44px)] leading-[1.18] font-bold tracking-tight text-[#16162c]">
        {isArabic
          ? "اعتراف مهني تكتسبه بكفاءتك، وليس وساماً تشتريه."
          : "Recognition you earn, not a badge you buy."}
      </h2>

      {/* Narrative Lead (p) */}
      <p className="mb-8 text-[16px] leading-[1.7] text-[#3e3e5c]">
        {isArabic
          ? "يصبح مشتركو باقة Master مؤهلين لدخول مسارين معتمدين من IBDL: شهادة المدرب المعتمد، واعتماد دوراتهم وبرامجهم الخاصة. الأهلية هي نقطة الانطلاق — تُكتسب الشهادة عبر التقييم، ويُمنح الاعتماد بعد المراجعة الدقيقة. البرامج المطابقة للمعايير تحمل خاتم محتوى IBDL المعتمد."
          : "Master subscribers become eligible to enter two IBDL pathways: trainer certification, and accreditation of their own courses and programmes. Eligibility is where each pathway begins — certification is earned through assessment, and accreditation through review. Programmes that meet the standard carry the IBDL Accredited Content mark."}
      </p>
    </>
  );
}
