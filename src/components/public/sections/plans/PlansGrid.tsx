"use client";

import React from "react";
import type { PlanTierData } from "@/data/plansData";
import { PlanCard } from "./PlanCard";

export interface PlansGridProps {
  tiers: PlanTierData[];
  isInView?: boolean;
}

export function PlansGrid({ tiers, isInView = true }: PlansGridProps) {
  return (
    <div className="tiers mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-[22px] lg:grid-cols-3">
      {tiers.map((tier, idx) => (
        <PlanCard key={tier.id} tier={tier} index={idx} isInView={isInView} />
      ))}
    </div>
  );
}
