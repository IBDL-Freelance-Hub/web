"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { WHY_STATS_DATA, StatTileData } from "@/data/whyData";
import { AnimatedStatNumber } from "./AnimatedStatNumber";

export interface WhyStatTileProps {
  tile: StatTileData;
  index: number;
  isInView?: boolean;
}

export function WhyStatTile({
  tile,
  index,
  isInView = true,
}: WhyStatTileProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const isLeftCol = index % 2 === 0;
  const isTopRow = index < 2;

  // Stagger start delay slightly by tile index: 150ms, 250ms, 350ms, 450ms
  const staggerDelay = 150 + index * 100;

  return (
    <div
      className={`flex flex-col justify-center p-8 text-start transition-colors duration-300 hover:bg-white/[0.04] sm:p-10 ${
        isLeftCol ? "border-e border-white/10" : ""
      } ${isTopRow ? "border-b border-white/10" : ""}`}
    >
      <span className="mb-1.5 font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        <AnimatedStatNumber
          value={tile.number}
          isInView={isInView}
          delay={staggerDelay}
          duration={1600}
        />
      </span>
      <span className="text-xs leading-snug font-medium text-white/60 sm:text-[13px]">
        {isArabic ? tile.labelAr : tile.labelEn}
      </span>
    </div>
  );
}

export function WhyStatsMatrix({ isInView = true }: { isInView?: boolean }) {
  return (
    <div className="relative grid grid-cols-2 rounded-none border-none bg-transparent">
      {WHY_STATS_DATA.map((tile, idx) => (
        <WhyStatTile key={idx} tile={tile} index={idx} isInView={isInView} />
      ))}
    </div>
  );
}
