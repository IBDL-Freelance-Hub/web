"use client";

import React from "react";
import { Check, ArrowRight, ArrowLeft, Info } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  MembershipTierCatalogItem,
  MembershipTierCode,
  isUpgradeAllowed,
  isDowngrade,
} from "@/types/membership";
import { MEMBERSHIP_PLANS_DATA } from "@/data/membershipPlansData";
import { cn } from "@/lib/utils";
import { TierHeader, TierMetricsMatrix, TierServicesAccordion } from "./tiers";

export interface TierComparisonCardProps {
  tier: MembershipTierCatalogItem;
  currentTier?: string | null;
  onUpgrade: (tier: MembershipTierCatalogItem) => void;
  onDowngrade: (tier: MembershipTierCatalogItem) => void;
}

export function TierComparisonCard({
  tier,
  currentTier,
  onUpgrade,
  onDowngrade,
}: TierComparisonCardProps) {
  const { locale, formatNumber } = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const planKey = tier.tier as MembershipTierCode;
  const planData = MEMBERSHIP_PLANS_DATA[planKey];

  const isCurrent = Boolean(tier.isCurrentPlan);
  const canUpgrade = isUpgradeAllowed(currentTier, tier.tier);
  const canDowngrade = isDowngrade(currentTier, tier.tier);

  const isPro = tier.tier === "PROFESSIONAL";
  const isMaster = tier.tier === "MASTER";

  // Price formatting
  const priceDisplay =
    tier.annualFee === 0
      ? isAr
        ? "مجاناً"
        : "Free"
      : `$${formatNumber(tier.annualFee)} / ${isAr ? "سنة" : "year"}`;

  const featuresList = isAr ? planData?.featuresAr : planData?.featuresEn;

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md sm:rounded-3xl sm:p-7",
        isCurrent &&
          "border-emerald-500/60 bg-emerald-50/10 ring-2 ring-emerald-500/20",
        isPro &&
          !isCurrent &&
          "border-[#e11119]/40 ring-1 ring-[#e11119]/20 hover:border-[#e11119]",
        isMaster && !isCurrent && "border-slate-800/40 hover:border-[#141428]",
        !isCurrent &&
          !isPro &&
          !isMaster &&
          "border-slate-200 hover:border-slate-300"
      )}
    >
      <div>
        <TierHeader
          tier={tier}
          planData={planData}
          isCurrent={isCurrent}
          isPro={isPro}
          isMaster={isMaster}
          isAr={isAr}
          formattedFee={priceDisplay}
        />

        <TierMetricsMatrix planData={planData} isAr={isAr} />

        {/* Features Checklist */}
        <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-700">
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            {isPro || isMaster
              ? isAr
                ? "ما تشمله هذه الخطة"
                : "Plan Entitlements"
              : isAr
                ? "مزايا العضوية"
                : "Included Features"}
          </p>
          <ul className="space-y-2">
            {featuresList?.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span className="text-[11.5px] leading-snug text-slate-600 sm:text-xs">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <TierServicesAccordion planData={planData} isAr={isAr} />

        {/* Plan Footnote Disclaimer */}
        <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] leading-relaxed text-slate-400">
          {isAr ? planData?.disclaimerAr : planData?.disclaimerEn}
        </p>
      </div>

      {/* CTA Button and Certification Callout */}
      <div className="mt-6 border-t border-slate-100 pt-3.5">
        {isCurrent ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-center text-xs font-bold text-slate-400 shadow-none select-none"
          >
            {isAr ? "خطتك الحالية الفعالة" : "Your current plan"}
          </button>
        ) : canDowngrade ? (
          <button
            type="button"
            onClick={() => onDowngrade(tier)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-xs font-bold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99]"
          >
            {isAr ? "اختر هذه الخطة" : "Choose this plan"}
          </button>
        ) : canUpgrade ? (
          <button
            type="button"
            onClick={() => onUpgrade(tier)}
            aria-label={`Upgrade to ${tier.name}`}
            className={cn(
              "group flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-xs transition active:scale-[0.99]",
              isPro
                ? "bg-[#e11119] shadow-red-500/10 hover:bg-[#b60d14]"
                : "bg-slate-900 hover:bg-slate-800"
            )}
          >
            <span>{isAr ? `ترقية إلى هذه الخطة` : `Upgrade to this plan`}</span>
            <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onDowngrade(tier)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-xs font-bold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99]"
          >
            {isAr ? "اختر هذه الخطة" : "Choose this plan"}
          </button>
        )}

        {/* Callout below button (for Professional and Master) */}
        {(planData?.calloutBelowButtonEn || planData?.calloutBelowButtonAr) && (
          <div className="mt-2.5 flex items-start gap-1.5 rounded-lg border border-amber-200/60 bg-amber-50/70 p-2 text-[10.5px] leading-snug text-amber-900">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
            <span>
              {isAr
                ? planData?.calloutBelowButtonAr
                : planData?.calloutBelowButtonEn}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Compound component pattern attachment
TierComparisonCard.Header = TierHeader;
TierComparisonCard.Metrics = TierMetricsMatrix;
TierComparisonCard.Services = TierServicesAccordion;
