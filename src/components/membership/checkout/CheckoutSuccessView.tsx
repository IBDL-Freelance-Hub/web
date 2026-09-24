import React from "react";
import { CheckCircle2 } from "lucide-react";
import type {
  MembershipTierCatalogItem,
  UpgradeTierResponseData,
} from "@/types/membership";

export interface CheckoutSuccessViewProps {
  tier: MembershipTierCatalogItem;
  data: UpgradeTierResponseData;
  formattedFee: string;
  onClose: () => void;
  isAr: boolean;
}

export function CheckoutSuccessView({
  tier,
  data,
  formattedFee,
  onClose,
  isAr,
}: CheckoutSuccessViewProps) {
  return (
    <div className="space-y-4 py-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="h-10 w-10" />
      </div>

      <h3
        id="upgrade-modal-title"
        className="text-2xl font-extrabold tracking-tight text-slate-900"
      >
        {isAr ? "تمت الترقية بنجاح!" : "Membership Upgraded Successfully!"}
      </h3>

      <p className="mx-auto max-w-sm text-xs leading-relaxed text-slate-600">
        {isAr
          ? `تهانينا! أصبحت عضويتك الآن ${tier.name}. تم تحديث جميع المزايا والخصومات الخاصة بحسابك فورياً.`
          : `Congratulations! Your account is now active under the ${tier.name} tier. All entitlements and member rates are immediately active.`}
      </p>

      <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-start text-xs text-slate-700">
        <div className="flex justify-between">
          <span className="text-slate-500">
            {isAr ? "فئة العضوية الجديدة:" : "New Membership Tier:"}
          </span>
          <span className="font-bold text-slate-900">{tier.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">
            {isAr ? "رقم المعاملة المرجعي:" : "Transaction Ref:"}
          </span>
          <span className="font-mono text-[11px] font-semibold text-slate-800">
            {data.transactionId}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">
            {isAr ? "المبلغ المسدد:" : "Amount Paid:"}
          </span>
          <span className="font-bold text-slate-900">{formattedFee} USD</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <a
          href="/overview"
          onClick={onClose}
          className="inline-flex w-full flex-1 items-center justify-center rounded-xl bg-[#e11119] px-5 py-3 text-center text-xs font-bold text-white transition hover:bg-[#b60d14]"
        >
          {isAr ? "الانتقال إلى لوحة التحكم" : "Go to Dashboard"}
        </a>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
        >
          {isAr ? "إغلاق" : "Close"}
        </button>
      </div>
    </div>
  );
}
