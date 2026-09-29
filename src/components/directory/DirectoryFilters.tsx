"use client";

import React, { useCallback, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import {
  DIRECTORY_EXPERTISE_OPTIONS,
  DIRECTORY_INDUSTRY_OPTIONS,
} from "@/constants/directory";
import { COUNTRIES } from "@/data/registrationFormData";

export interface DirectoryFiltersProps {
  activeCountry?: string;
  activeExpertise?: string;
  activeIndustry?: string;
  totalCount?: number;
  locale?: "en" | "ar";
}

export function DirectoryFilters({
  activeCountry = "",
  activeExpertise = "",
  activeIndustry = "",
  totalCount,
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
    params.delete("country");
    params.delete("expertise");
    params.delete("industry");
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [router, pathname, searchParams]);

  const hasActiveFilters = !!(
    activeCountry ||
    activeExpertise ||
    activeIndustry
  );

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3"
      aria-label={isAr ? "فلاتر الدليل" : "Directory filters"}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Country Filter ("All countries") */}
        <div className="relative">
          <label htmlFor="filter-country" className="sr-only">
            {isAr ? "تصفية حسب الدولة" : "Filter by country"}
          </label>
          <select
            id="filter-country"
            value={activeCountry}
            onChange={(e) => updateParam("country", e.target.value)}
            disabled={isPending}
            className="appearance-none rounded-xl border border-slate-200/90 bg-white py-2 ps-3.5 pe-8 text-xs font-medium text-slate-700 shadow-2xs transition-colors duration-150 hover:border-slate-300 focus:border-[#1d1d39] focus:ring-2 focus:ring-[#1d1d39]/10 focus:outline-none disabled:opacity-50"
            aria-label={isAr ? "الدولة" : "Country"}
          >
            <option value="">{isAr ? "جميع الدول" : "All countries"}</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.nameEn}>
                {isAr ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute end-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        </div>

        {/* Expertise Filter ("All areas of expertise") */}
        <div className="relative">
          <label htmlFor="filter-expertise" className="sr-only">
            {isAr ? "تصفية حسب مجال الخبرة" : "Filter by expertise"}
          </label>
          <select
            id="filter-expertise"
            value={activeExpertise}
            onChange={(e) => updateParam("expertise", e.target.value)}
            disabled={isPending}
            className="appearance-none rounded-xl border border-slate-200/90 bg-white py-2 ps-3.5 pe-8 text-xs font-medium text-slate-700 shadow-2xs transition-colors duration-150 hover:border-slate-300 focus:border-[#1d1d39] focus:ring-2 focus:ring-[#1d1d39]/10 focus:outline-none disabled:opacity-50"
            aria-label={isAr ? "مجال الخبرة" : "Area of expertise"}
          >
            <option value="">
              {isAr ? "جميع مجالات الخبرة" : "All areas of expertise"}
            </option>
            {DIRECTORY_EXPERTISE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {isAr ? opt.labelAr : opt.labelEn}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute end-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            disabled={isPending}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-slate-400 disabled:opacity-50"
            aria-label={isAr ? "إعادة تعيين الفلاتر" : "Reset filters"}
          >
            <X className="h-3 w-3" aria-hidden="true" />
            <span>{isAr ? "إعادة تعيين" : "Reset"}</span>
          </button>
        )}
      </div>

      {/* Member Count on the Right (e.g. "9 members listed") */}
      {typeof totalCount === "number" && (
        <div className="shrink-0 text-xs font-medium text-orange-500">
          {isAr
            ? `${totalCount.toLocaleString()} مدرب مدرج`
            : `${totalCount.toLocaleString()} member${totalCount !== 1 ? "s" : ""} listed`}
        </div>
      )}
    </div>
  );
}
