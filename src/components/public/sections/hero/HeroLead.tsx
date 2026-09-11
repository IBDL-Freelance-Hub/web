"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export function HeroLead() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <p className="hero__anim-3 mb-10 max-w-[58ch] text-[15.5px] leading-[1.68] text-white/75 sm:text-[17px]">
      {isArabic
        ? "حضور أقوى، مقترحات أكفأ، وحلول تدريبية بأثر ملموس وقابل للقياس. تمنحك المنصة البنية المؤسسية التي تملكها كبرى شركات التدريب — لتتفرغ لتطوير أعمالك وتحقيق أهدافك."
        : "More visibility. Stronger proposals. Better-designed learning solutions. Measurable client value. The Hub gives independent trainers the professional infrastructure usually found only inside large training organisations — so you spend less time on the business of training and more time winning, delivering and growing."}
    </p>
  );
}
