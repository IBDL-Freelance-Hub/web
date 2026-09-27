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
      className="rounded-2xl border border-white/10 bg-[#16162c]/80 p-6 backdrop-blur-sm sm:p-7"
      aria-labelledby="bio-heading"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          <FileText className="h-4 w-4 text-slate-300" aria-hidden="true" />
        </div>
        <h2
          id="bio-heading"
          className="text-sm font-extrabold tracking-[0.12em] text-slate-400 uppercase"
        >
          {isAr ? "نبذة مهنية" : "Professional Summary"}
        </h2>
      </div>

      <p
        className="text-sm leading-[1.85] text-slate-300 sm:text-base"
        dir={isAr ? "rtl" : "ltr"}
      >
        {bio}
      </p>
    </section>
  );
}
