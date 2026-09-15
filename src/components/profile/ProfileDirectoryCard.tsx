"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { Users, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MemberDto, MembershipDto } from "@/types/api";

export interface ProfileDirectoryCardProps {
  member: MemberDto;
  membership: MembershipDto | null;
  completionRate: number;
  meetsDirectoryRequirements: boolean;
  isPublishedInDirectory: boolean;
}

export function ProfileDirectoryCard({
  member,
  membership,
  completionRate,
  meetsDirectoryRequirements,
  isPublishedInDirectory,
}: ProfileDirectoryCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  const isPaidMembership =
    membership?.status === "ACTIVE" &&
    (membership?.tier?.toUpperCase() === "PROFESSIONAL" ||
      membership?.tier?.toUpperCase() === "MASTER");
  const isProfileComplete = completionRate >= 100;

  return (
    <Card
      as="section"
      aria-labelledby="directory-heading"
      className="flex flex-col justify-between"
    >
      <div>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <Users className="h-5 w-5 text-slate-600" />
            <CardTitle id="directory-heading">
              {isAr ? "دليل المدربين المعتمدين" : "Trainer Directory"}
            </CardTitle>
          </div>
          <Badge variant={isPublishedInDirectory ? "success" : "default"} dot>
            {isPublishedInDirectory
              ? isAr
                ? "منشور في الدليل"
                : "Published"
              : isAr
                ? "غير منشور حالياً"
                : "Not published"}
          </Badge>
        </CardHeader>

        {/* Verification Status Box */}
        <div
          className={`mt-4 rounded-xl border p-4 transition-all ${
            meetsDirectoryRequirements
              ? "border-emerald-200 bg-emerald-50/60"
              : "border-amber-200/80 bg-amber-50/70"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="pt-0.5">
              {meetsDirectoryRequirements ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <p
                  className={`text-xs font-bold ${
                    meetsDirectoryRequirements
                      ? "text-slate-900"
                      : "text-amber-900"
                  }`}
                >
                  {isAr
                    ? "نشر ملفي الشخصي في دليل المدربين لدى IBDL"
                    : "Publish my profile in the IBDL Trainer Directory"}
                </p>
                {member.directoryOptIn && (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    {isAr ? "تم تسجيل رغبتك (نعم)" : "Opt-in saved (Yes)"}
                  </span>
                )}
              </div>

              {/* PRO-35 Exact Amber Explanatory Line if conditions NOT met */}
              {!meetsDirectoryRequirements ? (
                <p className="text-xs leading-relaxed font-medium text-amber-800">
                  {isAr
                    ? "يتطلب النشر في دليل المدربين عضوية مدفوعة وسارية واكتمال الملف الشخصي بنسبة ١٠٠٪."
                    : "Directory publication requires an active paid membership and 100% profile completion."}
                </p>
              ) : (
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {isAr
                    ? "ملفك مؤهل ومنشور في دليل المدربين المعتمدين. لا يتم نشر سيرتك الذاتية أو بريدك أو هاتفك أبداً."
                    : "Your profile meets all publication requirements. Your CV, email and mobile are never published."}
                </p>
              )}
            </div>
          </div>

          {/* 3-Condition Checklist breakdown */}
          <div className="mt-3.5 grid grid-cols-1 gap-2 border-t border-amber-200/60 pt-3 text-xs sm:grid-cols-3">
            {/* Condition 1: Opt-in */}
            <div className="flex items-center gap-1.5">
              {member.directoryOptIn ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              )}
              <span
                className={
                  member.directoryOptIn
                    ? "font-medium text-emerald-900"
                    : "text-slate-500"
                }
              >
                {isAr ? "طلب الاشتراك: " : "Opt-in: "}
                <strong>
                  {member.directoryOptIn
                    ? isAr
                      ? "مفعّل"
                      : "Yes"
                    : isAr
                      ? "غير مفعل"
                      : "No"}
                </strong>
              </span>
            </div>

            {/* Condition 2: Paid Tier */}
            <div className="flex items-center gap-1.5">
              {isPaidMembership ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
              )}
              <span
                className={
                  isPaidMembership
                    ? "font-medium text-emerald-900"
                    : "text-amber-800"
                }
              >
                {isAr ? "عضوية مدفوعة: " : "Paid Tier: "}
                <strong>{membership?.tier || "ESSENTIAL"}</strong>
              </span>
            </div>

            {/* Condition 3: 100% completion */}
            <div className="flex items-center gap-1.5">
              {isProfileComplete ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
              )}
              <span
                className={
                  isProfileComplete
                    ? "font-medium text-emerald-900"
                    : "text-amber-800"
                }
              >
                {isAr ? "اكتمال الملف: " : "Completion: "}
                <strong>{completionRate}%</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
        <span>
          {isAr ? "مستوى اكتمال الملف:" : "Profile completion:"}{" "}
          <strong className="text-slate-900">{completionRate}%</strong>
        </span>
        <span>
          {isAr ? "نوع العضوية:" : "Membership:"}{" "}
          <strong className="text-slate-900">
            {membership?.tier || "ESSENTIAL"}
          </strong>
        </span>
      </div>
    </Card>
  );
}
