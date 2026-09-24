import React from "react";
import {
  CreditCard,
  ShieldCheck,
  Lock,
  RotateCw,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckoutPaymentFormProps {
  cardholderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  onCardholderNameChange: (val: string) => void;
  onCardNumberChange: (val: string) => void;
  onCardExpiryChange: (val: string) => void;
  onCardCvcChange: (val: string) => void;
  formattedFee: string;
  isSubmitting: boolean;
  isAr: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function CheckoutPaymentForm({
  cardholderName,
  cardNumber,
  cardExpiry,
  cardCvc,
  onCardholderNameChange,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvcChange,
  formattedFee,
  isSubmitting,
  isAr,
  onSubmit,
  onClose,
}: CheckoutPaymentFormProps) {
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Paymob Payment Gateway Architecture Section */}
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-slate-700" />
            <span className="text-xs font-bold text-slate-900">
              {isAr
                ? "بيانات بطاقة الدفع (Paymob)"
                : "Payment Card Details (Paymob)"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>3D Secure 2.0</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="cardholder-name"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              {isAr ? "الاسم على البطاقة" : "Cardholder Name"}
            </label>
            <input
              id="cardholder-name"
              type="text"
              required
              value={cardholderName}
              onChange={(e) => onCardholderNameChange(e.target.value)}
              placeholder={
                isAr
                  ? "الاسم الكامل كما يظهر على البطاقة"
                  : "Full name as shown on card"
              }
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 transition placeholder:text-slate-400 focus:border-[#e11119] focus:ring-1 focus:ring-[#e11119] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="card-number"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              {isAr ? "رقم البطاقة" : "Card Number"}
            </label>
            <div className="relative">
              <input
                id="card-number"
                type="text"
                required
                value={cardNumber}
                onChange={(e) => onCardNumberChange(e.target.value)}
                placeholder="4242 •••• •••• 4242"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono text-xs text-slate-900 transition placeholder:text-slate-400 focus:border-[#e11119] focus:ring-1 focus:ring-[#e11119] focus:outline-none"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase rtl:right-auto rtl:left-3">
                Visa / MC
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="card-expiry"
                className="mb-1 block text-[11px] font-bold text-slate-700"
              >
                {isAr ? "تاريخ الانتهاء" : "Expiry (MM/YY)"}
              </label>
              <input
                id="card-expiry"
                type="text"
                required
                value={cardExpiry}
                onChange={(e) => onCardExpiryChange(e.target.value)}
                placeholder="MM/YY"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono text-xs text-slate-900 transition placeholder:text-slate-400 focus:border-[#e11119] focus:ring-1 focus:ring-[#e11119] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="card-cvc"
                className="mb-1 block text-[11px] font-bold text-slate-700"
              >
                {isAr ? "رمز الأمان (CVC)" : "CVC / CVV"}
              </label>
              <input
                id="card-cvc"
                type="password"
                maxLength={4}
                required
                value={cardCvc}
                onChange={(e) => onCardCvcChange(e.target.value)}
                placeholder="123"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono text-xs text-slate-900 transition placeholder:text-slate-400 focus:border-[#e11119] focus:ring-1 focus:ring-[#e11119] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Gateway Security Badge */}
        <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-500">
          <Lock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span>
            {isAr
              ? "معاملة مشفرة بمعايير PCI-DSS المستوى الأول. لا يتم حفظ بيانات بطاقتك أبداً."
              : "Encrypted under PCI-DSS Level 1. Your card data is securely tokenized."}
          </span>
        </div>
      </div>

      {/* Modal Actions */}
      <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "group flex w-full flex-1 items-center justify-center gap-2 rounded-xl bg-[#e11119] px-6 py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-[#b60d14] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60",
            isSubmitting && "cursor-wait"
          )}
        >
          {isSubmitting ? (
            <>
              <RotateCw className="h-4 w-4 animate-spin" />
              <span>
                {isAr ? "جارٍ إتمام العملية..." : "Authorizing upgrade..."}
              </span>
            </>
          ) : (
            <>
              <span>
                {isAr
                  ? `تأكيد الدفع (${formattedFee})`
                  : `Confirm & Pay ${formattedFee}`}
              </span>
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
        >
          {isAr ? "إلغاء" : "Cancel"}
        </button>
      </div>
    </form>
  );
}
