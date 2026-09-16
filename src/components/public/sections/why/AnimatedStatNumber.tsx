"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export interface AnimatedStatNumberProps {
  value: string;
  isInView?: boolean;
  delay?: number;
  duration?: number;
}

export function AnimatedStatNumber({
  value,
  isInView = true,
  delay = 200,
  duration = 1800,
}: AnimatedStatNumberProps) {
  const { formatNumber } = useLocale();
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(() => {
    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      return true;
    }
    return false;
  });
  const hasAnimatedRef = useRef(false);

  // Parse numeric part, suffix, and whether original value explicitly had a comma
  const match = value.match(/^([\d,]+)(.*)$/);
  const hasComma = value.includes(",");
  const numericPart = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const suffixPart = match ? match[2] : "";

  const [count, setCount] = useState(0);

  // Dedicated observer on the stat element itself so it only starts when actually in view
  useEffect(() => {
    const node = spanRef.current;
    if (
      !node ||
      typeof window === "undefined" ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const shouldStart = isInView && isIntersecting;
    if (
      !shouldStart ||
      hasAnimatedRef.current ||
      isNaN(numericPart) ||
      numericPart === 0
    ) {
      return;
    }

    hasAnimatedRef.current = true;

    let animationFrameId: number;
    const timeoutId = setTimeout(() => {
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Smooth ease-out quart for natural, satisfying deceleration
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOut * numericPart);

        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(numericPart);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, isIntersecting, numericPart, delay, duration]);

  if (!match || isNaN(numericPart) || numericPart === 0) {
    return <span>{value}</span>;
  }

  // Preserve comma ONLY if original value contained it (e.g. "3,500+" has comma, "2006" does NOT)
  const formattedRaw = hasComma
    ? count.toLocaleString("en-US")
    : count.toString();
  const formattedCount = formatNumber(formattedRaw);

  return (
    <span ref={spanRef} className="inline-block tabular-nums">
      {formattedCount}
      {suffixPart}
    </span>
  );
}
