"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/common/DirectionProvider";

interface PageHeaderProps {
  sectionTitle: string;
  sectionTitleAr: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
}

export function PageHeader({
  sectionTitle,
  sectionTitleAr,
  title,
  titleAr,
  subtitle,
  subtitleAr,
}: PageHeaderProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const ChevronChar = isArabic ? "<" : ">";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section className="pagehead relative overflow-hidden bg-[#1d1d39] pt-[calc(76px+74px)] pb-[78px] text-start text-white">
      {/* Ambient Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,17,25,0.18),transparent_70%)]" />

      <div
        className={`wrap relative mx-auto max-w-[1240px] px-7 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mounted
            ? "translate-y-0 opacity-100 filter-none"
            : "-translate-y-8 opacity-0 blur-[5px]"
        }`}
      >
        {/* Breadcrumb row (.crumb) */}
        <nav className="crumb mb-[22px] flex flex-wrap items-center gap-2.5 text-[13.6px]">
          <Link
            href="/"
            className="font-semibold text-white/70 transition-colors hover:text-white"
          >
            {isArabic ? "الرئيسية" : "Home"}
          </Link>
          <span className="text-white/40">{ChevronChar}</span>
          <b className="font-bold text-white">
            {isArabic ? sectionTitleAr : sectionTitle}
          </b>
        </nav>

        {/* Heading (h1) */}
        <h1 className="mb-[18px] text-[clamp(31px,4.4vw,52px)] leading-[1.1] font-bold tracking-[-0.028em] text-white">
          {isArabic ? titleAr : title}
        </h1>

        {/* Subtitle */}
        <p className="pagehead__sub m-0 max-w-[64ch] text-[17px] leading-[1.7] text-white/80">
          {isArabic ? subtitleAr : subtitle}
        </p>
      </div>
    </section>
  );
}
