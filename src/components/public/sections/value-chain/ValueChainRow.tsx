"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { ValueChainRowData } from "@/data/valueChainData";
import { cn } from "@/lib/utils";

export interface ValueChainRowProps {
  row: ValueChainRowData;
  index?: number;
  isInView?: boolean;
}

export function ValueChainRow({
  row,
  index = 0,
  isInView = true,
}: ValueChainRowProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const isEven = index % 2 === 1;

  return (
    <div
      className={cn(
        "vchain__row grid grid-cols-1 border-b border-[#e5e7eb] transition-all duration-200 hover:bg-slate-100/80 md:grid-cols-4",
        isEven ? "bg-[#f9fafb]" : "bg-white",
        "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {/* 1. Trainer Challenge */}
      <div className="vchain__cell px-6 py-4 text-start text-[13.5px] font-bold text-[#16162c]">
        <span className="mb-1 block text-[11px] font-bold text-[#6b7280] uppercase md:hidden">
          {isArabic ? "تحدي المدرب" : "TRAINER CHALLENGE"}
        </span>
        {isArabic ? row.challengeAr : row.challengeEn}
      </div>

      {/* 2. Hub Support */}
      <div className="vchain__cell px-6 py-4 text-start text-[13.5px] font-bold text-[#e11119]">
        <span className="mb-1 block text-[11px] font-bold text-[#6b7280] uppercase md:hidden">
          {isArabic ? "دعم المنصة" : "HUB SUPPORT"}
        </span>
        {isArabic ? row.supportAr : row.supportEn}
      </div>

      {/* 3. Immediate Value */}
      <div className="vchain__cell px-6 py-4 text-start text-[13.5px] font-normal text-[#4b5563]">
        <span className="mb-1 block text-[11px] font-bold text-[#6b7280] uppercase md:hidden">
          {isArabic ? "القيمة المباشرة" : "IMMEDIATE VALUE"}
        </span>
        {isArabic ? row.valueAr : row.valueEn}
      </div>

      {/* 4. Business Outcome */}
      <div className="vchain__cell px-6 py-4 text-start text-[13.5px] font-bold text-[#1b7a43]">
        <span className="mb-1 block text-[11px] font-bold text-[#6b7280] uppercase md:hidden">
          {isArabic ? "النتيجة العملية" : "BUSINESS OUTCOME"}
        </span>
        {isArabic ? row.outcomeAr : row.outcomeEn}
      </div>
    </div>
  );
}

export interface ValueChainTableProps {
  rows: ValueChainRowData[];
  isInView?: boolean;
}

export function ValueChainTable({
  rows,
  isInView = true,
}: ValueChainTableProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={cn(
        "vchain overflow-hidden rounded-[20px] border border-[#e5e7eb] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {/* Table Header (Desktop Only) */}
      <div className="hidden bg-[#16162c] text-start text-[11.5px] font-bold tracking-[0.08em] text-white uppercase md:grid md:grid-cols-4">
        <div className="px-6 py-4">
          {isArabic ? "تحدي المدرب" : "TRAINER CHALLENGE"}
        </div>
        <div className="px-6 py-4">
          {isArabic ? "دعم المنصة" : "HUB SUPPORT"}
        </div>
        <div className="px-6 py-4">
          {isArabic ? "القيمة المباشرة" : "IMMEDIATE VALUE"}
        </div>
        <div className="px-6 py-4">
          {isArabic ? "النتيجة العملية" : "BUSINESS OUTCOME"}
        </div>
      </div>

      {/* Rows List */}
      <div className="divide-y divide-[#e5e7eb]">
        {rows.map((row, idx) => (
          <ValueChainRow key={idx} row={row} index={idx} isInView={isInView} />
        ))}
      </div>
    </div>
  );
}
