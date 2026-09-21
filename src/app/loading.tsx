import React from "react";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f8fafc] py-24">
      <div className="relative flex items-center justify-center">
        {/* Animated Brand Pulse Orbs */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-red-500/20 border-t-[#e11119]" />
        <div className="absolute h-8 w-8 animate-ping rounded-full bg-[#16162c]/10" />
      </div>
      <p className="mt-6 animate-pulse text-sm font-semibold tracking-wider text-[#6a6a86] uppercase">
        Loading Freelancers Hub...
      </p>
    </div>
  );
}
