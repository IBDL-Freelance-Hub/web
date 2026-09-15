"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { forgotPasswordAction } from "@/actions/authActions";
import { AUTH_STRINGS } from "@/lib/constants/authStrings";
import { Input } from "@/components/ui/Input";
import {
  Mail,
  AlertCircle,
  Loader2,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

function ForgotPasswordModalDialog({
  onClose,
  initialEmail = "",
}: {
  onClose: () => void;
  initialEmail?: string;
}) {
  const { locale } = useLocale();
  const [email, setEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setGeneralError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError(AUTH_STRINGS.validation.emailRequired[locale]);
      return;
    }
    if (!trimmed.includes("@") || !trimmed.includes(".")) {
      setEmailError(AUTH_STRINGS.validation.emailInvalid[locale]);
      return;
    }

    startTransition(async () => {
      try {
        const res = await forgotPasswordAction({ email: trimmed, locale });
        if (res.success) {
          setSuccessMessage(
            res.message || AUTH_STRINGS.forgotPassword.genericSuccess[locale]
          );
        } else {
          setGeneralError(
            res.error || AUTH_STRINGS.common.somethingWentWrong[locale]
          );
        }
      } catch {
        setGeneralError(AUTH_STRINGS.common.somethingWentWrong[locale]);
      }
    });
  };

  const ArrowIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0d0d1c]/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div className="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-start shadow-2xl transition-all duration-200 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label={locale === "ar" ? "إغلاق" : "Close"}
          className="absolute end-5 top-5 cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2
            id="forgot-password-title"
            className="text-xl font-bold tracking-tight text-[#16162c] sm:text-2xl"
          >
            {AUTH_STRINGS.forgotPassword.pageTitle[locale]}
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-[#6a6a86] sm:text-sm">
            {AUTH_STRINGS.forgotPassword.pageSubtitle[locale]}
          </p>
        </div>

        {successMessage ? (
          <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/90 p-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {AUTH_STRINGS.forgotPassword.confirmationTitle[locale]}
                </h3>
                <p className="text-xs leading-relaxed text-slate-700">
                  {successMessage}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer rounded-xl bg-[#419257] py-3 text-xs font-bold text-white transition-all hover:bg-[#347845]"
            >
              {AUTH_STRINGS.forgotPassword.backToSignIn[locale]}
            </button>
          </div>
        ) : (
          <>
            {generalError && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{generalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Input
                label={`${AUTH_STRINGS.forgotPassword.emailLabel[locale]} *`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                error={emailError}
                disabled={isPending}
                autoFocus
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-3.5 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:bg-[#b60d14] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>
                        {AUTH_STRINGS.forgotPassword.submittingButton[locale]}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {AUTH_STRINGS.forgotPassword.submitButton[locale]}
                      </span>
                      <ArrowIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
  initialEmail = "",
}: ForgotPasswordModalProps) {
  if (!isOpen) return null;
  return (
    <ForgotPasswordModalDialog onClose={onClose} initialEmail={initialEmail} />
  );
}
