import type { Metadata } from "next";
import type { PublicTrainerProfile } from "@/types/directory";

export function buildTrainerMetadata(
  profile: PublicTrainerProfile | null
): Metadata {
  if (!profile) {
    return {
      title: "Trainer Not Found — IBDL Freelancers Hub",
    };
  }

  const displayName =
    profile.fullNameEn ||
    `${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ""}`;

  const displayTitle = profile.titleEn || "";
  const description = profile.bioEn
    ? profile.bioEn.slice(0, 155) + (profile.bioEn.length > 155 ? "…" : "")
    : `${displayName} is a verified IBDL-certified trainer based in ${profile.country}.`;

  return {
    title: `${displayName} — IBDL Trainer Directory`,
    description,
    openGraph: {
      title: `${displayName}${displayTitle ? ` — ${displayTitle}` : ""}`,
      description,
      type: "profile",
      siteName: "IBDL Freelancers Hub",
      ...(profile.photoUrl && { images: [{ url: profile.photoUrl }] }),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
