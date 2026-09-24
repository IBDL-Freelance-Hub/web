import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  XCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import type { MembershipStatus, DashboardMembershipDto } from "@/types/member";
import type { MembershipDto } from "@/types/api";
import {
  formatDate,
  getDisplayedTierName,
  getMembershipStatusDetails,
} from "./membershipCardUtils";

export { formatDate, getDisplayedTierName, getMembershipStatusDetails };

interface MembershipTierCardProps {
  membership: DashboardMembershipDto | MembershipDto | null;
  isAr: boolean;
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <Link
          href="/membership"
          className="inline-flex items-center gap-1 font-bold text-[#e11119] transition hover:underline"
        >
          <span>{isAr ? "عرض الباقات والترقية" : "View Plans & Upgrade"}</span>
          {isAr ? (
            <ArrowLeft className="h-3.5 w-3.5" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5" />
          )}
        </Link>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          {isAr ? "التجديد السنوي تلقائي" : "Annual billing cycle"}
        </span>
      </div>
    </section>
  );
}
