"use client";

/**
 * ============================================================================
 * PLACEHOLDER AUDIT NOTICE (Section 16: DSH-01 to DSH-14 / Sprint Planning):
 *
 * The following Dashboard sections are PLACEHOLDER-ONLY pending future sprint models:
 * 1. Statistics Tiles ("Open requests", "Active tools", "Certificates", "Transactions"):
 *    - Rendered with static "—" values and dev badges: "Pending Requests/Activity/Certificate models (Sprint 2/3)".
 *    - No fabricated or mock metrics are displayed.
 * 2. Recent Activity Card:
 *    - Renders empty state per ACT-49: "Nothing has happened on your account yet."
 * 3. Priority Actions Grid:
 *    - Rendered dynamically according to real membership tier per DSH-18. Unbuilt target
 *      routes are marked disabled/coming soon per SCR-27 rather than linking to 404s.
 *
 * REAL DATA WIRED TO BACKEND (GET /api/v1/auth/me):
 * 1. Identity strip (Avatar, Welcome back greeting, Member name, Tier badge)
 * 2. Membership record card (Tier name, Active status pill, start and expiry dates per DSH-08/DSH-09)
 * 3. Unified Profile Completion Engine (11 canonical fields via src/lib/profile-completion.ts)
 * ============================================================================
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/components/common/DirectionProvider";
import { getInitials } from "@/lib/utils";
import {
  Inbox,
  Wrench,
  Award,
  Receipt,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import type { MemberDto, MembershipDto } from "@/types/api";

interface MemberDashboardProps {
  user: {
    id: string;
    email: string;
    status: string;
  };
  member: MemberDto;
  membership: MembershipDto | null;
  completionRate: number;
  completedCount: number;
}

export function MemberDashboard({
  member,
  membership,
  completionRate,
  completedCount,
}: MemberDashboardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  // First name extraction for greeting
  const getFirstName = () => {
    const rawName =
      isAr && member.fullNameAr ? member.fullNameAr : member.fullNameEn;
    if (!rawName) return isAr ? "عضو منصة المستقلين" : "Member";
    return rawName.trim().split(/\s+/)[0];
  };

  const firstName = getFirstName();
  const initials = getInitials(member.fullNameEn);

  // Format membership tier display
  const getTierDisplay = (tier?: string) => {
    if (!tier) return isAr ? "عضوية أساسية" : "Essential Membership";
    const normalized = tier.toUpperCase();
    if (normalized === "MASTER") {
      return isAr ? "عضوية خبير معتمد" : "Master Membership";
    }
    if (normalized === "PROFESSIONAL") {
      return isAr ? "عضوية مهنية" : "Professional Membership";
    }
    return isAr ? "عضوية أساسية" : "Essential Membership";
  };

  // Format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const isMembershipActive = membership?.status === "ACTIVE";

  return (
    <div className="space-y-8">
      {/* 1. REAL: Member Identity Strip (DSH-01) */}
      <section
        aria-labelledby="identity-strip-heading"
        className="relative overflow-hidden rounded-2xl border border-[#1e2238] bg-[#141428] p-6 text-white shadow-md sm:p-8"
      >
        <h2 id="identity-strip-heading" className="sr-only">
          {isAr ? "شريط الترحيب بالمدرب" : "Welcome Banner"}
        </h2>

        {/* Ambient subtle glow background */}
        <div
          className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#222442] text-xl font-bold shadow-inner">
              {member.photoFileId ? (
                <Image
                  src={`/api/v1/files/${member.photoFileId}`}
                  alt={member.fullNameEn}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                  {isAr ? "مساحة عمل المدرب" : "Trainer Workspace"}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span className="text-xs text-white/70">
                  {getTierDisplay(membership?.tier)}
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {isAr
                  ? `مرحباً بعودتك، ${firstName}`
                  : `Welcome back, ${firstName}`}
              </h1>
              <p className="text-xs text-slate-400">
                {isAr
                  ? "تابع إحصائيات نشاطك، اعتماداتك المهنية، ومستوى ظهورك في الدليل."
                  : "Track your activity metrics, professional accreditation, and directory standing."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-[#141428] shadow-xs transition hover:bg-amber-400 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#141428] focus:outline-none"
            >
              <span>{isAr ? "الملف الشخصي" : "View profile"}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Top Metric Row: Profile Completion Ring + Membership Record Card */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* REAL: Profile Completion Card (11-field engine) */}
        <section
          aria-labelledby="completion-card-heading"
          className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8"
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h3
                  id="completion-card-heading"
                  className="text-base font-bold text-slate-900"
                >
                  {isAr ? "اكتمال الملف الشخصي" : "Profile completion"}
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500">
                {completedCount}/11 {isAr ? "حقول" : "fields"}
              </span>
            </div>

            <div className="my-6 flex flex-col items-center justify-center">
              {/* Circular Progress Display */}
              <div className="relative flex h-32 w-32 items-center justify-center">
                <svg
                  className="h-full w-full -rotate-90 transform"
                  viewBox="0 0 36 36"
                >
                  {/* Background Track */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress Arc */}
                  <path
                    className={
                      completionRate === 100
                        ? "text-emerald-500 transition-all duration-1000"
                        : "text-amber-500 transition-all duration-1000"
                    }
                    strokeDasharray={`${completionRate}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">
                    {completionRate}%
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">
                    {completionRate === 100
                      ? isAr
                        ? "مكتمل"
                        : "Complete"
                      : isAr
                        ? "قيد الإكمال"
                        : "In progress"}
                  </span>
                </div>
              </div>

              <p className="mt-3 max-w-xs text-center text-xs leading-relaxed text-slate-500">
                {completionRate === 100
                  ? isAr
                    ? "أحسنت! ملفك الشخصي مكتمل ومؤهل للظهور في دليل المدربين المعتمدين."
                    : "Excellent! Your profile is complete and eligible for publication in the Trainer Directory."
                  : isAr
                    ? "أكمل بقية الحقول الـ ١١ للحصول على معدل اكتمال ١٠٠٪ وتفعيل الظهور في الدليل."
                    : "Complete all 11 canonical fields to reach 100% and unlock public Trainer Directory visibility."}
              </p>
            </div>
          </div>

          <Link
            href="/profile"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            {completionRate === 100
              ? isAr
                ? "مراجعة الملف"
                : "Review profile"
              : isAr
                ? "إكمال الملف الآن"
                : "Complete profile"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        {/* REAL: Membership Record Card (DSH-08/DSH-09) */}
        <section
          aria-labelledby="membership-card-heading"
          className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8 lg:col-span-2"
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-slate-700" />
                <h3
                  id="membership-card-heading"
                  className="text-base font-bold text-slate-900"
                >
                  {isAr ? "سجل العضوية والاشتراك" : "Membership record"}
                </h3>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  isMembershipActive
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isMembershipActive ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {isMembershipActive
                  ? isAr
                    ? "عضوية سارية"
                    : "Active"
                  : isAr
                    ? "غير نشطة"
                    : "Inactive"}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-[11px] font-medium text-slate-500">
                  {isAr ? "فئة العضوية" : "Membership Tier"}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {getTierDisplay(membership?.tier)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-[11px] font-medium text-slate-500">
                  {isAr ? "تاريخ بدء الاشتراك" : "Start Date"}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {formatDate(membership?.startDate)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="text-[11px] font-medium text-slate-500">
                  {isAr ? "تاريخ الانتهاء والتجديد" : "Expiry / Renewal"}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {formatDate(membership?.endDate)}
                </p>
              </div>
            </div>

            {/* DSH-08 / DSH-09 Status Explanation Strip */}
            <div className="mt-6">
              {isMembershipActive ? (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-3.5 text-xs text-emerald-900">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>
                    {isAr
                      ? `عضويتك المعتمدة نشطة ومستمرة حتى ${formatDate(membership?.endDate)}.`
                      : `Your accredited membership is active and valid until ${formatDate(membership?.endDate)}.`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>
                    {isAr
                      ? "عضويتك غير نشطة حالياً. يرجى تجديد الاشتراك للوصول إلى كافة أدوات الاعتماد ودليل المدربين."
                      : "Your membership is currently inactive. Renew or upgrade to unlock full member privileges and directory access."}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {isAr ? "التجديد السنوي تلقائي" : "Annual billing cycle"}
            </span>
          </div>
        </section>
      </div>

      {/* 3. PLACEHOLDER: 4 Statistics Tiles (Section 16: DSH-03 to DSH-06) */}
      <section aria-labelledby="metrics-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="metrics-heading" className="text-sm font-bold text-slate-900">
            {isAr ? "المؤشرات التشغيلية" : "Operational Metrics"}
          </h2>
          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            Sprint 2/3 Models Pending
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Tile 1: Open Requests */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isAr ? "الطلبات المفتوحة" : "Open requests"}
              </span>
              <Inbox className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
            <p className="mt-2 text-[10px] font-medium text-amber-700">
              Pending Requests model (Sprint 2)
            </p>
          </div>

          {/* Tile 2: Active Tools */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isAr ? "الأدوات النشطة" : "Active tools"}
              </span>
              <Wrench className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
            <p className="mt-2 text-[10px] font-medium text-amber-700">
              Pending Activity model (Sprint 2)
            </p>
          </div>

          {/* Tile 3: Certificates */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isAr ? "الشهادات الممنوحة" : "Certificates"}
              </span>
              <Award className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
            <p className="mt-2 text-[10px] font-medium text-amber-700">
              Pending Certificate model (Sprint 3)
            </p>
          </div>

          {/* Tile 4: Transactions */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isAr ? "المعاملات المالية" : "Transactions"}
              </span>
              <Receipt className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
            <p className="mt-2 text-[10px] font-medium text-amber-700">
              Pending Transaction model (Sprint 3)
            </p>
          </div>
        </div>
      </section>

      {/* 4. Two-Column Row: Priority Actions Grid + Recent Activity Card */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Priority Actions Grid (DSH-18) */}
        <section
          aria-labelledby="priority-actions-heading"
          className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8"
        >
          <div className="border-b border-slate-100 pb-4">
            <h3
              id="priority-actions-heading"
              className="text-base font-bold text-slate-900"
            >
              {isAr ? "الإجراءات والمهام ذات الأولوية" : "Priority actions"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {isAr
                ? "إجراءات مخصصة بناءً على مستوى عضويتك واكتمال ملفك."
                : "Personalized actions tailored to your membership tier and profile status."}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {/* Action 1: Complete / Update Profile (LIVE) */}
            <Link
              href="/profile"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-slate-300 hover:bg-slate-100"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {completionRate < 100
                    ? isAr
                      ? "استكمال ملفك المهني"
                      : "Complete your professional profile"
                    : isAr
                      ? "مراجعة وتحديث الملف المهني"
                      : "Review your professional profile"}
                </h4>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {completionRate < 100
                    ? isAr
                      ? "وصل ملفك إلى معدل اكتمال أقل من ١٠٠٪."
                      : "Your profile is missing some canonical fields."
                    : isAr
                      ? "تم اكتمال ملفك بنسبة ١٠٠٪."
                      : "Your 11 canonical fields are fully completed."}
                </p>
              </div>
              <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
                {isAr ? "فتح" : "Open"}
              </span>
            </Link>

            {/* Action 2: Security checkup (LIVE) */}
            <Link
              href="/settings/security"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-slate-300 hover:bg-slate-100"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {isAr
                    ? "مراجعة أمان الحساب والجلسات"
                    : "Review account security & active sessions"}
                </h4>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {isAr
                    ? "إدارة الأجهزة المتصلة والجلسات النشطة لحسابك."
                    : "Inspect active devices and terminate unauthorized sessions."}
                </p>
              </div>
              <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
                {isAr ? "إدارة" : "Manage"}
              </span>
            </Link>

            {/* Action 3: Take Accreditation Assessment (Disabled / Coming Soon per SCR-27) */}
            <div
              aria-disabled="true"
              className="flex cursor-not-allowed items-center justify-between rounded-xl border border-slate-100 bg-slate-50/40 p-4 text-slate-400 select-none"
            >
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-slate-400" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-500">
                    {isAr
                      ? "اختبار التقييم والاعتماد الدولي"
                      : "Accreditation assessment exam"}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {isAr
                      ? "متاح لأعضاء الفئات المهنية المعتمدة قريباً."
                      : "Available for accredited members soon."}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                {isAr ? "قريباً" : "Coming soon"}
              </span>
            </div>
          </div>
        </section>

        {/* Recent Activity Card (ACT-49 Empty State) */}
        <section
          aria-labelledby="recent-activity-heading"
          className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8"
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <Activity className="h-5 w-5 text-slate-600" />
                <h3
                  id="recent-activity-heading"
                  className="text-base font-bold text-slate-900"
                >
                  {isAr ? "النشاطات الأخيرة" : "Recent activity"}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">ACT-49</span>
            </div>

            {/* ACT-49 Genuine Empty State */}
            <div className="my-10 flex flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Activity className="h-6 w-6" />
              </div>
              <h4 className="mt-4 text-sm font-semibold text-slate-800">
                {isAr
                  ? "لم تحدث أي نشاطات على حسابك بعد."
                  : "Nothing has happened on your account yet."}
              </h4>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
                {isAr
                  ? "ستظهر هنا سجلات تسجيل الدخول، طلبات التقييم، وتحديثات الدليل بمجرد بدئها."
                  : "Login events, assessment submissions, and directory updates will appear here as they occur."}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-center text-[11px] text-slate-400">
            {isAr
              ? "سجل النشاط مراقب ومحمي"
              : "Audit trail is actively monitored"}
          </div>
        </section>
      </div>
    </div>
  );
}
