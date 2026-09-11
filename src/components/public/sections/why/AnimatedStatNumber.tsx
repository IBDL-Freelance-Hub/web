"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export interface AnimatedStatNumberProps {
  value: string;
  isInView?: boolean;
}

export function AnimatedStatNumber({
  value,
  isInView = true,
}: AnimatedStatNumberProps) {
  const { formatNumber } = useLocale();

  const match = value.match(/^([\d,]+)(.*)$/);
  const numericPart = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const suffixPart = match ? match[2] : "";

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || isNaN(numericPart) || numericPart === 0) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1100;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * numericPart);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(numericPart);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, numericPart]);

  if (!match || isNaN(numericPart) || numericPart === 0) {
    return <span>{value}</span>;
  }

  const formattedCount = formatNumber(count.toLocaleString("en-US"));

  return (
    <span className="tabular-nums">
      {formattedCount}
      {suffixPart}
    </span>
  );
}
