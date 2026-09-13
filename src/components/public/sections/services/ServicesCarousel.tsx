"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import { SERVICES_DATA, ServiceItem } from "@/data/servicesData";
import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/utils";

export interface ServicesCarouselProps {
  services?: ServiceItem[];
  isInView?: boolean;
  onSelectService?: (item: ServiceItem) => void;
}

export function ServicesCarousel({
  services = SERVICES_DATA,
  isInView = true,
  onSelectService,
}: ServicesCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isRTL } = useLocale();

  const totalCards = services.length;
  const cardsPerPage = 3;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, totalPages]);

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const visibleCards = services.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cards Container Grid (3 per view) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((item, idx) => (
          <ServiceCard
            key={item.num}
            item={item}
            index={idx}
            isInView={isInView}
            onSelect={onSelectService}
          />
        ))}
      </div>

      {/* Slider Controls */}
      <div className="mt-10 flex items-center justify-between">
        <span className="text-xs font-semibold text-white/50">
          {currentPage + 1} / {totalPages}
        </span>

        <div className="flex gap-2.5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentPage(idx)}
              className={cn(
                "h-2.5 cursor-pointer rounded-full transition-all duration-300",
                currentPage === idx
                  ? "bg-green-lit w-8"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prevPage}
            aria-label="Previous services"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 active:scale-95"
          >
            {isRTL ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            onClick={nextPage}
            aria-label="Next services"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 active:scale-95"
          >
            {isRTL ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ServicesFooter() {
  const { locale } = useLocale();

  return (
    <div className="svfoot mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 text-center sm:flex-row sm:text-start">
      <p className="m-0 text-sm text-white/60">
        {locale === "ar"
          ? "تُشرح كل خدمة بالتفصيل داخل المنصة، حيث يمكنك طلبها."
          : "Each service is explained in full inside the Hub, where you can request it."}
      </p>

      <Link
        href="#plans"
        className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 active:scale-95"
      >
        {locale === "ar" ? (
          <>
            <span>تعرف على كيفية الوصول لهذه الخدمات</span>
            <ArrowLeft className="h-4 w-4" />
          </>
        ) : (
          <>
            <span>See how to access these services</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Link>
    </div>
  );
}
