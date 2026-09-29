"use client";

import React, { useState, useTransition, useId } from "react";
import {
  ExternalLink,
  Mail,
  X,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { getSafeLinkProps } from "@/lib/security";
import { submitTrainerInquiry } from "@/actions/directoryActions";
import type { PublicTrainerProfile } from "@/types/directory";

export interface PublicProfileContactCTAProps {
  profile: Pick<
    PublicTrainerProfile,
    | "id"
    | "firstName"
    | "lastName"
    | "fullNameEn"
    | "fullNameAr"
    | "linkedinUrl"
    | "tier"
  >;
  locale?: "en" | "ar";
}

type FormStatus = "idle" | "pending" | "success" | "error";

export function PublicProfileContactCTA({
  profile,
  locale = "en",
}: PublicProfileContactCTAProps) {
  const isAr = locale === "ar";
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const modalId = useId();

  const displayName =
    isAr && profile.fullNameAr
      ? profile.fullNameAr
      : profile.fullNameEn ||
        `${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ""}`;

  const linkedinProps = profile.linkedinUrl
    ? getSafeLinkProps(profile.linkedinUrl, "_blank")
    : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      trainerId: profile.id,
      trainerName: displayName,
      senderName: (fd.get("senderName") as string) || "",
      senderEmail: (fd.get("senderEmail") as string) || "",
      senderPhone: (fd.get("senderPhone") as string) || undefined,
      organization: (fd.get("organization") as string) || undefined,
      subject: (fd.get("subject") as string) || "",
      message: (fd.get("message") as string) || "",
    };

    setStatus("pending");

    startTransition(async () => {
      const result = await submitTrainerInquiry(payload);
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong. Please try again.");
      }
    });
  };

  return (
    <>
      {/* CTA Buttons */}
      <div className="flex flex-col gap-2.5 sm:flex-row">
        {/* Direct Inquiry Button */}
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrorMsg("");
            setModalOpen(true);
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1d1d39] px-4 py-2.5 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#16162c] focus-visible:outline-2 focus-visible:outline-[#1d1d39] active:scale-98"
          aria-label={
            isAr
              ? `إرسال استفسار إلى ${displayName}`
              : `Send inquiry to ${displayName}`
          }
          aria-haspopup="dialog"
          aria-controls={modalId}
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>{isAr ? "إرسال استفسار مهني" : "Send Inquiry"}</span>
        </button>

        {/* LinkedIn Link */}
        {linkedinProps && (
          <a
            {...linkedinProps}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-slate-400"
            aria-label={
              isAr
                ? `ملف ${displayName} على LinkedIn`
                : `${displayName}'s LinkedIn profile`
            }
          >
            <ExternalLink
              className="h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
            <span>LinkedIn</span>
          </a>
        )}
      </div>

      {/* Inquiry Modal */}
      {modalOpen && (
        <div
          role="dialog"
          id={modalId}
          aria-modal="true"
          aria-labelledby={`${modalId}-title`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3
                  id={`${modalId}-title`}
                  className="text-base font-bold text-slate-900"
                >
                  {isAr
                    ? `إرسال استفسار إلى ${displayName}`
                    : `Contact ${displayName}`}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {isAr
                    ? "أدخل رسالتك وسيتم إيصالها مباشرة إلى المدرب."
                    : "Fill in the details below to connect with this certified trainer."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-slate-400"
                aria-label={isAr ? "إغلاق النافذة" : "Close modal"}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Success state */}
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <CheckCircle
                  className="h-12 w-12 text-emerald-500"
                  aria-hidden="true"
                />
                <p className="text-base font-bold text-slate-900">
                  {isAr
                    ? "تم إرسال استفسارك بنجاح!"
                    : "Inquiry sent successfully!"}
                </p>
                <p className="text-xs text-slate-500">
                  {isAr
                    ? "سيتواصل معك المدرب في أقرب وقت ممكن."
                    : "The trainer will receive your inquiry and follow up shortly."}
                </p>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {isAr ? "إغلاق" : "Close"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Error banner */}
                {status === "error" && errorMsg && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
                  >
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                      aria-hidden="true"
                    />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Sender Name */}
                <div>
                  <label
                    htmlFor={`${modalId}-name`}
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    {isAr ? "الاسم الكامل" : "Full Name"}
                    <span className="ms-1 text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={`${modalId}-name`}
                    name="senderName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={isAr ? "الاسم الكامل" : "Your full name"}
                    className="w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs transition-colors placeholder:text-slate-400 focus:border-[#1d1d39] focus:ring-2 focus:ring-[#1d1d39]/10 focus:outline-none"
                    dir={isAr ? "rtl" : "ltr"}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor={`${modalId}-email`}
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    {isAr ? "البريد الإلكتروني" : "Email Address"}
                    <span className="ms-1 text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={`${modalId}-email`}
                    name="senderEmail"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={isAr ? "بريدك الإلكتروني" : "your@email.com"}
                    className="w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs transition-colors placeholder:text-slate-400 focus:border-[#1d1d39] focus:ring-2 focus:ring-[#1d1d39]/10 focus:outline-none"
                    dir="ltr"
                  />
                </div>

                {/* Organization (Optional) */}
                <div>
                  <label
                    htmlFor={`${modalId}-org`}
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    {isAr
                      ? "المؤسسة / جهة العمل (اختياري)"
                      : "Organization (Optional)"}
                  </label>
                  <input
                    id={`${modalId}-org`}
                    name="organization"
                    type="text"
                    placeholder={
                      isAr ? "اسم الشركة أو المؤسسة" : "Company or organization"
                    }
                    className="w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs transition-colors placeholder:text-slate-400 focus:border-[#1d1d39] focus:ring-2 focus:ring-[#1d1d39]/10 focus:outline-none"
                    dir={isAr ? "rtl" : "ltr"}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor={`${modalId}-subject`}
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    {isAr ? "الموضوع" : "Subject"}
                    <span className="ms-1 text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={`${modalId}-subject`}
                    name="subject"
                    type="text"
                    required
                    placeholder={
                      isAr
                        ? "موضوع التدريب أو التعاون"
                        : "Training inquiry or collaboration topic"
                    }
                    className="w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs transition-colors placeholder:text-slate-400 focus:border-[#1d1d39] focus:ring-2 focus:ring-[#1d1d39]/10 focus:outline-none"
                    dir={isAr ? "rtl" : "ltr"}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor={`${modalId}-message`}
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    {isAr ? "الرسالة" : "Message"}
                    <span className="ms-1 text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id={`${modalId}-message`}
                    name="message"
                    required
                    rows={4}
                    placeholder={
                      isAr
                        ? "تفاصيل الاستفسار، التواريخ المقترحة، والجمهور المستهدف..."
                        : "Details of your inquiry, expected dates, and target audience..."
                    }
                    className="w-full resize-none rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs transition-colors placeholder:text-slate-400 focus:border-[#1d1d39] focus:ring-2 focus:ring-[#1d1d39]/10 focus:outline-none"
                    dir={isAr ? "rtl" : "ltr"}
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    disabled={isPending}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
                  >
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center gap-1.5 rounded-xl bg-[#1d1d39] px-5 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#16162c] active:scale-98 disabled:opacity-50"
                  >
                    {isPending ? (
                      <span className="block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{isAr ? "إرسال" : "Submit Inquiry"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
