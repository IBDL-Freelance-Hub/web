import React from "react";
import { Crown, Sparkles } from "lucide-react";
import type { MembershipTierCatalogItem } from "@/types/membership";
import type { PlanContentDefinition } from "@/data/membershipPlansData";

export interface TierHeaderProps {
  tier: MembershipTierCatalogItem;
  planData?: PlanContentDefinition;
  isCurrent: boolean;
  isPro: boolean;
  isMaster: boolean;
  isAr: boolean;
  formattedFee: string;
}

export function TierHeader({
  tier,
  planData,
  isCurrent,
  isPro,
  isMaster,
  isAr,
  formattedFee,
}: TierHeaderProps) {
  const tierTitle = isAr
    ? planData?.nameAr || tier.name
    : planData?.nameEn || tier.name;
  const headline = isAr ? planData?.headlineAr : planData?.headlineEn;
  const tagline = isAr
    ? planData?.taglineAr || tier.tagline
    : planData?.taglineEn || tier.tagline;
  const feeLabel = isAr ? planData?.feeLabelAr : planData?.feeLabelEn;

  return (
    <>
      {/* Top Badges */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        {isCurrent ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {isAr ? "خطتك الحالية الفعالة" : "Your current plan"}
          </span>
        ) : isPro ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-bold text-[#e11119]">
            <Sparkles className="h-3 w-3" />
            {isAr ? "الأكثر شيوعاً" : "Most Popular"}
          </span>
        ) : isMaster ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#141428] bg-[#141428] px-3 py-1 text-xs font-semibold text-amber-400 shadow-xs">
            <Crown className="h-3.5 w-3.5 stroke-[2.2] text-amber-400" />
            {isAr ? "الوصول الكامل والاعتراف" : "Full Access & Recognition"}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            {isAr ? "مجتمع المدربين" : "Community Tier"}
          </span>
        )}

        {/* Member discount rate badge */}
        {tier.discountRate > 0 && (
          <span className="rounded-full border border-slate-200/60 bg-slate-100/90 px-2.5 py-0.5 text-xs font-bold text-slate-700">
            {tier.discountRate}% {isAr ? "سعر الأعضاء" : "Member Rate"}
          </span>
        )}
      </div>

      {/* Tier Title & Taglines */}
      <div>
        <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          {tierTitle}
        </h3>
        {headline && (
          <p className="mt-1 text-xs font-semibold text-slate-800 sm:text-[13px]">
            {headline}
          </p>
        )}
        <p className="mt-0.5 min-h-[32px] text-xs leading-relaxed text-slate-500">
          {tagline}
        </p>
      </div>

      {/* Price Box */}
      <div className="mt-4 mb-5 rounded-2xl border border-slate-100 bg-[#f8fafc] p-3.5 sm:p-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {formattedFee}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] font-medium text-slate-500">
          {feeLabel}
        </p>
      </div>
    </>
  );
}
