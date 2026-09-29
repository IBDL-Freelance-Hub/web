import React from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";

interface PriorityActionsCardProps {
  completionRate: number;
  isAr: boolean;
}

export function PriorityActionsCard({
  completionRate,
  isAr,
}: PriorityActionsCardProps) {
  return (
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

        {/* Action 3: 3 Diagnostic Assessment Credentials (LIVE route to profile) */}
        <Link
          href="/profile#assessment-credentials"
          className="flex items-center justify-between rounded-xl border border-[#e2e2ec] bg-[#f8fafc] p-4 transition hover:border-[#1d1d39]/40 hover:bg-white"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1d1d39] text-white">
              <KeyRound className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#16162c]">
                {isAr
                  ? "بيانات التقييمات الثلاثة (PQP™, CPAT™, MD)"
                  : "3 Assessment Credentials (PQP™, CPAT™, MD)"}
              </h4>
              <p className="mt-0.5 text-[11px] text-[#6a6a86]">
                {isAr
                  ? "عرض بيانات الدخول الموحدة وروابط بوابات التقييمات الثلاث."
                  : "View unified credentials & launch any of the 3 assessment portals."}
              </p>
            </div>
          </div>
          <span className="rounded-lg border border-[#e2e2ec] bg-white px-2.5 py-1 text-xs font-bold text-[#1d1d39] shadow-2xs">
            {isAr ? "عرض" : "View"}
          </span>
        </Link>
      </div>
    </section>
  );
}
