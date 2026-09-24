import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanContentDefinition } from "@/data/membershipPlansData";
import {
  CORE_12_HUB_SERVICES_EN,
  CORE_12_HUB_SERVICES_AR,
} from "@/data/membershipPlansData";

export interface TierServicesAccordionProps {
  planData?: PlanContentDefinition;
  isAr: boolean;
}

export function TierServicesAccordion({
  planData,
  isAr,
}: TierServicesAccordionProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const hubServicesList = isAr
    ? CORE_12_HUB_SERVICES_AR
    : CORE_12_HUB_SERVICES_EN;

  return (
    <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-800">
          {isAr ? planData?.hubServicesHeaderAr : planData?.hubServicesHeaderEn}
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
  );
}
