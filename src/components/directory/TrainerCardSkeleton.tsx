import React from "react";

export function TrainerCardSkeleton() {
  return (
    <div
      className="flex h-[340px] flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs"
      aria-hidden="true"
    >
      <div>
        {/* Header row: Avatar + Badges */}
        <div className="flex items-start justify-between gap-4">
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-slate-100" />
          <div className="flex flex-col items-end gap-1.5">
            <div className="h-5 w-24 animate-pulse rounded-full bg-slate-100" />
          </div>
        </div>

        {/* Name and Headline */}
        <div className="mt-4 space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
          <div className="h-3.5 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-100" />
        </div>

        {/* Location & Experience Line */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-3.5 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-3.5 w-20 animate-pulse rounded bg-slate-100" />
        </div>

        {/* Expertise Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          <div className="h-6 w-20 animate-pulse rounded-md bg-slate-100" />
          <div className="h-6 w-28 animate-pulse rounded-md bg-slate-100" />
          <div className="h-6 w-16 animate-pulse rounded-md bg-slate-100" />
        </div>
      </div>

      {/* Footer CTA Button */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="h-9 w-full animate-pulse rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}
