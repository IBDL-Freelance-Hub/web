"use client";

import React, { useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { Briefcase, ExternalLink, Plus, X } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { MemberDto } from "@/types/api";
import { useOptionalProfileContext } from "./ProfileContext";
import {
  EXPERTISE_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/data/registrationFormData";

const LANGUAGE_PRESETS = [
  "English",
  "Arabic",
  "French",
  "German",
  "Spanish",
  "Turkish",
];

export interface ProfileProfessionalCardProps {
  member?: MemberDto;
}

interface TagPickerProps {
  label: string;
  field: "areasOfExpertise" | "industriesServed" | "languages";
  items: string[];
  presets: string[];
  onAdd: (
    field: "areasOfExpertise" | "industriesServed" | "languages",
    item: string
  ) => void;
  onRemove: (
    field: "areasOfExpertise" | "industriesServed" | "languages",
    item: string
  ) => void;
  isAr: boolean;
  placeholder?: string;
}

function TagPicker({
  label,
  field,
  items,
  presets,
  onAdd,
  onRemove,
  isAr,
  placeholder,
}: TagPickerProps) {
  const [customInput, setCustomInput] = useState("");

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !items.includes(trimmed)) {
      onAdd(field, trimmed);
      setCustomInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustom();
    }
  };

  const availablePresets = presets.filter((p) => !items.includes(p));

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700">
        {label}
      </label>

      {/* Selected tags */}
      <div className="flex min-h-[36px] flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/50 p-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs font-medium text-slate-800 shadow-2xs"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => onRemove(field, item)}
                className="cursor-pointer text-slate-400 hover:text-rose-600 focus:outline-hidden"
                aria-label={isAr ? `إزالة ${item}` : `Remove ${item}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400 italic">
            {isAr ? "لم يتم تحديد عناصر بعد" : "None selected yet"}
          </span>
        )}
      </div>

      {/* Quick-add presets */}
      {availablePresets.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {availablePresets.slice(0, 6).map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onAdd(field, preset)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-dashed border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
            >
              <Plus className="h-2.5 w-2.5" />
              <span>{preset}</span>
            </button>
          ))}
        </div>
      )}

      {/* Custom input */}
      <div className="flex gap-2 pt-1">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder ||
            (isAr ? "أضف عنصراً جديداً..." : "Type custom and press Enter...")
          }
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-hidden"
        />
        <button
          type="button"
          onClick={handleAddCustom}
          disabled={!customInput.trim()}
          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAr ? "إضافة" : "Add"}
        </button>
      </div>
    </div>
  );
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
                <option value="<2">
                  {isAr ? "أقل من سنتين (<2)" : "Less than 2 years (<2)"}
                </option>
                <option value="2-5">
                  {isAr ? "٢ إلى ٥ سنوات (2-5)" : "2 to 5 years (2-5)"}
                </option>
                <option value="6-10">
                  {isAr ? "٦ إلى ١٠ سنوات (6-10)" : "6 to 10 years (6-10)"}
                </option>
                <option value="11-15">
                  {isAr ? "١١ إلى ١٥ سنة (11-15)" : "11 to 15 years (11-15)"}
                </option>
                <option value=">15">
                  {isAr ? "أكثر من ١٥ سنة (>15)" : "More than 15 years (>15)"}
                </option>
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
          <dl className="mt-2 divide-y divide-slate-100 text-xs">
            {/* Years of Experience */}
            <div className="flex items-center justify-between py-3.5">
              <dt className="font-medium text-slate-500">
                {isAr ? "سنوات الخبرة" : "Years of experience"}
              </dt>
              <dd className="text-end font-semibold text-slate-900">
                {member.yearsOfExperience
                  ? `${member.yearsOfExperience} ${isAr ? "سنوات" : "years"}`
                  : "—"}
              </dd>
            </div>

            {/* Areas of Expertise */}
            <div className="py-3.5">
              <dt className="mb-2 font-medium text-slate-500">
                {isAr ? "مجالات الخبرة" : "Areas of expertise"}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {member.areasOfExpertise &&
                member.areasOfExpertise.length > 0 ? (
                  member.areasOfExpertise.map((area) => (
                    <span
                      key={area}
                      className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {isAr && (area === "Others" || area === "Other")
                        ? "أخرى"
                        : area}
                    </span>
                  ))
                ) : (
                  <span className="font-normal text-slate-400">
                    {isAr ? "لم تحدد مجالات بعد" : "None selected"}
                  </span>
                )}
              </dd>
            </div>

            {/* Industries Served */}
            <div className="py-3.5">
              <dt className="mb-2 font-medium text-slate-500">
                {isAr ? "القطاعات المخدومة" : "Industries served"}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {member.industriesServed &&
                member.industriesServed.length > 0 ? (
                  member.industriesServed.map((ind) => (
                    <span
                      key={ind}
                      className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {isAr && (ind === "Others" || ind === "Other")
                        ? "أخرى"
                        : ind}
                    </span>
                  ))
                ) : (
                  <span className="font-normal text-slate-400">
                    {isAr ? "لم تحدد قطاعات بعد" : "None selected"}
                  </span>
                )}
              </dd>
            </div>

            {/* Languages */}
            <div className="py-3.5">
              <dt className="mb-2 font-medium text-slate-500">
                {isAr ? "لغات التدريب" : "Languages"}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {member.languages && member.languages.length > 0 ? (
                  member.languages.map((lang) => (
                    <span
                      key={lang}
                      className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {lang}
                    </span>
                  ))
                ) : (
                  <span className="font-normal text-slate-400">
                    {isAr ? "لم تضف لغات بعد" : "None specified"}
                  </span>
                )}
              </dd>
            </div>

            {/* LinkedIn Profile */}
            <div className="flex items-center justify-between py-3.5">
              <dt className="font-medium text-slate-500">
                {isAr ? "رابط لينكد إن" : "LinkedIn profile"}
              </dt>
              <dd className="text-end">
                {member.linkedinUrl ? (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                  >
                    <span className="max-w-[180px] truncate sm:max-w-xs">
                      {member.linkedinUrl.replace(
                        /^https?:\/\/(www\.)?linkedin\.com\/in\//,
                        ""
                      )}
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="font-normal text-slate-400">
                    {isAr ? "لم يضف رابط" : "Not provided"}
                  </span>
                )}
              </dd>
            </div>
          </dl>
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
