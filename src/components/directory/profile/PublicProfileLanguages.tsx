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
      className="rounded-2xl border border-white/10 bg-[#16162c]/80 p-6 backdrop-blur-sm sm:p-7"
      aria-labelledby="languages-heading"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          <Globe className="h-4 w-4 text-slate-300" aria-hidden="true" />
        </div>
        <h2
          id="languages-heading"
          className="text-sm font-extrabold tracking-[0.12em] text-slate-400 uppercase"
        >
          {isAr ? "لغات التدريب" : "Training Languages"}
        </h2>
      </div>

      <div
        className="flex flex-wrap gap-2.5"
        aria-label={isAr ? "اللغات" : "Languages"}
      >
        {profile.languages.map((language) => (
          <span
            key={language}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-200"
          >
            <span aria-hidden="true">{LANGUAGE_FLAGS[language] || "🌐"}</span>
            {language}
          </span>
        ))}
      </div>
    </section>
  );
}
