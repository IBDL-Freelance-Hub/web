import React from "react";
import { AlertTriangle } from "lucide-react";
import type {
  MembershipTierCatalogItem,
  UpgradeTierResponseData,
} from "@/types/membership";

export interface CheckoutDeclinedViewProps {
  tier: MembershipTierCatalogItem;
  data: UpgradeTierResponseData;
  onRetry: () => void;
  onClose: () => void;
  isAr: boolean;
}

export function CheckoutDeclinedView({
  tier,
  data,
  onRetry,
  onClose,
  isAr,
}: CheckoutDeclinedViewProps) {
  return (
    <div className="space-y-4 py-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <AlertTriangle className="h-10 w-10" />
      </div>

      <h3
        id="upgrade-modal-title"
        className="text-2xl font-extrabold tracking-tight text-slate-900"
      >
        {isAr ? "تم رفض عملية الدفع" : "Payment Transaction Declined"}
      </h3>

      {/* Reassurance Notice (BRU-67, MEM-52) */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-start text-xs leading-relaxed text-amber-900">
        <p className="mb-1 font-bold text-amber-950">
          {isAr
            ? "عضويتك الحالية لم تتأثر بأي شكل"
            : "Your active membership remains untouched"}
        </p>
        <p>
          {data.failureReason ||
            (isAr
              ? "تم رفض المعاملة من قبل البنك المصدر للبطاقة. يرجى التحقق من الرصيد أو استخدام بطاقة أخرى."
              : "The payment was declined by your issuing card provider. Your current benefits remain fully active.")}
        </p>
      </div>

      <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-start text-xs text-slate-600">
        <div className="flex justify-between">
          <span className="text-slate-500">
            {isAr ? "المعاملة المرفوضة:" : "Declined Ref:"}
          </span>
          <span className="font-mono text-[11px] text-slate-800">
            {data.transactionId}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">
            {isAr ? "الفئة المطلوبة:" : "Target Tier:"}
          </span>
          <span className="font-semibold text-slate-900">{tier.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <button
          type="button"
          onClick={onRetry}
          className="w-full flex-1 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          {isAr ? "إعادة المحاولة" : "Try Again"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
        >
          {isAr ? "إلغاء" : "Cancel"}
        </button>
      </div>
    </div>
  );
}
