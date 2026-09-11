"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export function AssessmentsHeaderArea() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`head mb-16 flex flex-col items-center text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        mounted
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-8 opacity-0 blur-[5px]"
      }`}
    >
      <div className="eyebrow mb-5 flex items-center justify-center gap-2.5 text-xs font-bold tracking-[0.16em] text-[#e11119] uppercase">
        <span className="inline-block h-[2px] w-[26px] rounded-full bg-[#e11119]" />
        <span>{isArabic ? "أدوات التقييم" : "ASSESSMENT TOOLS"}</span>
      </div>

      <h2 className="mx-auto mb-5 max-w-[760px] text-center text-[clamp(30px,3.4vw,46px)] leading-[1.18] font-bold tracking-tight text-[#16162c]">
        {isArabic
          ? "الأدلة قبل انطلاق البرنامج. وإثبات الأثر بعده."
          : "Evidence before the programme. Proof after it."}
      </h2>

      <p className="lead mx-auto mb-16 max-w-[62ch] text-center text-[16.5px] leading-[1.68] text-[#3e3e5c]">
        {isArabic
          ? "ثلاث أدوات مثبتة علمياً تتيح لك تشخيص الاحتياج بدقة، وتوجيه تدخلك التدريبي، وإثبات التغيير القابل للقياس للعميل."
          : "Three validated instruments that let you diagnose accurately, target your intervention, and demonstrate measurable change to the client who commissioned it."}
      </p>
    </div>
  );
}
