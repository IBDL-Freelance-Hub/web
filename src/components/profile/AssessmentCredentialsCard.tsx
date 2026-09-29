"use client";

import React, { useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  KeyRound,
  ExternalLink,
  Copy,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface AssessmentCredentialData {
  name?: string;
  portalUrl?: string;
  username?: string;
  password?: string;
  status?: string;
  note?: string;
}

export interface AssessmentCredentialsCardProps {
  credentials?: AssessmentCredentialData | null;
  userStatus?: string;
}

export function AssessmentCredentialsCard({
  credentials,
  userStatus = "ACTIVE",
}: AssessmentCredentialsCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Strict visibility rule per QA Issue #6:
  // The section should ONLY be visible when the user's account has completed
  // activation and the relevant assessment access is available.
  const isEligible =
    userStatus === "ACTIVE" &&
    Boolean(credentials && credentials.status === "ACTIVE");

  if (!isEligible) {
    return null;
  }

  const assessmentName =
    credentials?.name || "Professional Quality Practitioner (PQP™)";
  const portalUrl =
    credentials?.portalUrl || "https://assessment.ibdl.net/start";
  const username = credentials?.username || "";
  const password = credentials?.password || "";

  const copyToClipboard = async (text: string, field: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    } catch {
      // silent fallback
    }
  };

  const copyAllCredentials = () => {
    const text = isAr
      ? `بيانات الدخول للتقييم المهني (${assessmentName}):\nبوابة الدخول: ${portalUrl}\nاسم المستخدم: ${username}\nكلمة المرور: ${password}`
      : `Assessment Credentials (${assessmentName}):\nPortal URL: ${portalUrl}\nUsername: ${username}\nPassword: ${password}`;
    copyToClipboard(text, "all");
  };

  return (
    <section
      id="assessment-credentials"
      aria-labelledby="assessment-credentials-title"
      className="relative overflow-hidden rounded-3xl border-2 border-indigo-200/90 bg-gradient-to-br from-indigo-50/30 via-white to-slate-50/40 p-6 shadow-md shadow-indigo-500/5 transition-all sm:p-8"
    >
      {/* Top Brand Gradient Accent Bar */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#e11119] via-indigo-600 to-[#419257]" />

      {/* Header with Title and Prominent Status */}
      <div className="flex flex-col gap-4 border-b border-indigo-100/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-100/80 px-2 py-0.5 text-[11px] font-bold text-indigo-800">
                <Sparkles className="h-3 w-3" />
                <span>
                  {isAr
                    ? "التقييم المهني المعتمد"
                    : "Complimentary Entitlement"}
                </span>
              </span>
              <Badge variant="success" dot>
                <span>{isAr ? "مفعلة وجاهزة للاختبار" : "Active & Ready"}</span>
              </Badge>
            </div>
            <h2
              id="assessment-credentials-title"
              className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl"
            >
              {isAr ? "بيانات الدخول للتقييم المهني" : "Assessment Credentials"}
            </h2>
            <p className="text-xs font-semibold text-indigo-950/80">
              {assessmentName} —{" "}
              <span className="font-medium text-slate-500">
                {isAr
                  ? "بوابة الاختبارات التشخيصية الدولية IBDL"
                  : "IBDL International Assessment Portal"}
              </span>
            </p>
          </div>
        </div>

        {/* Quick Launch CTA Button */}
        <a
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e11119] to-red-700 px-5 py-3 text-xs font-bold text-white shadow-md shadow-red-600/25 transition-all hover:brightness-110 active:scale-98 sm:self-center"
        >
          <span>
            {isAr ? "بدء الاختبار عبر البوابة ←" : "Launch Assessment Portal →"}
          </span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Main Credentials Content */}
      <div className="mt-6 space-y-6">
        {/* 1. Direct Portal Access Banner */}
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-2xs sm:flex-row sm:items-center">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold tracking-wider text-indigo-700 uppercase">
              {isAr
                ? "رابط بوابة التقييم (Portal Link)"
                : "Assessment Portal Access URL"}
            </span>
            <p className="font-mono text-xs font-bold break-all text-slate-900">
              {portalUrl}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={() => copyToClipboard(portalUrl, "portalUrl")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {copiedField === "portalUrl" ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-slate-500" />
              )}
              <span>
                {copiedField === "portalUrl"
                  ? isAr
                    ? "تم النسخ"
                    : "Copied"
                  : isAr
                    ? "نسخ الرابط"
                    : "Copy Link"}
              </span>
            </button>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100"
            >
              <span>{isAr ? "فتح" : "Open"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* 2. Username & Password Interactive Box */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Username */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-500">
                {isAr ? "اسم المستخدم (Username)" : "Portal Username"}
              </span>
              <p className="mt-1 font-mono text-sm font-bold tracking-wide text-slate-900 select-all">
                {username || "—"}
              </p>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => copyToClipboard(username, "username")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                title={isAr ? "نسخ اسم المستخدم" : "Copy username"}
              >
                {copiedField === "username" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                )}
                <span>
                  {copiedField === "username"
                    ? isAr
                      ? "تم النسخ"
                      : "Copied"
                    : isAr
                      ? "نسخ اسم المستخدم"
                      : "Copy Username"}
                </span>
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-500">
                {isAr ? "كلمة المرور (Password)" : "Portal Password"}
              </span>
              <p className="mt-1 font-mono text-sm font-bold tracking-wide text-indigo-950 select-all">
                {showPassword ? password : "••••••••••••"}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                title={
                  showPassword
                    ? isAr
                      ? "إخفاء"
                      : "Hide"
                    : isAr
                      ? "إظهار"
                      : "Show"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-3.5 w-3.5 text-slate-600" />
                ) : (
                  <Eye className="h-3.5 w-3.5 text-slate-600" />
                )}
                <span>
                  {showPassword
                    ? isAr
                      ? "إخفاء"
                      : "Hide"
                    : isAr
                      ? "إظهار"
                      : "Show"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(password, "password")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                title={isAr ? "نسخ كلمة المرور" : "Copy password"}
              >
                {copiedField === "password" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                )}
                <span>
                  {copiedField === "password"
                    ? isAr
                      ? "تم النسخ"
                      : "Copied"
                    : isAr
                      ? "نسخ كلمة المرور"
                      : "Copy Password"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Master Copy All Button */}
        <div>
          <button
            type="button"
            onClick={copyAllCredentials}
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold transition-all ${
              copiedField === "all"
                ? "border-emerald-500 bg-emerald-600 text-white shadow-sm"
                : "border-indigo-200 bg-indigo-50/70 text-indigo-900 hover:bg-indigo-100/80"
            }`}
          >
            {copiedField === "all" ? (
              <>
                <Check className="h-4 w-4" />
                <span>
                  {isAr
                    ? "✓ تم نسخ كافة بيانات الدخول بنجاح!"
                    : "✓ All Credentials Copied to Clipboard!"}
                </span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>
                  {isAr
                    ? "نسخ كافة بيانات الدخول (الرابط + اسم المستخدم + كلمة المرور)"
                    : "Copy All Assessment Credentials (URL + Username + Password)"}
                </span>
              </>
            )}
          </button>
        </div>

        {/* 3. Detailed Access Instructions (Mandated by QA Issue #6) */}
        <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4.5 text-xs text-sky-950">
          <div className="flex items-start gap-2.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-sky-950">
                {isAr
                  ? "تعليمات هامة للاختبار والتقييم:"
                  : "Important Assessment Instructions:"}
              </h4>
              <ul className="list-inside list-disc space-y-1 leading-relaxed font-medium text-sky-900/90">
                <li>
                  {isAr
                    ? "بيانات الدخول أعلاه مخصصة حصرياً لبوابة التقييم المستقلة (تختلف عن بيانات حسابك في Freelancers Hub)."
                    : "These credentials are strictly for the assessment portal login screen (separate from your Freelancers Hub account login)."}
                </li>
                <li>
                  {isAr
                    ? "يمنحك استحقاق المرحلة الأولى محاولة مكتملة واحدة فقط لكل وحدة تقييم. البيانات غير قابلة للمشاركة."
                    : "Your complimentary Phase 1 entitlement covers one completed attempt. Credentials are single-use per module."}
                </li>
                <li>
                  {isAr
                    ? "يُرجى التأكد من استقرار الاتصال بالإنترنت قبل بدء جلسة التقييم لضمان حفظ الإجابات والنتائج."
                    : "Ensure a stable internet connection before beginning the assessment to ensure progress is saved."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssessmentCredentialsCard;
