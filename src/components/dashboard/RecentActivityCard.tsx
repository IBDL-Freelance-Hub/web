"use client";

import React from "react";
import { Activity } from "lucide-react";

interface RecentActivityCardProps {
  isAr: boolean;
}

export function RecentActivityCard({ isAr }: RecentActivityCardProps) {
  return (
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
        {isAr ? "سجل النشاط مراقب ومحمي" : "Audit trail is actively monitored"}
      </div>
    </section>
  );
}
