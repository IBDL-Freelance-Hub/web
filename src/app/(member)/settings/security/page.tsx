import React from "react";
import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/auth";
import { listSessionsAction } from "@/actions/authActions";
import { ActiveSessionsCard } from "@/components/dashboard/ActiveSessionsCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Sessions — IBDL Freelancers Hub",
  description: "Manage your active account sessions and security credentials.",
};

export default async function SecuritySettingsPage() {
  const [memberData, sessionsResponse] = await Promise.all([
    getCurrentMember(),
    listSessionsAction(),
  ]);

  if (!memberData || !memberData.member) {
    redirect("/login?callbackUrl=/settings/security");
  }

  const initialSessions = sessionsResponse.success ? sessionsResponse.data : [];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Security & Active Sessions
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Monitor your logged-in devices and terminate unauthorized or outdated
          sessions.
        </p>
      </div>

      <div className="max-w-4xl">
        <ActiveSessionsCard initialSessions={initialSessions} />
      </div>
    </div>
  );
}
