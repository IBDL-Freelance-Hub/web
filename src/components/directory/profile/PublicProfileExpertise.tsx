import React from "react";
import { Layers, Building2 } from "lucide-react";
import type { PublicTrainerProfile } from "@/types/directory";

export interface PublicProfileExpertiseProps {
  profile: Pick<PublicTrainerProfile, "areasOfExpertise" | "industriesServed">;
  locale?: "en" | "ar";
}

export function PublicProfileExpertise({
  profile,
  locale = "en",
}: PublicProfileExpertiseProps) {
  const isAr = locale === "ar";

  const hasExpertise =
    profile.areasOfExpertise && profile.areasOfExpertise.length > 0;
  const hasIndustries =
    profile.industriesServed && profile.industriesServed.length > 0;

  if (!hasExpertise && !hasIndustries) return null;

  return (
    <section
      className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7"
      aria-labelledby="expertise-heading"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1d1d39]/10 text-[#1d1d39]">
          <Layers className="h-4 w-4" aria-hidden="true" />
        </div>
        <h2
          id="expertise-heading"
          className="text-xs font-bold tracking-wider text-slate-500 uppercase"
        >
          {isAr ? "التخصصات والقطاعات" : "Expertise & Industries"}
        </h2>
      </div>

      {/* Areas of Expertise */}
      {hasExpertise && (
        <div className="mb-5">
          <h3 className="mb-2.5 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {isAr ? "مجالات الخبرة التدريبية" : "Training Disciplines"}
          </h3>
          <div
            className="flex flex-wrap gap-2"
            aria-label={isAr ? "مجالات الخبرة" : "Areas of expertise"}
          >
            {profile.areasOfExpertise.map((expertise) => (
              <span
                key={expertise}
                className="inline-block rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {expertise}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Industries Served */}
      {hasIndustries && (
        <div>
          <h3 className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
            {isAr ? "القطاعات المخدومة" : "Industries Served"}
          </h3>
          <div
            className="flex flex-wrap gap-2"
            aria-label={isAr ? "القطاعات" : "Industries"}
          >
            {profile.industriesServed.map((industry) => (
              <span
                key={industry}
                className="inline-block rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
