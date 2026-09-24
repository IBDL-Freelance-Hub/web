"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  CheckoutSuccessView,
  CheckoutDeclinedView,
  CheckoutOrderSummary,
  CheckoutPaymentForm,
  type CheckoutState,
  type UpgradeCheckoutModalProps,
} from "./checkout";

export type { UpgradeCheckoutModalProps, CheckoutState };

export function UpgradeCheckoutModal({
  tier,
  isOpen,
  onClose,
  onUpgradeSuccess,
  onUpgradeAction,
}: UpgradeCheckoutModalProps) {
  const { locale, formatNumber } = useLocale();
  const isAr = locale === "ar";

  // Anti-Boolean discriminated union state
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    status: "idle",
  });

  // Paymob simulated input state
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("•••");

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isSubmitting = checkoutState.status === "submitting";

  const handleClose = useCallback(() => {
    setCheckoutState({ status: "idle" });
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
    dialogRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, isSubmitting, handleClose]);

  // Reset state when modal opens
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setCheckoutState({ status: "idle" });
    }
  }

  if (!isOpen || !tier) return null;

  const handleSubmitUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setCheckoutState({ status: "submitting" });

    try {
      const actionFn =
        onUpgradeAction ||
        (await import("@/actions/membershipActions")).upgradeMembershipAction;
      const res = await actionFn({
        targetTier: tier.tier,
      });

      if (res.success) {
        if (res.data.paymentStatus === "DECLINED") {
          setCheckoutState({ status: "declined", data: res.data });
        } else {
          setCheckoutState({ status: "success", data: res.data });
          onUpgradeSuccess?.(res.data);
        }
      } else {
        setCheckoutState({
          status: "error",
          message:
            res.error ||
            (isAr
              ? "حدث خطأ أثناء معالجة الطلب."
              : "An error occurred while processing the upgrade."),
        });
      }
    } catch {
      setCheckoutState({
        status: "error",
        message: isAr
          ? "تعذر الاتصال ببوابة الدفع. يرجى المحاولة لاحقاً."
          : "Unable to communicate with the payment gateway. Please try again.",
      });
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

        {/* 1. SUCCESS VIEW */}
        {checkoutState.status === "success" && (
          <CheckoutSuccessView
            tier={tier}
            data={checkoutState.data}
            formattedFee={formattedFee}
            onClose={handleClose}
            isAr={isAr}
          />
        )}

        {/* 2. DECLINED VIEW (HTTP 402 / BRU-67 / MEM-52) */}
        {checkoutState.status === "declined" && (
          <CheckoutDeclinedView
            tier={tier}
            data={checkoutState.data}
            onRetry={() => setCheckoutState({ status: "idle" })}
            onClose={handleClose}
            isAr={isAr}
          />
        )}

        {/* 3. ORDER CONFIRMATION & PAYMENT FORM */}
        {checkoutState.status !== "success" &&
          checkoutState.status !== "declined" && (
            <div className="space-y-6">
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
                  {isAr
                    ? `الترقية إلى ${tier.name}`
                    : `Upgrade to ${tier.name}`}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{tier.tagline}</p>
              </div>

              {/* Order Summary */}
              <CheckoutOrderSummary
                tier={tier}
                formattedFee={formattedFee}
                isAr={isAr}
              />

              {/* Error Message Strip if status === error */}
              {checkoutState.status === "error" && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
                >
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{checkoutState.message}</span>
                </div>
              )}

              {/* Payment Card Form */}
              <CheckoutPaymentForm
                cardholderName={cardholderName}
                cardNumber={cardNumber}
                cardExpiry={cardExpiry}
                cardCvc={cardCvc}
                onCardholderNameChange={setCardholderName}
                onCardNumberChange={setCardNumber}
                onCardExpiryChange={setCardExpiry}
                onCardCvcChange={setCardCvc}
                formattedFee={formattedFee}
                isSubmitting={isSubmitting}
                isAr={isAr}
                onSubmit={handleSubmitUpgrade}
                onClose={handleClose}
              />
            </div>
          )}
      </div>
    </div>
  );
}

// Compound component attachments
UpgradeCheckoutModal.Success = CheckoutSuccessView;
UpgradeCheckoutModal.Declined = CheckoutDeclinedView;
UpgradeCheckoutModal.OrderSummary = CheckoutOrderSummary;
UpgradeCheckoutModal.PaymentForm = CheckoutPaymentForm;
