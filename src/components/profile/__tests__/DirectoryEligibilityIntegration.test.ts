import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateDirectoryEligibility,
  DIRECTORY_COMPLETION_THRESHOLD,
} from "../../../../../server/src/modules/membership/domain/entitlements";
import { checkDirectoryEligibility } from "../ProfileDirectoryCard";
import {
  UserStatus,
  MembershipStatus,
} from "../../../../../server/node_modules/@prisma/client";

test("STEP 3 INTEGRATION: Backend calculateDirectoryEligibility & Frontend checkDirectoryEligibility parity at boundary", () => {
  // Assert default backend constant matches PRO-34
  assert.strictEqual(
    DIRECTORY_COMPLETION_THRESHOLD,
    100,
    "Expected backend DIRECTORY_COMPLETION_THRESHOLD to be 100 per PRO-34"
  );

  // --- BOUNDARY CASE A: 99% Completion (Just below threshold) ---
  const backendBelowBoundary = calculateDirectoryEligibility({
    directoryOptIn: true,
    profileCompletionRate: 99,
    userStatus: UserStatus.ACTIVE,
    membershipStatus: MembershipStatus.ACTIVE,
  });

  const frontendBelowBoundary = checkDirectoryEligibility("ACTIVE", 99);

  // Both backend and frontend MUST agree: 99% is NOT eligible
  assert.strictEqual(
    backendBelowBoundary.isEligible,
    false,
    "Backend must reject directory eligibility at 99% completion"
  );
  assert.strictEqual(
    backendBelowBoundary.criteria.hasMetCompletionThreshold,
    false,
    "Backend criteria hasMetCompletionThreshold must be false at 99%"
  );
  assert.strictEqual(
    frontendBelowBoundary,
    false,
    "Frontend checkDirectoryEligibility fallback must evaluate false at 99%"
  );
  assert.strictEqual(
    checkDirectoryEligibility("ACTIVE", 99, backendBelowBoundary.isEligible),
    false,
    "Frontend consuming backend isEligible must reflect false"
  );

  // --- BOUNDARY CASE B: 100% Completion (Exact threshold) ---
  const backendAtBoundary = calculateDirectoryEligibility({
    directoryOptIn: true,
    profileCompletionRate: 100,
    userStatus: UserStatus.ACTIVE,
    membershipStatus: MembershipStatus.ACTIVE,
  });

  const frontendAtBoundary = checkDirectoryEligibility("ACTIVE", 100);

  // Both backend and frontend MUST agree: 100% IS eligible
  assert.strictEqual(
    backendAtBoundary.isEligible,
    true,
    "Backend must grant directory eligibility at 100% completion"
  );
  assert.strictEqual(
    backendAtBoundary.criteria.hasMetCompletionThreshold,
    true,
    "Backend criteria hasMetCompletionThreshold must be true at 100%"
  );
  assert.strictEqual(
    frontendAtBoundary,
    true,
    "Frontend checkDirectoryEligibility fallback must evaluate true at 100%"
  );
  assert.strictEqual(
    checkDirectoryEligibility("ACTIVE", 100, backendAtBoundary.isEligible),
    true,
    "Frontend consuming backend isEligible must reflect true"
  );
});
