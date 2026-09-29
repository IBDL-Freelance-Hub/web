import React from "react";
import { getInitials } from "@/lib/utils";
import { ProfileProvider } from "./ProfileContext";
import { ProfileIdentityCard } from "./ProfileIdentityCard";
import { ProfilePersonalCard } from "./ProfilePersonalCard";
import { ProfileProfessionalCard } from "./ProfileProfessionalCard";
import { ProfileBioCard } from "./ProfileBioCard";
import { ProfileDocumentsCard } from "./ProfileDocumentsCard";
import { ProfileDirectoryCard } from "./ProfileDirectoryCard";
import { AssessmentCredentialsCard } from "./AssessmentCredentialsCard";
import type { MemberDto, MembershipDto } from "@/types/api";
import type { MemberProfileFileDto } from "@/types/member";

export interface ProfileViewProps {
  user: {
    id: string;
    email: string;
    status: string;
  };
  member: MemberDto & {
    assessmentCredentials?: {
      name?: string;
      portalUrl?: string;
      username?: string;
      password?: string;
      status?: string;
      note?: string;
    } | null;
  };
  membership: MembershipDto | null;
  completionRate: number;
  initialCvFile?: MemberProfileFileDto | null;
}

export function ProfileView({
  user,
  member,
  membership,
  completionRate,
  initialCvFile,
}: ProfileViewProps) {
  // PRO-34 (v5.0): Active membership of ANY tier + 100% profile completion
  const isMembershipActive = membership?.status === "ACTIVE";
  const isProfileComplete = completionRate >= 100;
  const meetsDirectoryRequirements = isMembershipActive && isProfileComplete;
  const isPublishedInDirectory =
    Boolean(member.directoryOptIn) && meetsDirectoryRequirements;

  const initials = getInitials(member.fullNameEn);

  return (
    <ProfileProvider
      user={user}
      member={member}
      membership={membership}
      completionRate={completionRate}
      initialCvFile={initialCvFile}
    >
      <div className="space-y-8">
        {/* 1. Identity Header Card (SCR-63) */}
        <ProfileIdentityCard
          member={member}
          membership={membership}
          isPublishedInDirectory={isPublishedInDirectory}
          initials={initials}
        />

        {/* 2. PROMINENT Assessment Credentials Section (QA Issue #6) */}
        <AssessmentCredentialsCard
          credentials={member.assessmentCredentials}
          userStatus={user.status}
        />

        {/* 2-Column Details Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 3. Personal Details Card (SCR-63 / PRO-04) */}
          <ProfilePersonalCard user={user} member={member} />

          {/* 4. Professional Practice Card (SCR-63) */}
          <ProfileProfessionalCard member={member} />

          {/* 5. Biography Card (SCR-63) */}
          <ProfileBioCard member={member} />

          {/* 6. Documents Card (SCR-63 / PRO-52) */}
          <ProfileDocumentsCard member={member} initialCvFile={initialCvFile} />

          {/* 7. Trainer Directory Opt-In Panel (PRO-34 & PRO-35) */}
          <div className="lg:col-span-2">
            <ProfileDirectoryCard
              member={member}
              membership={membership}
              completionRate={completionRate}
              meetsDirectoryRequirements={meetsDirectoryRequirements}
              isPublishedInDirectory={isPublishedInDirectory}
            />
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
