"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import type { MembershipDto } from "@/types/api";
import { getTierDisplay } from "./DashboardHeader";

interface MembershipTierCardProps {
  membership: MembershipDto | null;
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

export function MembershipTierCard({
  membership,
  isAr,
}: MembershipTierCardProps) {
  const isMembershipActive = membership?.status === "ACTIVE";

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
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isMembershipActive
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-amber-200 bg-amber-50 text-amber-700"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isMembershipActive ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {isMembershipActive
              ? isAr
                ? "عضوية سارية"
                : "Active"
              : isAr
                ? "غير نشطة"
                : "Inactive"}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-[11px] font-medium text-slate-500">
              {isAr ? "فئة العضوية" : "Membership Tier"}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {getTierDisplay(membership?.tier, isAr)}
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
              {formatDate(membership?.endDate, isAr)}
            </p>
          </div>
        </div>

        {/* DSH-08 / DSH-09 Status Explanation Strip */}
        <div className="mt-6">
          {isMembershipActive ? (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-3.5 text-xs text-emerald-900">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                {isAr
                  ? `عضويتك المعتمدة نشطة ومستمرة حتى ${formatDate(membership?.endDate, isAr)}.`
                  : `Your accredited membership is active and valid until ${formatDate(membership?.endDate, isAr)}.`}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
              <span>
                {isAr
                  ? "عضويتك غير نشطة حالياً. يرجى تجديد الاشتراك للوصول إلى كافة أدوات الاعتماد ودليل المدربين."
                  : "Your membership is currently inactive. Renew or upgrade to unlock full member privileges and directory access."}
              </span>
            </div>
          )}
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
