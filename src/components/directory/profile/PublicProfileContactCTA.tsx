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
      <div className="flex flex-wrap gap-3">
        {/* Direct Inquiry Button */}
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrorMsg("");
            setModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#e11119] px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(225,17,25,0.4)] transition-all hover:bg-red-600 hover:shadow-[0_0_28px_rgba(225,17,25,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 active:scale-95"
          aria-label={
            isAr
              ? `إرسال استفسار إلى ${displayName}`
              : `Send inquiry to ${displayName}`
          }
          aria-haspopup="dialog"
          aria-controls={modalId}
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {isAr ? "إرسال استفسار" : "Send Inquiry"}
        </button>

        {/* LinkedIn Link */}
        {linkedinProps && (
          <a
            {...linkedinProps}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
            aria-label={
              isAr
                ? `ملف ${displayName} على LinkedIn`
                : `${displayName}'s LinkedIn profile`
            }
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            LinkedIn
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#1D1D39] p-6 shadow-2xl">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2
                  id={`${modalId}-title`}
                  className="text-lg font-bold text-white"
                >
                  {isAr ? "إرسال استفسار" : "Send Inquiry"}
                </h2>
                <p className="mt-0.5 text-sm text-slate-400">
                  {isAr ? `إلى: ${displayName}` : `To: ${displayName}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/30"
                aria-label={isAr ? "إغلاق النافذة" : "Close modal"}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Success state */}
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <CheckCircle
                  className="h-12 w-12 text-emerald-400"
                  aria-hidden="true"
                />
                <p className="text-base font-semibold text-white">
                  {isAr
                    ? "تم إرسال استفسارك بنجاح!"
                    : "Inquiry sent successfully!"}
                </p>
                <p className="text-sm text-slate-400">
                  {isAr
                    ? "سيتواصل معك المدرب في أقرب وقت ممكن."
                    : "The trainer will get back to you soon."}
                </p>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="mt-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
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
                    className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300"
                  >
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    {errorMsg}
                  </div>
                )}

                {/* Sender Name */}
                <div>
                  <label
                    htmlFor={`${modalId}-name`}
                    className="mb-1.5 block text-xs font-semibold text-slate-400"
                  >
                    {isAr ? "الاسم الكامل" : "Full Name"}
                    <span className="ms-1 text-red-400" aria-hidden="true">
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
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 transition-colors focus:border-white/25 focus:ring-2 focus:ring-white/15 focus:outline-none"
                    dir={isAr ? "rtl" : "ltr"}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor={`${modalId}-email`}
                    className="mb-1.5 block text-xs font-semibold text-slate-400"
                  >
                    {isAr ? "البريد الإلكتروني" : "Email Address"}
                    <span className="ms-1 text-red-400" aria-hidden="true">
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
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 transition-colors focus:border-white/25 focus:ring-2 focus:ring-white/15 focus:outline-none"
                    dir="ltr"
                  />
                </div>

                {/* Organization (optional) */}
                <div>
                  <label
                    htmlFor={`${modalId}-org`}
                    className="mb-1.5 block text-xs font-semibold text-slate-400"
                  >
                    {isAr ? "اسم الشركة / المؤسسة" : "Company / Organization"}
                    <span className="ms-1.5 text-xs font-normal text-slate-600">
                      ({isAr ? "اختياري" : "optional"})
                    </span>
                  </label>
                  <input
                    id={`${modalId}-org`}
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    placeholder={isAr ? "مؤسستك" : "Your organization"}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 transition-colors focus:border-white/25 focus:ring-2 focus:ring-white/15 focus:outline-none"
                    dir={isAr ? "rtl" : "ltr"}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor={`${modalId}-subject`}
                    className="mb-1.5 block text-xs font-semibold text-slate-400"
                  >
                    {isAr ? "موضوع الاستفسار" : "Subject"}
                    <span className="ms-1 text-red-400" aria-hidden="true">
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
                        ? "موضوع رسالتك"
                        : "e.g. Training Proposal for Q1 2026"
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 transition-colors focus:border-white/25 focus:ring-2 focus:ring-white/15 focus:outline-none"
                    dir={isAr ? "rtl" : "ltr"}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor={`${modalId}-message`}
                    className="mb-1.5 block text-xs font-semibold text-slate-400"
                  >
                    {isAr ? "الرسالة" : "Message"}
                    <span className="ms-1 text-red-400" aria-hidden="true">
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
                        ? "اكتب استفسارك هنا بالتفصيل..."
                        : "Describe your training needs, audience size, objectives..."
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 transition-colors focus:border-white/25 focus:ring-2 focus:ring-white/15 focus:outline-none"
                    dir={isAr ? "rtl" : "ltr"}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending || status === "pending"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e11119] py-3 text-sm font-bold text-white shadow-[0_0_18px_rgba(225,17,25,0.35)] transition-all hover:bg-red-600 hover:shadow-[0_0_25px_rgba(225,17,25,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-busy={isPending || status === "pending"}
                >
                  {isPending || status === "pending" ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                        aria-hidden="true"
                      />
                      {isAr ? "جارٍ الإرسال..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {isAr ? "إرسال الاستفسار" : "Send Inquiry"}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
