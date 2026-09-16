import React from "react";
import { cn } from "@/lib/utils";

export type StatusTone = "ok" | "wait" | "stop" | "info" | "mute" | "neutral";

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  children: React.ReactNode;
}

export function StatusPill({
  tone = "neutral",
  className,
  children,
  ...props
}: StatusPillProps) {
  const tones: Record<StatusTone, { container: string; dot: string }> = {
    ok: {
      container: "bg-emerald-950/70 text-emerald-300 border-emerald-800/80",
      dot: "bg-status-ok",
    },
    wait: {
      container: "bg-amber-950/70 text-amber-300 border-amber-800/80",
      dot: "bg-status-wait",
    },
    stop: {
      container: "bg-rose-950/70 text-rose-300 border-rose-800/80",
      dot: "bg-status-stop",
    },
    info: {
      container: "bg-blue-950/70 text-blue-300 border-blue-800/80",
      dot: "bg-blue-400",
    },
    mute: {
      container: "bg-slate-900 text-slate-400 border-slate-700/80",
      dot: "bg-status-mute",
    },
    neutral: {
      container: "bg-slate-900 text-slate-300 border-slate-700",
      dot: "bg-slate-400",
    },
  };

  const selectedTone = tones[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-sm",
        selectedTone.container,
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          selectedTone.dot,
          (tone === "ok" || tone === "wait") &&
            "animate-soft-pulse motion-reduce:animate-none"
        )}
        aria-hidden="true"
      />
      <span>{children}</span>
    </span>
  );
}
