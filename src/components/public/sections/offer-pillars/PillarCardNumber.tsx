"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export interface PillarCardNumberProps {
  value: string;
  isInView?: boolean;
}

export function PillarCardNumber({
  value,
  isInView = true,
}: PillarCardNumberProps) {
  const { formatNumber } = useLocale();
  const numericVal = parseInt(value, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || isNaN(numericVal)) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * numericVal);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(numericVal);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, numericVal]);

  const displayString = isNaN(numericVal)
    ? value
    : String(count).padStart(2, "0");

  return (
    <span className="pillar__n text-green-lit mb-5 block text-[13px] font-extrabold tracking-[0.12em] tabular-nums transition-transform duration-500 group-hover:scale-105">
      {formatNumber(displayString)}
    </span>
  );
}
