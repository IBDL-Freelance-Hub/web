import React from "react";
import { HeroSection } from "@/components/public/sections/HeroSection";
import { AboutSection } from "@/components/public/sections/AboutSection";
import { ServicesSection } from "@/components/public/sections/ServicesSection";
import { ValueChainSection } from "@/components/public/sections/ValueChainSection";
import { OfferPillarsSection } from "@/components/public/sections/OfferPillarsSection";
import { PlansSection } from "@/components/public/sections/PlansSection";
import { WhySection } from "@/components/public/sections/WhySection";
import { PqpOfferSection } from "@/components/public/sections/PqpOfferSection";
import { CloseCtaSection } from "@/components/public/sections/CloseCtaSection";
import { NextStepsSection } from "@/components/public/sections/NextStepsSection";

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ValueChainSection />
      <OfferPillarsSection />
      <PlansSection />
      <WhySection />
      <PqpOfferSection />
      <CloseCtaSection />
      <NextStepsSection />
    </main>
  );
}
