"use client";

import React from "react";
import { Star, ArrowRight, ArrowLeft, Info } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  MembershipTierCatalogItem,
  MembershipTierCode,
} from "@/types/membership";
import type { DashboardMembershipDto } from "@/types/member";
import type { MembershipDto } from "@/types/api";

interface CurrentMembershipBannerProps {
  membership: DashboardMembershipDto | MembershipDto | null;
  currentTierItem?: MembershipTierCatalogItem;
  onUpgradeClick?: () => void;
}

export function CurrentMembershipBanner({
  membership,
  currentTierItem,
  onUpgradeClick,
}: CurrentMembershipBannerProps) {
  const { locale, formatNumber } = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const tierCode = (
    membership?.tier ||
    currentTierItem?.tier ||
    "ESSENTIAL"
  ).toUpperCase() as MembershipTierCode;
  const status = membership?.status || "ACTIVE";

  // Tier Title
  let tierTitle = isAr ? "العضوية الأساسية" : "Essential Membership";
  let tierPrice = isAr ? "مجاناً" : "Free";

  if (tierCode === "PROFESSIONAL") {
    tierTitle = isAr ? "العضوية المهنية" : "Professional Membership";
    tierPrice = isAr ? `$${formatNumber(180)} / سنة` : "$180 / year";
  } else if (tierCode === "MASTER") {
    tierTitle = isAr ? "عضوية خبير معتمد" : "Master Membership";
    tierPrice = isAr ? `$${formatNumber(380)} / سنة` : "$380 / year";
  }

  // Format dates: "12 March 2026"
  const formatDateString = (dateStr?: string | null): string => {
    if (!dateStr) return isAr ? "—" : "—";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const startDateFormatted =
    formatDateString(membership?.startDate) ||
    (isAr ? "12 مارس 2026" : "12 March 2026");

  // End date / Renewal date
  const rawEndDate =
    (membership && "renewsOn" in membership
      ? (membership as DashboardMembershipDto).renewsOn
      : null) ||
    (membership && "endDate" in membership
      ? (membership as MembershipDto).endDate
      : null);

  const endDateFormatted =
    tierCode === "ESSENTIAL"
      ? isAr
        ? "دائم"
        : "Permanent"
      : formatDateString(rawEndDate) ||
        (isAr ? "12 مارس 2027" : "12 March 2027");

  // Payment Status details
  const isPaid = tierCode !== "ESSENTIAL" && status === "ACTIVE";
  const isPending = status === "PENDING_PAYMENT";
  const canUpgrade = tierCode !== "MASTER";

  return (
    <section
      aria-label={isAr ? "العضوية الحالية" : "Current Membership"}
      className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs sm:rounded-3xl sm:p-6"
    >
      {/* Top Bar: Icon + Titles + Status + Upgrade Action */}
      <div className="flex flex-col justify-between gap-3.5 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100/80 bg-emerald-50 text-emerald-600 sm:h-11 sm:w-11">
            <Star className="h-5 w-5 stroke-[2]" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase sm:text-[11px]">
              {isAr ? "العضوية الحالية" : "CURRENT MEMBERSHIP"}
            </p>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {tierTitle}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          {/* Status Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {isAr
              ? status === "ACTIVE"
                ? "نشطة"
                : status === "PENDING_PAYMENT"
                  ? "في انتظار السداد"
                  : status
              : status === "ACTIVE"
                ? "Active"
                : status}
          </span>

          {/* Upgrade CTA Button */}
          {canUpgrade && onUpgradeClick && (
            <button
              type="button"
              onClick={onUpgradeClick}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              <span>{isAr ? "ترقية" : "Upgrade"}</span>
              <ArrowIcon className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Middle Grid Row: Price | Start date | End date | Payment status */}
      <div className="mt-4 rounded-xl border border-slate-100 bg-[#f8fafc]/90 p-3.5 sm:p-4">
        <div className="grid grid-cols-2 gap-3 divide-y divide-slate-200/60 sm:gap-4 sm:divide-x sm:divide-y-0 md:grid-cols-4 sm:rtl:divide-x-reverse">
          {/* 1. Price */}
          <div className="pt-1.5 first:px-0 sm:px-2.5 sm:pt-0">
            <p className="text-[11px] font-medium text-slate-400">
              {isAr ? "السعر" : "Price"}
            </p>
            <p className="mt-0.5 text-xs font-bold text-slate-900 sm:text-sm">
              {tierPrice}
            </p>
          </div>

          {/* 2. Start date */}
          <div className="pt-1.5 sm:px-3 sm:pt-0">
            <p className="text-[11px] font-medium text-slate-400">
              {isAr ? "تاريخ البدء" : "Start date"}
            </p>
            <p className="mt-0.5 text-xs font-bold text-slate-900 sm:text-sm">
              {startDateFormatted}
            </p>
          </div>

          {/* 3. End date */}
          <div className="pt-1.5 sm:px-3 sm:pt-0">
            <p className="text-[11px] font-medium text-slate-400">
              {isAr ? "تاريخ الانتهاء" : "End date"}
            </p>
            <p className="mt-0.5 text-xs font-bold text-slate-900 sm:text-sm">
              {endDateFormatted}
            </p>
          </div>

          {/* 4. Payment status */}
          <div className="pt-1.5 sm:px-3 sm:pt-0">
            <p className="text-[11px] font-medium text-slate-400">
              {isAr ? "حالة الدفع" : "Payment status"}
            </p>
            <div className="mt-0.5">
              {isPending ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {isAr ? "معلق" : "Pending"}
                </span>
              ) : isPaid ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {isAr ? "مدفوع" : "Paid"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  {isAr ? "مجاني" : "Free"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
        <Info className="h-3 w-3 shrink-0 text-slate-400" />
        <span>
          {isAr
            ? "مدة العضوية الافتراضية سنة واحدة ويتم تحديدها بواسطة IBDL."
            : "Membership period defaults to one year and is configurable by IBDL."}
        </span>
      </div>
    </section>
  );
}
