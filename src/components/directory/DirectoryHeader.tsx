import React from "react";
import { Users } from "lucide-react";

export interface DirectoryHeaderProps {
  totalCount: number;
  hasSearch?: boolean;
  searchQuery?: string;
  locale?: "en" | "ar";
}

export function DirectoryHeader({
  totalCount,
  hasSearch = false,
  searchQuery = "",
  locale = "en",
}: DirectoryHeaderProps) {
  const isAr = locale === "ar";

  const countLabel =
    totalCount === 0
      ? isAr
        ? "لا يوجد مدربون مطابقون"
        : "No trainers found"
      : isAr
        ? `${totalCount.toLocaleString()} مدرب مؤهل`
        : `${totalCount.toLocaleString()} Qualified Trainer${totalCount !== 1 ? "s" : ""}`;

  return (
    <header className="mb-8 border-b border-white/10 pb-8">
      {/* Eyebrow label */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e11119]/15">
          <Users className="h-4 w-4 text-[#e11119]" aria-hidden="true" />
        </div>
        <span className="text-xs font-extrabold tracking-[0.18em] text-[#e11119] uppercase">
          {isAr ? "IBDL — دليل المدربين العام" : "IBDL — Trainer Directory"}
        </span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {isAr ? "اكتشف المدربين المعتمدين" : "Find Certified Trainers"}
      </h1>

      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400">
        {isAr
          ? "تصفح مجتمع IBDL من محترفي التعلم والتطوير. جميع المدربين المدرجين مؤهلون بنسبة ١٠٠٪ ومشتركون رسمياً في الدليل العام."
          : "Explore the IBDL community of L&D professionals. All listed trainers are 100% profile-complete and officially opted into the public directory."}
      </p>

      {/* Result count */}
      <div className="mt-5 flex items-center gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-slate-300"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className="h-2 w-2 rounded-full bg-emerald-400"
            aria-hidden="true"
          />
          {countLabel}
        </span>

        {hasSearch && searchQuery && (
          <span className="text-sm text-slate-500">
            {isAr
              ? `نتائج البحث عن: "${searchQuery}"`
              : `Results for: "${searchQuery}"`}
          </span>
        )}
      </div>
    </header>
  );
}
