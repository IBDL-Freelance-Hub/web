import React from "react";

export default function MembershipLoading() {
  return (
    <div
      className="animate-pulse space-y-8"
      aria-label="Loading membership plans..."
      aria-busy="true"
    >
      {/* Header Banner Skeleton */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="h-6 w-32 rounded-full bg-slate-200" />
            <div className="h-8 w-64 rounded-md bg-slate-200" />
            <div className="h-4 w-96 max-w-full rounded bg-slate-100" />
          </div>
          <div className="h-24 w-60 rounded-2xl bg-slate-100" />
        </div>
      </div>

      {/* 3 Tier Cards Skeletons */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8"
          >
            <div className="flex justify-between">
              <div className="h-6 w-24 rounded-full bg-slate-200" />
              <div className="h-6 w-20 rounded-full bg-slate-100" />
            </div>
            <div className="h-7 w-40 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-24 rounded-2xl bg-slate-100" />
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <div className="h-4 w-5/6 rounded bg-slate-100" />
              <div className="h-4 w-4/6 rounded bg-slate-100" />
              <div className="h-4 w-5/6 rounded bg-slate-100" />
            </div>
            <div className="h-11 rounded-xl bg-slate-200 pt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
