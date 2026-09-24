import React from "react";
import type { MembershipTierCatalogItem } from "@/types/membership";

export interface CheckoutOrderSummaryProps {
  tier: MembershipTierCatalogItem;
  formattedFee: string;
  isAr: boolean;
}

export function CheckoutOrderSummary({
  tier,
  formattedFee,
  isAr,
}: CheckoutOrderSummaryProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
      <h4 className="text-xs font-bold tracking-wider text-slate-700 uppercase">
        {isAr ? "ملخص الطلب" : "Order Summary"}
      </h4>

      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>
          {isAr
            ? `اشتراك سنوي (${tier.name})`
            : `Annual Membership (${tier.name})`}
        </span>
        <span className="font-semibold text-slate-900">{formattedFee}</span>
      </div>

      {/* MEM-48 APPROVED VAT WORDING */}
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <span>
            {isAr ? "ضريبة القيمة المضافة غير منطبقة" : "VAT not applicable"}
          </span>
          <span className="text-[10px] font-medium text-slate-400">
            (MEM-48)
          </span>
        </span>
        <span className="font-semibold text-slate-900">$0.00</span>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200/80 pt-3 text-sm font-extrabold text-slate-900">
        <span>{isAr ? "الإجمالي المستحق اليوم:" : "Total Due Today:"}</span>
        <span className="text-base text-[#e11119]">{formattedFee} USD</span>
      </div>
    </div>
  );
}
