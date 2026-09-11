import React from "react";

export default function PublicLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-[#16162c] px-8 py-20">
        <div className="mx-auto max-w-[1240px] space-y-4">
          <div className="h-4 w-32 animate-pulse rounded bg-white/20" />
          <div className="h-10 w-96 animate-pulse rounded bg-white/20" />
          <div className="h-5 w-full max-w-xl animate-pulse rounded bg-white/10" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="mx-auto max-w-[1240px] px-7 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex h-80 animate-pulse flex-col justify-between rounded-2xl border border-slate-200 bg-slate-100 p-6"
            >
              <div className="space-y-3">
                <div className="h-6 w-24 rounded bg-slate-200" />
                <div className="h-8 w-3/4 rounded bg-slate-200" />
                <div className="h-16 w-full rounded bg-slate-200" />
              </div>
              <div className="h-10 w-full rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
