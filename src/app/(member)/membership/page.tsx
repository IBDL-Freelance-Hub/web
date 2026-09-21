import React from "react";
import { Metadata } from "next";
import { getMembershipTiersAction } from "@/actions/membershipActions";
import { getMemberDashboardData } from "@/actions/memberActions";
import { MembershipView } from "@/components/membership/MembershipView";
import type { MembershipTierCatalogItem } from "@/types/membership";

export const metadata: Metadata = {
  title: "Membership Plans & Upgrades | IBDL Freelancers Hub",
  description:
    "Compare accredited membership tiers, evaluate member privileges, and upgrade your trainer tier on the IBDL Freelancers Hub.",
};

export default async function MembershipPage() {
  // Parallel fetch: Canonical Tier Catalog and Current Member Dashboard
  const [tiersRes, dashboardRes] = await Promise.all([
    getMembershipTiersAction(),
    getMemberDashboardData(),
  ]);

  const tiers: MembershipTierCatalogItem[] =
    tiersRes.success && tiersRes.data ? tiersRes.data : [];
  const dashboard =
    dashboardRes.success && dashboardRes.data ? dashboardRes.data : null;

  return (
    <main
      id="membership-main-content"
      className="mx-auto max-w-7xl py-4 sm:py-6"
    >
      <MembershipView initialTiers={tiers} dashboardData={dashboard} />
    </main>
  );
}
