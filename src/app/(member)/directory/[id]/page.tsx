import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { getPublicTrainer } from "@/actions/directoryActions";
import { getCurrentMember } from "@/lib/auth";
import { PublicProfileHeader } from "@/components/directory/profile/PublicProfileHeader";
import { PublicProfileBody } from "@/components/directory/profile/PublicProfileBody";
import { PublicProfileSidebar } from "@/components/directory/profile/PublicProfileSidebar";
import { validateUuid } from "@/lib/security";
import { buildTrainerMetadata } from "@/lib/metadata/trainerProfileMetadata";

interface TrainerDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: TrainerDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  if (!validateUuid(id))
    return {
      title: "Trainer Not Found — IBDL Freelancers Hub",
      robots: { index: false, follow: false },
    };
  const profile = await getPublicTrainer(id);
  if (!profile)
    return {
      title: "Trainer Not Found — IBDL Freelancers Hub",
      robots: { index: false, follow: false },
    };
  return {
    ...buildTrainerMetadata(profile),
    robots: { index: false, follow: false },
  };
}

export default async function MemberTrainerDetailPage({
  params,
}: TrainerDetailPageProps) {
  const { id } = await params;

  if (!validateUuid(id)) notFound();

  const [profile, memberData] = await Promise.all([
    getPublicTrainer(id),
    getCurrentMember(),
  ]);

  if (!profile || profile.directoryOptIn === false) notFound();

  // Determine if the viewer is looking at their own listing
  const isOwnListing = memberData?.user?.id === id;

  return (
    <div className="space-y-5">
      {/* ← Trainer Directory back link */}
      <Link
        href="/directory"
        className="inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-800"
        aria-label="Back to Trainer Directory"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span>Trainer Directory</span>
      </Link>

      {/* Header card: avatar + name + location + pills */}
      <PublicProfileHeader profile={profile} isOwnListing={isOwnListing} />

      {/* Two-column body */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left (wider): Directory profile card */}
        <div className="lg:col-span-2">
          <PublicProfileBody profile={profile} />
        </div>

        {/* Right (narrower): Privacy + LinkedIn + notices */}
        <div className="lg:col-span-1">
          <PublicProfileSidebar profile={profile} />
        </div>
      </div>
    </div>
  );
}
