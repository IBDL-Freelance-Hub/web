"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { ProductData } from "@/components/public/ProductModal";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ExtendedProductData extends ProductData {
  applications?: { en: string; ar: string }[];
}

interface ProductCardProps {
  product: ExtendedProductData;
  onSelect: (product: ProductData) => void;
  index?: number;
  isInView?: boolean;
  badge?: {
    en: string;
    ar: string;
  };
}

export function ProductCard({
  product,
  onSelect,
  index = 0,
  isInView = true,
  badge,
}: ProductCardProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div
      onClick={() => onSelect(product)}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={`pcard group relative flex min-h-[480px] cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#e2e2ec] bg-white text-start transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-transparent hover:shadow-[0_28px_70px_rgba(20,20,40,0.16)] ${
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "translate-y-12 opacity-0 blur-[5px]"
      }`}
    >
      {/* Optional Top-end Badge Slot */}
      {badge && (
        <span className="absolute end-4 top-4 z-20 rounded-full bg-[#419257] px-2.5 py-1 text-[11px] font-extrabold text-white uppercase shadow-xs">
          {isArabic ? badge.ar : badge.en}
        </span>
      )}

      {/* Logo Box (.pcard__logo) */}
      <div className="pcard__logo relative flex h-[126px] shrink-0 items-center justify-center overflow-hidden border-b border-[#e2e2ec] bg-gradient-to-b from-[#fbfbfe] to-[#f1f1f7] p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_90%_at_50%_120%,rgba(65,146,87,0.13),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.logoImg}
            alt={product.title}
            className="max-h-[64px] max-w-[150px] object-contain"
          />
        </div>
      </div>

      {/* Body */}
      <div className="pcard__body flex flex-1 flex-col p-[24px_26px_26px]">
        {/* Category tag (.pcard__cat) */}
        <span className="pcard__cat mb-2.5 block text-[10.5px] font-extrabold tracking-[0.13em] text-[#6a6a86] uppercase">
          {product.category[locale]}
        </span>

        {/* Title (h3) */}
        <h3 className="pcard__name mb-1 text-[20px] font-bold tracking-tight text-[#16162c]">
          {product.title}
        </h3>

        {/* Sub-tagline */}
        <span className="pcard__tag mb-3.5 block text-[13.5px] font-semibold text-[#e11119]">
          {product.tagline[locale]}
        </span>

        {/* Description */}
        <p className="pcard__desc mb-5 line-clamp-4 flex-1 text-[14.6px] leading-[1.62] text-[#6a6a86]">
          {product.description[locale]}
        </p>

        {/* Tag Chips (.pcard__apps) */}
        {product.chips?.[locale] && product.chips[locale].length > 0 && (
          <div className="pcard__apps mb-5 flex flex-wrap gap-1.5">
            {product.chips[locale].map((chip: string, i: number) => (
              <span
                key={i}
                className="rounded-md bg-[#f4f4f8] px-2.5 py-1 text-[11.5px] font-semibold text-[#4e4e68]"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Optional applications */}
        {product.applications && product.applications.length > 0 && (
          <div className="pcard__apps mb-5 flex flex-wrap gap-1.5">
            {product.applications.map((app, i) => (
              <span
                key={i}
                className="rounded-md bg-[#f4f4f8] px-2.5 py-1 text-[11.5px] font-semibold text-[#4e4e68]"
              >
                {app[locale]}
              </span>
            ))}
          </div>
        )}

        {/* Footer CTA Trigger (.pcard__foot) */}
        <div className="pcard__foot mt-auto flex items-center justify-between border-t border-[#f0f0f5] pt-4">
          <span className="text-[13.5px] font-extrabold text-[#16162c] transition-colors duration-200 group-hover:text-[#e11119]">
            {isArabic ? "استعرض الكتالوج والملفات" : "Explore Profile & Materials"}
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f4f8] text-[#16162c] transition-colors duration-200 group-hover:bg-[#e11119] group-hover:text-white">
            <ArrowIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
