"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { X, Download, FileText } from "lucide-react";

export interface ProductData {
  id: string;
  slug: string;
  title: string;
  category: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  about: { en: string; ar: string };
  logoImg: string;
  stats: {
    stat1: { num: string; label: { en: string; ar: string } };
    stat2: { num: string; label: { en: string; ar: string } };
    stat3: { num: string; label: { en: string; ar: string } };
  };
  targetAudience: { en: string[]; ar: string[] };
  useCases: { en: string[]; ar: string[] };
  keyLearningAreas: { en: string[]; ar: string[] };
  chips: { en: string[]; ar: string[] };
  flyers: {
    en: string;
    ar: string;
  };
}

interface ProductModalProps {
  product: ProductData | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { locale } = useLocale();
  const { openRegistration } = useRegistration();

  if (!product) return null;

  const isArabic = locale === "ar";
  const ArrowChar = isArabic ? "←" : "→";

  const handleDownload = (flyerUrl: string, languageLabel: string) => {
    const link = document.createElement("a");
    link.href = flyerUrl;
    link.download = `${product.id}-${languageLabel}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="ov animate-in fade-in fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-[#0a0a18]/70 p-4 backdrop-blur-[10px] duration-200 sm:p-8"
      onClick={onClose}
    >
      <div
        className="sheet pm animate-in fade-in zoom-in-95 relative my-auto flex max-h-[90vh] w-full max-w-[820px] flex-col overflow-hidden rounded-[32px] bg-white text-start shadow-[0_28px_70px_rgba(20,20,40,0.25)] duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (.pm__x) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="pm__x absolute end-6 top-6 z-20 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[#e2e2ec] bg-white/80 text-[#16162c] shadow-xs transition-all hover:rotate-90 hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header (.pm__head) */}
        <div className="pm__head relative flex shrink-0 items-center gap-6 border-b border-[#e2e2ec] bg-gradient-to-br from-[#fbfbfe] to-[#eeeef6] p-[32px_40px] pe-16">
          {/* Logo Box */}
          <div className="flex h-[80px] w-[140px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#e2e2ec] bg-white p-3 shadow-2xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.logoImg}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Metadata */}
          <div className="pm__meta flex-1">
            <span className="pm__cat mb-1 block text-[10.5px] font-extrabold tracking-[0.13em] text-[#6a6a86] uppercase">
              {product.category[locale]}
            </span>
            <h3 className="mb-0.5 text-[24px] font-bold tracking-tight text-[#16162c] sm:text-[26px]">
              {product.title}
            </h3>
            <p className="pm__tag mb-0 text-[14px] font-semibold text-[#e11119]">
              {product.tagline[locale]}
            </p>
          </div>
        </div>

        {/* Stats Row (.pm__stats) */}
        <div className="pm__stats grid shrink-0 grid-cols-3 divide-x divide-[#e2e2ec] border-b border-[#e2e2ec] bg-white px-4 py-6 text-center rtl:divide-x-reverse">
          <div className="px-2">
            <b className="mb-0.5 block text-xl font-bold text-[#16162c] sm:text-2xl">
              {product.stats.stat1.num}
            </b>
            <span className="block text-[11px] leading-tight font-semibold text-[#6a6a86] sm:text-xs">
              {product.stats.stat1.label[locale]}
            </span>
          </div>
          <div className="px-2">
            <b className="mb-0.5 block text-xl font-bold text-[#16162c] sm:text-2xl">
              {product.stats.stat2.num}
            </b>
            <span className="block text-[11px] leading-tight font-semibold text-[#6a6a86] sm:text-xs">
              {product.stats.stat2.label[locale]}
            </span>
          </div>
          <div className="px-2">
            <b className="mb-0.5 block text-xl font-bold text-[#16162c] sm:text-2xl">
              {product.stats.stat3.num}
            </b>
            <span className="block text-[11px] leading-tight font-semibold text-[#6a6a86] sm:text-xs">
              {product.stats.stat3.label[locale]}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body (.pm__body) */}
        <div className="pm__body space-y-7 overflow-y-auto p-[32px_40px]">
          {/* ABOUT THIS PRODUCT */}
          <div>
            <span className="pm__lbl mb-2 block text-[11px] font-extrabold tracking-[0.14em] text-[#419257] uppercase">
              {isArabic ? "نبذة عن المنتج" : "ABOUT THIS PRODUCT"}
            </span>
            <p className="text-[14.5px] leading-[1.65] text-[#3e3e5c]">
              {product.about[locale]}
            </p>
          </div>

          {/* TARGET AUDIENCE & USE CASES Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* TARGET AUDIENCE */}
            <div>
              <span className="pm__lbl mb-3 block text-[11px] font-extrabold tracking-[0.14em] text-[#419257] uppercase">
                {isArabic ? "الفئة المستهدفة" : "TARGET AUDIENCE"}
              </span>
              <ul className="space-y-2.5 text-[13.5px] text-[#3e3e5c]">
                {product.targetAudience[locale].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="me-2.5 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e11119]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* USE CASES */}
            <div>
              <span className="pm__lbl mb-3 block text-[11px] font-extrabold tracking-[0.14em] text-[#419257] uppercase">
                {isArabic ? "مجالات الاستخدام" : "USE CASES"}
              </span>
              <ul className="space-y-2.5 text-[13.5px] text-[#3e3e5c]">
                {product.useCases[locale].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="me-2.5 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#419257]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* KEY LEARNING AREAS */}
          <div>
            <span className="pm__lbl mb-3 block text-[11px] font-extrabold tracking-[0.14em] text-[#419257] uppercase">
              {isArabic ? "مجالات التعلم الرئيسية" : "KEY LEARNING AREAS"}
            </span>
            <div className="flex flex-wrap gap-2">
              {product.keyLearningAreas[locale].map((chip, idx) => (
                <span
                  key={idx}
                  className="chip rounded-full border border-[#e2e2ec] bg-[#f6f6fa] px-3.5 py-1.5 text-[12px] font-semibold text-[#3e3e5c]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* PRODUCT FLYERS */}
          <div>
            <span className="pm__lbl mb-3 block text-[11px] font-extrabold tracking-[0.14em] text-[#419257] uppercase">
              {isArabic ? "بروشورات المنتج" : "PRODUCT FLYERS"}
            </span>
            <div className="fly grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* English Flyer */}
              <div
                onClick={() => handleDownload(product.flyers.en, "english")}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#e2e2ec] bg-[#f6f6fa] p-3.5 text-start transition-all hover:border-[#419257]/50 hover:bg-white"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#419257]/10 text-[#419257]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <b className="block text-xs font-bold text-[#16162c]">
                      English Flyer
                    </b>
                    <span className="block text-[11px] font-medium text-[#6a6a86]">
                      PDF · {product.title}
                    </span>
                  </div>
                </div>
                <Download className="h-4 w-4 shrink-0 text-[#6a6a86]" />
              </div>

              {/* Arabic Flyer */}
              <div
                onClick={() => handleDownload(product.flyers.ar, "arabic")}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#e2e2ec] bg-[#f6f6fa] p-3.5 text-start transition-all hover:border-[#419257]/50 hover:bg-white"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#419257]/10 text-[#419257]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <b className="block text-xs font-bold text-[#16162c]">
                      Arabic Flyer
                    </b>
                    <span className="block text-[11px] font-medium text-[#6a6a86]">
                      PDF · {product.title}
                    </span>
                  </div>
                </div>
                <Download className="h-4 w-4 shrink-0 text-[#6a6a86]" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex shrink-0 items-center justify-between border-t border-[#e2e2ec] bg-white p-[20px_40px]">
          <button
            type="button"
            onClick={() => {
              onClose();
              openRegistration();
            }}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-[#e11119] px-7 py-3 text-xs font-bold text-white shadow-[0_10px_25px_rgba(225,17,25,0.3)] transition-all hover:bg-[#b60d14] sm:text-sm"
          >
            <span>
              {isArabic ? "طلب شراء هذا المنتج" : "Request This Product"}
            </span>
            <span>{ArrowChar}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-[#e2e2ec] px-6 py-2.5 text-xs font-bold text-[#3e3e5c] transition-all hover:bg-[#f6f6fa] sm:text-sm"
          >
            {isArabic ? "إغلاق" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
