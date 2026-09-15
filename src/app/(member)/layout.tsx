import React from "react";
import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/auth";
import { MemberShell } from "@/components/layout/MemberShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Workspace — IBDL Freelancers Hub",
  description:
    "Official workspace and profile management for accredited freelance professionals.",
};

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const memberData = await getCurrentMember();

  if (!memberData || !memberData.member) {
    redirect("/login?callbackUrl=/overview");
  }

  return (
    <MemberShell member={memberData.member} membership={memberData.membership}>
      {children}
    </MemberShell>
  );
}
