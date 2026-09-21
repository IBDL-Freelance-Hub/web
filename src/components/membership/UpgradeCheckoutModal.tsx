"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  MembershipTierCatalogItem,
  UpgradeTierPayload,
  UpgradeTierResponseData,
} from "@/types/membership";
import type { ActionResponse } from "@/types/api";
import { cn } from "@/lib/utils";

interface UpgradeCheckoutModalProps {
  tier: MembershipTierCatalogItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess?: (result: UpgradeTierResponseData) => void;
  onUpgradeAction?: (
    payload: UpgradeTierPayload
  ) => Promise<ActionResponse<UpgradeTierResponseData>>;
}

export function UpgradeCheckoutModal({
  tier,
  isOpen,
  onClose,
  onUpgradeSuccess,
  onUpgradeAction,
}: UpgradeCheckoutModalProps) {
  const { locale, formatNumber } = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] =
    useState<UpgradeTierResponseData | null>(null);
  const [declinedResult, setDeclinedResult] =
    useState<UpgradeTierResponseData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form mock card state for Paymob PCI-DSS entry preparation
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("•••");

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    setIsSubmitting(false);
    setSuccessResult(null);
    setDeclinedResult(null);
    setErrorMessage(null);
    onClose();
  }, [onClose]);

  // Focus trap and Escape key listener (WCAG 2.1 AA)
  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        handleClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Focus first interactive element or dialog
    dialogRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, isSubmitting, handleClose]);

  // Adjust state during render when modal opens (React recommended pattern)
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsSubmitting(false);
      setSuccessResult(null);
      setDeclinedResult(null);
      setErrorMessage(null);
    }
  }

  if (!isOpen || !tier) return null;

  const handleSubmitUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setDeclinedResult(null);

    try {
      // Server-authoritative upgrade initiation (SEC-33)
      // No client pricing or manual simulationOutcome transmitted
      const actionFn =
        onUpgradeAction ||
        (await import("@/actions/membershipActions")).upgradeMembershipAction;
      const res = await actionFn({
        targetTier: tier.tier,
      });

      if (res.success) {
        if (res.data.paymentStatus === "DECLINED") {
          // Resilient decline response handling (BRU-67, MEM-52)
          setDeclinedResult(res.data);
        } else {
          // Successful upgrade
          setSuccessResult(res.data);
          onUpgradeSuccess?.(res.data);
        }
      } else {
        setErrorMessage(
          res.error ||
            (isAr
              ? "حدث خطأ أثناء معالجة الطلب."
              : "An error occurred while processing the upgrade.")
        );
      }
    } catch {
      setErrorMessage(
        isAr
          ? "تعذر الاتصال ببوابة الدفع. يرجى المحاولة لاحقاً."
          : "Unable to communicate with the payment gateway. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedFee = `$${formatNumber(tier.annualFee)}.00`;

  return (
    <div
      role="presentation"
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          handleClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-modal-title"
        tabIndex={-1}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl outline-none sm:p-8"
      >
        {/* Close Button */}
        {!isSubmitting && (
          <button
            type="button"
            onClick={handleClose}
            aria-label={isAr ? "إغلاق النافذة" : "Close dialog"}
            className="absolute top-5 right-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 rtl:right-auto rtl:left-5"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* 1. SUCCESS STATE */}
        {successResult && (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3
              id="upgrade-modal-title"
              className="text-2xl font-extrabold tracking-tight text-slate-900"
            >
              {isAr
                ? "تمت الترقية بنجاح!"
                : "Membership Upgraded Successfully!"}
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
                  {successResult.transactionId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {isAr ? "المبلغ المسدد:" : "Amount Paid:"}
                </span>
                <span className="font-bold text-slate-900">
                  {formattedFee} USD
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <a
                href="/overview"
                onClick={handleClose}
                className="inline-flex w-full flex-1 items-center justify-center rounded-xl bg-[#e11119] px-5 py-3 text-center text-xs font-bold text-white transition hover:bg-[#b60d14]"
              >
                {isAr ? "الانتقال إلى لوحة التحكم" : "Go to Dashboard"}
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                {isAr ? "إغلاق" : "Close"}
              </button>
            </div>
          </div>
        )}

        {/* 2. DECLINED STATE (HTTP 402 / BRU-67 / MEM-52) */}
        {declinedResult && (
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
                {declinedResult.failureReason ||
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
                  {declinedResult.transactionId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {isAr ? "الفئة المطلوبة:" : "Target Tier:"}
                </span>
                <span className="font-semibold text-slate-900">
                  {tier.name}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setDeclinedResult(null)}
                className="w-full flex-1 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                {isAr ? "إعادة المحاولة" : "Try Again"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                {isAr ? "إلغاء" : "Cancel"}
              </button>
            </div>
          </div>
        )}

        {/* 3. ORDER CONFIRMATION & PAYMENT FORM STATE (SCR-70) */}
        {!successResult && !declinedResult && (
          <form onSubmit={handleSubmitUpgrade} className="space-y-6">
            <div>
              <span className="text-[11px] font-extrabold tracking-wider text-[#e11119] uppercase">
                {isAr
                  ? "تأكيد طلب الترقية (SCR-70)"
                  : "Upgrade Order Confirmation (SCR-70)"}
              </span>
              <h3
                id="upgrade-modal-title"
                className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900"
              >
                {isAr ? `الترقية إلى ${tier.name}` : `Upgrade to ${tier.name}`}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{tier.tagline}</p>
            </div>

            {/* Order Summary Card */}
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
                <span className="font-semibold text-slate-900">
                  {formattedFee}
                </span>
              </div>

              {/* MEM-48 APPROVED VAT WORDING */}
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span>
                    {isAr
                      ? "ضريبة القيمة المضافة غير منطبقة"
                      : "VAT not applicable"}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    (MEM-48)
                  </span>
                </span>
                <span className="font-semibold text-slate-900">$0.00</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200/80 pt-3 text-sm font-extrabold text-slate-900">
                <span>
                  {isAr ? "الإجمالي المستحق اليوم:" : "Total Due Today:"}
                </span>
                <span className="text-base text-[#e11119]">
                  {formattedFee} USD
                </span>
              </div>
            </div>

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
                    onChange={(e) => setCardholderName(e.target.value)}
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
                      onChange={(e) => setCardNumber(e.target.value)}
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
                      onChange={(e) => setCardExpiry(e.target.value)}
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
                      onChange={(e) => setCardCvc(e.target.value)}
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

            {/* Error Message Strip */}
            {errorMessage && (
              <div
                role="alert"
                aria-live="polite"
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
              >
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

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
                      {isAr
                        ? "جارٍ إتمام العملية..."
                        : "Authorizing upgrade..."}
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
                onClick={handleClose}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
              >
                {isAr ? "إلغاء" : "Cancel"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
