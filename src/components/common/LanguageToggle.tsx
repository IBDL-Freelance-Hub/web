"use client";

import React from "react";
import { useLocale } from "./DirectionProvider";
import { cn } from "@/lib/utils";

export function LanguageToggle({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const { locale, toggleLocale } = useLocale();

  const isLight = variant === "light";

  return (
    <button
      onClick={toggleLocale}
      type="button"
      aria-label="Toggle language between English and Arabic"
      className={cn(
        "relative inline-flex items-center rounded-full text-xs font-semibold transition-all select-none focus:ring-2 focus:outline-none",
        isLight
          ? "border border-slate-200 bg-slate-100 p-1 focus:ring-slate-300"
          : "border border-slate-700/80 bg-slate-950/80 p-1 focus:ring-slate-500/50",
        className
      )}
    >
      <span
        className={cn(
          "rounded-full px-2.5 py-1 transition-all duration-200",
          locale === "en"
            ? isLight
              ? "border border-slate-200/70 bg-white font-bold text-slate-900 shadow-sm"
              : "bg-slate-700/90 font-bold text-white shadow-sm"
            : isLight
              ? "text-slate-500 hover:text-slate-900"
              : "text-slate-400 hover:text-slate-200"
        )}
      >
        EN
      </span>
      <span
        className={cn(
          "mx-0.5 text-[10px]",
          isLight ? "text-slate-300" : "text-slate-600"
        )}
      >
        |
      </span>
      <span
        className={cn(
          "font-arabic rounded-full px-2.5 py-1 transition-all duration-200",
          locale === "ar"
            ? isLight
              ? "border border-slate-200/70 bg-white font-bold text-slate-900 shadow-sm"
              : "bg-slate-700/90 font-bold text-white shadow-sm"
            : isLight
              ? "text-slate-500 hover:text-slate-900"
              : "text-slate-400 hover:text-slate-200"
        )}
      >
        AR
      </span>
    </button>
  );
}
