import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface SuccessMembershipSummaryProps {
  currentDateFormatted: string;
  nextYearDateFormatted?: string;
  isAr: boolean;
  email?: string;
}

export function SuccessMembershipSummary({
  currentDateFormatted,
  isAr,
}: SuccessMembershipSummaryProps) {
  return (
    <div className="actv mb-6 overflow-hidden rounded-2xl border border-[#419257]/40 bg-[#419257]/5 text-start shadow-xs">
      {/* Top Banner: Status Header */}
      <div className="flex items-center justify-between border-b border-[#419257]/20 bg-[#419257]/10 p-3.5 px-5 text-xs font-bold sm:text-sm">
        <div className="flex items-center gap-2 text-[#419257]">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>
            {isAr
              ? "تفاصيل العضوية وبيانات الحساب"
              : "Membership & Account Summary"}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-800">
          {isAr ? "عضوية مجانية دائمة" : "Complimentary Tier"}
        </span>
      </div>

      {/* Grid of Details (Clean 6 items, non-redundant) */}
      <div className="grid grid-cols-1 gap-px bg-[#419257]/20 sm:grid-cols-2">
        {/* Item 1: Membership Type */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "نوع العضوية" : "Membership Tier"}
          </span>
          <span className="font-bold text-[#16162c]">
            {isAr ? "عضوية Essential" : "Essential Membership"}
          </span>
        </div>

        {/* Item 2: Membership Fee */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "رسوم العضوية" : "Membership fee"}
          </span>
          <span className="font-bold text-[#419257]">
            {isAr ? "مجاناً" : "Free"}
          </span>
        </div>

        {/* Item 3: Membership Status */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "حالة العضوية التجارية" : "Membership Status"}
          </span>
          <span className="flex items-center gap-1 font-bold text-[#419257]">
            <span>✓</span>
            <span>{isAr ? "مؤكدة (مجاناً)" : "Confirmed (Free)"}</span>
          </span>
        </div>

        {/* Item 4: Account Status */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "حالة الحساب (تسجيل الدخول)" : "Account Status (Sign In)"}
          </span>
          <span className="font-bold text-[#e11119]">
            {isAr
              ? "غير مفعل — بانتظار التفعيل"
              : "Inactive — Pending Activation"}
          </span>
        </div>

        {/* Item 5: Start Date */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "تاريخ البدء" : "Start date"}
          </span>
          <span className="font-bold text-[#16162c]">
            {currentDateFormatted}
          </span>
        </div>

        {/* Item 6: Duration */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "المدة والصلاحية" : "Duration"}
          </span>
          <span className="font-bold text-[#419257]">
            {isAr ? "دائم / Free Forever" : "Free Forever"}
          </span>
        </div>
      </div>
    </div>
  );
}
