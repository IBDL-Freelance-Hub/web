"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export function HeroScrollIndicator() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const handleScroll = () => {
    const aboutElem = document.getElementById("about");
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className="mx-auto mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 text-white/40 transition-colors hover:text-white/70"
    >
      <div className="flex h-8 w-5 justify-center rounded-full border-2 border-current p-1">
        <div className="h-2 w-1 animate-bounce rounded-full bg-current" />
      </div>
      <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase">
        {isArabic ? "انزل للاستكشاف" : "SCROLL TO EXPLORE"}
      </span>
    </button>
  );
}
