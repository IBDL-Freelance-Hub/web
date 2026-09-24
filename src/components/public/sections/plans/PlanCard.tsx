"use client";

import { Check } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import { PlanTierData, CORE_SERVICES_LIST } from "@/data/plansData";
import { cn } from "@/lib/utils";

export interface PlanCardProps {
  tier: PlanTierData;
  index?: number;
  isInView?: boolean;
}

export function PlanCard({ tier, index = 0, isInView = true }: PlanCardProps) {
  const { locale, formatNumber } = useLocale();
  const delayMs = 400 + index * 150;

  const isAr = locale === "ar";
  const benefits = isAr ? tier.benefitsAr : tier.benefitsEn;

  return (
    <div
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "tier border-line-border bg-paper relative flex min-h-full flex-col rounded-[24px] border p-[36px_30px_30px] transition-all duration-450 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(20,20,40,0.09)]",
        tier.isTop &&
          "tier--top border-navy shadow-[0_8px_24px_rgba(20,20,40,0.06)]",
        "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-14 opacity-0 blur-[6px]"
      )}
    >
      {/* 1. Kind Badge */}
      <span className="tier__kind text-red-brand mb-3 block text-[11.6px] font-extrabold tracking-[0.13em] uppercase">
        {isAr ? tier.kindAr : tier.kindEn}
      </span>

      {/* 2. Tier Name */}
      <h3 className="tier__name mb-1.5 text-[22px] font-bold tracking-[-0.015em] text-[#16162c]">
        {isAr ? tier.nameAr : tier.nameEn}
      </h3>

      {/* 3. Tier Promise */}
      <p className="tier__promise text-navy mb-5 text-[15.2px] font-bold">
        {isAr ? tier.promiseAr : tier.promiseEn}
      </p>

      {/* 4. Price Block */}
      <div className="tier__price border-line-border bg-paper-muted mb-6 rounded-[16px] border p-[16px_18px]">
        <b className="mb-1 block text-[19px] font-bold tracking-[-0.015em] text-[#16162c]">
          {isAr
            ? tier.id === "essential"
              ? "مجاناً"
              : `${formatNumber(tier.priceEn.split(" ")[0])} / سنة`
            : tier.priceEn}
        </b>
        <small className="block text-[12.4px] text-[#6a6a86]">
          {isAr ? tier.periodAr : tier.periodEn}
        </small>
      </div>

      {/* 5. Sub-condition Tagline */}
      <p className="mb-6 text-[14px] leading-relaxed text-[#3e3e5c]">
        {isAr ? tier.taglineAr : tier.taglineEn}
      </p>

      {/* 6. Benefits List */}
      <ul className="tier__list mb-[26px] grid list-none gap-3 p-0 text-[14.8px] leading-[1.55] text-[#3e3e5c]">
        {benefits.map((b, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <Check className="text-green-brand mt-0.5 h-4 w-4 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* 7. Embedded 12 Core Services Block */}
      <div className="svclist border-line-border mb-5 border-t pt-[18px]">
        <span
          className={cn(
            "svclist__t mb-3.5 inline-block rounded-full px-3 py-1.5 text-[11.8px] font-extrabold tracking-[0.09em] uppercase",
            tier.svcPillTone === "green"
              ? "border-green-brand/25 bg-green-brand/10 text-green-brand border"
              : "border-red-brand/20 bg-red-brand/[0.07] text-red-brand border"
          )}
        >
          {isAr ? tier.svcPillAr : tier.svcPillEn}
        </span>

        <ul className="svclist__l grid list-none gap-2.5 p-0 text-[13.5px] text-[#3e3e5c]">
          {CORE_SERVICES_LIST.map((svc, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="text-green-brand mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{isAr ? svc.ar : svc.en}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Fine Print Text */}
      <p className="tier__fine mt-auto mb-0 text-[12.2px] leading-relaxed text-[#6a6a86]">
        {isAr ? tier.fineAr : tier.fineEn}
      </p>
    </div>
  );
}

export { PlansGrid } from "./PlansGrid";
export type { PlansGridProps } from "./PlansGrid";
export { PlansNote } from "./PlansNote";
export type { PlansNoteProps } from "./PlansNote";
