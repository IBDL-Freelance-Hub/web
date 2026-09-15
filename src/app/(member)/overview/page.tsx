import React from "react";
import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/auth";
import { calculateProfileCompletion } from "@/lib/profile-completion";
import { MemberDashboard } from "@/components/dashboard/MemberDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — IBDL Freelancers Hub",
  description:
    "Trainer workspace overview, membership credentials, and operational metrics.",
};

export default async function OverviewPage() {
  const data = await getCurrentMember();

  if (!data || !data.member) {
    redirect("/login?callbackUrl=/overview");
  }

  const { user, member, membership } = data;

  // Single centralized 11-field profile completion calculation (PRO-13 / PRO-13d)
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
    cvUrl: "cv-document-on-record",
  });

  return (
    <MemberDashboard
      user={user}
      member={member}
      membership={membership}
      completionRate={completionResult.rate}
      completedCount={completionResult.completedFields.length}
    />
  );
}
