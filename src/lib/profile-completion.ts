export interface ProfileCompletionInput {
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  yearsOfExperience?: number | string | null;
  areasOfExpertise?: string[] | null;
  industriesServed?: string[] | null;
  languages?: string[] | null;
  bio?: string | null;
  cvUrl?: string | null;
}

export function calculateProfileCompletion(data: ProfileCompletionInput): {
  rate: number;
  completedFields: string[];
  missingFields: string[];
} {
  const fields: { key: string; isComplete: boolean }[] = [
    { key: "fullName", isComplete: Boolean(data.fullName?.trim()) },
    { key: "email", isComplete: Boolean(data.email?.trim()) },
    { key: "phone", isComplete: Boolean(data.phone?.trim()) },
    { key: "country", isComplete: Boolean(data.country?.trim()) },
    { key: "city", isComplete: Boolean(data.city?.trim()) },
    {
      key: "yearsOfExperience",
      isComplete:
        typeof data.yearsOfExperience === "number"
          ? data.yearsOfExperience >= 0
          : Boolean(
              data.yearsOfExperience && String(data.yearsOfExperience).trim()
            ),
    },
    {
      key: "areasOfExpertise",
      isComplete: Boolean(
        data.areasOfExpertise && data.areasOfExpertise.length > 0
      ),
    },
    {
      key: "industriesServed",
      isComplete: Boolean(
        data.industriesServed && data.industriesServed.length > 0
      ),
    },
    {
      key: "languages",
      isComplete: Boolean(data.languages && data.languages.length > 0),
    },
    { key: "bio", isComplete: Boolean(data.bio?.trim()) },
    { key: "cvUrl", isComplete: Boolean(data.cvUrl?.trim()) },
  ];

  // STRICT PRO-13d: Profile picture & LinkedIn MUST NEVER be counted
  const completed = fields.filter((f) => f.isComplete).map((f) => f.key);
  const missing = fields.filter((f) => !f.isComplete).map((f) => f.key);
  const rate = Math.round((completed.length / 11) * 100);

  return { rate, completedFields: completed, missingFields: missing };
}
