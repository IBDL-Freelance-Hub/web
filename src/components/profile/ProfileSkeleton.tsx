import React from "react";

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Loading profile...">
      {/* Identity Card Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-2xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-6 w-48 rounded bg-slate-200" />
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="flex gap-2 pt-1">
                <div className="h-6 w-28 rounded-full bg-slate-200" />
                <div className="h-6 w-36 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
          <div className="h-10 w-32 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* 2-Column Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-72 rounded-2xl border border-slate-200/80 bg-white p-6" />
        <div className="h-72 rounded-2xl border border-slate-200/80 bg-white p-6" />
      </div>

      {/* Biography Skeleton */}
      <div className="h-40 rounded-2xl border border-slate-200/80 bg-white p-6" />

      {/* Documents & Directory Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-48 rounded-2xl border border-slate-200/80 bg-white p-6" />
        <div className="h-48 rounded-2xl border border-slate-200/80 bg-white p-6" />
      </div>
    </div>
  );
}
