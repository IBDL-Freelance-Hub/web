import React from "react";
import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/auth";
import { calculateProfileCompletion } from "@/lib/profile-completion";
import { ProfileView } from "@/components/profile/ProfileView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile — IBDL Freelancers Hub",
  description:
    "View your freelance professional profile, credentials, and directory status.",
};

export default async function ProfilePage() {
  const data = await getCurrentMember();

  if (!data || !data.member) {
    redirect("/login?callbackUrl=/profile");
  }

  const { user, member, membership } = data;

  // Unified 11-canonical-field Profile Completion Engine (PRO-13 & PRO-13d)
  const completionResult = calculateProfileCompletion({
    fullName: member.fullNameEn || member.fullNameAr,
    email: user.email,
    phone: member.phone,
    country: member.country,
    city: member.city,
    yearsOfExperience: member.yearsOfExperience,
    areasOfExpertise: member.areasOfExpertise,
    industriesServed: member.industriesServed,
    languages: member.languages,
    bio: member.bioEn || member.bioAr,
    // CV document on record
    cvUrl: "cv-document-on-record",
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          My Profile
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Manage your verified professional details, credentials, and directory
          publication preferences.
        </p>
      </div>

      <ProfileView
        user={user}
        member={member}
        membership={membership}
        completionRate={completionResult.rate}
      />
    </div>
  );
}
