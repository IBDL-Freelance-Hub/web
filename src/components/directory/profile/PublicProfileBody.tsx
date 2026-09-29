import React from "react";
import { User } from "lucide-react";
import type { PublicTrainerProfile } from "@/types/directory";

export interface PublicProfileBodyProps {
  profile: PublicTrainerProfile;
  locale?: "en" | "ar";
}

export function PublicProfileBody({
  profile,
  locale = "en",
}: PublicProfileBodyProps) {
  const isAr = locale === "ar";
  const bio = isAr && profile.bioAr ? profile.bioAr : profile.bioEn;

  const hasExpertise =
    profile.areasOfExpertise && profile.areasOfExpertise.length > 0;
  const hasIndustries =
    profile.industriesServed && profile.industriesServed.length > 0;
  const hasLanguages = profile.languages && profile.languages.length > 0;

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-label={isAr ? "ملف الدليل" : "Directory profile"}
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-2">
        <User className="h-4 w-4 text-slate-400" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-slate-800">
          {isAr ? "ملف الدليل" : "Directory profile"}
        </h2>
      </div>

      {/* Bio */}
      {bio && (
        <p className="mb-6 text-sm leading-relaxed text-slate-700">{bio}</p>
      )}

      {/* Areas of Expertise */}
      {hasExpertise && (
        <div className="mb-5">
          <h3 className="mb-2.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {isAr ? "مجالات الخبرة" : "Areas of expertise"}
          </h3>
          <div
            className="flex flex-wrap gap-2"
            aria-label={isAr ? "مجالات الخبرة" : "Areas of expertise"}
          >
            {profile.areasOfExpertise.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Industries */}
      {hasIndustries && (
        <div className="mb-5">
          <h3 className="mb-2.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {isAr ? "القطاعات" : "Industries"}
          </h3>
          <div
            className="flex flex-wrap gap-2"
            aria-label={isAr ? "القطاعات" : "Industries"}
          >
            {profile.industriesServed.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {hasLanguages && (
        <div>
          <h3 className="mb-2.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {isAr ? "اللغات" : "Languages"}
          </h3>
          <p className="text-sm text-slate-700">
            {profile.languages.join(", ")}
          </p>
        </div>
      )}
    </section>
  );
}
