"use client";

import React from "react";
import { useLocale } from "./DirectionProvider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      onClick={toggleLocale}
      type="button"
      aria-label="Toggle language between English and Arabic"
      className={cn(
        "relative inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/80 p-1 text-xs font-semibold transition-all select-none focus:ring-2 focus:ring-slate-500/50 focus:outline-none",
        className
      )}
    >
      <span
        className={cn(
          "rounded-full px-2.5 py-1 transition-all duration-200",
          locale === "en"
            ? "bg-slate-700/90 font-bold text-white shadow-sm"
            : "text-slate-400 hover:text-slate-200"
        )}
      >
        EN
      </span>
      <span className="mx-0.5 text-[10px] text-slate-600">|</span>
      <span
        className={cn(
          "font-arabic rounded-full px-2.5 py-1 transition-all duration-200",
          locale === "ar"
            ? "bg-slate-700/90 font-bold text-white shadow-sm"
            : "text-slate-400 hover:text-slate-200"
        )}
      >
        AR
      </span>
    </button>
  );
}
