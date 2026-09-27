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
      // Reset to page 1 on new search
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
      className="relative w-full max-w-xl"
      role="search"
      aria-label={isAr ? "البحث في دليل المدربين" : "Search trainer directory"}
    >
      <span
        className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-500"
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
            ? "ابحث بالاسم أو التخصص أو البلد..."
            : "Search by name, expertise, or country..."
        }
        aria-label={isAr ? "بحث المدربين" : "Search trainers"}
        dir={isAr ? "rtl" : "ltr"}
        className="w-full rounded-xl border border-white/10 bg-[#16162c]/80 py-3 ps-10 pe-10 text-sm text-slate-200 placeholder-slate-500 backdrop-blur-sm transition-all duration-200 focus:border-white/25 focus:bg-[#16162c] focus:ring-2 focus:ring-white/15 focus:outline-none disabled:opacity-50"
        disabled={isPending}
      />

      {isPending && (
        <span
          className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <span className="block h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-slate-200" />
        </span>
      )}

      {!isPending && defaultValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute end-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-500 transition-colors hover:text-slate-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/30"
          aria-label={isAr ? "مسح البحث" : "Clear search"}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
