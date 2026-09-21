"use client";

import React from "react";
import { Activity, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import type { DashboardRecentActivityItem, ActivityTone } from "@/types/member";

interface RecentActivityCardProps {
  recentActivity?: DashboardRecentActivityItem[];
  isAr: boolean;
}

/**
 * FIX 3: Tone styling based directly on backend ActivityTone ('ok' | 'now' | 'stop')
 */
export function getActivityToneStyles(tone: ActivityTone) {
  switch (tone) {
    case "ok":
      return {
        badgeClasses: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dotClass: "bg-emerald-500",
        iconType: "ok" as const,
      };
    case "now":
      return {
        badgeClasses: "border-blue-200 bg-blue-50 text-blue-700",
        dotClass: "bg-blue-500",
        iconType: "now" as const,
      };
    case "stop":
      return {
        badgeClasses: "border-rose-200 bg-rose-50 text-rose-700",
        dotClass: "bg-rose-500",
        iconType: "stop" as const,
      };
    default: {
      const _exhaustive: never = tone;
      void _exhaustive;
      return {
        badgeClasses: "border-slate-200 bg-slate-50 text-slate-700",
        dotClass: "bg-slate-400",
        iconType: "now" as const,
      };
    }
  }
}

export function formatActivityDate(dateString: string, isAr?: boolean): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function RecentActivityCard({
  recentActivity = [],
  isAr,
}: RecentActivityCardProps) {
  const hasActivity = recentActivity && recentActivity.length > 0;

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
          <span className="text-[11px] text-slate-400">ACT-58</span>
        </div>

        {hasActivity ? (
          <ul className="my-4 divide-y divide-slate-100" role="list">
            {recentActivity.map((item, idx) => {
              const toneStyles = getActivityToneStyles(item.tone);
              const text = isAr ? item.text.ar : item.text.en;
              const formattedDate = formatActivityDate(item.date, isAr);

              return (
                <li
                  key={`${item.date}-${idx}`}
                  className="flex items-center justify-between py-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${toneStyles.badgeClasses}`}
                    >
                      {toneStyles.iconType === "ok" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : toneStyles.iconType === "stop" ? (
                        <AlertCircle className="h-4 w-4 text-rose-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{text}</p>
                      <time
                        dateTime={item.date}
                        className="text-[11px] text-slate-400"
                      >
                        {formattedDate}
                      </time>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${toneStyles.badgeClasses}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${toneStyles.dotClass}`}
                    />
                    {item.tone.toUpperCase()}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          /* ACT-49 Genuine Empty State */
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
        )}
      </div>

      <div className="border-t border-slate-100 pt-4 text-center text-[11px] text-slate-400">
        {isAr ? "سجل النشاط مراقب ومحمي" : "Audit trail is actively monitored"}
      </div>
    </section>
  );
}
