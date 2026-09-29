"use client";

import React, { useCallback, useTransition, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

export interface DirectorySearchInputProps {
  defaultValue?: string;
  locale?: "en" | "ar";
  debounceMs?: number;
}

export function DirectorySearchInput({
  defaultValue = "",
  locale = "en",
  debounceMs = 350,
}: DirectorySearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isAr = locale === "ar";

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const pushParams = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }
      params.delete("page");

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        pushParams(value);
      }, debounceMs);
    },
    [pushParams, debounceMs]
  );

  const handleClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    pushParams("");
  }, [pushParams]);

  return (
    <div
      className="relative min-w-[220px] flex-1"
      role="search"
      aria-label={isAr ? "البحث في دليل المدربين" : "Search trainer directory"}
    >
      <span
        className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      >
        <Search className="h-4 w-4" />
      </span>

      <input
        ref={inputRef}
        id="directory-search"
        type="search"
        role="searchbox"
        autoComplete="off"
        spellCheck={false}
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder={
          isAr
            ? "ابحث بالاسم أو المدينة أو مجال الخبرة..."
            : "Search by name, city or expertise"
        }
        aria-label={isAr ? "بحث المدربين" : "Search trainers"}
        dir={isAr ? "rtl" : "ltr"}
        className="w-full rounded-xl border border-slate-200/90 bg-white py-2 ps-9 pe-9 text-xs text-slate-900 shadow-2xs transition-all duration-200 placeholder:text-slate-400 focus:border-[#1d1d39] focus:ring-2 focus:ring-[#1d1d39]/10 focus:outline-none disabled:opacity-50"
        disabled={isPending}
      />

      {isPending && (
        <span
          className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <span className="block h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-[#1d1d39]" />
        </span>
      )}

      {!isPending && defaultValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-slate-400"
          aria-label={isAr ? "مسح البحث" : "Clear search"}
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
