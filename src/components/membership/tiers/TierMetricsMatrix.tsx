import React from "react";
import { cn } from "@/lib/utils";
import type { PlanContentDefinition } from "@/data/membershipPlansData";

export interface TierMetricsMatrixProps {
  planData?: PlanContentDefinition;
  isAr: boolean;
}

export function TierMetricsMatrix({ planData, isAr }: TierMetricsMatrixProps) {
  return (
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
  );
}
