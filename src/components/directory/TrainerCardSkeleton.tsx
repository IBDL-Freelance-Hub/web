import React from "react";

export function TrainerCardSkeleton() {
  return (
    <div
      className="flex h-[340px] flex-col justify-between rounded-2xl border border-white/10 bg-[#16162c]/80 p-6 shadow-xl backdrop-blur-sm"
      aria-hidden="true"
    >
      <div>
        {/* Header row: Avatar + Badges */}
        <div className="flex items-start justify-between gap-4">
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-white/10" />
          <div className="flex flex-col items-end gap-1.5">
            <div className="h-5 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-16 animate-pulse rounded-full bg-white/5" />
          </div>
        </div>

        {/* Name and Headline */}
        <div className="mt-4 space-y-2">
          <div className="h-6 w-3/4 animate-pulse rounded bg-white/15" />
          <div className="h-4 w-full animate-pulse rounded bg-white/10" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
        </div>

        {/* Location & Experience Line */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
        </div>

        {/* Expertise Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
          <div className="h-6 w-28 animate-pulse rounded-full bg-white/10" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>

      {/* Footer CTA Button */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="h-10 w-full animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}
