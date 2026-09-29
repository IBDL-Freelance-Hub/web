import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { TrainerAvatar } from "./TrainerAvatar";
import type { PublicTrainerListItem } from "@/types/directory";
import type { MembershipTier } from "@/types/member";

export interface TrainerCardProps {
  trainer: PublicTrainerListItem;
  /** Mark as the current viewer's own listing — adds the orange "YOUR LISTING" tag */
  isOwnListing?: boolean;
  locale?: "en" | "ar";
}

/** Converts raw yearsOfExperience to a readable band label. */
function toExperienceBand(
  years: string | number | null | undefined
): string | null {
  if (!years) return null;
  const str = String(years).trim();

  // Already a band string like "6-10" or ">15"
  if (str.startsWith(">") || str.toLowerCase().startsWith("more")) {
    return "More than 15 years experience";
  }
  if (str.startsWith("<") || str.toLowerCase().startsWith("less")) {
    return "Less than 2 years experience";
  }
  const rangeMatch = str.match(/^(\d+)\s*[-–]\s*(\d+)$/);
  if (rangeMatch) {
    return `${rangeMatch[1]} – ${rangeMatch[2]} years experience`;
  }

  // Numeric value fallback
  const n = parseFloat(str);
  if (isNaN(n)) return str;
  if (n < 2) return "Less than 2 years experience";
  if (n <= 5) return "2 – 5 years experience";
  if (n <= 10) return "6 – 10 years experience";
  if (n <= 15) return "11 – 15 years experience";
  return "More than 15 years experience";
}

export function TrainerCard({
  trainer,
  isOwnListing = false,
  locale = "en",
}: TrainerCardProps) {
  const isAr = locale === "ar";

  const displayName =
    isAr && trainer.fullNameAr
      ? trainer.fullNameAr
      : trainer.fullNameEn ||
        `${trainer.firstName}${trainer.lastName ? ` ${trainer.lastName}` : ""}`;

  const displayBio = isAr && trainer.bioAr ? trainer.bioAr : trainer.bioEn;
  const experienceBand = toExperienceBand(trainer.yearsOfExperience);
  const isCertified = trainer.ibdlCertified === true;
  const profileHref = `/directory/${trainer.id}`;

  return (
    <article
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
      aria-label={displayName}
    >
      {/* ── Row 1: Avatar  +  Name / YOUR LISTING / Location ── */}
      <div className="flex items-start gap-3">
        <TrainerAvatar
          name={displayName}
          photoUrl={trainer.photoUrl}
          tier={trainer.tier as MembershipTier}
          size="md"
        />

        <div className="min-w-0 flex-1 pt-0.5">
          {/* Name */}
          <p className="truncate text-sm leading-snug font-bold text-slate-900">
            {displayName}
          </p>

          {/* YOUR LISTING tag — orange, only on the viewer's own card */}
          {isOwnListing && (
            <p className="text-[10px] font-bold tracking-wider text-orange-500 uppercase">
              {isAr ? "إعلانك" : "YOUR LISTING"}
            </p>
          )}

          {/* Location */}
          {(trainer.city || trainer.country) && (
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {trainer.city ? `${trainer.city}, ` : ""}
                {trainer.country}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* ── Row 2: Experience Band pill ── */}
      {experienceBand && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
            aria-hidden="true"
          />
          {isAr ? `${trainer.yearsOfExperience} سنوات خبرة` : experienceBand}
        </span>
      )}

      {/* ── Row 3: Certified IBDL Trainer badge ── */}
      {isCertified && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          {isAr ? "مدرب IBDL معتمد" : "Certified IBDL Trainer"}
        </span>
      )}

      {/* ── Row 4: Bio — blue-tinted text matching the screenshot ── */}
      {displayBio && (
        <p className="line-clamp-4 text-xs leading-relaxed text-slate-600">
          {displayBio}
        </p>
      )}

      {/* ── Row 5: Expertise chips ── */}
      {trainer.areasOfExpertise && trainer.areasOfExpertise.length > 0 && (
        <div
          className="flex flex-wrap gap-1.5"
          aria-label={isAr ? "مجالات الخبرة" : "Areas of expertise"}
        >
          {trainer.areasOfExpertise.slice(0, 3).map((expertise) => (
            <span
              key={expertise}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700"
            >
              {expertise}
            </span>
          ))}
          {trainer.areasOfExpertise.length > 3 && (
            <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-400">
              +{trainer.areasOfExpertise.length - 3}
            </span>
          )}
        </div>
      )}

      {/* ── Separator + View profile link ── */}
      <div className="mt-auto border-t border-slate-100 pt-3">
        <Link
          href={profileHref}
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 transition-colors hover:text-[#1d1d39]"
          aria-label={
            isAr
              ? `عرض الملف التعريفي لـ ${displayName}`
              : `View profile for ${displayName}`
          }
        >
          {isAr ? "عرض الملف التعريفي" : "View profile"}
          <span aria-hidden="true" className="rtl:rotate-180">
            ›
          </span>
        </Link>
      </div>
    </article>
  );
}
