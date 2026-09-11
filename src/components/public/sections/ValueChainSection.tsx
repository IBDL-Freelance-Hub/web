"use client";

import React, { useEffect, useRef, useState } from "react";
import { VALUE_CHAIN_ROWS_DATA } from "@/data/valueChainData";
import { ValueChainHeader } from "./value-chain/ValueChainHeader";
import { ValueChainRow, ValueChainTable } from "./value-chain/ValueChainRow";

export function ValueChainSection() {
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
      id="value-chain"
      ref={sectionRef}
      className="section relative overflow-hidden bg-white py-[110px] text-start"
    >
      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ValueChainHeader isInView={isInView} />
        <ValueChainTable rows={VALUE_CHAIN_ROWS_DATA} isInView={isInView} />
      </div>
    </section>
  );
}

// Attach sub-components for Compound Pattern compliance
ValueChainSection.Header = ValueChainHeader;
ValueChainSection.Row = ValueChainRow;
ValueChainSection.Table = ValueChainTable;
