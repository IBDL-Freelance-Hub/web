import React from "react";
import { FileText } from "lucide-react";
import type { PublicTrainerProfile } from "@/types/directory";

export interface PublicProfileBioProps {
  profile: Pick<PublicTrainerProfile, "bioEn" | "bioAr">;
  locale?: "en" | "ar";
}

export function PublicProfileBio({
  profile,
  locale = "en",
}: PublicProfileBioProps) {
  const isAr = locale === "ar";
  const bio = isAr && profile.bioAr ? profile.bioAr : profile.bioEn;

  if (!bio) return null;

  return (
    <section
      className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7"
      aria-labelledby="bio-heading"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1d1d39]/10 text-[#1d1d39]">
          <FileText className="h-4 w-4" aria-hidden="true" />
        </div>
        <h2
          id="bio-heading"
          className="text-xs font-bold tracking-wider text-slate-500 uppercase"
        >
          {isAr ? "نبذة مهنية" : "Professional Summary"}
        </h2>
      </div>

      <p
        className="text-sm leading-relaxed text-slate-700"
        dir={isAr ? "rtl" : "ltr"}
      >
        {bio}
      </p>
    </section>
  );
}
