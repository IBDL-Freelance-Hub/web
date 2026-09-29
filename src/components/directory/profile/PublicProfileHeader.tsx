import React from "react";
import { MapPin } from "lucide-react";
import { TrainerAvatar } from "@/components/directory/TrainerAvatar";
import type { PublicTrainerProfile } from "@/types/directory";
import type { MembershipTier } from "@/types/member";

export interface PublicProfileHeaderProps {
  profile: PublicTrainerProfile;
  isOwnListing?: boolean;
  locale?: "en" | "ar";
}

function toExperienceBand(years: string | null | undefined): string | null {
  if (!years) return null;
  const str = years.trim();
  if (str.startsWith(">") || str.toLowerCase().startsWith("more"))
    return "More than 15 years experience";
  if (str.startsWith("<") || str.toLowerCase().startsWith("less"))
    return "Less than 2 years experience";
  const rangeMatch = str.match(/^(\d+)\s*[-–]\s*(\d+)$/);
  if (rangeMatch) return `${rangeMatch[1]} – ${rangeMatch[2]} years experience`;
  const n = parseFloat(str);
  if (isNaN(n)) return str;
  if (n < 2) return "Less than 2 years experience";
  if (n <= 5) return "2 – 5 years experience";
  if (n <= 10) return "6 – 10 years experience";
  if (n <= 15) return "11 – 15 years experience";
  return "More than 15 years experience";
}

export function PublicProfileHeader({
  profile,
  isOwnListing = false,
  locale = "en",
}: PublicProfileHeaderProps) {
  const isAr = locale === "ar";

  const displayName =
    isAr && profile.fullNameAr
      ? profile.fullNameAr
      : profile.fullNameEn ||
        `${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ""}`;

  const experienceBand = toExperienceBand(profile.yearsOfExperience);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-5">
        {/* Large rounded-square avatar */}
        <div className="shrink-0">
          <TrainerAvatar
            name={displayName}
            photoUrl={profile.photoUrl}
            tier={profile.tier as MembershipTier}
            size="xl"
          />
        </div>

        {/* Right: Name + Location + Pills */}
        <div className="min-w-0 flex-1 pt-1">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            {displayName}
          </h1>

          {/* Location — blue tinted text matching the screenshot */}
          {(profile.city || profile.country) && (
            <p className="mt-1 flex items-center gap-1 text-sm text-blue-600">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                {isAr ? "مقيم في " : "Based in "}
                {profile.city ? `${profile.city}, ` : ""}
                {profile.country}
              </span>
            </p>
          )}

          {/* Pills row: experience + "Your listing" */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {experienceBand && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                  aria-hidden="true"
                />
                {isAr
                  ? `${profile.yearsOfExperience} سنوات خبرة`
                  : experienceBand}
              </span>
            )}

            {isOwnListing && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                  aria-hidden="true"
                />
                {isAr ? "إعلانك" : "Your listing"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
