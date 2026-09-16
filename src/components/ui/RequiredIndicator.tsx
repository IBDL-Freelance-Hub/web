import React from "react";
import { cn } from "@/lib/utils";

interface RequiredIndicatorProps {
  className?: string;
}

/**
 * Canonical Required Indicator component
 * Renders an accessible, brand-red asterisk with bidirectional margin.
 */
export function RequiredIndicator({ className }: RequiredIndicatorProps) {
  return (
    <span
      className={cn("ms-1 font-bold text-[#e11119] select-none", className)}
      aria-hidden="true"
    >
      *
    </span>
  );
}
