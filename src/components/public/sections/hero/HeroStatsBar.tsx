"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { HERO_STATS_DATA, StatItem } from "@/data/heroData";
import { AnimatedCounter } from "./AnimatedCounter";

export interface HeroStatsBarProps {
  stats?: StatItem[];
}

export function HeroStatsBar({ stats = HERO_STATS_DATA }: HeroStatsBarProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="hero__anim-5 grid w-full max-w-[800px] grid-cols-2 gap-6 self-start border-t border-white/10 pt-10 md:grid-cols-4">
      {stats.map((st, idx) => (
        <div
          key={idx}
          className={`flex flex-col text-start ${
            idx > 0 ? "md:border-s md:border-white/10 md:ps-6" : ""
          }`}
        >
          <span className="mb-1 font-mono text-3xl font-black tracking-tight text-white sm:text-4xl">
            <AnimatedCounter target={st.value} />
          </span>
          <span className="text-xs leading-snug font-medium text-white/60 sm:text-[13px]">
            {isArabic ? st.labelAr : st.labelEn}
          </span>
        </div>
      ))}
    </div>
  );
}
