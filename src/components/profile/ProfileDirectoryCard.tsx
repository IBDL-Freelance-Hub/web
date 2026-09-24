"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { Users, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MemberDto, MembershipDto } from "@/types/api";
import { useOptionalProfileContext } from "./ProfileContext";

export interface ProfileDirectoryCardProps {
  member?: MemberDto;
  membership?: MembershipDto | null;
  completionRate?: number;
  meetsDirectoryRequirements?: boolean;
  isPublishedInDirectory?: boolean;
}

import { checkDirectoryEligibility } from "@/lib/directoryEligibility";
export { checkDirectoryEligibility };

export function ProfileDirectoryCard({
  member: propMember,
  membership: propMembership,
  completionRate: propCompletionRate,
  meetsDirectoryRequirements: propMeetsRequirements,
  isPublishedInDirectory: propIsPublished,
}: ProfileDirectoryCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const profileCtx = useOptionalProfileContext();

  const member = profileCtx?.member || propMember || ({} as MemberDto);
  const membership =
    profileCtx && profileCtx.membership !== undefined
      ? profileCtx.membership
      : propMembership || null;
  const completionRate =
    profileCtx && profileCtx.completionRate !== undefined
      ? profileCtx.completionRate
      : (propCompletionRate ?? 0);

  const isEditing = profileCtx?.mode === "edit";
  const isMembershipActive = membership?.status === "ACTIVE";

  const effectiveMeetsRequirements = checkDirectoryEligibility(
    membership?.status,
    completionRate,
    profileCtx !== undefined ? undefined : propMeetsRequirements
  );

  const directoryOptIn = isEditing
    ? profileCtx.formData.directoryOptIn
    : Boolean(member.directoryOptIn);

  const effectivePublished =
    propIsPublished !== undefined
      ? propIsPublished
      : directoryOptIn && effectiveMeetsRequirements;

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
          <Badge variant={effectivePublished ? "success" : "default"} dot>
            {effectivePublished
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
            effectiveMeetsRequirements
              ? "border-emerald-200 bg-emerald-50/60"
              : "border-amber-200/80 bg-amber-50/70"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                {effectiveMeetsRequirements ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                )}
              </div>

              <div className="space-y-1.5">
                <p
                  className={`text-xs font-bold ${
                    effectiveMeetsRequirements
                      ? "text-slate-900"
                      : "text-amber-900"
                  }`}
                >
                  {isAr
                    ? "نشر ملفي الشخصي في دليل المدربين لدى IBDL"
                    : "Publish my profile in the IBDL Trainer Directory"}
                </p>

                {/* Explanatory Line if conditions NOT met */}
                {!effectiveMeetsRequirements ? (
                  <p className="text-xs leading-relaxed font-medium text-amber-800">
                    {isAr
                      ? "يتطلب النشر في دليل المدربين عضوية سارية واكتمال الملف الشخصي بنسبة ١٠٠٪."
                      : "Directory publication requires an active membership and 100% profile completion."}
                    {directoryOptIn && (
                      <span className="mt-0.5 block text-[11px] font-normal">
                        {isAr
                          ? "طلب النشر مفعّل ومحفوظ، وسيظهر ملفك في الدليل فور اكتمال المتطلبات."
                          : " (Opt-in saved; profile will appear in directory once all criteria are met.)"}
                      </span>
                    )}
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

            {/* In Edit Mode: Toggle Switch; In View Mode: Toggle Button or Badge */}
            <div className="shrink-0 pt-0.5">
              {isEditing && profileCtx ? (
                <label
                  htmlFor="directoryOptInToggle"
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-semibold shadow-2xs transition hover:bg-slate-50"
                >
                  <input
                    id="directoryOptInToggle"
                    type="checkbox"
                    name="directoryOptIn"
                    checked={directoryOptIn}
                    onChange={(e) =>
                      profileCtx.updateField("directoryOptIn", e.target.checked)
                    }
                    className="h-4 w-4 cursor-pointer rounded-sm border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-[11px] text-slate-700">
                    {isAr ? "نشر في الدليل" : "Publish in directory"}
                  </span>
                </label>
              ) : profileCtx ? (
                <button
                  type="button"
                  onClick={() => profileCtx.toggleDirectoryOptIn()}
                  disabled={profileCtx.isPending}
                  className={
                    directoryOptIn
                      ? "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:opacity-50"
                      : "inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#e11119] px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs transition hover:bg-[#c00e15] focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:opacity-50"
                  }
                >
                  {directoryOptIn
                    ? isAr
                      ? "إلغاء النشر"
                      : "Unpublish"
                    : isAr
                      ? "نشر الملف"
                      : "Publish"}
                </button>
              ) : directoryOptIn ? (
                <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  {isAr ? "تم تسجيل رغبتك (نعم)" : "Opt-in saved (Yes)"}
                </span>
              ) : null}
            </div>
          </div>

          {/* 3-Condition Checklist breakdown */}
          <div className="mt-3.5 grid grid-cols-1 gap-2 border-t border-amber-200/60 pt-3 text-xs sm:grid-cols-3">
            {/* Condition 1: Opt-in */}
            <div className="flex items-center gap-1.5">
              {directoryOptIn ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              )}
              <span
                className={
                  directoryOptIn
                    ? "font-medium text-emerald-900"
                    : "text-slate-500"
                }
              >
                {isAr ? "طلب الاشتراك: " : "Opt-in: "}
                <strong>
                  {directoryOptIn
                    ? isAr
                      ? "مفعّل"
                      : "Yes"
                    : isAr
                      ? "غير مفعل"
                      : "No"}
                </strong>
              </span>
            </div>

            {/* Condition 2: Active Membership */}
            <div className="flex items-center gap-1.5">
              {isMembershipActive ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
              )}
              <span
                className={
                  isMembershipActive
                    ? "font-medium text-emerald-900"
                    : "text-amber-800"
                }
              >
                {isAr ? "عضوية سارية: " : "Active Membership: "}
                <strong>
                  {isMembershipActive
                    ? isAr
                      ? "سارية"
                      : "Active"
                    : isAr
                      ? "غير سارية"
                      : "Inactive"}
                </strong>
              </span>
            </div>

            {/* Condition 3: 100% completion */}
            <div className="flex items-center gap-1.5">
              {completionRate >= 100 ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
              )}
              <span
                className={
                  completionRate >= 100
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
    </Card>
  );
}
