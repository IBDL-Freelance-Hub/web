import React from "react";

export default function MemberLoading() {
  return (
    <div
      className="animate-pulse space-y-6"
      aria-label="Loading workspace content..."
    >
      {/* Header placeholder */}
      <div className="space-y-2 border-b border-slate-200 pb-4">
        <div className="h-7 w-48 rounded-md bg-slate-200" />
        <div className="h-4 w-96 max-w-full rounded-md bg-slate-100" />
      </div>

      {/* Hero / Identity Card Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-slate-200 sm:h-20 sm:w-20" />
            <div className="space-y-2">
              <div className="h-6 w-48 rounded bg-slate-200" />
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="flex gap-2 pt-1">
                <div className="h-5 w-24 rounded-full bg-slate-200" />
                <div className="h-5 w-32 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
          <div className="h-10 w-28 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* Content Grid Skeletons */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-72 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs" />
        <div className="h-72 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs" />
      </div>

      <div className="h-40 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-48 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs" />
        <div className="h-48 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs" />
      </div>
    </div>
  );
}
