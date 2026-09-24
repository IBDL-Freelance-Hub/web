import React from "react";

export interface SuccessMembershipSummaryProps {
  currentDateFormatted: string;
  nextYearDateFormatted: string;
  isAr: boolean;
}

export function SuccessMembershipSummary({
  currentDateFormatted,
  nextYearDateFormatted,
  isAr,
}: SuccessMembershipSummaryProps) {
  return (
    <div className="actv mb-8 overflow-hidden rounded-2xl border border-[#419257] bg-[#419257]/10 text-start">
      <div className="flex items-center gap-2.5 border-b border-[#419257]/20 p-3.5 px-5 text-xs font-bold text-[#419257] sm:text-sm">
        <span>✓</span>
        <span>
          {isAr
            ? "عضويتك الأساسية مفعلة الآن"
            : "Your Essential Membership is active"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-[#419257]/20 sm:grid-cols-2">
        {/* Item 1: Membership */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "نوع العضوية" : "Membership"}
          </span>
          <span className="font-bold text-[#16162c]">
            {isAr ? "عضوية Essential" : "Essential Membership"}
          </span>
        </div>

        {/* Item 2: Membership fee */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "رسوم العضوية" : "Membership fee"}
          </span>
          <span className="font-bold text-[#419257]">
            {isAr ? "مجاناً" : "Free"}
          </span>
        </div>

        {/* Item 3: Payment */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "الدفع" : "Payment"}
          </span>
          <span className="font-bold text-[#16162c]">
            {isAr ? "غير مطلوب" : "Not required"}
          </span>
        </div>

        {/* Item 4: Status */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "الحالة" : "Status"}
          </span>
          <span className="font-bold text-[#419257]">
            {isAr ? "مفعلة" : "Active"}
          </span>
        </div>

        {/* Item 5: Start date */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "تاريخ البدء" : "Start date"}
          </span>
          <span className="font-bold text-[#16162c]">
            {currentDateFormatted}
          </span>
        </div>

        {/* Item 6: Renews on */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "تاريخ التجديد" : "Renews on"}
          </span>
          <span className="font-bold text-[#16162c]">
            {nextYearDateFormatted}
          </span>
        </div>
      </div>

      <div className="border-t border-[#419257]/15 bg-white p-3.5 px-5 text-xs leading-relaxed text-[#6a6a86]">
        {isAr
          ? "ⓘ لا توجد أي خطوات إضافية مطلوبة. يمكنك مقارنة الفئات المتقدمة والترقية في أي وقت من صفحة العضويات داخل المنصة."
          : "ⓘ Nothing further is needed. You can compare Professional and Master, and upgrade, from the Membership page inside the Hub — whenever you choose to."}
      </div>
    </div>
  );
}
