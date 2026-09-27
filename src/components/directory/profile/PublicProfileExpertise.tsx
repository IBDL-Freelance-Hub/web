import React from "react";
import { Layers, Building2 } from "lucide-react";
import { DIRECTORY_TIER_CONFIG } from "@/constants/directory";
import type { PublicTrainerProfile } from "@/types/directory";
import type { MembershipTier } from "@/types/member";

export interface PublicProfileExpertiseProps {
  profile: Pick<
    PublicTrainerProfile,
    "areasOfExpertise" | "industriesServed" | "tier"
  >;
  locale?: "en" | "ar";
}

export function PublicProfileExpertise({
  profile,
  locale = "en",
}: PublicProfileExpertiseProps) {
  const isAr = locale === "ar";
  const tierConfig =
    DIRECTORY_TIER_CONFIG[profile.tier as MembershipTier] ||
    DIRECTORY_TIER_CONFIG["ESSENTIAL"];

  const hasExpertise =
    profile.areasOfExpertise && profile.areasOfExpertise.length > 0;
  const hasIndustries =
    profile.industriesServed && profile.industriesServed.length > 0;

  if (!hasExpertise && !hasIndustries) return null;

  return (
    <section
      className="rounded-2xl border border-white/10 bg-[#16162c]/80 p-6 backdrop-blur-sm sm:p-7"
      aria-labelledby="expertise-heading"
    >
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          <Layers className="h-4 w-4 text-slate-300" aria-hidden="true" />
        </div>
        <h2
          id="expertise-heading"
          className="text-sm font-extrabold tracking-[0.12em] text-slate-400 uppercase"
        >
          {isAr ? "التخصصات والقطاعات" : "Expertise & Industries"}
        </h2>
      </div>

      {/* Areas of Expertise */}
      {hasExpertise && (
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            {isAr ? "مجالات الخبرة التدريبية" : "Training Disciplines"}
          </h3>
          <div
            className="flex flex-wrap gap-2"
            aria-label={isAr ? "مجالات الخبرة" : "Areas of expertise"}
          >
            {profile.areasOfExpertise.map((expertise) => (
              <span
                key={expertise}
                className={`inline-block rounded-full border px-3 py-1 text-sm font-medium ${tierConfig.tagStyle}`}
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
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase">
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
                className="inline-block rounded-full border border-slate-600/40 bg-slate-700/20 px-3 py-1 text-sm font-medium text-slate-300"
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
