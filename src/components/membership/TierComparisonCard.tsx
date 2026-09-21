"use client";

import React, { useState } from "react";
import {
  Check,
  Crown,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  MembershipTierCatalogItem,
  MembershipTierCode,
  isUpgradeAllowed,
  isDowngrade,
} from "@/types/membership";
import {
  MEMBERSHIP_PLANS_DATA,
  CORE_12_HUB_SERVICES_EN,
  CORE_12_HUB_SERVICES_AR,
} from "@/data/membershipPlansData";
import { cn } from "@/lib/utils";

interface TierComparisonCardProps {
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

  const [servicesExpanded, setServicesExpanded] = useState(false);

  const planKey = tier.tier as MembershipTierCode;
  const planData = MEMBERSHIP_PLANS_DATA[planKey];

  const isCurrent = Boolean(tier.isCurrentPlan);
  const canUpgrade = isUpgradeAllowed(currentTier, tier.tier);
  const canDowngrade = isDowngrade(currentTier, tier.tier);

  const isPro = tier.tier === "PROFESSIONAL";
  const isMaster = tier.tier === "MASTER";

  const tierTitle = isAr
    ? planData?.nameAr || tier.name
    : planData?.nameEn || tier.name;
  const headline = isAr ? planData?.headlineAr : planData?.headlineEn;
  const tagline = isAr
    ? planData?.taglineAr || tier.tagline
    : planData?.taglineEn || tier.tagline;
  const feeLabel = isAr ? planData?.feeLabelAr : planData?.feeLabelEn;

  // Price formatting
  const priceDisplay =
    tier.annualFee === 0
      ? isAr
        ? "مجاناً"
        : "Free"
      : `$${formatNumber(tier.annualFee)} / ${isAr ? "سنة" : "year"}`;

  const hubServicesList = isAr
    ? CORE_12_HUB_SERVICES_AR
    : CORE_12_HUB_SERVICES_EN;
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
            /* User requested: Use the navy blue from the identity (#141428) */
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

        {/* Tier Title & Taglines (Refined font sizes) */}
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
              {priceDisplay}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] font-medium text-slate-500">
            {feeLabel}
          </p>
        </div>

        {/* Comparison Metrics Matrix */}
        <div className="mb-5 space-y-2 rounded-xl border border-slate-100 bg-white p-3 text-xs">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
            <span className="text-[11.5px] text-slate-500">
              {isAr
                ? "سعر الأعضاء على منتجات IBDL:"
                : "Member rate on eligible IBDL products:"}
            </span>
            <span className="font-bold text-slate-900">
              {isAr
                ? planData?.metrics.discountRateAr
                : planData?.metrics.discountRateEn}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
            <span className="text-[11.5px] text-slate-500">
              {isAr
                ? "خدمات المنصة الأساسية مشمولة:"
                : "Core Hub Services included:"}
            </span>
            <span
              className={cn(
                "font-bold",
                planData?.metrics.coreHubServicesEn === "Yes"
                  ? "text-emerald-700"
                  : "text-slate-600"
              )}
            >
              {isAr
                ? planData?.metrics.coreHubServicesAr
                : planData?.metrics.coreHubServicesEn}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
            <span className="text-[11.5px] text-slate-500">
              {isAr
                ? "اعتماد البرامج التدريبية:"
                : "Programme accreditation included:"}
            </span>
            <span className="font-bold text-slate-900">
              {isAr
                ? planData?.metrics.accreditationAr
                : planData?.metrics.accreditationEn}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-[11.5px] text-slate-500">
              {isAr
                ? "شهادات IBDL المجانية للمتدربين:"
                : "Free IBDL certificates for trainees:"}
            </span>
            <span className="font-bold text-slate-900">
              {isAr
                ? planData?.metrics.freeCertificatesAr
                : planData?.metrics.freeCertificatesEn}
            </span>
          </div>
        </div>

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

        {/* Hub Services Section */}
        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800">
              {isAr
                ? planData?.hubServicesHeaderAr
                : planData?.hubServicesHeaderEn}
            </h4>
            <button
              type="button"
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 transition hover:text-slate-900"
              aria-expanded={servicesExpanded}
            >
              <span>
                {servicesExpanded
                  ? isAr
                    ? "إخفاء التفاصيل"
                    : "Collapse"
                  : isAr
                    ? "عرض الـ 12 خدمة"
                    : "View all 12"}
              </span>
              {servicesExpanded ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
          </div>

          <div
            className={cn(
              "mt-2.5 space-y-1.5 text-[11px] text-slate-600 transition-all",
              servicesExpanded ? "block" : "hidden"
            )}
          >
            {hubServicesList.map((svc, sIdx) => (
              <div key={sIdx} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                <span className="leading-tight">{svc}</span>
              </div>
            ))}
          </div>

          {!servicesExpanded && (
            <p className="mt-1.5 text-[11px] text-slate-400 italic">
              {isAr
                ? "تشمل تحليل الاحتياجات، وهندسة التعلم، وتطوير المحتوى، وقياس ROI، والدعم الاستشاري..."
                : "Includes TNA assistance, learning architecture, proposal support, ROI toolkit, and help desk..."}
            </p>
          )}
        </div>

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
