"use client";

import React, { useCallback, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import {
  DIRECTORY_EXPERTISE_OPTIONS,
  DIRECTORY_INDUSTRY_OPTIONS,
  DIRECTORY_LANGUAGE_OPTIONS,
} from "@/constants/directory";

export interface DirectoryFiltersProps {
  activeExpertise?: string;
  activeIndustry?: string;
  activeLanguage?: string;
  locale?: "en" | "ar";
}

export function DirectoryFilters({
  activeExpertise = "",
  activeIndustry = "",
  activeLanguage = "",
  locale = "en",
}: DirectoryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const isAr = locale === "ar";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value.trim()) {
        params.set(key, value.trim());
      } else {
        params.delete(key);
      }
      params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("expertise");
    params.delete("industry");
    params.delete("language");
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [router, pathname, searchParams]);

  const hasActiveFilters = !!(
    activeExpertise ||
    activeIndustry ||
    activeLanguage
  );

  return (
    <div
      className="flex flex-wrap items-center gap-2.5"
      aria-label={isAr ? "فلاتر الدليل" : "Directory filters"}
    >
      {/* Expertise Filter */}
      <div className="relative">
        <label htmlFor="filter-expertise" className="sr-only">
          {isAr ? "تصفية حسب مجال الخبرة" : "Filter by expertise"}
        </label>
        <select
          id="filter-expertise"
          value={activeExpertise}
          onChange={(e) => updateParam("expertise", e.target.value)}
          disabled={isPending}
          className="appearance-none rounded-xl border border-white/10 bg-[#16162c]/80 py-2 ps-3.5 pe-8 text-sm text-slate-300 backdrop-blur-sm transition-colors duration-150 focus:border-white/25 focus:ring-2 focus:ring-white/15 focus:outline-none disabled:opacity-50"
          aria-label={isAr ? "مجال الخبرة" : "Area of expertise"}
        >
          <option value="">{isAr ? "كل التخصصات" : "All Expertise"}</option>
          {DIRECTORY_EXPERTISE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {isAr ? opt.labelAr : opt.labelEn}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute end-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
          aria-hidden="true"
        />
      </div>

      {/* Industry Filter */}
      <div className="relative">
        <label htmlFor="filter-industry" className="sr-only">
          {isAr ? "تصفية حسب القطاع" : "Filter by industry"}
        </label>
        <select
          id="filter-industry"
          value={activeIndustry}
          onChange={(e) => updateParam("industry", e.target.value)}
          disabled={isPending}
          className="appearance-none rounded-xl border border-white/10 bg-[#16162c]/80 py-2 ps-3.5 pe-8 text-sm text-slate-300 backdrop-blur-sm transition-colors duration-150 focus:border-white/25 focus:ring-2 focus:ring-white/15 focus:outline-none disabled:opacity-50"
          aria-label={isAr ? "القطاع" : "Industry"}
        >
          <option value="">{isAr ? "كل القطاعات" : "All Industries"}</option>
          {DIRECTORY_INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {isAr ? opt.labelAr : opt.labelEn}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute end-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
          aria-hidden="true"
        />
      </div>

      {/* Language Filter */}
      <div className="relative">
        <label htmlFor="filter-language" className="sr-only">
          {isAr ? "تصفية حسب اللغة" : "Filter by language"}
        </label>
        <select
          id="filter-language"
          value={activeLanguage}
          onChange={(e) => updateParam("language", e.target.value)}
          disabled={isPending}
          className="appearance-none rounded-xl border border-white/10 bg-[#16162c]/80 py-2 ps-3.5 pe-8 text-sm text-slate-300 backdrop-blur-sm transition-colors duration-150 focus:border-white/25 focus:ring-2 focus:ring-white/15 focus:outline-none disabled:opacity-50"
          aria-label={isAr ? "لغة التدريب" : "Training language"}
        >
          <option value="">{isAr ? "كل اللغات" : "All Languages"}</option>
          {DIRECTORY_LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {isAr ? opt.labelAr : opt.labelEn}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute end-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
          aria-hidden="true"
        />
      </div>

      {/* Clear all filters */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAllFilters}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/40 disabled:opacity-50"
          aria-label={isAr ? "مسح جميع الفلاتر" : "Clear all filters"}
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          {isAr ? "مسح الفلاتر" : "Clear filters"}
        </button>
      )}

      {isPending && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-slate-200"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
