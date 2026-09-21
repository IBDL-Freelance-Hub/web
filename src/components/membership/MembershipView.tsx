"use client";

import React, { useState } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { useOptionalToast } from "@/components/ui/Toast";
import {
  MembershipTierCatalogItem,
  UpgradeTierResponseData,
} from "@/types/membership";
import type { MemberDashboardResponse } from "@/types/member";
import { CurrentMembershipBanner } from "./CurrentMembershipBanner";
import { TierComparisonCard } from "./TierComparisonCard";
import { MembershipComparisonTable } from "./MembershipComparisonTable";
import { UpgradeCheckoutModal } from "./UpgradeCheckoutModal";

interface MembershipViewProps {
  initialTiers: MembershipTierCatalogItem[];
  dashboardData: MemberDashboardResponse | null;
}

export function MembershipView({
  initialTiers,
  dashboardData,
}: MembershipViewProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const toast = useOptionalToast();

  const [tiers, setTiers] = useState<MembershipTierCatalogItem[]>(initialTiers);
  const [selectedTierForUpgrade, setSelectedTierForUpgrade] =
    useState<MembershipTierCatalogItem | null>(null);

  // Identify current tier from dashboard or tiers catalog
  const currentTierItem = tiers.find((t) => t.isCurrentPlan);
  const currentTierCode =
    dashboardData?.membership?.tier || currentTierItem?.tier || "ESSENTIAL";

  // Upgrade target when clicking "Upgrade ->" on the top banner
  const handleBannerUpgrade = () => {
    // If current is Essential, upgrade to Professional; if Professional, upgrade to Master
    const nextTier =
      currentTierCode === "ESSENTIAL"
        ? tiers.find((t) => t.tier === "PROFESSIONAL") ||
          tiers.find((t) => t.tier === "MASTER")
        : tiers.find((t) => t.tier === "MASTER");

    if (nextTier) {
      setSelectedTierForUpgrade(nextTier);
    } else {
      const grid = document.getElementById("plans-comparison");
      grid?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // MEM-72: Pure client-side downgrade toast handler
  const handleDowngrade = () => {
    toast?.showToast(
      "info",
      isAr ? "تخفيض فئة العضوية (MEM-72)" : "Membership Downgrade (MEM-72)",
      isAr
        ? "تتم إدارة تخفيض الباقات من خلال فريق المنصة — تواصل معنا عبر freelancers.hub@ibdl.net"
        : "Downgrades are handled by the Hub team — contact freelancers.hub@ibdl.net"
    );
  };

  const handleUpgradeClick = (tier: MembershipTierCatalogItem) => {
    setSelectedTierForUpgrade(tier);
  };

  const handleUpgradeSuccess = (res: UpgradeTierResponseData) => {
    // Update local state to reflect upgraded plan
    setTiers((prev) =>
      prev.map((t) => ({
        ...t,
        isCurrentPlan: t.tier === res.membership.tier,
        canUpgrade: false,
      }))
    );
    toast?.showToast(
      "success",
      isAr ? "تم تحديث العضوية" : "Membership Updated",
      isAr
        ? `أصبحت عضويتك الآن ${res.membership.tier}. تهانينا!`
        : `Your membership has been upgraded to ${res.membership.tier}.`
    );
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-300 sm:space-y-7">
      {/* 1. Current Membership Banner (1:1 with user specification) */}
      <CurrentMembershipBanner
        membership={dashboardData?.membership || null}
        currentTierItem={currentTierItem}
        onUpgradeClick={
          currentTierCode !== "MASTER" ? handleBannerUpgrade : undefined
        }
      />

      {/* 2. Section Header: Plans Comparison Intro (Accredited Membership Tiers removed per user request) */}
      <div className="pt-1">
        <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          {isAr ? "مقارنة الباقات والترقية" : "Compare Plans & Upgrade"}
        </h1>
        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
          {isAr
            ? "اختر المستوى المناسب لممارستك الاستشارية والتدريبية. جميع الباقات تمنحك خصومات مباشرة وأدوات متقدمة معتمدة من IBDL."
            : "Select the tier tailored to your consulting and training practice. Gain verified member discounts, accredited curricula, and advanced IBDL tools."}
        </p>
      </div>

      {/* 3. Tiers Comparison Grid (SCR-68) */}
      <div
        id="plans-comparison"
        className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6"
      >
        {tiers.map((tier) => (
          <TierComparisonCard
            key={tier.tier}
            tier={tier}
            currentTier={currentTierCode}
            onUpgrade={handleUpgradeClick}
            onDowngrade={handleDowngrade}
          />
        ))}
      </div>

      {/* 4. Detailed Capabilities Comparison Table (Exact match to user screenshot 1) */}
      <MembershipComparisonTable />

      {/* 5. Upgrade Order Confirmation Modal (SCR-70) */}
      <UpgradeCheckoutModal
        tier={selectedTierForUpgrade}
        isOpen={selectedTierForUpgrade !== null}
        onClose={() => setSelectedTierForUpgrade(null)}
        onUpgradeSuccess={handleUpgradeSuccess}
      />
    </div>
  );
}
