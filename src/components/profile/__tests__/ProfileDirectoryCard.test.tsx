import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ProfileDirectoryCard,
  checkDirectoryEligibility,
} from "../ProfileDirectoryCard";
import type { MemberDto } from "../../../types/api";

const mockMember: MemberDto = {
  fullNameEn: "John Doe",
  fullNameAr: "جون دو",
  phone: "+201234567890",
  country: "Egypt",
  city: "Cairo",
  yearsOfExperience: "5–10 years",
  areasOfExpertise: ["Leadership"],
  industriesServed: ["Technology"],
  languages: ["English", "Arabic"],
  bioEn: "Sample bio",
  bioAr: "نبذة تجريبية",
  directoryOptIn: true,
  profileCompletionRate: 100,
};

test("FIX 1: Directory eligibility enables for ACTIVE Essential member at 100% completion", () => {
  // Test 1: Essential tier at 100% completion and ACTIVE status must qualify
  const isEssentialEligible = checkDirectoryEligibility("ACTIVE", 100);
  assert.strictEqual(
    isEssentialEligible,
    true,
    "Expected ACTIVE Essential member at 100% completion to be eligible (v3.0 paid tier restriction removed)"
  );

  // Test 2: Master tier at 100% completion and ACTIVE status also qualifies
  const isMasterEligible = checkDirectoryEligibility("ACTIVE", 100);
  assert.strictEqual(isMasterEligible, true);

  // Test 3: Backend eligibility priority (source of truth)
  const backendFalsePriority = checkDirectoryEligibility("ACTIVE", 100, false);
  assert.strictEqual(
    backendFalsePriority,
    false,
    "Expected backend eligibility=false to take precedence over client calculation"
  );

  const backendTruePriority = checkDirectoryEligibility("EXPIRED", 50, true);
  assert.strictEqual(
    backendTruePriority,
    true,
    "Expected backend eligibility=true to take precedence over client calculation"
  );
});

test("FIX 1: Directory eligibility remains DISABLED for < 100% completion or non-ACTIVE status", () => {
  // Test 1: ACTIVE member at 99% completion must NOT be eligible
  assert.strictEqual(
    checkDirectoryEligibility("ACTIVE", 99),
    false,
    "Expected ACTIVE member at 99% completion to be ineligible"
  );

  // Test 2: ACTIVE member at 0% completion must NOT be eligible
  assert.strictEqual(
    checkDirectoryEligibility("ACTIVE", 0),
    false,
    "Expected ACTIVE member at 0% completion to be ineligible"
  );

  // Test 3: Non-ACTIVE statuses must NOT be eligible even at 100% completion
  const nonActiveStatuses = [
    "EXPIRED",
    "GRACE_PERIOD",
    "PENDING_PAYMENT",
    "SUSPENDED",
    "CANCELLED",
    null,
    undefined,
  ];

  for (const status of nonActiveStatuses) {
    assert.strictEqual(
      checkDirectoryEligibility(status, 100),
      false,
      `Expected status ${status} to be ineligible even at 100% completion`
    );
  }
});

import { DirectionProvider } from "../../common/DirectionProvider";

test("FIX 1: Component HTML never mentions 'paid' or restricts to Professional/Master", () => {
  // Render ineligible Essential member (80% completion)
  const htmlIneligible = renderToStaticMarkup(
    <DirectionProvider>
      <ProfileDirectoryCard
        member={{ ...mockMember, profileCompletionRate: 80 }}
        membership={{
          tier: "ESSENTIAL",
          status: "ACTIVE",
          startDate: "2025-01-01",
          endDate: "2026-01-01",
        }}
        completionRate={80}
        meetsDirectoryRequirements={false}
        isPublishedInDirectory={false}
      />
    </DirectionProvider>
  );

  // Assert prohibition on v3.0 paid wording
  assert.doesNotMatch(
    htmlIneligible,
    /active paid membership/i,
    "Expected banner NOT to mention 'paid membership'"
  );
  assert.doesNotMatch(
    htmlIneligible,
    /عضوية مدفوعة/i,
    "Expected Arabic banner NOT to mention 'عضوية مدفوعة'"
  );
  assert.doesNotMatch(
    htmlIneligible,
    /Professional or Master/i,
    "Expected banner NOT to name Professional or Master"
  );

  // Assert correct v5.0 message
  assert.match(
    htmlIneligible,
    /requires an active membership and 100% profile completion/i,
    "Expected v5.0 explanation message"
  );
});
