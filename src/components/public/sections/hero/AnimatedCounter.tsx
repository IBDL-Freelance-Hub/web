"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export interface AnimatedCounterProps {
  target: number;
  duration?: number;
}

export function AnimatedCounter({
  target,
  duration = 1000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { formatNumber } = useLocale();

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    // Immediate start upon component mount
    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return <span className="tabular-nums">{formatNumber(count)}</span>;
}
