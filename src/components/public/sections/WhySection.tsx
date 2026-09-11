"use client";

import React, { useEffect, useRef, useState } from "react";
import { WhyHeader } from "./why/WhyHeader";
import { WhyStatTile, WhyStatsMatrix } from "./why/WhyStatTile";
import { WhyReasonItem, WhyReasonsList } from "./why/WhyReasonItem";
import { AnimatedStatNumber } from "./why/AnimatedStatNumber";

export function WhySection() {
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
      id="why"
      ref={sectionRef}
      className="section relative overflow-hidden bg-[#121225] py-[110px] text-start text-white"
    >
      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isInView
              ? "translate-y-0 opacity-100 filter-none"
              : "-translate-y-8 opacity-0 blur-[5px]"
          }`}
        >
          <WhyHeader />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 overflow-hidden py-2 lg:grid-cols-12 lg:items-start">
          {/* Left Column: 2x2 Stats Box Matrix - Enters from LEFT */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isInView
                ? "translate-x-0 opacity-100 filter-none"
                : "-translate-x-16 opacity-0 blur-[5px]"
            }`}
          >
            <WhyStatsMatrix isInView={isInView} />
          </div>

          {/* Right Column: Reasons List - Enters from RIGHT */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isInView
                ? "translate-x-0 opacity-100 filter-none"
                : "translate-x-16 opacity-0 blur-[5px]"
            }`}
          >
            <WhyReasonsList />
          </div>
        </div>
      </div>
    </section>
  );
}

// Attach sub-components for Compound Pattern compliance
WhySection.Header = WhyHeader;
WhySection.ReasonItem = WhyReasonItem;
WhySection.ReasonsList = WhyReasonsList;
WhySection.StatTile = WhyStatTile;
WhySection.StatsMatrix = WhyStatsMatrix;
WhySection.AnimatedStatNumber = AnimatedStatNumber;
