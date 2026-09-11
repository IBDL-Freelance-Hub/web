"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import { PillarItem } from "@/data/offerPillarsData";
import { PillarCardNumber } from "./PillarCardNumber";
import { cn } from "@/lib/utils";

export interface OfferPillarsCardProps {
  item: PillarItem;
  index?: number;
  isInView?: boolean;
}

export function OfferPillarsCard({
  item,
  index = 0,
  isInView = true,
}: OfferPillarsCardProps) {
  const { isRTL, locale } = useLocale();
  const delayMs = 200 + Math.min(index * 100, 300);

  return (
    <div
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "pillar group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.11] bg-gradient-to-br from-white/[0.075] to-white/[0.025] p-[30px_26px_26px] transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-white/[0.24] hover:bg-gradient-to-br hover:from-white/[0.11] hover:to-white/[0.04]",
        "transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "translate-y-12 opacity-0 blur-[5px]"
      )}
    >
      {/* Top Glowing Border */}
      <div
        className="via-green-lit absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-450 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div>
        <PillarCardNumber value={item.num} isInView={isInView} />

        <h3 className="mb-2.5 text-[20px] leading-[1.3] font-bold text-white">
          {locale === "ar" ? item.titleAr : item.titleEn}
        </h3>

        <p className="mb-4 flex-1 text-[14.8px] leading-[1.62] text-white/70">
          {locale === "ar" ? item.descAr : item.descEn}
        </p>
      </div>

      <Link
        href={item.href}
        className="pillar__link group-hover:text-green-lit inline-flex items-center gap-[9px] text-[14.5px] font-bold text-white transition-all duration-300 group-hover:gap-[14px]"
      >
        <span>{locale === "ar" ? item.linkTextAr : item.linkTextEn}</span>
        {isRTL ? (
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        ) : (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </Link>
    </div>
  );
}

export interface OfferPillarsGridProps {
  pillars: PillarItem[];
  isInView?: boolean;
}

export function OfferPillarsGrid({
  pillars,
  isInView = true,
}: OfferPillarsGridProps) {
  return (
    <div className="pillars grid grid-cols-1 gap-[22px] md:grid-cols-3">
      {pillars.map((item, idx) => (
        <OfferPillarsCard
          key={item.num}
          item={item}
          index={idx}
          isInView={isInView}
        />
      ))}
    </div>
  );
}
