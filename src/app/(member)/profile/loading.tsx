import React from "react";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      {/* Profile Page Header Skeleton */}
      <div className="border-b border-slate-200 pb-4">
        <div className="h-7 w-36 animate-pulse rounded-md bg-slate-200" />
        <div className="mt-2 h-4 w-96 max-w-full animate-pulse rounded-md bg-slate-100" />
      </div>

      {/* Profile Cards Skeleton */}
      <ProfileSkeleton />
    </div>
  );
}
