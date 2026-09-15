"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { FileDown, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { MemberDto } from "@/types/api";

export interface ProfileDocumentsCardProps {
  member: MemberDto;
}

export function ProfileDocumentsCard({ member }: ProfileDocumentsCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  return (
    <Card
      as="section"
      aria-labelledby="documents-heading"
      className="flex flex-col justify-between"
    >
      <div>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <FileDown className="h-5 w-5 text-slate-600" />
            <CardTitle id="documents-heading">
              {isAr ? "المستندات والسيرة الذاتية" : "Documents"}
            </CardTitle>
          </div>
        </CardHeader>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {member.fullNameEn
                    ? `${member.fullNameEn.replace(/\s+/g, "-")}-CV.pdf`
                    : "Curriculum-Vitae.pdf"}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {isAr ? "تم إيداع السيرة الذاتية" : "CV Document on record"}
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 opacity-60 select-none"
            >
              {isAr ? "استبدال السيرة" : "Replace CV"}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-normal text-slate-500">
        {isAr
          ? "تم الرفع، قيد التحقق بواسطة IBDL. المستند المستبدل يبقى في السجل مع تاريخ الاستبدال ولا يتم حذفه نهائياً."
          : "Uploaded, not yet verified by IBDL. A replaced document stays on the record with the date it was superseded. Nothing is deleted."}
      </p>
    </Card>
  );
}
