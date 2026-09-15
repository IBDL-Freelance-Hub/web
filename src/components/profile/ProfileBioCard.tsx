"use client";

import React, { useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { FileText } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { MemberDto } from "@/types/api";

export interface ProfileBioCardProps {
  member: MemberDto;
}

export function ProfileBioCard({ member }: ProfileBioCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

  const hasEn = Boolean(member.bioEn && member.bioEn.trim().length > 0);
  const hasAr = Boolean(member.bioAr && member.bioAr.trim().length > 0);

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

        <div className="mt-4 min-h-[120px] rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          {activeTab === "en" ? (
            hasEn ? (
              <p className="dir-ltr text-start text-xs leading-relaxed whitespace-pre-line text-slate-700">
                {member.bioEn}
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
              {member.bioAr}
            </p>
          ) : (
            <p className="text-xs text-slate-400 italic">
              {isAr
                ? "لم تتم إضافة نبذة باللغة العربية بعد."
                : "No Arabic biography provided yet."}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-normal text-slate-500">
        {isAr
          ? "تظهر نبذتك في ملفك التعريفي العام باللغتين حال نشر ملفك في دليل المدربين."
          : "Your biography appears in both languages on your public profile once published in the directory."}
      </p>
    </Card>
  );
}
