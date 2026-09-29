import React from "react";
import { Globe } from "lucide-react";
import type { PublicTrainerProfile } from "@/types/directory";

export interface PublicProfileLanguagesProps {
  profile: Pick<PublicTrainerProfile, "languages">;
  locale?: "en" | "ar";
}

const LANGUAGE_FLAGS: Record<string, string> = {
  Arabic: "🇦🇪",
  English: "🇬🇧",
  French: "🇫🇷",
  German: "🇩🇪",
  Spanish: "🇪🇸",
  Turkish: "🇹🇷",
};

export function PublicProfileLanguages({
  profile,
  locale = "en",
}: PublicProfileLanguagesProps) {
  const isAr = locale === "ar";

  if (!profile.languages || profile.languages.length === 0) return null;

  return (
    <section
      className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs"
      aria-labelledby="languages-heading"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1d1d39]/10 text-[#1d1d39]">
          <Globe className="h-4 w-4" aria-hidden="true" />
        </div>
        <h2
          id="languages-heading"
          className="text-xs font-bold tracking-wider text-slate-500 uppercase"
        >
          {isAr ? "لغات التدريب" : "Training Languages"}
        </h2>
      </div>

      <div
        className="flex flex-wrap gap-2"
        aria-label={isAr ? "اللغات" : "Languages"}
      >
        {profile.languages.map((language) => (
          <span
            key={language}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
          >
            <span aria-hidden="true">{LANGUAGE_FLAGS[language] || "🌐"}</span>
            {language}
          </span>
        ))}
      </div>
    </section>
  );
}
