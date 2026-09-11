"use client";

import React, { useEffect, useRef, useState } from "react";
import { PLANS_DATA } from "@/data/plansData";
import { PlansHeader } from "./plans/PlansHeader";
import { PlanCard, PlansGrid, PlansNote } from "./plans/PlanCard";

export function PlansSection() {
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
      id="plans"
      ref={sectionRef}
      className="section section--light relative overflow-hidden bg-white py-[118px] text-start"
    >
      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <PlansHeader isInView={isInView} />
        <PlansGrid tiers={PLANS_DATA} isInView={isInView} />
        <PlansNote isInView={isInView} />
      </div>
    </section>
  );
}

// Attach sub-components for Compound Component pattern compliance
PlansSection.Header = PlansHeader;
PlansSection.Grid = PlansGrid;
PlansSection.Card = PlanCard;
PlansSection.Note = PlansNote;
