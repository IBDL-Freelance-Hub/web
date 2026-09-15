"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRegistration } from "./RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  Check,
  ExternalLink,
  KeyRound,
  UserCheck,
  Copy,
  AlertTriangle,
} from "lucide-react";

export function RegistrationSuccess() {
  const { locale } = useLocale();
  const {
    formData,
    specimenCredentials,
    closeRegistration,
    credentialsAcknowledged,
    setCredentialsAcknowledged,
    showCredentialsConfirm,
    setShowCredentialsConfirm,
  } = useRegistration();

  const [copiedUsername, setCopiedUsername] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const firstName = useMemo(() => {
    return formData.fullName.trim().split(" ")[0] || "Freelancer";
  }, [formData.fullName]);

  const usernameSpecimen = useMemo(() => {
    return specimenCredentials?.username || `flh.${firstName.toLowerCase()}`;
  }, [specimenCredentials, firstName]);

  const passwordSpecimen = specimenCredentials?.password || "PQP-2026-DEMO";

  const copyText = async (text: string): Promise<boolean> => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback
    }
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const res = document.execCommand("copy");
      document.body.removeChild(textarea);
      return res;
    } catch {
      return false;
    }
  };

  const handleCopyUsername = async () => {
    const ok = await copyText(usernameSpecimen);
    if (ok) {
      setCopiedUsername(true);
      setCredentialsAcknowledged(true);
      setTimeout(() => setCopiedUsername(false), 2500);
    }
  };

  const handleCopyPassword = async () => {
    const ok = await copyText(passwordSpecimen);
    if (ok) {
      setCopiedPassword(true);
      setCredentialsAcknowledged(true);
      setTimeout(() => setCopiedPassword(false), 2500);
    }
  };

  const handleCopyAll = async () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const text =
      locale === "ar"
        ? `بيانات الدخول لمنصة المستقلين IBDL Freelancers Hub:\nاسم المستخدم: ${usernameSpecimen}\nكلمة المرور: ${passwordSpecimen}\nرابط المنصة: ${origin}/login`
        : `IBDL Freelancers Hub Credentials:\nUsername: ${usernameSpecimen}\nPassword: ${passwordSpecimen}\nLogin URL: ${origin}/login`;
    const ok = await copyText(text);
    if (ok) {
      setCopiedAll(true);
      setCredentialsAcknowledged(true);
      setTimeout(() => setCopiedAll(false), 3000);
    }
  };

  const handleProceedToWorkspace = (e: React.MouseEvent) => {
    if (!credentialsAcknowledged) {
      e.preventDefault();
      setShowCredentialsConfirm(true);
    } else {
      closeRegistration();
    }
  };

  const handleBackToWebsite = () => {
    if (!credentialsAcknowledged) {
      setShowCredentialsConfirm(true);
    } else {
      closeRegistration();
    }
  };

  const handleCopyAndClose = async () => {
    await handleCopyAll();
    setCredentialsAcknowledged(true);
    setTimeout(() => {
      closeRegistration();
    }, 450);
  };

  const { currentDateFormatted, nextYearDateFormatted } = useMemo(() => {
    const now = new Date();
    const currentDate = now.toLocaleDateString(
      locale === "ar" ? "ar-EG" : "en-GB",
      { day: "numeric", month: "long", year: "numeric" }
    );
    const nextYear = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const nextYearDate = nextYear.toLocaleDateString(
      locale === "ar" ? "ar-EG" : "en-GB",
      { day: "numeric", month: "long", year: "numeric" }
    );
    return {
      currentDateFormatted: currentDate,
      nextYearDateFormatted: nextYearDate,
    };
  }, [locale]);

  return (
    <div className="animate-in fade-in py-2 text-start duration-300">
      {/* 1. Header & Success Ring (.suc__ring) */}
      <div className="mb-8 text-center">
        <div className="suc__ring relative mx-auto mb-7 grid h-24 w-24 place-items-center rounded-full bg-[#419257]/15 text-[#419257] before:absolute before:inset-0 before:animate-ping before:rounded-full before:border-2 before:border-[#419257] before:opacity-60">
          <Check className="h-10 w-10 stroke-[3]" />
        </div>

        <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-[#16162c] sm:text-3xl">
          {locale === "ar"
            ? "أهلاً بك معنا. تم تفعيل عضويتك المجانية بنجاح."
            : "You are in. Your Essential Membership is active."}
        </h2>

        <p className="mx-auto max-w-md text-center text-xs leading-relaxed text-[#3e3e5c] sm:text-sm">
          {locale === "ar"
            ? `${firstName} — مرحباً بك في منصة المستقلين من IBDL. حسابك مفعل الآن — لا يتطلب أي شيء آخر ولا توجد أي رسوم. إليك ما حدث للتو:`
            : `${firstName} — Welcome to the IBDL L&D Freelancer Hub. Your account is live — nothing else is required and nothing is owed. Here is what has just happened:`}
        </p>
      </div>

      {/* 2. Activated Membership Block (.actv) */}
      <div className="actv mb-8 overflow-hidden rounded-2xl border border-[#419257] bg-[#419257]/10 text-start">
        <div className="flex items-center gap-2.5 border-b border-[#419257]/20 p-3.5 px-5 text-xs font-bold text-[#419257] sm:text-sm">
          <span>✓</span>
          <span>
            {locale === "ar"
              ? "عضويتك الأساسية مفعلة الآن"
              : "Your Essential Membership is active"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[#419257]/20 sm:grid-cols-2">
          {/* Item 1: Membership */}
          <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
            <span className="font-medium text-[#6a6a86]">
              {locale === "ar" ? "نوع العضوية" : "Membership"}
            </span>
            <span className="font-bold text-[#16162c]">
              {locale === "ar" ? "عضوية Essential" : "Essential Membership"}
            </span>
          </div>

          {/* Item 2: Membership fee */}
          <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
            <span className="font-medium text-[#6a6a86]">
              {locale === "ar" ? "رسوم العضوية" : "Membership fee"}
            </span>
            <span className="font-bold text-[#419257]">
              {locale === "ar" ? "مجاناً" : "Free"}
            </span>
          </div>

          {/* Item 3: Payment */}
          <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
            <span className="font-medium text-[#6a6a86]">
              {locale === "ar" ? "الدفع" : "Payment"}
            </span>
            <span className="font-bold text-[#16162c]">
              {locale === "ar" ? "غير مطلوب" : "Not required"}
            </span>
          </div>

          {/* Item 4: Status */}
          <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
            <span className="font-medium text-[#6a6a86]">
              {locale === "ar" ? "الحالة" : "Status"}
            </span>
            <span className="font-bold text-[#419257]">
              {locale === "ar" ? "مفعلة" : "Active"}
            </span>
          </div>

          {/* Item 5: Start date */}
          <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
            <span className="font-medium text-[#6a6a86]">
              {locale === "ar" ? "تاريخ البدء" : "Start date"}
            </span>
            <span className="font-bold text-[#16162c]">
              {currentDateFormatted}
            </span>
          </div>

          {/* Item 6: Renews on */}
          <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
            <span className="font-medium text-[#6a6a86]">
              {locale === "ar" ? "تاريخ التجديد" : "Renews on"}
            </span>
            <span className="font-bold text-[#16162c]">
              {nextYearDateFormatted}
            </span>
          </div>
        </div>

        <div className="border-t border-[#419257]/15 bg-white p-3.5 px-5 text-xs leading-relaxed text-[#6a6a86]">
          {locale === "ar"
            ? "ⓘ لا توجد أي خطوات إضافية مطلوبة. يمكنك مقارنة الفئات المتقدمة والترقية في أي وقت من صفحة العضويات داخل المنصة."
            : "ⓘ Nothing further is needed. You can compare Professional and Master, and upgrade, from the Membership page inside the Hub — whenever you choose to."}
        </div>
      </div>

      {/* 3. Step-by-Step Confirmation Checklist (.suc__steps) */}
      <div className="suc__steps mb-8 divide-y divide-[#e2e2ec] overflow-hidden rounded-2xl border border-[#e2e2ec]">
        {/* Step 1 */}
        <div className="flex items-start gap-3.5 bg-white p-4 sm:p-5">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#419257] text-xs font-bold text-white">
            ✓
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#16162c] sm:text-sm">
              {locale === "ar"
                ? "تفعيل العضوية الأساسية"
                : "Essential Membership activated"}
            </h4>
            <p className="mt-0.5 text-xs leading-relaxed text-[#6a6a86]">
              {locale === "ar"
                ? "عضويتك السنوية المجانية مفعلة من اليوم. لم تكن هناك حاجة لبطاقة ائتمان ولن تطلب أبداً."
                : "Your free annual Essential Membership is active from today. No card was needed and none will be."}
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-3.5 bg-white p-4 sm:p-5">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#419257] text-xs font-bold text-white">
            ✓
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#16162c] sm:text-sm">
              {locale === "ar"
                ? "استلام بيانات التسجيل"
                : "Registration received"}
            </h4>
            <p className="mt-0.5 text-xs leading-relaxed text-[#6a6a86]">
              {locale === "ar"
                ? "تم تسجيل ملفك المهني ضمن المرحلة الأولى من منصة المستقلين."
                : "Your professional profile has been recorded against Phase 1 of the Freelancer Hub."}
            </p>
          </div>
        </div>

        {/* Step 3: Single-pass specification update */}
        <div className="flex items-start gap-3.5 bg-white p-4 sm:p-5">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#419257] text-xs font-bold text-white">
            ✓
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#16162c] sm:text-sm">
              {locale === "ar"
                ? "تخصيص صلاحيات التقييمات التشخيصية"
                : "Diagnostic Assessments access assigned"}
            </h4>
            <p className="mt-0.5 text-xs leading-relaxed text-[#6a6a86]">
              {locale === "ar"
                ? "تخصيص صلاحيات التقييمات المجانية — تم إنشاء تصريح موحد أحادي الاستخدام للتقييمات الثلاثة."
                : "Complimentary assessment access assigned — 1 unified single-use pass created for all 3 diagnostic tools."}
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-start gap-3.5 bg-white p-4 sm:p-5">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#419257] text-xs font-bold text-white">
            ✓
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#16162c] sm:text-sm">
              {locale === "ar" ? "إرسال بريد الترحيب" : "Welcome email sent"}
            </h4>
            <p className="mt-0.5 text-xs leading-relaxed text-[#6a6a86]">
              {locale === "ar"
                ? `تم إرسال بريد إلكتروني إلى ${formData.email || "بريدك الإلكتروني"} يحتوي رابط التقييمات وبيانات الدخول وتكتيكات البدء.`
                : "An email is on its way to you containing your assessment link, your access credentials and simple instructions to begin."}
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex items-start gap-3.5 bg-white p-4 sm:p-5">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#419257] text-xs font-bold text-white">
            ✓
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#16162c] sm:text-sm">
              {locale === "ar" ? "إخطار فريق المنصة" : "Hub team notified"}
            </h4>
            <p className="mt-0.5 text-xs leading-relaxed text-[#6a6a86]">
              {locale === "ar"
                ? "تم توجيه ملفك وسيرتك الذاتية إلى فريق منصة المستقلين عبر freelancers.hub@ibdl.net لمتابعة بقية الأدوات والخدمات."
                : "Your profile and CV have been routed to the Freelancer Hub team at freelancers.hub@ibdl.net, who will follow up on the wider toolkit."}
              {formData.message && (
                <span className="mt-1 block font-semibold text-[#419257]">
                  {locale === "ar"
                    ? "تم تضمين رسالتك في الإخطار المرسل لفريق المنصة."
                    : " Your message has been included in the notification to the Hub team."}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Welcome Email Specimen Preview (.mail) */}
      <div className="mail mb-8 overflow-hidden rounded-2xl border border-[#e2e2ec] text-start">
        <div className="flex items-center justify-between border-b border-[#e2e2ec] bg-[#f6f6fa] p-3.5 px-5 text-xs font-bold tracking-wider text-[#6a6a86] uppercase">
          <span>
            {locale === "ar" ? "معاينة بريد الترحيب" : "WELCOME EMAIL PREVIEW"}
          </span>
          <span className="font-mono lowercase">freelancers.hub@ibdl.net</span>
        </div>

        <div className="bg-white p-5">
          <h5 className="mb-2 text-sm font-bold text-[#16162c]">
            {locale === "ar"
              ? "الموضوع: وصولك المجاني للتقييمات التشخيصية جاهز الآن"
              : "Subject: Your complimentary diagnostic assessments access is ready"}
          </h5>

          <p className="mb-3 text-xs leading-relaxed text-[#3e3e5c] sm:text-sm">
            {locale === "ar"
              ? "مرحباً بك في منصة المستقلين. تم تخصيص وصولك المجاني لمجموعة التقييمات التشخيصية بالكامل. ستجد أدناه رابط التقييم، وبيانات الدخول الموحدة، ومجموعة تعليمات مبسطة للبدء فوراً."
              : "Welcome to the Freelancer Hub. Your complimentary access across our diagnostic assessment suite has been assigned. Your assessment link, shared access credentials and a short set of instructions are included below to help you begin straight away."}
          </p>

          <p className="mb-4 text-xs font-semibold text-[#1d1d39]">
            {locale === "ar"
              ? "تمنحك بيانات الدخول أحادية الاستخدام أدناه الوصول لجميع بوابات التقييمات التشخيصية الثلاثة."
              : "Your single-use login credentials below grant access across the 3 diagnostic assessment portals."}
          </p>

          <div className="space-y-2 rounded-xl bg-[#f6f6fa] p-4 text-xs text-[#3e3e5c]">
            <div className="flex items-center gap-2.5">
              <Check className="h-4 w-4 shrink-0 text-[#419257]" />
              <span>
                {locale === "ar"
                  ? "روابط بوابات التقييمات التشخيصية (صالح لـ PQP™ و CPAT™ و Management Drives®)"
                  : "Diagnostic assessments portal links (valid for PQP™, CPAT™, and Management Drives®)"}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Check className="h-4 w-4 shrink-0 text-[#419257]" />
              <span>
                {locale === "ar"
                  ? "بيانات الدخول الموحدة أحادية الاستخدام الخاصة بك"
                  : "Your unified single-use access credentials"}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Check className="h-4 w-4 shrink-0 text-[#419257]" />
              <span>
                {locale === "ar"
                  ? "تعليمات خطوة بخطوة ميسرة للبدء"
                  : "Simple step-by-step instructions"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Unified Single-Use Diagnostic Assessments Access Block */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-[#e2e2ec] bg-[#f6f6fa] p-6 text-start">
        {/* Header with Single-Use Tag */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#e2e2ec] pb-3">
          <h4 className="text-xs font-bold tracking-wider text-[#6a6a86] uppercase">
            {locale === "ar"
              ? "بيانات الدخول الموحدة للتقييمات التشخيصية"
              : "YOUR DIAGNOSTIC ASSESSMENTS ACCESS"}
          </h4>

          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
            <span>⚡</span>
            <span>
              {locale === "ar" ? "أحادي الاستخدام فقط" : "One-Time Use Only"}
            </span>
          </span>
        </div>

        {/* The Unified Login Details (Only 1 Username & 1 Password) */}
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Single Unified Username */}
          <div className="flex items-center justify-between gap-2 rounded-xl border border-[#e2e2ec] bg-white p-3.5 shadow-2xs">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#6a6a86]">
              <UserCheck className="h-4 w-4 shrink-0 text-[#419257]" />
              <span>{locale === "ar" ? "اسم المستخدم" : "Username"}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="rounded-lg border border-[#e2e2ec] bg-[#f6f6fa] px-2.5 py-1 font-mono text-xs font-bold text-[#1d1d39]">
                {usernameSpecimen}
              </span>
              <button
                type="button"
                onClick={handleCopyUsername}
                title={locale === "ar" ? "نسخ اسم المستخدم" : "Copy username"}
                aria-label={
                  locale === "ar" ? "نسخ اسم المستخدم" : "Copy username"
                }
                className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold transition-all ${
                  copiedUsername
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {copiedUsername ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>{locale === "ar" ? "تم" : "Copied"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-slate-500" />
                    <span>{locale === "ar" ? "نسخ" : "Copy"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Single Unified Password */}
          <div className="flex items-center justify-between gap-2 rounded-xl border border-[#e2e2ec] bg-white p-3.5 shadow-2xs">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#6a6a86]">
              <KeyRound className="h-4 w-4 shrink-0 text-[#e11119]" />
              <span>{locale === "ar" ? "كلمة المرور" : "Password"}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="rounded-lg border border-[#e2e2ec] bg-[#f6f6fa] px-2.5 py-1 font-mono text-xs font-bold text-[#1d1d39]">
                {passwordSpecimen}
              </span>
              <button
                type="button"
                onClick={handleCopyPassword}
                title={locale === "ar" ? "نسخ كلمة المرور" : "Copy password"}
                aria-label={
                  locale === "ar" ? "نسخ كلمة المرور" : "Copy password"
                }
                className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold transition-all ${
                  copiedPassword
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {copiedPassword ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>{locale === "ar" ? "تم" : "Copied"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-slate-500" />
                    <span>{locale === "ar" ? "نسخ" : "Copy"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Master Copy All Button */}
        <div className="mb-4 space-y-2">
          <button
            type="button"
            onClick={handleCopyAll}
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition-all ${
              copiedAll
                ? "border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "border-emerald-600/30 bg-emerald-50/90 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            {copiedAll ? (
              <>
                <Check className="h-4 w-4" />
                <span>
                  {locale === "ar"
                    ? "✓ تم نسخ جميع بيانات الدخول بنجاح!"
                    : "✓ All Credentials Copied to Clipboard!"}
                </span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>
                  {locale === "ar"
                    ? "نسخ جميع بيانات الدخول (اسم المستخدم وكلمة المرور)"
                    : "Copy All Login Credentials (Username & Password)"}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Confirmation Checkbox */}
        <div className="mb-6">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-start transition-colors select-none hover:bg-amber-500/15">
            <input
              type="checkbox"
              checked={credentialsAcknowledged}
              onChange={(e) => setCredentialsAcknowledged(e.target.checked)}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-amber-400 text-[#e11119] focus:ring-[#e11119]"
            />
            <span className="text-xs font-semibold text-amber-950">
              {locale === "ar"
                ? "أؤكد أنني قمت بحفظ وتدوين اسم المستخدم وكلمة المرور للدخول للتقييمات لاحقاً."
                : "I confirm that I have recorded and saved my username and password securely."}
            </span>
          </label>
        </div>

        {/* The 3 Direct Assessment Links */}
        <div className="space-y-3">
          <span className="block text-xs font-bold tracking-wider text-[#16162c] uppercase">
            {locale === "ar"
              ? "بوابات التقييمات الثلاثة (اضغط لبدء التقييم):"
              : "3 Assessment Portals (Click to start):"}
          </span>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* 1. PQP */}
            <a
              href="https://pqp.ibdl.net/start"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-[#e2e2ec] bg-white p-3.5 text-xs font-bold text-[#1d1d39] transition-all hover:border-[#419257] hover:bg-[#419257]/5 hover:shadow-sm"
            >
              <div className="truncate">
                <span className="block text-[10px] text-[#6a6a86]">
                  PQP™ Portal
                </span>
                <span className="truncate text-xs text-[#16162c]">
                  {locale === "ar"
                    ? "بدء تقييم PQP™ ←"
                    : "Start PQP™ Assessment →"}
                </span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#419257]" />
            </a>

            {/* 2. CPAT */}
            <a
              href="https://cpat.ibdl.net/start"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-[#e2e2ec] bg-white p-3.5 text-xs font-bold text-[#1d1d39] transition-all hover:border-[#419257] hover:bg-[#419257]/5 hover:shadow-sm"
            >
              <div className="truncate">
                <span className="block text-[10px] text-[#6a6a86]">
                  CPAT™ Portal
                </span>
                <span className="truncate text-xs text-[#16162c]">
                  {locale === "ar"
                    ? "بدء تقييم CPAT™ ←"
                    : "Start CPAT™ Assessment →"}
                </span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#419257]" />
            </a>

            {/* 3. Management Drives */}
            <a
              href="https://md.ibdl.net/start"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-[#e2e2ec] bg-white p-3.5 text-xs font-bold text-[#1d1d39] transition-all hover:border-[#419257] hover:bg-[#419257]/5 hover:shadow-sm"
            >
              <div className="truncate">
                <span className="block text-[10px] text-[#6a6a86]">
                  Management Drives®
                </span>
                <span className="truncate text-xs text-[#16162c]">
                  {locale === "ar"
                    ? "بدء Management Drives® ←"
                    : "Start Management Drives® →"}
                </span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#419257]" />
            </a>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-4 border-t border-[#e2e2ec] pt-3 text-[11.5px] leading-relaxed text-[#6a6a86]">
          {locale === "ar"
            ? "استخدم اسم المستخدم وكلمة المرور الموحدة أعلاه لتسجيل الدخول لأي من أدوات التقييم الثلاث. يتيح كل رابط محاولة مكتملة واحدة فقط ضمن استحقاق المرحلة الأولى المجاني."
            : "Use your unified username and password above to log in to any of the 3 assessments. Each test link allows 1 completed attempt under your complimentary Phase 1 entitlement."}
        </p>
      </div>

      {/* 6. Modal Footnote & Action Buttons */}
      <div className="space-y-3">
        <Link
          href="/login?activate=1"
          onClick={handleProceedToWorkspace}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-4 text-center text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-[#b60d14]"
        >
          <span>
            {locale === "ar"
              ? "استكشاف مساحة عمل المنصة ←"
              : "Explore the Hub workspace →"}
          </span>
        </Link>

        <button
          type="button"
          onClick={handleBackToWebsite}
          className="w-full cursor-pointer py-2.5 text-center text-xs font-bold text-[#6a6a86] transition-colors hover:text-[#16162c]"
        >
          {locale === "ar" ? "العودة للموقع" : "Back to the website"}
        </button>

        <p className="text-center text-[11px] text-[#6a6a86]">
          {locale === "ar"
            ? "وضع العرض التوضيحي للجلسة · لم يتم إرسال أي بريد إلكتروني فعلي."
            : "Session demo mode · No actual email was dispatched."}
        </p>
      </div>

      {/* 7. Safety Confirmation Guard Modal */}
      {showCredentialsConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="animate-in fade-in fixed inset-0 z-[1100] flex items-center justify-center bg-[#0a0a18]/70 p-4 backdrop-blur-xs duration-200"
        >
          <div className="animate-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-start shadow-2xl duration-200">
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-500/15 text-amber-700">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {locale === "ar"
                    ? "تنبيه: هل حفظت بيانات الدخول؟"
                    : "Wait! Did you save your credentials?"}
                </h3>
                <p className="text-[11px] font-medium text-slate-500">
                  {locale === "ar"
                    ? "تأكيد هام قبل مغادرة الصفحة"
                    : "Important check before leaving"}
                </p>
              </div>
            </div>

            <p className="mb-4 text-xs leading-relaxed text-slate-600">
              {locale === "ar"
                ? "لن تتمكن من رؤية كلمة المرور هذه مرة أخرى بعد إغلاق هذه النافذة. يرجى التأكد من نسخها أولاً حتى تتمكن من بدء التقييمات لاحقاً."
                : "You will not be able to view this password again after closing this window. Please copy or save it first so you can complete your assessments."}
            </p>

            {/* Quick credentials card */}
            <div className="mb-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] text-slate-500">
                  {locale === "ar" ? "اسم المستخدم:" : "Username:"}
                </span>
                <span className="font-bold text-slate-900">
                  {usernameSpecimen}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] text-slate-500">
                  {locale === "ar" ? "كلمة المرور:" : "Password:"}
                </span>
                <span className="font-bold text-[#e11119]">
                  {passwordSpecimen}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleCopyAndClose}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e11119] py-3 text-xs font-bold text-white shadow-md shadow-red-600/25 transition-all hover:bg-[#b60d14]"
              >
                <Copy className="h-4 w-4" />
                <span>
                  {locale === "ar"
                    ? "نسخ البيانات كاملة وإغلاق النافذة"
                    : "Copy Credentials & Close Window"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCredentialsAcknowledged(true);
                  closeRegistration();
                }}
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white py-2.5 text-center text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                {locale === "ar"
                  ? "نعم، قمت بحفظها بالفعل (إغلاق)"
                  : "Yes, I've Already Saved Them (Close)"}
              </button>

              <button
                type="button"
                onClick={() => setShowCredentialsConfirm(false)}
                className="w-full cursor-pointer py-1.5 text-center text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
              >
                {locale === "ar"
                  ? "الرجوع للبقاء في الصفحة"
                  : "Cancel & Stay on Page"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
