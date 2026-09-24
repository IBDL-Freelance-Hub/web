"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { MemberDto } from "@/types/api";
import { useOptionalProfileContext } from "./ProfileContext";
import {
  EXPERTISE_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/data/registrationFormData";
import { TagPicker } from "./TagPicker";
import { LANGUAGE_PRESETS } from "@/constants/languages";
import { EXPERIENCE_BAND_OPTIONS } from "@/constants/experience";
import { ProfileProfessionalDetails } from "./ProfileProfessionalDetails";

export interface ProfileProfessionalCardProps {
  member?: MemberDto;
}

export function ProfileProfessionalCard({
  member: propMember,
}: ProfileProfessionalCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const profileCtx = useOptionalProfileContext();

  const member = profileCtx?.member || propMember || ({} as MemberDto);
  const isEditing = profileCtx?.mode === "edit";
  const fieldErrors = profileCtx?.fieldErrors || {};

  return (
    <Card
      as="section"
      aria-labelledby="pro-heading"
      className="flex flex-col justify-between"
    >
      <div>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <Briefcase className="h-5 w-5 text-slate-600" />
            <CardTitle id="pro-heading">
              {isAr ? "البيانات المهنية والتخصصات" : "Professional practice"}
            </CardTitle>
          </div>
        </CardHeader>

        {isEditing && profileCtx ? (
          <div className="mt-4 space-y-5">
            {/* Years of Experience Select */}
            <div className="space-y-1.5">
              <label
                htmlFor="yearsOfExperience"
                className="block text-xs font-semibold text-slate-700"
              >
                {isAr ? "سنوات الخبرة *" : "Years of Experience *"}
              </label>
              <select
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={profileCtx.formData.yearsOfExperience}
                onChange={(e) =>
                  profileCtx.updateField("yearsOfExperience", e.target.value)
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-hidden"
              >
                <option value="">
                  {isAr ? "اختر فئة الخبرة" : "Select experience band"}
                </option>
                {EXPERIENCE_BAND_OPTIONS.map((band) => (
                  <option key={band.value} value={band.value}>
                    {isAr ? band.labelAr : band.labelEn}
                  </option>
                ))}
              </select>
              {fieldErrors.yearsOfExperience && (
                <p className="text-[11px] text-rose-600">
                  {fieldErrors.yearsOfExperience[0]}
                </p>
              )}
            </div>

            {/* Areas of Expertise Tag Picker */}
            <TagPicker
              label={isAr ? "مجالات الخبرة" : "Areas of Expertise"}
              field="areasOfExpertise"
              items={profileCtx.formData.areasOfExpertise}
              presets={EXPERTISE_OPTIONS}
              onAdd={profileCtx.addTag}
              onRemove={profileCtx.removeTag}
              isAr={isAr}
            />

            {/* Industries Served Tag Picker */}
            <TagPicker
              label={isAr ? "القطاعات المخدومة" : "Industries Served"}
              field="industriesServed"
              items={profileCtx.formData.industriesServed}
              presets={INDUSTRY_OPTIONS}
              onAdd={profileCtx.addTag}
              onRemove={profileCtx.removeTag}
              isAr={isAr}
            />

            {/* Languages Tag Picker */}
            <TagPicker
              label={isAr ? "لغات التدريب" : "Languages"}
              field="languages"
              items={profileCtx.formData.languages}
              presets={LANGUAGE_PRESETS}
              onAdd={profileCtx.addTag}
              onRemove={profileCtx.removeTag}
              isAr={isAr}
            />

            {/* LinkedIn Profile Input */}
            <Input
              id="linkedinUrl"
              name="linkedinUrl"
              label={isAr ? "رابط لينكد إن" : "LinkedIn Profile URL"}
              value={profileCtx.formData.linkedinUrl}
              onChange={(e) =>
                profileCtx.updateField("linkedinUrl", e.target.value)
              }
              error={fieldErrors.linkedinUrl?.[0]}
              placeholder="https://linkedin.com/in/username"
              className="dir-ltr text-start font-mono text-xs"
              helperText={
                isAr
                  ? "اختياري. لا يدخل رابط لينكد إن في حساب نسبة اكتمال الملف الشخصي."
                  : "Optional. LinkedIn URL is strictly excluded from profile completion calculations."
              }
            />
          </div>
        ) : (
          <ProfileProfessionalDetails member={member} isAr={isAr} />
        )}
      </div>

      <p className="mt-4 text-[11px] leading-normal text-slate-500">
        {isAr
          ? "تساعد مجالات الخبرة والقطاعات فريق IBDL والعملاء المحتملين في ترشيحك للاستشارات والبرامج التدريبية الملائمة."
          : "Your expertise areas and industries help match you to appropriate training, diagnostics, and consulting requests."}
      </p>
    </Card>
  );
}
