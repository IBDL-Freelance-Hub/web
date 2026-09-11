"use client";

import React, { useState, useEffect } from "react";
import { useRegistration } from "./registration/RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { openRegistration } = useRegistration();
  const { locale } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const distanceFromBottom = docHeight - (scrollY + winHeight);

      // Show floating CTA once user scrolls past top hero area (> 200px) until reaching bottom footer
      if (scrollY > 200 && distanceFromBottom > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed end-6 bottom-6 z-40 transition-all duration-500 ease-out",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-12 opacity-0"
      )}
    >
      <button
        onClick={openRegistration}
        aria-label={
          locale === "ar"
            ? "احصل على التقييم المجاني — إتاحة محدودة"
            : "Get Your Free Assessment — Limited Phase 1 access"
        }
        className="group relative inline-flex items-center gap-3.5 rounded-full bg-[#e11119] px-5 py-2.5 text-white shadow-[0_10px_30px_rgba(225,17,25,0.45)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#c90d14] hover:shadow-[0_14px_36px_rgba(225,17,25,0.6)] active:scale-[0.98]"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-inner">
          <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.2} />
        </div>

        <div className="flex flex-col text-start">
          <span className="text-xs leading-tight font-bold tracking-tight text-white sm:text-sm">
            {locale === "ar" ? "احصل على التقييم المجاني" : "Free Assessment"}
          </span>
          <span className="mt-0.5 text-[10px] leading-none font-medium text-white/85">
            {locale === "ar"
              ? "إتاحة محدودة — المرحلة الأولى"
              : "Limited Phase 1 access"}
          </span>
        </div>
      </button>
    </div>
  );
}
