"use client";

import React, { useEffect, useRef, useState } from "react";
import { AccreditationHeroText } from "./AccreditationHeroText";
import {
  AccreditationChecklist,
  ChecklistItemData,
} from "./AccreditationChecklist";
import { AccreditationCTAButton } from "./AccreditationCTAButton";

interface AccreditationSectionClientProps {
  checklistItems: ChecklistItemData[];
}

export function AccreditationSectionClient({
  checklistItems,
}: AccreditationSectionClientProps) {
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
      ref={sectionRef}
      className="section section--light relative overflow-hidden bg-white pt-[80px] pb-[100px]"
    >
      <div className="wrap mx-auto max-w-[1240px] px-7">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left Column: The Official Accreditation Badge Artwork - Enters from LEFT */}
          <div
            className={`flex justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isInView
                ? "translate-x-0 opacity-100 filter-none"
                : "-translate-x-16 opacity-0 blur-[5px]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tools_logos/ibdl-accreditation.png"
              alt="IBDL Accredited Content Seal"
              className="mx-auto h-auto w-full max-w-[340px] object-contain drop-shadow-[0_20px_40px_rgba(20,20,40,0.14)]"
            />
          </div>

          {/* Right Column: Recognition Pathway Details - Enters from RIGHT */}
          <div
            className={`text-start transition-all delay-200 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isInView
                ? "translate-x-0 opacity-100 filter-none"
                : "translate-x-16 opacity-0 blur-[5px]"
            }`}
          >
            <AccreditationHeroText />
            <AccreditationChecklist items={checklistItems} />
            <div className="mt-8">
              <AccreditationCTAButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
