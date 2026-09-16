"use client";

import React, { useState, useTransition } from "react";
import { SessionItem } from "@/types/api";
import {
  revokeSessionAction,
  revokeAllOtherSessionsAction,
} from "@/actions/authActions";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  Shield,
  Laptop,
  Smartphone,
  Globe,
  Trash2,
  Clock,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface ActiveSessionsCardProps {
  initialSessions: SessionItem[];
}

export function ActiveSessionsCard({
  initialSessions,
}: ActiveSessionsCardProps) {
  const { locale, formatNumber } = useLocale();
  const [sessions, setSessions] = useState<SessionItem[]>(initialSessions);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [isBulkPending, startBulkTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const otherSessionsCount = sessions.filter((s) => !s.isCurrent).length;

  const handleRevokeSingle = async (sessionId: string) => {
    setRevokingId(sessionId);
    setStatusMessage(null);

    // Optimistic state update
    const previous = [...sessions];
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));

    try {
      const result = await revokeSessionAction(sessionId);
      setRevokingId(null);
      if (!result.success) {
        setSessions(previous);
        setStatusMessage({
          type: "error",
          text:
            result.error ||
            (locale === "ar"
              ? "فشل إنهاء الجلسة. حاول مرة أخرى."
              : "Failed to revoke session. Please try again."),
        });
      } else {
        setStatusMessage({
          type: "success",
          text:
            locale === "ar"
              ? "تم إنهاء الجلسة بنجاح."
              : "Session terminated successfully.",
        });
      }
    } catch {
      setSessions(previous);
      setRevokingId(null);
      setStatusMessage({
        type: "error",
        text:
          locale === "ar"
            ? "حدث خطأ غير متوقع."
            : "An unexpected error occurred.",
      });
    }
  };

  const handleRevokeAllOthers = () => {
    setStatusMessage(null);
    startBulkTransition(async () => {
      const previous = [...sessions];
      setSessions((prev) => prev.filter((s) => s.isCurrent));

      try {
        const result = await revokeAllOtherSessionsAction();
        if (!result.success) {
          setSessions(previous);
          setStatusMessage({
            type: "error",
            text:
              result.error ||
              (locale === "ar"
                ? "فشل إنهاء الجلسات الأخرى."
                : "Failed to revoke other sessions."),
          });
        } else {
          setStatusMessage({
            type: "success",
            text:
              locale === "ar"
                ? "تم إنهاء جميع الجلسات الأخرى بنجاح."
                : "All other sessions terminated successfully.",
          });
        }
      } catch {
        setSessions(previous);
        setStatusMessage({
          type: "error",
          text:
            locale === "ar"
              ? "حدث خطأ أثناء إنهاء الجلسات."
              : "Error occurred while terminating sessions.",
        });
      }
    });
  };

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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#16162c]">
              {locale === "ar"
                ? "الجلسات النشطة والأمان"
                : "Active Sessions & Security"}
            </h3>
            <p className="text-xs text-[#6a6a86]">
              {locale === "ar"
                ? `لديك ${formatNumber(sessions.length)} جلسات متصلة حالياً (SEC-26)`
                : `You have ${sessions.length} active sessions connected (SEC-26)`}
            </p>
          </div>
        </div>

        {/* Bulk Revoke Action */}
        {otherSessionsCount > 0 && (
          <button
            type="button"
            onClick={handleRevokeAllOthers}
            disabled={isBulkPending}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50/70 px-3.5 py-2 text-xs font-bold text-red-600 transition-all hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isBulkPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            <span>
              {locale === "ar"
                ? `إنهاء كل الجلسات الأخرى (${formatNumber(otherSessionsCount)})`
                : `Revoke all other sessions (${otherSessionsCount})`}
            </span>
          </button>
        )}
      </div>

      {/* Notification Toast/Banner inside card */}
      {statusMessage && (
        <div
          className={`mt-4 flex items-center gap-2 rounded-xl p-3 text-xs font-medium ${
            statusMessage.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Sessions List */}
      <div className="mt-4 divide-y divide-slate-100">
        {sessions.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            {locale === "ar"
              ? "لا توجد جلسات أخرى مسجلة."
              : "No active sessions found."}
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className={`flex flex-col gap-3 py-4 transition-all duration-300 ease-out sm:flex-row sm:items-center sm:justify-between ${
                revokingId === session.id
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
                          {locale === "ar"
                            ? "الجلسة الحالية"
                            : "Current Session"}
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-1 text-[11px] text-slate-500">
                    {session.userAgent ||
                      (locale === "ar"
                        ? "متصفح غير معروف"
                        : "Unknown client browser")}
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
                    onClick={() => handleRevokeSingle(session.id)}
                    disabled={revokingId === session.id}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {revokingId === session.id ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin text-red-500" />
                        <span>
                          {locale === "ar" ? "جاري الإنهاء..." : "Revoking..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-3 w-3" />
                        <span>
                          {locale === "ar" ? "إنهاء الجلسة" : "Revoke"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
