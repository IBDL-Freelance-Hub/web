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
  ShieldAlert,
  Lock,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
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

  const isLocked = userStatus !== "ACTIVE" || credentials?.status === "LOCKED";

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
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // silent fallback
    }
  };

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#e11119]">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              {isAr
                ? "بيانات التقييم المهني (PQP™)"
                : "Assessment Credentials (PQP™)"}
            </CardTitle>
            <p className="text-[11px] font-medium text-slate-500">
              {assessmentName}
            </p>
          </div>
        </div>

        {isLocked ? (
          <Badge variant="warning">
            <Lock className="h-3 w-3" />
            <span>{isAr ? "بانتظار التفعيل" : "Pending Activation"}</span>
          </Badge>
        ) : (
          <Badge variant="success" dot>
            <span>{isAr ? "نشطة وجاهزة" : "Active & Ready"}</span>
          </Badge>
        )}
      </CardHeader>

      <div className="space-y-5 p-6">
        {isLocked ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs leading-relaxed text-amber-900">
            <div className="flex items-start gap-2.5">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <div className="space-y-1">
                <p className="font-bold">
                  {isAr
                    ? "بيانات التقييم مقفلة حالياً"
                    : "Assessment Credentials Currently Locked"}
                </p>
                <p>
                  {isAr
                    ? "يرجى مراجعة بريدك الإلكتروني لتفعيل الحساب وتعيين كلمة المرور لإتاحة بيانات دخول التقييم."
                    : "Please check your email to activate your account and set your password to unlock your assessment credentials."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* 1. Portal Access Link */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    {isAr ? "بوابة التقييم" : "Assessment Portal"}
                  </span>
                  <p className="mt-0.5 text-xs font-bold text-slate-900">
                    {portalUrl}
                  </p>
                </div>
                <a
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-[#e11119] hover:text-[#e11119] sm:self-center"
                >
                  <span>{isAr ? "فتح البوابة" : "Open Portal"}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* 2. Username & Password Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Username Field */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                <span className="text-[11px] font-medium text-slate-500">
                  {isAr ? "اسم المستخدم" : "Username"}
                </span>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {username || "—"}
                  </span>
                  {username && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(username, "username")}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                      title={isAr ? "نسخ اسم المستخدم" : "Copy username"}
                      aria-label={isAr ? "نسخ اسم المستخدم" : "Copy username"}
                    >
                      {copiedField === "username" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                <span className="text-[11px] font-medium text-slate-500">
                  {isAr ? "كلمة المرور" : "Password"}
                </span>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {showPassword ? password : "••••••••••••"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                      title={
                        showPassword
                          ? isAr
                            ? "إخفاء كلمة المرور"
                            : "Hide password"
                          : isAr
                            ? "إظهار كلمة المرور"
                            : "Show password"
                      }
                      aria-label={
                        showPassword
                          ? isAr
                            ? "إخفاء كلمة المرور"
                            : "Hide password"
                          : isAr
                            ? "إظهار كلمة المرور"
                            : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                    {password && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(password, "password")}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                        title={isAr ? "نسخ كلمة المرور" : "Copy password"}
                        aria-label={isAr ? "نسخ كلمة المرور" : "Copy password"}
                      >
                        {copiedField === "password" ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Instructions & Security Warning */}
            <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-3.5 text-xs text-sky-900">
              <div className="flex items-start gap-2">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                <p className="leading-relaxed font-medium">
                  {isAr
                    ? "تنبيه: بيانات الدخول مخصصة للاستخدام الفردي لكل وحدة تقييم. لا تشاركها مع الآخرين."
                    : "Notice: Credentials are single-use per assessment module. Do not share."}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
