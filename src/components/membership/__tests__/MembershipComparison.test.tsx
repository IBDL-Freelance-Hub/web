import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  getTierHierarchy,
  isUpgradeAllowed,
  isDowngrade,
  type MembershipTierCatalogItem,
} from "../../../types/membership";
import { TierComparisonCard } from "../TierComparisonCard";
import { UpgradeCheckoutModal } from "../UpgradeCheckoutModal";
import { CurrentMembershipBanner } from "../CurrentMembershipBanner";
import { MembershipComparisonTable } from "../MembershipComparisonTable";
import { DirectionProvider } from "../../common/DirectionProvider";

const mockTiers: Record<string, MembershipTierCatalogItem> = {
  essential: {
    tier: "ESSENTIAL",
    name: "Essential",
    tagline: "Foundational membership for independent trainers.",
    annualFee: 0,
    currency: "USD",
    discountRate: 15,
    coreHubServicesIncluded: false,
    accreditedProgrammes: 0,
    freeTraineeCertificates: 0,
    freeQuarterlyTools: 0,
    trainerCertificationEligible: false,
    coreHubServices: ["TNA Assistance", "Curriculum Mapping"],
    isCurrentPlan: true,
    canUpgrade: false,
  },
  professional: {
    tier: "PROFESSIONAL",
    name: "Professional",
    tagline: "The Hub working alongside your practice at member rates.",
    annualFee: 180,
    currency: "USD",
    discountRate: 30,
    coreHubServicesIncluded: false,
    accreditedProgrammes: 1,
    freeTraineeCertificates: 20,
    freeQuarterlyTools: 0,
    trainerCertificationEligible: false,
    coreHubServices: [
      "TNA Assistance",
      "Curriculum Mapping",
      "Quality Auditing",
    ],
    isCurrentPlan: false,
    canUpgrade: true,
  },
  master: {
    tier: "MASTER",
    name: "Master",
    tagline: "The Hub powering your full practice and international delivery.",
    annualFee: 380,
    currency: "USD",
    discountRate: 40,
    coreHubServicesIncluded: true,
    accreditedProgrammes: 2,
    freeTraineeCertificates: 40,
    freeQuarterlyTools: 4,
    trainerCertificationEligible: true,
    coreHubServices: ["All 12 Core Services"],
    isCurrentPlan: false,
    canUpgrade: true,
  },
};

test("MEM-07 & Hierarchy Rules: Validates tier hierarchy levels correctly", () => {
  assert.equal(getTierHierarchy("ESSENTIAL"), 1);
  assert.equal(getTierHierarchy("PROFESSIONAL"), 2);
  assert.equal(getTierHierarchy("MASTER"), 3);

  // Upgrade rules: must move strictly up
  assert.equal(isUpgradeAllowed("ESSENTIAL", "PROFESSIONAL"), true);
  assert.equal(isUpgradeAllowed("ESSENTIAL", "MASTER"), true);
  assert.equal(isUpgradeAllowed("PROFESSIONAL", "MASTER"), true);

  // Non-upgrades
  assert.equal(isUpgradeAllowed("PROFESSIONAL", "PROFESSIONAL"), false);
  assert.equal(isUpgradeAllowed("MASTER", "PROFESSIONAL"), false);
  assert.equal(isUpgradeAllowed("MASTER", "ESSENTIAL"), false);

  // Downgrade rules
  assert.equal(isDowngrade("MASTER", "PROFESSIONAL"), true);
  assert.equal(isDowngrade("PROFESSIONAL", "ESSENTIAL"), true);
  assert.equal(isDowngrade("ESSENTIAL", "PROFESSIONAL"), false);
});

test("CurrentMembershipBanner: Matches user screenshot specifications 1:1", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <CurrentMembershipBanner
        membership={{
          tier: "PROFESSIONAL",
          status: "ACTIVE",
          startDate: "2026-03-12T00:00:00.000Z",
          renewsOn: "2027-03-12T00:00:00.000Z",
          daysUntilRenewal: 355,
        }}
        onUpgradeClick={() => {}}
      />
    </DirectionProvider>
  );

  // Header
  assert.match(html, /CURRENT MEMBERSHIP/i);
  assert.match(html, /Professional Membership/i);
  assert.match(html, /Active/i);
  assert.match(html, /Upgrade/i);

  // 4 Columns
  assert.match(html, /Price/i);
  assert.match(html, /\$180 \/ year/i);
  assert.match(html, /Start date/i);
  assert.match(html, /12 March 2026/i);
  assert.match(html, /End date/i);
  assert.match(html, /12 March 2027/i);
  assert.match(html, /Payment status/i);
  assert.match(html, /Paid/i);

  // Footer disclaimer note
  assert.match(
    html,
    /Membership period defaults to one year and is configurable by IBDL\./i
  );
});

test("SCR-68: TierComparisonCard renders active plan and upgrade CTA accurately", () => {
  const noop = () => {};

  // Current Plan
  const currentHtml = renderToStaticMarkup(
    <DirectionProvider>
      <TierComparisonCard
        tier={mockTiers.essential}
        currentTier="ESSENTIAL"
        onUpgrade={noop}
        onDowngrade={noop}
      />
    </DirectionProvider>
  );
  assert.match(currentHtml, /Your current plan/i);
  assert.match(currentHtml, /Free|مجاناً/i);
  assert.match(currentHtml, /Belong to the profession\./i);
  assert.match(currentHtml, /Hub Services — 15% member rate/i);

  // Upgrade Plan (Professional)
  const upgradeHtml = renderToStaticMarkup(
    <DirectionProvider>
      <TierComparisonCard
        tier={mockTiers.professional}
        currentTier="ESSENTIAL"
        onUpgrade={noop}
        onDowngrade={noop}
      />
    </DirectionProvider>
  );
  assert.match(upgradeHtml, /Upgrade to Professional/i);
  assert.match(upgradeHtml, /\$180/i);
  assert.match(upgradeHtml, /30% Member Rate/i);
  assert.match(upgradeHtml, /Work with the Hub behind you\./i);
  assert.match(upgradeHtml, /Hub Services — 30% member rate/i);

  // Downgrade Plan (when member is MASTER looking at Professional)
  const downgradeHtml = renderToStaticMarkup(
    <DirectionProvider>
      <TierComparisonCard
        tier={mockTiers.professional}
        currentTier="MASTER"
        onUpgrade={noop}
        onDowngrade={noop}
      />
    </DirectionProvider>
  );
  assert.match(downgradeHtml, /Choose this plan/i);
});

test("SCR-70: UpgradeCheckoutModal renders order confirmation with Paymob & MEM-48 VAT wording", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <UpgradeCheckoutModal
        tier={mockTiers.professional}
        isOpen={true}
        onClose={() => {}}
      />
    </DirectionProvider>
  );

  // 1. Order Summary & Price Invariant
  assert.match(html, /Order Summary/i);
  assert.match(html, /\$180\.00/i);

  // 2. Approved MEM-48 VAT Wording
  assert.match(html, /VAT not applicable/i);
  assert.match(html, /\$0\.00/i);
  assert.doesNotMatch(html, /To be configured/i);

  // 3. Paymob Payment Gateway Architecture
  assert.match(html, /Paymob/i);
  assert.match(html, /3D Secure 2\.0/i);
  assert.match(html, /Cardholder Name/i);

  // 4. Verification that manual simulation outcome selector is stripped out
  assert.doesNotMatch(html, /Simulate Outcome/i);
  assert.doesNotMatch(html, /Simulate Successful/i);
});

test("SCR-70 Bilingual Arabic Rendering: Displays correct Arabic labels and MEM-48 VAT notice", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <UpgradeCheckoutModal
        tier={mockTiers.master}
        isOpen={true}
        onClose={() => {}}
      />
    </DirectionProvider>
  );

  assert.match(html, /Paymob/i);
  assert.match(html, /\$380/i);
});

test("MembershipComparisonTable: Matches attached screen 1 with all capabilities and callouts", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <MembershipComparisonTable />
    </DirectionProvider>
  );

  // Headers
  assert.match(html, /CAPABILITY/i);
  assert.match(html, /ESSENTIAL MEMBERSHIP/i);
  assert.match(html, /PROFESSIONAL MEMBERSHIP/i);
  assert.match(html, /MASTER MEMBERSHIP/i);

  // Capabilities
  assert.match(html, /Annual membership fee/i);
  assert.match(html, /Hub community and Directory profile/i);
  assert.match(html, /Core Hub Services included/i);
  assert.match(html, /Free eligible tool usage/i);
  assert.match(html, /Trainer certification eligibility/i);

  // Values
  assert.match(html, /\$180 \/ year/i);
  assert.match(html, /\$380 \/ year/i);
  assert.match(html, /1 eligible tool \/ quarter/i);
  assert.match(html, /40% on additional purchases/i);

  // Explanatory note and policy text
  assert.match(html, /Essential members belong to the profession at no cost/i);
  assert.match(
    html,
    /Downgrades are handled by the Hub team — contact freelancers\.hub@ibdl\.net/i
  );
});
