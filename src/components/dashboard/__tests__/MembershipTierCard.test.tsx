import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MembershipTierCard,
  getDisplayedTierName,
  getMembershipStatusDetails,
} from "../MembershipTierCard";
import type { MembershipStatus } from "../../../types/member";

test("DSH-14 / FIX 4: Expired membership must NOT display as 'Essential'", () => {
  // Test 1: Helper function verification
  const enExpiredProfessional = getDisplayedTierName(
    "PROFESSIONAL",
    "EXPIRED",
    false
  );
  assert.match(
    enExpiredProfessional,
    /Professional/i,
    "Expected expired professional membership to display 'Professional'"
  );
  assert.doesNotMatch(
    enExpiredProfessional,
    /Essential/i,
    "Expected expired professional membership NOT to be relabeled as 'Essential'"
  );

  // Test 2: Full React Component HTML rendering verification
  const html = renderToStaticMarkup(
    <MembershipTierCard
      membership={{
        tier: "PROFESSIONAL",
        status: "EXPIRED",
        startDate: "2025-01-01",
        renewsOn: "2026-01-01",
        daysUntilRenewal: 0,
      }}
      isAr={false}
    />
  );
  assert.match(
    html,
    /Professional/i,
    "Expected rendered component HTML to contain 'Professional'"
  );
  assert.doesNotMatch(
    html,
    /Essential/i,
    "Expected rendered component HTML NOT to contain 'Essential'"
  );

  // Test 3: Arabic EXPIRED Professional tier
  const arExpiredProfessional = getDisplayedTierName(
    "PROFESSIONAL",
    "EXPIRED",
    true
  );
  assert.ok(
    arExpiredProfessional.includes("عضوية مهنية"),
    `Expected Arabic name to include 'عضوية مهنية', got: ${arExpiredProfessional}`
  );
  assert.ok(
    !arExpiredProfessional.includes("عضوية أساسية"),
    `Expected Arabic name NOT to include 'عضوية أساسية', got: ${arExpiredProfessional}`
  );

  // Test 4: Active Essential membership properly displays as Essential
  const enActiveEssential = getDisplayedTierName("ESSENTIAL", "ACTIVE", false);
  assert.match(enActiveEssential, /Essential/i);
});

test("FIX 2: Exhaustive status check for all 6 MembershipStatus states", () => {
  const allStatuses: MembershipStatus[] = [
    "PENDING_PAYMENT",
    "ACTIVE",
    "GRACE_PERIOD",
    "EXPIRED",
    "SUSPENDED",
    "CANCELLED",
  ];

  for (const status of allStatuses) {
    const details = getMembershipStatusDetails(status, false, 5, "2026-10-01");
    assert.ok(details.label.length > 0, `Expected label for status ${status}`);
    assert.notEqual(
      details.bannerText,
      "Status unknown",
      `Expected status ${status} to be exhaustively handled`
    );
  }
});
