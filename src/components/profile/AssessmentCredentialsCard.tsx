"use client";

import React, { useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  Copy,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Sparkles,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { AssessmentPortalItem } from "@/types/member";

export interface AssessmentCredentialData {
  name?: string;
  portalUrl?: string;
  username?: string;
  password?: string;
  status?: string;
  note?: string;
  portals?: AssessmentPortalItem[];
}

export interface AssessmentCredentialsCardProps {
  credentials?: AssessmentCredentialData | null;
  userStatus?: string;
}

interface AssessmentPortalDisplay {
  key: string;
  code: string;
  nameEn: string;
  nameAr: string;
  tagEn: string;
  tagAr: string;
  descEn: string;
  descAr: string;
  logoUrl: string;
  url: string;
}

const DEFAULT_PORTALS: AssessmentPortalDisplay[] = [
  {
    key: "pqp",
    code: "PQP™",
    nameEn: "PQP™",
    nameAr: "PQP™",
    tagEn: "Personality & Qualities",
    tagAr: "السمات والكفاءات الشخصية",
    descEn:
      "Work-based behavioral diagnostic measuring 20 key personality & motive dimensions.",
    descAr: "تقييم سلوكي تشخيصي يقيس ٢٠ بعداً رئيسياً للشخصية ودوافع العمل.",
    logoUrl: "/tools_logos/pqp.png",
    url: "https://pqp.ibdl.net/start",
  },
  {
    key: "cpat",
    code: "CPAT™",
    nameEn: "CPAT™",
    nameAr: "CPAT™",
    tagEn: "Professional Assessment",
    tagAr: "التقييم المهني للمدربين",
    descEn:
      "Comprehensive competency evaluator assessing technical, managerial, and operational skills.",
    descAr:
      "تقييم شامل للكفاءات والمهارات الفنية والإدارية والتشغيلية للمدربين.",
    logoUrl: "/tools_logos/cpat.png",
    url: "https://cpat.ibdl.net/start",
  },
  {
    key: "md",
    code: "Management Drives®",
    nameEn: "Management Drives®",
    nameAr: "Management Drives®",
    tagEn: "Leadership Dynamics",
    tagAr: "ديناميكيات القيادة",
    descEn:
      "Evaluates organizational drive dynamics & leadership behavior patterns across 6 core drives.",
    descAr:
      "تقييم علمي متقدم لتحليل أنماط السلوك والدوافع المؤسسية عبر محركات القيادة الستة.",
    logoUrl: "/tools_logos/management-drives.png",
    url: "https://md.ibdl.net/start",
  },
];

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

  const username = credentials?.username || "";
  const password = credentials?.password || "";

  // Merge backend portals with defaults (for URLs or logos)
  const portals: AssessmentPortalDisplay[] = DEFAULT_PORTALS.map((def) => {
    const matchedBackend = credentials?.portals?.find((p) => p.key === def.key);
    return {
      ...def,
      url: matchedBackend?.url || def.url,
      logoUrl: matchedBackend?.logoUrl || def.logoUrl,
      nameEn: matchedBackend?.nameEn || def.nameEn,
      nameAr: matchedBackend?.nameAr || def.nameAr,
      tagEn: matchedBackend?.tagEn || def.tagEn,
      tagAr: matchedBackend?.tagAr || def.tagAr,
    };
  });

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
      ? `بيانات الدخول الموحدة للتقييمات التشخيصية الثلاثة (IBDL):\n` +
        `-----------------------------------------\n` +
        `اسم المستخدم الموحد: ${username}\n` +
        `كلمة المرور الموحدة: ${password}\n` +
        `-----------------------------------------\n` +
        `بوابات الدخول (محاولة مجانية واحدة لكل بوابة):\n` +
        `1. تقييم PQP™:\n   ${portals[0].url}\n` +
        `2. تقييم CPAT™:\n   ${portals[1].url}\n` +
        `3. تقييم Management Drives®:\n   ${portals[2].url}\n` +
        `-----------------------------------------\n` +
        `ملاحظة: نفس اسم المستخدم وكلمة المرور صالحان للدخول لكافة البوابات الثلاث.`
      : `Unified Credentials for IBDL 3 Diagnostic Assessments:\n` +
        `-----------------------------------------\n` +
        `Unified Username: ${username}\n` +
        `Unified Password: ${password}\n` +
        `-----------------------------------------\n` +
        `Assessment Portals (1 complimentary attempt each):\n` +
        `1. PQP™ Assessment:\n   ${portals[0].url}\n` +
        `2. CPAT™ Assessment:\n   ${portals[1].url}\n` +
        `3. Management Drives® Assessment:\n   ${portals[2].url}\n` +
        `-----------------------------------------\n` +
        `Note: Use the exact same username & password to sign in to all 3 assessment portals.`;
    copyToClipboard(text, "all");
  };

  return (
    <section
      id="assessment-credentials"
      aria-labelledby="assessment-credentials-title"
      className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8"
    >
      {/* Top Brand Subtle Bar (Navy to Red accent) */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#e11119] via-[#1d1d39] to-[#419257]" />

      {/* Header with Title and Badges */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1d1d39] text-white shadow-xs">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md border border-[#1d1d39]/10 bg-[#1d1d39]/5 px-2 py-0.5 text-[11px] font-bold text-[#1d1d39]">
                <Sparkles className="h-3 w-3 text-[#e11119]" />
                <span>
                  {isAr
                    ? "استحقاق المرحلة الأولى المجاني (٣ تقييمات)"
                    : "Complimentary Phase 1 Entitlement (3 Assessments)"}
                </span>
              </span>
              <Badge variant="success" dot>
                <span>{isAr ? "مفعلة وجاهزة للاختبار" : "Active & Ready"}</span>
              </Badge>
            </div>
            <h2
              id="assessment-credentials-title"
              className="text-base font-extrabold tracking-tight text-[#16162c] sm:text-lg"
            >
              {isAr
                ? "بيانات الدخول لبوابات التقييمات الثلاثة (PQP™، CPAT™، Management Drives®)"
                : "3 Diagnostic Assessment Credentials (PQP™, CPAT™, Management Drives®)"}
            </h2>
            <p className="text-xs font-semibold text-[#6a6a86]">
              {isAr
                ? "اسم مستخدم وكلمة مرور موحدة لتسجيل الدخول إلى بوابات التقييمات التشخيصية الثلاث"
                : "Unified single login credentials for all 3 international diagnostic assessment portals"}
            </p>
          </div>
        </div>
      </div>

      {/* Middle 2-Column Section */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left Column: Credentials in Light Gray Box */}
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-[#e2e2ec] bg-[#f8fafc] p-4 lg:col-span-7">
          {/* Username Card (Top) */}
          <div className="flex flex-col justify-between rounded-xl border border-[#e2e2ec] bg-white p-4 shadow-2xs">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#6a6a86] uppercase">
                {isAr ? "اسم المستخدم الموحد" : "UNIFIED PORTAL USERNAME"}
              </span>
              <p className="mt-1 font-mono text-sm font-bold tracking-wide text-[#16162c] select-all">
                {username || "—"}
              </p>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => copyToClipboard(username, "username")}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#e2e2ec] bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#1d1d39] transition hover:bg-[#f1f1f7]"
                title={isAr ? "نسخ اسم المستخدم" : "Copy username"}
              >
                {copiedField === "username" ? (
                  <Check className="h-3.5 w-3.5 text-[#419257]" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-[#6a6a86]" />
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

          {/* Password Card (Bottom) */}
          <div className="flex flex-col justify-between rounded-xl border border-[#e2e2ec] bg-white p-4 shadow-2xs">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#6a6a86] uppercase">
                {isAr ? "كلمة المرور الموحدة" : "UNIFIED PORTAL PASSWORD"}
              </span>
              <p className="mt-1 font-mono text-sm font-bold tracking-wide text-[#16162c] select-all">
                {showPassword ? password : "••••••••••"}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#e2e2ec] bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#1d1d39] transition hover:bg-[#f1f1f7]"
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
                  <EyeOff className="h-3.5 w-3.5 text-[#6a6a86]" />
                ) : (
                  <Eye className="h-3.5 w-3.5 text-[#6a6a86]" />
                )}
                <span>
                  {showPassword
                    ? isAr
                      ? "إخفاء"
                      : "Hide"
                    : isAr
                      ? "Show"
                      : "Show"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(password, "password")}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#e2e2ec] bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#1d1d39] transition hover:bg-[#f1f1f7]"
                title={isAr ? "نسخ كلمة المرور" : "Copy password"}
              >
                {copiedField === "password" ? (
                  <Check className="h-3.5 w-3.5 text-[#419257]" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-[#6a6a86]" />
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

          {/* Master Copy All Button */}
          <button
            type="button"
            onClick={copyAllCredentials}
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition-all ${
              copiedField === "all"
                ? "border-[#419257] bg-[#419257] text-white shadow-xs"
                : "border-[#e2e2ec] bg-white text-[#1d1d39] shadow-2xs hover:border-[#1d1d39]/40 hover:bg-[#f8fafc]"
            }`}
          >
            {copiedField === "all" ? (
              <>
                <Check className="h-4 w-4" />
                <span>
                  {isAr
                    ? "✓ تم نسخ كافة بيانات الدخول الموحدة وروابط البوابات الثلاث بنجاح!"
                    : "✓ All Unified Credentials & 3 Portal URLs Copied to Clipboard!"}
                </span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-[#1d1d39]" />
                <span>
                  {isAr
                    ? "نسخ كافة بيانات الدخول الموحدة (اسم المستخدم + كلمة المرور + روابط البوابات الـ 3)"
                    : "Copy All Unified Credentials (Username + Password + 3 Portal URLs)"}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: 3 Diagnostic Assessment Cards with Brand Logos */}
        <div className="flex flex-col justify-between gap-3 lg:col-span-5">
          {portals.map((portal) => (
            <a
              key={portal.key}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer flex-col justify-between rounded-xl border border-[#e2e2ec] bg-white p-3.5 shadow-2xs transition-all duration-200 hover:border-[#1d1d39]/40 hover:shadow-xs"
            >
              <div>
                {/* Header row: Brand Logo + AVAILABLE badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-7 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={portal.logoUrl}
                      alt={`${portal.code} Logo`}
                      className="h-6 max-w-[150px] object-contain object-left transition-transform duration-200 group-hover:scale-102 rtl:object-right"
                    />
                  </div>
                </div>

                {/* Subtitle / Tag */}
                <p className="mt-2 text-[11px] font-semibold text-[#6a6a86]">
                  {isAr ? portal.tagAr : portal.tagEn}
                </p>

                {/* Short Description */}
                <p className="mt-1 text-[10.5px] leading-relaxed text-[#85859e]">
                  {isAr ? portal.descAr : portal.descEn}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Instructions Box */}
      <div className="mt-5 rounded-2xl border border-[#e2e2ec] bg-[#f8fafc] p-4.5 text-xs text-[#16162c]">
        <div className="flex items-start gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1d1d39]" />
          <div className="space-y-1.5">
            <h4 className="font-bold text-[#16162c]">
              {isAr
                ? "تعليمات هامة للاختبار والتقييمات الثلاثة:"
                : "Important Diagnostic Assessments Instructions:"}
            </h4>
            <ul className="list-inside list-disc space-y-1 text-[11px] leading-relaxed font-medium text-[#6a6a86]">
              <li>
                {isAr
                  ? "بيانات الدخول الموحدة أعلاه مخصصة حصرياً لبوابات التقييمات الثلاث (تختلف عن كلمة مرور حسابك في منصة Freelancers Hub)."
                  : "The unified credentials above are strictly for the 3 assessment portals (separate from your Freelancers Hub account login)."}
              </li>
              <li>
                {isAr
                  ? "يمنحك استحقاق المرحلة الأولى محاولة مكتملة واحدة فقط لكل أداة تقييم (PQP™، CPAT™، Management Drives®). البيانات غير قابلة للمشاركة أو التحويل."
                  : "Your complimentary Phase 1 entitlement covers 1 completed attempt per tool (PQP™, CPAT™, Management Drives®). Credentials are single-use per module."}
              </li>
              <li>
                {isAr
                  ? "يُرجى التأكد من استقرار الاتصال بالإنترنت قبل بدء جلسة التقييم لضمان حفظ الإجابات والنتائج واعتماد التقرير."
                  : "Ensure a stable internet connection before beginning any assessment to guarantee your progress and diagnostic report are saved."}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssessmentCredentialsCard;
