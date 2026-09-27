import React from "react";
import { MapPin, Clock, CheckCircle, Award } from "lucide-react";
import { TrainerAvatar } from "@/components/directory/TrainerAvatar";
import { DIRECTORY_TIER_CONFIG } from "@/constants/directory";
import type { PublicTrainerProfile } from "@/types/directory";
import type { MembershipTier } from "@/types/member";

export interface PublicProfileHeaderProps {
  profile: PublicTrainerProfile;
  locale?: "en" | "ar";
}

export function PublicProfileHeader({
  profile,
  locale = "en",
}: PublicProfileHeaderProps) {
  const isAr = locale === "ar";
  const tierConfig =
    DIRECTORY_TIER_CONFIG[profile.tier as MembershipTier] ||
    DIRECTORY_TIER_CONFIG["ESSENTIAL"];

  const displayName =
    isAr && profile.fullNameAr
      ? profile.fullNameAr
      : profile.fullNameEn ||
        `${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ""}`;

  const displayTitle =
    isAr && profile.titleAr ? profile.titleAr : profile.titleEn;

  const yearsLabel = profile.yearsOfExperience
    ? isAr
      ? `${profile.yearsOfExperience} سنوات خبرة`
      : `${profile.yearsOfExperience} years experience`
    : null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#16162c]/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
      {/* Background tier glow */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl ${
          profile.tier === "MASTER"
            ? "bg-[radial-gradient(ellipse_at_top_left,rgba(251,191,36,0.07),transparent_55%)]"
            : profile.tier === "PROFESSIONAL"
              ? "bg-[radial-gradient(ellipse_at_top_left,rgba(52,211,153,0.07),transparent_55%)]"
              : "bg-[radial-gradient(ellipse_at_top_left,rgba(148,163,184,0.04),transparent_55%)]"
        }`}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
        {/* Avatar */}
        <div className="shrink-0">
          <TrainerAvatar
            name={displayName}
            photoUrl={profile.photoUrl}
            tier={profile.tier as MembershipTier}
            size="xl"
          />
        </div>

        {/* Info block */}
        <div className="min-w-0 flex-1">
          {/* Tier Badge */}
          <span
            className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tierConfig.badgeStyle}`}
          >
            <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {isAr ? tierConfig.labelAr : tierConfig.labelEn}
          </span>

          {/* Name */}
          <h1 className="text-2xl leading-tight font-extrabold text-white sm:text-3xl">
            {displayName}
          </h1>

          {/* Professional title */}
          {displayTitle && (
            <p className="mt-1.5 text-base leading-relaxed font-medium text-slate-300">
              {displayTitle}
            </p>
          )}

          {/* Meta row: Location + Years */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {profile.city ? `${profile.city}, ` : ""}
              {profile.country}
            </span>

            {yearsLabel && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                {yearsLabel}
              </span>
            )}

            <span className="flex items-center gap-1.5 text-emerald-400">
              <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
              {isAr ? "ملف مكتمل ١٠٠٪" : "100% profile verified"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
