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
        "relative inline-flex cursor-pointer items-center rounded-full p-1 text-xs font-semibold transition-all duration-300 select-none focus:ring-2 focus:outline-none",
        isLight
          ? "border border-slate-200/90 bg-slate-100/90 hover:bg-slate-200/70 focus:ring-slate-300"
          : "border border-slate-700/80 bg-slate-950/80 hover:border-slate-600 focus:ring-slate-500/50",
        className
      )}
    >
      {/* Smooth Sliding Active Pill Background */}
      <span
        className={cn(
          "pointer-events-none absolute top-1 bottom-1 h-6 w-7 rounded-full shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isLight
            ? "border border-slate-200/80 bg-white shadow-slate-300/50"
            : "border border-white/10 bg-slate-700/90 shadow-black/40",
          locale === "en" ? "start-1" : "start-[42px]"
        )}
      />

      {/* EN Option */}
      <span
        className={cn(
          "relative z-10 flex h-6 w-7 cursor-pointer items-center justify-center rounded-full text-center transition-colors duration-300",
          locale === "en"
            ? isLight
              ? "font-bold text-slate-900"
              : "font-bold text-white"
            : isLight
              ? "text-slate-500 hover:text-slate-900"
              : "text-slate-400 hover:text-slate-200"
        )}
      >
        EN
      </span>

      {/* Divider */}
      <span
        className={cn(
          "relative z-10 flex w-2.5 items-center justify-center text-[10px] opacity-40 transition-colors duration-300 select-none",
          isLight ? "text-slate-400" : "text-slate-500"
        )}
      >
        |
      </span>

      {/* AR Option */}
      <span
        className={cn(
          "font-arabic relative z-10 flex h-6 w-7 cursor-pointer items-center justify-center rounded-full text-center transition-colors duration-300",
          locale === "ar"
            ? isLight
              ? "font-bold text-slate-900"
              : "font-bold text-white"
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
