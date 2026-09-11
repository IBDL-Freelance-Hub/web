import React from "react";
import { HERO_STATS_DATA } from "@/data/heroData";
import { HeroHeader } from "./hero/HeroHeader";
import { HeroStatsBar } from "./hero/HeroStatsBar";
import { HeroScrollIndicator } from "./hero/HeroScrollIndicator";
import { HeroBadge } from "./hero/HeroBadge";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroLead } from "./hero/HeroLead";
import { HeroCTAButtons } from "./hero/HeroCTAButtons";
import { AnimatedCounter } from "./hero/AnimatedCounter";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#0c0c1a] bg-gradient-to-br from-[#0c0c1a] via-[#121226] to-[#1a1a36] pt-[calc(76px+60px)] pb-16"
    >
      {/* 1. Animated Corporate Trainer Background Photo (opacity 0.85) */}
      <div className="hero__photo pointer-events-none" aria-hidden="true" />

      {/* 2. Top-Right Red Ambient Light Glow Orb */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(225,17,25,0.35),transparent_70%)] blur-[90px]"
        aria-hidden="true"
      />

      {/* 3. Ambient Orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(225,17,25,0.15),transparent_60%)] blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(65,146,87,0.12),transparent_60%)] blur-[100px]"
        aria-hidden="true"
      />

      {/* 4. Light Directional Scrim (Crisp text contrast on far-left column only, high clarity on photo) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0c0c1a] via-[#0c0c1a]/45 to-transparent"
        aria-hidden="true"
      />

      {/* 5. Content Wrapper with Staggered Elements */}
      <div className="wrap relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-between px-6 sm:px-8">
        <HeroHeader />

        <div className="mt-12 flex w-full flex-col items-start">
          <HeroStatsBar stats={HERO_STATS_DATA} />
          <HeroScrollIndicator />
        </div>
      </div>
    </section>
  );
}

// Compound pattern backward compatibility exports
HeroSection.Header = HeroHeader;
HeroSection.Badge = HeroBadge;
HeroSection.Title = HeroTitle;
HeroSection.Lead = HeroLead;
HeroSection.CTAButtons = HeroCTAButtons;
HeroSection.StatsBar = HeroStatsBar;
HeroSection.ScrollIndicator = HeroScrollIndicator;
HeroSection.AnimatedCounter = AnimatedCounter;
