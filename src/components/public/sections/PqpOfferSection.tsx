"use client";

import React, { useEffect, useRef, useState } from "react";
import { PqpOfferContent } from "./pqp/PqpOfferContent";

export function PqpOfferSection() {
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
      id="free-pqp-offer"
      ref={sectionRef}
      className="section section--light relative overflow-hidden bg-white py-[110px] text-start"
    >
      <div
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isInView
            ? "translate-y-0 opacity-100 filter-none"
            : "translate-y-12 opacity-0 blur-[5px]"
        }`}
      >
        <PqpOfferContent />
      </div>
    </section>
  );
}

// Sub-component export for backward compatibility
PqpOfferSection.Content = PqpOfferContent;
