import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

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
  );
}
