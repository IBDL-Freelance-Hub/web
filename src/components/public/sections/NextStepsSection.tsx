"use client";

import React, { useEffect, useRef, useState } from "react";
import { NEXT_STEPS_DATA } from "@/data/nextStepsData";
import { NextStepsHeader } from "./next-steps/NextStepsHeader";
import { NextStepCard, NextStepsGrid } from "./next-steps/NextStepCard";

export function NextStepsSection() {
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
      id="next-steps"
      ref={sectionRef}
      className="section relative overflow-hidden bg-white py-[110px] text-start text-[#16162c]"
    >
      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <NextStepsHeader isInView={isInView} />
        <NextStepsGrid steps={NEXT_STEPS_DATA} isInView={isInView} />
      </div>
    </section>
  );
}

// Attach sub-components for Compound Component pattern compliance
NextStepsSection.Header = NextStepsHeader;
NextStepsSection.Step = NextStepCard;
NextStepsSection.Grid = NextStepsGrid;
