import React from "react";
import Link from "next/link";
import { MapPin, Clock, CheckCircle } from "lucide-react";
import { TrainerAvatar } from "./TrainerAvatar";
import { DIRECTORY_TIER_CONFIG } from "@/constants/directory";
import type { PublicTrainerListItem } from "@/types/directory";
import type { MembershipTier } from "@/types/member";

export interface TrainerCardProps {
  trainer: PublicTrainerListItem;
  locale?: "en" | "ar";
}

export function TrainerCard({ trainer, locale = "en" }: TrainerCardProps) {
  const isAr = locale === "ar";
  const tierConfig =
    DIRECTORY_TIER_CONFIG[trainer.tier as MembershipTier] ||
    DIRECTORY_TIER_CONFIG["ESSENTIAL"];

  const displayName =
    isAr && trainer.fullNameAr
      ? trainer.fullNameAr
      : trainer.fullNameEn ||
        `${trainer.firstName}${trainer.lastName ? ` ${trainer.lastName}` : ""}`;

  const displayTitle =
    isAr && trainer.titleAr ? trainer.titleAr : trainer.titleEn;
  const displayBio = isAr && trainer.bioAr ? trainer.bioAr : trainer.bioEn;

  const profileHref = `/directory/${trainer.id}`;

  const yearsLabel = trainer.yearsOfExperience
    ? isAr
      ? `${trainer.yearsOfExperience} سنوات خبرة`
      : `${trainer.yearsOfExperience} yrs exp.`
    : null;

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#16162c]/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-2xl motion-reduce:hover:transform-none"
      aria-label={displayName}
    >
      {/* Subtle glow accent based on tier */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          trainer.tier === "MASTER"
            ? "bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.05),transparent_60%)]"
            : trainer.tier === "PROFESSIONAL"
              ? "bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.05),transparent_60%)]"
              : "bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.04),transparent_60%)]"
        }`}
        aria-hidden="true"
      />

      <div className="relative p-6">
        {/* Header: Avatar + Tier Badge */}
        <div className="flex items-start justify-between gap-3">
          <TrainerAvatar
            name={displayName}
            photoUrl={trainer.photoUrl}
            tier={trainer.tier as MembershipTier}
            size="md"
          />

          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tierConfig.badgeStyle}`}
            >
              {trainer.tier !== "ESSENTIAL" && (
                <CheckCircle className="h-3 w-3" aria-hidden="true" />
              )}
              {isAr ? tierConfig.labelAr : tierConfig.labelEn}
            </span>
          </div>
        </div>

        {/* Name & Headline */}
        <div className="mt-4">
          <h2 className="text-base leading-snug font-bold text-white">
            {displayName}
          </h2>
          {displayTitle && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
              {displayTitle}
            </p>
          )}
        </div>

        {/* Location + Experience */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>
              {trainer.city ? `${trainer.city}, ` : ""}
              {trainer.country}
            </span>
          </span>
          {yearsLabel && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span>{yearsLabel}</span>
            </span>
          )}
        </div>

        {/* Bio Snippet */}
        {displayBio && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-400">
            {displayBio}
          </p>
        )}

        {/* Expertise Tags */}
        {trainer.areasOfExpertise && trainer.areasOfExpertise.length > 0 && (
          <div
            className="mt-4 flex flex-wrap gap-1.5"
            aria-label={isAr ? "مجالات الخبرة" : "Areas of expertise"}
          >
            {trainer.areasOfExpertise.slice(0, 3).map((expertise) => (
              <span
                key={expertise}
                className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${tierConfig.tagStyle}`}
              >
                {expertise}
              </span>
            ))}
            {trainer.areasOfExpertise.length > 3 && (
              <span className="inline-block rounded-full border border-white/10 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                +{trainer.areasOfExpertise.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Languages */}
        {trainer.languages && trainer.languages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {trainer.languages.slice(0, 3).map((lang) => (
              <span
                key={lang}
                className="text-[10px] font-medium text-slate-500"
              >
                {lang}
                {trainer.languages.indexOf(lang) <
                Math.min(trainer.languages.length, 3) - 1
                  ? " ·"
                  : ""}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-white/10 p-5 pt-0 pb-5">
        <Link
          href={profileHref}
          className="group/btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
          aria-label={
            isAr
              ? `عرض ملف ${displayName} الشخصي`
              : `View ${displayName}'s profile`
          }
        >
          {isAr ? "عرض الملف الشخصي" : "View Profile"}
          <span
            className="translate-x-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
