import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  "default" | "neutral" | "success" | "warning" | "danger" | "comingSoon";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> =
  {
    default: {
      container: "border-slate-200 bg-slate-100 text-slate-700",
      dot: "bg-slate-400",
    },
    neutral: {
      container: "border-slate-200 bg-slate-50 text-slate-600",
      dot: "bg-slate-400",
    },
    success: {
      container: "border-emerald-200 bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    },
    warning: {
      container: "border-amber-200/80 bg-amber-50 text-amber-800",
      dot: "bg-amber-500",
    },
    danger: {
      container: "border-red-200 bg-red-50 text-red-700",
      dot: "bg-red-500",
    },
    comingSoon: {
      container: "border-amber-500/20 bg-amber-500/10 text-amber-700",
      dot: "bg-amber-500",
    },
  };

export function Badge({
  variant = "default",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const styles = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold select-none",
        styles.container,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            styles.dot,
            (variant === "success" || variant === "warning") &&
              "animate-soft-pulse motion-reduce:animate-none"
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
