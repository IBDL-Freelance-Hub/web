/**
 * Evaluates whether a member meets requirements to opt into and appear in the Trainer Directory (PRO-34 v5.0).
 * Preconditions: Active membership of ANY tier + 100% profile completion.
 */
export function checkDirectoryEligibility(
  membershipStatus?: string | null,
  completionRate?: number | null,
  backendEligibility?: boolean | null
): boolean {
  if (typeof backendEligibility === "boolean") {
    return backendEligibility;
  }
  // Fallback only — the backend's directoryEligibility.isEligible is the source of truth;
  // this duplicate check exists only for defensive resilience.
  const isMembershipActive = membershipStatus === "ACTIVE";
  const isProfileComplete =
    typeof completionRate === "number" && completionRate >= 100;
  return isMembershipActive && isProfileComplete;
}
