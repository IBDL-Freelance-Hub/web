"use client";

/**
 * ============================================================================
 * PLACEHOLDER AUDIT NOTICE (Section 16: DSH-01 to DSH-14 / Sprint Planning):
 *
 * The following Dashboard sections are PLACEHOLDER-ONLY pending future sprint models:
 * 1. Statistics Tiles ("Open requests", "Active tools", "Certificates", "Transactions"):
 *    - Rendered with static "—" values and dev badges: "Pending Requests/Activity/Certificate models (Sprint 2/3)".
 *    - No fabricated or mock metrics are displayed.
 * 2. Recent Activity Card:
 *    - Renders empty state per ACT-49: "Nothing has happened on your account yet."
 * 3. Priority Actions Grid:
 *    - Rendered dynamically according to real membership tier per DSH-18. Unbuilt target
 *      routes are marked disabled/coming soon per SCR-27 rather than linking to 404s.
 *
 * REAL DATA WIRED TO BACKEND (GET /api/v1/auth/me):
 * 1. Identity strip (Avatar, Welcome back greeting, Member name, Tier badge)
 * 2. Membership record card (Tier name, Active status pill, start and expiry dates per DSH-08/DSH-09)
 * 3. Unified Profile Completion Engine (11 canonical fields via src/lib/profile-completion.ts)
 * ============================================================================
 */

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import type { MemberDto, MembershipDto } from "@/types/api";

import { DashboardHeader } from "./DashboardHeader";
import { MembershipTierCard } from "./MembershipTierCard";
import { CompletionGaugeCard } from "./CompletionGaugeCard";
import { StatTilesGrid } from "./StatTilesGrid";
import { PriorityActionsCard } from "./PriorityActionsCard";
import { RecentActivityCard } from "./RecentActivityCard";

interface MemberDashboardProps {
  user: {
    id: string;
    email: string;
    status: string;
  };
  member: MemberDto;
  membership: MembershipDto | null;
  completionRate: number;
  completedCount: number;
}

export function MemberDashboard({
  member,
  membership,
  completionRate,
  completedCount,
}: MemberDashboardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="space-y-8">
      {/* 1. REAL: Member Identity Strip (DSH-01) */}
      <DashboardHeader member={member} membership={membership} isAr={isAr} />

      {/* 2. Top Metric Row: Profile Completion Ring + Membership Record Card */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* REAL: Profile Completion Card (11-field engine) */}
        <CompletionGaugeCard
          completionRate={completionRate}
          completedCount={completedCount}
          isAr={isAr}
        />

        {/* REAL: Membership Record Card (DSH-08/DSH-09) */}
        <MembershipTierCard membership={membership} isAr={isAr} />
      </div>

      {/* 3. PLACEHOLDER: 4 Statistics Tiles (Section 16: DSH-03 to DSH-06) */}
      <StatTilesGrid isAr={isAr} />

      {/* 4. Two-Column Row: Priority Actions Grid + Recent Activity Card */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <PriorityActionsCard completionRate={completionRate} isAr={isAr} />
        <RecentActivityCard isAr={isAr} />
      </div>
    </div>
  );
}
