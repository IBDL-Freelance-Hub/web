import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { validateUuid } from "@/lib/security";
import { getPublicTrainer } from "@/actions/directoryActions";
import { PublicProfileHeader } from "@/components/directory/profile/PublicProfileHeader";
import { PublicProfileBio } from "@/components/directory/profile/PublicProfileBio";
import { PublicProfileExpertise } from "@/components/directory/profile/PublicProfileExpertise";
import { PublicProfileLanguages } from "@/components/directory/profile/PublicProfileLanguages";
import { PublicProfileContactCTA } from "@/components/directory/profile/PublicProfileContactCTA";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { buildTrainerMetadata } from "@/lib/metadata/trainerProfileMetadata";

interface TrainerProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: TrainerProfilePageProps): Promise<Metadata> {
  const { id } = await params;

  if (!validateUuid(id)) {
    return buildTrainerMetadata(null);
  }

  const profile = await getPublicTrainer(id);
  return buildTrainerMetadata(profile);
}

export default async function TrainerProfilePage({
  params,
}: TrainerProfilePageProps) {
  const { id } = await params;

  // Zero-Trust: reject non-UUID v4 tokens immediately
  if (!validateUuid(id)) {
    notFound();
  }

  const profile = await getPublicTrainer(id);

  if (!profile || !profile.directoryOptIn) {
    notFound();
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#1D1D39] pt-24 pb-24"
      aria-label={`Trainer profile: ${profile.fullNameEn || profile.firstName}`}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back to directory */}
        <div className="mb-6">
          <Link
            href="/directory"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
            aria-label="Back to trainer directory"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Directory
          </Link>
        </div>

        <div className="space-y-5">
          {/* Hero Header Card */}
          <PublicProfileHeader profile={profile} />

          {/* Contact CTA — above the fold on mobile */}
          <section
            className="rounded-2xl border border-white/10 bg-[#16162c]/80 p-6 backdrop-blur-sm"
            aria-labelledby="contact-heading"
          >
            <h2
              id="contact-heading"
              className="mb-4 text-sm font-extrabold tracking-[0.12em] text-slate-400 uppercase"
            >
              Contact this Trainer
            </h2>
            <PublicProfileContactCTA profile={profile} />
          </section>

          {/* Bio */}
          <PublicProfileBio profile={profile} />

          {/* Expertise & Industries */}
          <PublicProfileExpertise profile={profile} />

          {/* Languages */}
          <PublicProfileLanguages profile={profile} />
        </div>
      </div>
    </main>
  );
}
