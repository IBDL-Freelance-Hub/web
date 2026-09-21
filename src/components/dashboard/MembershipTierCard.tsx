"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  XCircle,
} from "lucide-react";
import type { MembershipStatus, DashboardMembershipDto } from "@/types/member";
import type { MembershipDto } from "@/types/api";

interface MembershipTierCardProps {
  membership: DashboardMembershipDto | MembershipDto | null;
  isAr: boolean;
}

export function formatDate(dateString?: string, isAr?: boolean): string {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * DSH-14: Expired membership must NOT display as "Essential".
 * The actual paid tier name must still be shown (e.g. "Professional Membership (Expired)"),
 * never relabeled as "Essential".
 */
export function getDisplayedTierName(
  tier?: string | null,
  status?: MembershipStatus | string | null,
  isAr?: boolean
): string {
  const effectiveTier = tier || "ESSENTIAL";
  const normalized = effectiveTier.toUpperCase();

  let baseName = "";
  if (normalized === "MASTER") {
    baseName = isAr ? "عضوية خبير معتمد" : "Master Membership";
  } else if (normalized === "PROFESSIONAL") {
    baseName = isAr ? "عضوية مهنية" : "Professional Membership";
  } else {
    baseName = isAr ? "عضوية أساسية" : "Essential Membership";
  }

  // DSH-14: Preserve paid tier name when EXPIRED
  if (status === "EXPIRED") {
    return isAr ? `${baseName} (منتهية)` : `${baseName} (Expired)`;
  }

  return baseName;
}

/**
 * FIX 2: Exhaustive switch for all six MembershipStatus states
 * Catches any unhandled state at compile time via `satisfies never`.
 */
export function getMembershipStatusDetails(
  status: MembershipStatus,
  isAr?: boolean,
  daysUntilRenewal?: number,
  expiryDateFormatted?: string
) {
  switch (status) {
    case "ACTIVE":
      return {
        label: isAr ? "عضوية سارية" : "Active",
        badgeClasses: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dotClass: "bg-emerald-500",
        bannerClasses:
          "border-emerald-200/80 bg-emerald-50/70 text-emerald-900",
        iconType: "active" as const,
        bannerText: isAr
          ? `عضويتك المعتمدة نشطة ومستمرة حتى ${expiryDateFormatted || "—"}.`
          : `Your accredited membership is active and valid until ${expiryDateFormatted || "—"}.`,
      };
    case "GRACE_PERIOD":
      return {
        label: isAr ? "فترة سماح" : "Grace Period",
        badgeClasses: "border-amber-200 bg-amber-50 text-amber-700",
        dotClass: "bg-amber-500",
        bannerClasses: "border-amber-200 bg-amber-50/70 text-amber-900",
        iconType: "grace" as const,
        bannerText: isAr
          ? `عضويتك في فترة سماح. متبقي ${daysUntilRenewal ?? 0} يوم للتجديد قبل تعليق الصلاحيات.`
          : `Your membership is in a grace period. ${daysUntilRenewal ?? 0} days remaining to renew before access is suspended.`,
      };
    case "EXPIRED":
      return {
        label: isAr ? "منتهية الصلاحية" : "Expired",
        badgeClasses: "border-rose-200 bg-rose-50 text-rose-700",
        dotClass: "bg-rose-500",
        bannerClasses: "border-rose-200 bg-rose-50/70 text-rose-900",
        iconType: "expired" as const,
        bannerText: isAr
          ? "انتهت صلاحية عضويتك. يرجى تجديد الاشتراك لاستعادة مزايا الاعتماد والظهور في الدليل."
          : "Your membership has expired. Renew your subscription to restore your benefits and directory standing.",
      };
    case "PENDING_PAYMENT":
      return {
        label: isAr ? "بانتظار الدفع" : "Pending Payment",
        badgeClasses: "border-amber-200 bg-amber-50 text-amber-700",
        dotClass: "bg-amber-500",
        bannerClasses: "border-amber-200 bg-amber-50/70 text-amber-900",
        iconType: "pending" as const,
        bannerText: isAr
          ? "الاشتراك بانتظار إتمام عملية السداد لتفعيل كافة المزايا."
          : "Your membership is pending payment completion.",
      };
    case "SUSPENDED":
      return {
        label: isAr ? "معلقة" : "Suspended",
        badgeClasses: "border-rose-200 bg-rose-50 text-rose-700",
        dotClass: "bg-rose-500",
        bannerClasses: "border-rose-200 bg-rose-50/70 text-rose-900",
        iconType: "suspended" as const,
        bannerText: isAr
          ? "تم تعليق العضوية مؤقتاً. يرجى مراجعة الدعم الفني."
          : "Your membership has been temporarily suspended. Please contact support.",
      };
    case "CANCELLED":
      return {
        label: isAr ? "ملغاة" : "Cancelled",
        badgeClasses: "border-slate-200 bg-slate-100 text-slate-700",
        dotClass: "bg-slate-500",
        bannerClasses: "border-slate-200 bg-slate-50 text-slate-800",
        iconType: "cancelled" as const,
        bannerText: isAr
          ? "تم إلغاء العضوية."
          : "Your membership has been cancelled.",
      };
    default: {
      const _exhaustiveCheck: never = status;
      return {
        label: String(_exhaustiveCheck),
        badgeClasses: "border-slate-200 bg-slate-50 text-slate-600",
        dotClass: "bg-slate-400",
        bannerClasses: "border-slate-200 bg-slate-50 text-slate-600",
        iconType: "expired" as const,
        bannerText: "Status unknown",
      };
    }
  }
}

export function MembershipTierCard({
  membership,
  isAr,
}: MembershipTierCardProps) {
  const status = (membership?.status as MembershipStatus) || "ACTIVE";
  const expiryDate =
    (membership && "renewsOn" in membership ? membership.renewsOn : null) ||
    (membership && "endDate" in membership ? membership.endDate : null);
  const formattedExpiry = formatDate(expiryDate || undefined, isAr);
  const daysUntilRenewal =
    membership && "daysUntilRenewal" in membership
      ? membership.daysUntilRenewal
      : undefined;

  const statusDetails = getMembershipStatusDetails(
    status,
    isAr,
    daysUntilRenewal,
    formattedExpiry
  );

  const displayedTierName = getDisplayedTierName(
    membership?.tier,
    status,
    isAr
  );

  return (
    <section
      aria-labelledby="membership-card-heading"
      className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8 lg:col-span-2"
    >
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-slate-700" />
            <h3
              id="membership-card-heading"
              className="text-base font-bold text-slate-900"
            >
              {isAr ? "سجل العضوية والاشتراك" : "Membership record"}
            </h3>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusDetails.badgeClasses}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${statusDetails.dotClass}`}
            />
            {statusDetails.label}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-[11px] font-medium text-slate-500">
              {isAr ? "فئة العضوية" : "Membership Tier"}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {displayedTierName}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-[11px] font-medium text-slate-500">
              {isAr ? "تاريخ بدء الاشتراك" : "Start Date"}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {formatDate(membership?.startDate, isAr)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-[11px] font-medium text-slate-500">
              {isAr ? "تاريخ الانتهاء والتجديد" : "Expiry / Renewal"}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {formattedExpiry}
            </p>
          </div>
        </div>

        {/* Dynamic Status Explanation Strip (DSH-08, DSH-09, DSH-13, DSH-14) */}
        <div className="mt-6">
          <div
            className={`flex items-center gap-3 rounded-xl border p-3.5 text-xs ${statusDetails.bannerClasses}`}
          >
            {statusDetails.iconType === "active" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            ) : statusDetails.iconType === "grace" ? (
              <Clock className="h-4 w-4 shrink-0 text-amber-600" />
            ) : statusDetails.iconType === "cancelled" ? (
              <XCircle className="h-4 w-4 shrink-0 text-slate-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            )}
            <span>{statusDetails.bannerText}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          {isAr ? "التجديد السنوي تلقائي" : "Annual billing cycle"}
        </span>
      </div>
    </section>
  );
}
