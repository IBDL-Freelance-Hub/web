"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { ServiceItem } from "@/data/servicesData";
import { ServiceCardNumber } from "./ServiceCardNumber";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  item: ServiceItem;
  index?: number;
  isInView?: boolean;
  onSelect?: (item: ServiceItem) => void;
}

export function ServiceCard({
  item,
  index = 0,
  isInView = true,
  onSelect,
}: ServiceCardProps) {
  const { locale } = useLocale();
  const delayMs = 200 + Math.min(index * 50, 300);

  return (
    <div
      onClick={() => onSelect?.(item)}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "svcard group relative flex min-h-[220px] cursor-pointer flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.11] bg-gradient-to-br from-white/[0.075] to-white/[0.025] p-7 transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.09] hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]",
        "transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-10 opacity-0 blur-[4px]"
      )}
    >
      {/* Top Accent Line */}
      <div
        className="via-green-lit absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Info Icon Badge */}
      <div className="absolute end-5 top-5 grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 group-hover:border-white/30 group-hover:bg-[#419257]/20 group-hover:text-[#419257]">
        <Info className="h-3.5 w-3.5" />
      </div>

      <div>
        <ServiceCardNumber value={item.num} isInView={isInView} />

        <h3 className="svcard__t mb-2.5 text-[18px] leading-[1.35] font-bold tracking-[-0.01em] text-white">
          {locale === "ar" ? item.titleAr : item.titleEn}
        </h3>

        <p className="svcard__d m-0 text-[14.8px] leading-[1.62] text-white/70">
          {locale === "ar" ? item.descAr : item.descEn}
        </p>
      </div>
    </div>
  );
}

export interface ServicesGridProps {
  services: ServiceItem[];
  isInView?: boolean;
  onSelectService?: (item: ServiceItem) => void;
}

export function ServicesGrid({
  services,
  isInView = true,
  onSelectService,
}: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
      {services.map((item, idx) => (
        <ServiceCard
          key={item.num}
          item={item}
          index={idx}
          isInView={isInView}
          onSelect={onSelectService}
        />
      ))}
    </div>
  );
}
