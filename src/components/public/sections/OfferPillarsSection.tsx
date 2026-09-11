"use client";

import React, { useEffect, useRef, useState } from "react";
import { OFFER_PILLARS_DATA } from "@/data/offerPillarsData";
import { OfferPillarsHeader } from "./offer-pillars/OfferPillarsHeader";
import {
  OfferPillarsCard,
  OfferPillarsGrid,
} from "./offer-pillars/OfferPillarsCard";
import { PillarCardNumber } from "./offer-pillars/PillarCardNumber";

export function OfferPillarsSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="offer"
      ref={sectionRef}
      className="section section--deep bg-navy-deep relative overflow-hidden py-[118px] text-start text-white"
    >
      {/* Top Ambient Glow */}
      <div
        className="bg-green-brand/10 pointer-events-none absolute start-1/2 -top-40 h-80 w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <OfferPillarsHeader isInView={isInView} />
        <OfferPillarsGrid pillars={OFFER_PILLARS_DATA} isInView={isInView} />
      </div>
    </section>
  );
}

// Attach sub-components for Compound Component pattern compliance
OfferPillarsSection.Header = OfferPillarsHeader;
OfferPillarsSection.Grid = OfferPillarsGrid;
OfferPillarsSection.Pillar = OfferPillarsCard;
OfferPillarsSection.PillarCardNumber = PillarCardNumber;
