"use client";

import React, { useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { FileText } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { MemberDto } from "@/types/api";
import { useOptionalProfileContext } from "./ProfileContext";

export interface ProfileBioCardProps {
  member?: MemberDto;
}

export function ProfileBioCard({ member: propMember }: ProfileBioCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const profileCtx = useOptionalProfileContext();

  const member = profileCtx?.member || propMember || ({} as MemberDto);
  const isEditing = profileCtx?.mode === "edit";
  const fieldErrors = profileCtx?.fieldErrors || {};

  const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

  const bioEn = isEditing
    ? (profileCtx?.formData.bioEn ?? "")
    : (member.bioEn ?? "");
  const bioAr = isEditing
    ? (profileCtx?.formData.bioAr ?? "")
    : (member.bioAr ?? "");

  const hasEn = Boolean(bioEn && bioEn.trim().length > 0);
  const hasAr = Boolean(bioAr && bioAr.trim().length > 0);

  const currentLength = activeTab === "en" ? bioEn.length : bioAr.length;
  const isApproachingLimit = currentLength >= 4800;
  const isAtLimit = currentLength >= 5000;

  return (
    <Card
      as="section"
      aria-labelledby="bio-heading"
      className="flex flex-col justify-between"
    >
      <div>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <FileText className="h-5 w-5 text-slate-600" />
            <CardTitle id="bio-heading">
              {isAr ? "النبذة التعريفية والمهنية" : "Biography"}
            </CardTitle>
          </div>

          {/* Bilingual Tabs */}
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("en")}
              className={`cursor-pointer rounded-md px-2.5 py-1 font-semibold transition-all ${
                activeTab === "en"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ar")}
              className={`cursor-pointer rounded-md px-2.5 py-1 font-semibold transition-all ${
                activeTab === "ar"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              العربية
            </button>
          </div>
        </CardHeader>

        {isEditing && profileCtx ? (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label
                htmlFor={activeTab === "en" ? "bioEn" : "bioAr"}
                className="font-semibold text-slate-700"
              >
                {activeTab === "en"
                  ? isAr
                    ? "النبذة باللغة الإنجليزية"
                    : "English Biography"
                  : isAr
                    ? "النبذة باللغة العربية"
                    : "Arabic Biography"}
              </label>

              {/* Character Counter */}
              <span
                data-testid="bio-character-counter"
                className={`font-mono text-[11px] font-medium ${
                  isAtLimit
                    ? "font-bold text-rose-600"
                    : isApproachingLimit
                      ? "text-amber-600"
                      : "text-slate-500"
                }`}
              >
                {currentLength} / 5,000
              </span>
            </div>

            {activeTab === "en" ? (
              <textarea
                id="bioEn"
                name="bioEn"
                dir="ltr"
                rows={6}
                value={bioEn}
                onChange={(e) =>
                  profileCtx.updateField("bioEn", e.target.value)
                }
                maxLength={5000}
                placeholder="Write your professional bio and key achievements in English..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-hidden"
              />
            ) : (
              <textarea
                id="bioAr"
                name="bioAr"
                dir="rtl"
                rows={6}
                value={bioAr}
                onChange={(e) =>
                  profileCtx.updateField("bioAr", e.target.value)
                }
                maxLength={5000}
                placeholder="اكتب نبذتك المهنية وإنجازاتك التدريبية باللغة العربية..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-hidden"
              />
            )}

            {fieldErrors[activeTab === "en" ? "bioEn" : "bioAr"] && (
              <p className="text-[11px] text-rose-600">
                {fieldErrors[activeTab === "en" ? "bioEn" : "bioAr"][0]}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-4 min-h-[120px] rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            {activeTab === "en" ? (
              hasEn ? (
                <p className="dir-ltr text-start text-xs leading-relaxed whitespace-pre-line text-slate-700">
                  {bioEn}
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  {isAr
                    ? "لم تتم إضافة نبذة باللغة الإنجليزية بعد."
                    : "No English biography provided yet."}
                </p>
              )
            ) : hasAr ? (
              <p className="dir-rtl text-start text-xs leading-relaxed whitespace-pre-line text-slate-700">
                {bioAr}
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic">
                {isAr
                  ? "لم تتم إضافة نبذة باللغة العربية بعد."
                  : "No Arabic biography provided yet."}
              </p>
            )}
          </div>
        )}
      </div>

      <p className="mt-4 text-[11px] leading-normal text-slate-500">
        {isAr
          ? "تظهر نبذتك في ملفك التعريفي العام باللغتين حال نشر ملفك في دليل المدربين."
          : "Your biography appears in both languages on your public profile once published in the directory."}
      </p>
    </Card>
  );
}
