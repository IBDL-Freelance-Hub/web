import React from "react";
import { HeroBadge } from "./HeroBadge";
import { HeroTitle } from "./HeroTitle";
import { HeroLead } from "./HeroLead";
import { HeroCTAButtons } from "./HeroCTAButtons";

export function HeroHeader() {
  return (
    <div className="hero__head max-w-[680px] text-start">
      <HeroBadge />
      <HeroTitle />
      <HeroLead />
      <HeroCTAButtons />
    </div>
  );
}
