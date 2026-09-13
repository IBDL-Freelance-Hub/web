"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export function GamesHeaderArea() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div
      className={`head mb-16 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        mounted
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-8 opacity-0 blur-[5px]"
      }`}
    >
      <div className="eyebrow mb-5 flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-[#e11119] uppercase">
        <span className="inline-block h-[2px] w-[26px] rounded-full bg-[#e11119]" />
        <span>BUSINESS SIMULATION GAMES</span>
      </div>

      <h2 className="mb-5 max-w-[760px] text-[clamp(30px,3.4vw,46px)] leading-[1.18] font-bold tracking-tight text-[#16162c]">
        {isArabic
          ? "تعلم تفاعلي يحاكي واقع بيئة الأعمال الحقيقية."
          : "Learning that behaves like the real business."}
      </h2>

      <p className="lead mb-16 max-w-[62ch] text-[16.5px] leading-[1.68] text-[#3e3e5c]">
        {isArabic
          ? "ثماني تجارب محاكاة تضع المتدربين في قلب قرارات مصيرية — منافسة وتفاوض وتوزيع موارد وتدارك أخطاء، مع ظهور النتائج المباشرة داخل القاعة فوراً."
          : "Eight simulation experiences that put participants inside consequential decisions — competing, negotiating, allocating and recovering, with results that surface in the room immediately."}
      </p>
    </div>
  );
}
