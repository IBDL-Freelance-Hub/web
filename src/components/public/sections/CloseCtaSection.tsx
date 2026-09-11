"use client";

import React, { useEffect, useRef, useState } from "react";
import { CloseCtaContent } from "./cta/CloseCtaContent";

export function CloseCtaSection() {
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
      id="cta-close"
      ref={sectionRef}
      className="band--close relative w-full overflow-hidden bg-gradient-to-r from-[#0d0d1c] via-[#1d1d39] to-[#2c0e28] px-6 py-[92px] text-center text-white"
    >
      {/* Dual Ambient Glow Orbs */}
      <div className="band__orb--1 pointer-events-none absolute -top-[160px] left-[15%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(225,17,25,0.35),transparent_65%)] blur-[80px]" />
      <div className="band__orb--2 pointer-events-none absolute right-[15%] -bottom-[160px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(110,25,75,0.45),transparent_65%)] blur-[85px]" />

      <div
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "translate-y-10 opacity-0 blur-[5px]"
        }`}
      >
        <CloseCtaContent />
      </div>
    </section>
  );
}

// Sub-component export for backward compatibility
CloseCtaSection.Content = CloseCtaContent;
