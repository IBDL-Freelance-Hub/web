import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export interface DirectoryListingBannerProps {
  isPublished?: boolean;
  locale?: "en" | "ar";
}

export function DirectoryListingBanner({
  isPublished = true,
  locale = "en",
}: DirectoryListingBannerProps) {
  const isAr = locale === "ar";

  return (
    <div>
      {/* Main Banner Card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: green checkmark + title + subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <Check
              className="h-4 w-4 stroke-[2.5] text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {isAr ? "ملفك التعريفي في الدليل" : "Your listing"}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {isPublished
                ? isAr
                  ? "ملفك التعريفي منشور في دليل المدربين."
                  : "Your profile is published in the directory."
                : isAr
                  ? "ملفك التعريفي غير منشور في دليل المدربين حالياً."
                  : "Your profile is not published in the directory."}
            </p>
          </div>
        </div>

        {/* Right: Published badge + Manage button */}
        <div className="flex shrink-0 items-center gap-3">
          {isPublished ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              {isAr ? "منشور" : "Published"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              <span
                className="h-1.5 w-1.5 rounded-full bg-slate-400"
                aria-hidden="true"
              />
              {isAr ? "غير منشور" : "Not published"}
            </span>
          )}

          <Link
            href="/profile"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#1d1d39]"
          >
            {isAr ? "إدارة النشر في الدليل" : "Manage directory publication"}
          </Link>
        </div>
      </div>
    </div>
  );
}
