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
  GraduationCap,
  Sparkles,
  Info,
  ShieldCheck,
  Compass,
  Layers,
  Award,
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
  url: string;
  badgeStyle: string;
  buttonStyle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEFAULT_PORTALS: AssessmentPortalDisplay[] = [
  {
    key: "pqp",
    code: "PQP™",
    nameEn: "Professional Quality Practitioner (PQP™)",
    nameAr: "محترف الجودة المهنية (PQP™)",
    tagEn: "Quality & Operations",
    tagAr: "معايير الجودة والعمليات",
    descEn:
      "Diagnostic benchmark for quality assurance, continuous process improvement, and operational excellence.",
    descAr:
      "أداة تشخيصية دولية لقياس الكفاءة والتميز في معايير الجودة وإدارة العمليات والتحسين المستمر.",
    url: "https://pqp.ibdl.net/start",
    badgeStyle: "bg-emerald-100/90 text-emerald-800 border-emerald-200",
    buttonStyle:
      "from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-emerald-700/20",
    icon: Award,
  },
  {
    key: "cpat",
    code: "CPAT™",
    nameEn: "Certified Professional Agile Trainer (CPAT™)",
    nameAr: "مدرب أجايل المعتمد دولياً (CPAT™)",
    tagEn: "Agile Facilitation",
    tagAr: "التدريب الرشيق وتيسير الورش",
    descEn:
      "Diagnostic assessment for agile training facilitation, interactive workshop mastery, and modern coaching.",
    descAr:
      "تقييم تشخيصي معتمد لقياس منهجيات التدريب الرشيق والكفاءة في تيسير ورش العمل التفاعلية.",
    url: "https://cpat.ibdl.net/start",
    badgeStyle: "bg-sky-100/90 text-sky-800 border-sky-200",
    buttonStyle:
      "from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white shadow-sky-700/20",
    icon: Compass,
  },
  {
    key: "md",
    code: "Management Drives®",
    nameEn: "Management Drives® Assessment",
    nameAr: "محركات الإدارة والسلوك (Management Drives®)",
    tagEn: "Leadership & Culture",
    tagAr: "أنماط القيادة والدوافع المؤسسية",
    descEn:
      "Scientific profiling of leadership drivers, personal motivations, and organizational behavioral patterns.",
    descAr:
      "دراسة علمية تشخيصية لتحليل أنماط الدوافع الفردية والمؤسسية عبر محركات القيادة الستة المعتمدة.",
    url: "https://md.ibdl.net/start",
    badgeStyle: "bg-purple-100/90 text-purple-800 border-purple-200",
    buttonStyle:
      "from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white shadow-purple-700/20",
    icon: Layers,
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

  // Merge backend portals with defaults (for URLs or custom configs)
  const portals: AssessmentPortalDisplay[] = DEFAULT_PORTALS.map((def) => {
    const matchedBackend = credentials?.portals?.find((p) => p.key === def.key);
    return {
      ...def,
      url: matchedBackend?.url || def.url,
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
      className="relative overflow-hidden rounded-3xl border-2 border-indigo-200/90 bg-gradient-to-br from-indigo-50/30 via-white to-slate-50/40 p-6 shadow-md shadow-indigo-500/5 transition-all sm:p-8"
    >
      {/* Top Brand Gradient Accent Bar */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#e11119] via-indigo-600 to-[#419257]" />

      {/* Header with Title and Prominent Badges */}
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
              className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl"
            >
              {isAr
                ? "بيانات الدخول لبوابات التقييمات الثلاثة (PQP™، CPAT™، Management Drives®)"
                : "3 Diagnostic Assessment Credentials (PQP™, CPAT™, Management Drives®)"}
            </h2>
            <p className="text-xs font-semibold text-indigo-950/80">
              {isAr
                ? "اسم مستخدم وكلمة مرور موحدة لتسجيل الدخول إلى بوابات التقييمات التشخيصية الثلاث"
                : "Unified single login credentials for all 3 international diagnostic assessment portals"}
            </p>
          </div>
        </div>

        {/* Quick Launch CTA Dropdown or Button */}
        <div className="flex items-center gap-2 sm:self-center">
          <a
            href={portals[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:brightness-110 active:scale-98"
          >
            <span>
              {isAr
                ? "بدء التقييمات عبر البوابات ←"
                : "Launch Assessment Portals →"}
            </span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-6 space-y-6">
        {/* 1. Unified Single Login Box (Highlighted Prominently) */}
        <div className="rounded-2xl border border-indigo-200/90 bg-indigo-50/60 p-4.5 shadow-2xs">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-white shadow-xs">
                <KeyRound className="h-3.5 w-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-indigo-950">
                  {isAr
                    ? "بيانات الدخول الموحدة (صالحة للبوابات الثلاث)"
                    : "Unified Login Credentials (Works for all 3 portals)"}
                </h3>
                <p className="text-[11px] text-indigo-900/80">
                  {isAr
                    ? "استخدم نفس اسم المستخدم وكلمة المرور أدناه لتسجيل الدخول إلى أي بوابة من بوابات التقييم."
                    : "Use this exact username and password to log in to any of the 3 assessment portals below."}
                </p>
              </div>
            </div>

            <div className="self-start sm:self-auto">
              <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-white px-2.5 py-0.5 text-[10.5px] font-bold text-indigo-700">
                <ShieldCheck className="h-3 w-3 text-indigo-600" />
                <span>
                  {isAr ? "تسجيل دخول موحد" : "Single Unified Sign-on"}
                </span>
              </span>
            </div>
          </div>

          {/* Username & Password Grid */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Username */}
            <div className="flex flex-col justify-between rounded-xl border border-indigo-100 bg-white p-3.5 shadow-2xs">
              <div>
                <span className="text-[10.5px] font-bold tracking-wider text-slate-500 uppercase">
                  {isAr
                    ? "اسم المستخدم الموحد (Unified Username)"
                    : "Unified Portal Username"}
                </span>
                <p className="mt-1 font-mono text-sm font-bold tracking-wide text-slate-900 select-all">
                  {username || "—"}
                </p>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => copyToClipboard(username, "username")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
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
            <div className="flex flex-col justify-between rounded-xl border border-indigo-100 bg-white p-3.5 shadow-2xs">
              <div>
                <span className="text-[10.5px] font-bold tracking-wider text-slate-500 uppercase">
                  {isAr
                    ? "كلمة المرور الموحدة (Unified Password)"
                    : "Unified Portal Password"}
                </span>
                <p className="mt-1 font-mono text-sm font-bold tracking-wide text-indigo-950 select-all">
                  {showPassword ? password : "••••••••••••"}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
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
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
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
          <div className="mt-3">
            <button
              type="button"
              onClick={copyAllCredentials}
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
                copiedField === "all"
                  ? "border-emerald-500 bg-emerald-600 text-white shadow-sm"
                  : "border-indigo-300 bg-white text-indigo-900 shadow-2xs hover:bg-indigo-50"
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
                  <Copy className="h-4 w-4 text-indigo-600" />
                  <span>
                    {isAr
                      ? "نسخ كافة بيانات الدخول الموحدة (اسم المستخدم + كلمة المرور + روابط البوابات الـ 3)"
                      : "Copy All Unified Credentials (Username + Password + 3 Portal URLs)"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. The 3 Diagnostic Assessment Portals Launchpad Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
              {isAr
                ? "بوابات التقييمات التشخيصية الثلاث (اضغط لبدء التقييم):"
                : "The 3 Diagnostic Assessment Portals (Click to Launch):"}
            </h3>
            <span className="text-[11px] font-semibold text-slate-500">
              {isAr
                ? "١ محاولة مكتملة لكل أداة"
                : "1 completed attempt per tool"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {portals.map((portal) => {
              const PortalIcon = portal.icon;
              const isLinkCopied = copiedField === `portal_${portal.key}`;
              return (
                <div
                  key={portal.key}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="space-y-3">
                    {/* Top Pills */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10.5px] font-bold ${portal.badgeStyle}`}
                      >
                        <PortalIcon className="h-3 w-3" />
                        <span>{portal.code}</span>
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                        {isAr ? portal.tagAr : portal.tagEn}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {isAr ? portal.nameAr : portal.nameEn}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                        {isAr ? portal.descAr : portal.descEn}
                      </p>
                    </div>

                    {/* Portal URL Box */}
                    <div className="border-slate-150 rounded-xl border bg-slate-50 p-2.5 font-mono text-[11px]">
                      <span className="block text-[9.5px] font-bold tracking-wider text-slate-500 uppercase">
                        {isAr ? "رابط البوابة:" : "Portal URL:"}
                      </span>
                      <p
                        className="mt-0.5 truncate font-semibold text-slate-800"
                        title={portal.url}
                      >
                        {portal.url}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Launch + Copy URL */}
                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r ${portal.buttonStyle} px-3 py-2 text-xs font-bold shadow-sm transition-all hover:brightness-110 active:scale-98`}
                    >
                      <span>
                        {isAr
                          ? `بدء تقييم ${portal.code} ←`
                          : `Start ${portal.code} →`}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(portal.url, `portal_${portal.key}`)
                      }
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                      title={isAr ? "نسخ رابط البوابة" : "Copy portal URL"}
                    >
                      {isLinkCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-slate-500" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Detailed Access Instructions (Mandated by QA Issue #6) */}
        <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4.5 text-xs text-sky-950">
          <div className="flex items-start gap-2.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-sky-950">
                {isAr
                  ? "تعليمات هامة للاختبار والتقييمات الثلاثة:"
                  : "Important Diagnostic Assessments Instructions:"}
              </h4>
              <ul className="list-inside list-disc space-y-1 leading-relaxed font-medium text-sky-900/90">
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
      </div>
    </section>
  );
}

export default AssessmentCredentialsCard;
