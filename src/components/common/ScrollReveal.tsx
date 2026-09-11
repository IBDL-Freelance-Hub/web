"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  animationClass?: string;
  defaultClass?: string;
}

export function ScrollReveal({
  children,
  className,
  threshold = 0.1,
  animationClass = "opacity-100 translate-y-0",
  defaultClass = "opacity-0 translate-y-4 transition-all duration-700 ease-out",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(defaultClass, isVisible ? animationClass : "", className)}
    >
      {children}
    </div>
  );
}
