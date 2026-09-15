"use client";

import React from "react";
import { getInitials } from "@/lib/utils";
import { ProfileIdentityCard } from "./ProfileIdentityCard";
import { ProfilePersonalCard } from "./ProfilePersonalCard";
import { ProfileProfessionalCard } from "./ProfileProfessionalCard";
import { ProfileBioCard } from "./ProfileBioCard";
import { ProfileDocumentsCard } from "./ProfileDocumentsCard";
import { ProfileDirectoryCard } from "./ProfileDirectoryCard";
import type { MemberDto, MembershipDto } from "@/types/api";

export interface ProfileViewProps {
  user: {
    id: string;
    email: string;
    status: string;
  };
  member: MemberDto;
  membership: MembershipDto | null;
  completionRate: number;
}

export function ProfileView({
  user,
  member,
  membership,
  completionRate,
}: ProfileViewProps) {
  // PRO-34: 3-condition directory publication verification
  const isPaidMembership =
    membership?.status === "ACTIVE" &&
    (membership?.tier?.toUpperCase() === "PROFESSIONAL" ||
      membership?.tier?.toUpperCase() === "MASTER");
  const isProfileComplete = completionRate >= 100;
  const meetsDirectoryRequirements = isPaidMembership && isProfileComplete;
  const isPublishedInDirectory =
    Boolean(member.directoryOptIn) && meetsDirectoryRequirements;

  const initials = getInitials(member.fullNameEn);

  return (
    <div className="space-y-8">
      {/* 1. Identity Header Card (SCR-63) */}
      <ProfileIdentityCard
        member={member}
        membership={membership}
        isPublishedInDirectory={isPublishedInDirectory}
        initials={initials}
      />

      {/* 2-Column Details Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 2. Personal Details Card (SCR-63 / PRO-04) */}
        <ProfilePersonalCard user={user} member={member} />

        {/* 3. Professional Practice Card (SCR-63) */}
        <ProfileProfessionalCard member={member} />

        {/* 4. Biography Card (SCR-63) */}
        <ProfileBioCard member={member} />

        {/* 5. Documents Card (SCR-63 / PRO-52) */}
        <ProfileDocumentsCard member={member} />

        {/* 6. Trainer Directory Opt-In Panel (PRO-34 & PRO-35) */}
        <ProfileDirectoryCard
          member={member}
          membership={membership}
          completionRate={completionRate}
          meetsDirectoryRequirements={meetsDirectoryRequirements}
          isPublishedInDirectory={isPublishedInDirectory}
        />
      </div>
    </div>
  );
}
