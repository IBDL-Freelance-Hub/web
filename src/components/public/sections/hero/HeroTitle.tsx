"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export function HeroTitle() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <h1 className="hero__anim-2 mb-6 text-[clamp(36px,5vw,64px)] leading-[1.08] font-extrabold tracking-tight text-white">
      {isArabic ? (
        <>
          منظومة متكاملة
          <br />
          لدعم أعمال
          <br />
          المدربين المستقلين.
        </>
      ) : (
        <>
          Your business support
          <br />
          ecosystem
          <br />
          for freelance trainers.
        </>
      )}
    </h1>
  );
}
