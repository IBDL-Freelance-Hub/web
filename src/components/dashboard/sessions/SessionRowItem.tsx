import React from "react";
import {
  Laptop,
  Smartphone,
  Globe,
  Clock,
  Trash2,
  Loader2,
} from "lucide-react";
import type { SessionItem } from "@/types/api";

export interface SessionRowItemProps {
  session: SessionItem;
  isRevoking: boolean;
  locale: string;
  onRevoke: (sessionId: string) => void;
}

export function SessionRowItem({
  session,
  isRevoking,
  locale,
  onRevoke,
}: SessionRowItemProps) {
  const getDeviceIcon = (userAgent: string | null) => {
    if (!userAgent) return <Globe className="h-4 w-4 text-slate-400" />;
    const ua = userAgent.toLowerCase();
    if (
      ua.includes("mobile") ||
      ua.includes("iphone") ||
      ua.includes("android")
    ) {
      return <Smartphone className="h-4 w-4 text-slate-400" />;
    }
    return <Laptop className="h-4 w-4 text-slate-400" />;
  };

  const formatActivityTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 py-4 transition-all duration-300 ease-out sm:flex-row sm:items-center sm:justify-between ${
        isRevoking
          ? "pointer-events-none scale-[0.99] opacity-40 motion-reduce:scale-100"
          : "scale-100 opacity-100"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50">
          {getDeviceIcon(session.userAgent)}
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#16162c]">
              {session.ipAddress ||
                (locale === "ar" ? "عنوان IP غير متاح" : "Unknown IP")}
            </span>
            {session.isCurrent && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>
                  {locale === "ar" ? "الجلسة الحالية" : "Current Session"}
                </span>
              </span>
            )}
          </div>
          <p className="line-clamp-1 text-[11px] text-slate-500">
            {session.userAgent ||
              (locale === "ar" ? "متصفح غير معروف" : "Unknown client browser")}
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <Clock className="h-3 w-3" />
            <span>
              {locale === "ar" ? "آخر نشاط: " : "Last active: "}
              {formatActivityTime(session.lastActivityAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Single Session Action */}
      {!session.isCurrent && (
        <div className="sm:text-end">
          <button
            type="button"
            onClick={() => onRevoke(session.id)}
            disabled={isRevoking}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRevoking ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />
                <span>
                  {locale === "ar" ? "جاري الإنهاء..." : "Revoking..."}
                </span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>{locale === "ar" ? "إنهاء الجلسة" : "Revoke"}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
