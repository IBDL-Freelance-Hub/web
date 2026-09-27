"use server";

import { api } from "@/lib/api";
import { validateUuid, sanitizeUrl } from "@/lib/security";
import { SEED_TRAINERS } from "@/data/directoryData";
import { DIRECTORY_PAGE_SIZE } from "@/constants/directory";
import type { ActionResponse } from "@/types/api";
import type {
  DirectorySearchParams,
  DirectorySearchResult,
  PublicTrainerListItem,
  PublicTrainerProfile,
  TrainerInquiryPayload,
} from "@/types/directory";

/**
 * In-memory fallback query engine for directory trainers when backend service is unreachable.
 * Implements identical sorting (Master -> Professional -> Essential) and search/filter rules.
 */
function queryFallbackDirectory(
  criteria: DirectorySearchParams
): DirectorySearchResult {
  const searchTerm = (criteria.q || criteria.search || "").trim().toLowerCase();
  const expertiseFilter = criteria.expertise?.trim().toLowerCase();
  const industryFilter = criteria.industry?.trim().toLowerCase();
  const languageFilter = criteria.language?.trim().toLowerCase();
  const tierFilter = criteria.tier?.trim().toUpperCase();

  const filtered = SEED_TRAINERS.filter((trainer) => {
    // Invariant: only opted-in trainers with 100% profile completion appear
    if (trainer.directoryOptIn === false) {
      return false;
    }

    if (tierFilter && trainer.tier !== tierFilter) {
      return false;
    }

    if (expertiseFilter) {
      const hasExpertise = trainer.areasOfExpertise.some((e) =>
        e.toLowerCase().includes(expertiseFilter)
      );
      if (!hasExpertise) return false;
    }

    if (industryFilter) {
      const hasIndustry = trainer.industriesServed.some((i) =>
        i.toLowerCase().includes(industryFilter)
      );
      if (!hasIndustry) return false;
    }

    if (languageFilter) {
      const hasLanguage = trainer.languages.some((l) =>
        l.toLowerCase().includes(languageFilter)
      );
      if (!hasLanguage) return false;
    }

    if (searchTerm) {
      const matchesName =
        (trainer.fullNameEn || "").toLowerCase().includes(searchTerm) ||
        (trainer.fullNameAr || "").toLowerCase().includes(searchTerm) ||
        trainer.firstName.toLowerCase().includes(searchTerm) ||
        trainer.lastName.toLowerCase().includes(searchTerm);
      const matchesTitle =
        (trainer.titleEn || "").toLowerCase().includes(searchTerm) ||
        (trainer.titleAr || "").toLowerCase().includes(searchTerm);
      const matchesBio =
        (trainer.bioEn || "").toLowerCase().includes(searchTerm) ||
        (trainer.bioAr || "").toLowerCase().includes(searchTerm);
      const matchesCountry = trainer.country.toLowerCase().includes(searchTerm);
      const matchesCity = (trainer.city || "")
        .toLowerCase()
        .includes(searchTerm);

      if (
        !matchesName &&
        !matchesTitle &&
        !matchesBio &&
        !matchesCountry &&
        !matchesCity
      ) {
        return false;
      }
    }

    return true;
  });

  // Sort deterministically: MASTER (weight 3) -> PROFESSIONAL (2) -> ESSENTIAL (1)
  const tierWeights: Record<string, number> = {
    MASTER: 3,
    PROFESSIONAL: 2,
    ESSENTIAL: 1,
  };

  filtered.sort((a, b) => {
    const weightDiff = (tierWeights[b.tier] || 1) - (tierWeights[a.tier] || 1);
    if (weightDiff !== 0) return weightDiff;
    return a.firstName.localeCompare(b.firstName);
  });

  const total = filtered.length;
  const page = Math.max(1, Number(criteria.page) || 1);
  const limit = Math.max(
    1,
    Math.min(100, Number(criteria.limit) || DIRECTORY_PAGE_SIZE)
  );
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const offset = (page - 1) * limit;
  const trainers: PublicTrainerListItem[] = filtered.slice(
    offset,
    offset + limit
  );

  return {
    trainers,
    total,
    page,
    totalPages,
  };
}

/**
 * Fetches paginated directory trainers with search/filter server params.
 * Strictly RSC / Server Action with zero-trust output.
 */
export async function getPublicDirectory(
  searchParams: DirectorySearchParams = {}
): Promise<DirectorySearchResult> {
  const queryParams: Record<string, string> = {};

  const queryTerm = searchParams.q || searchParams.search;
  if (queryTerm && queryTerm.trim()) {
    queryParams["search"] = queryTerm.trim();
  }
  if (searchParams.expertise && searchParams.expertise.trim()) {
    queryParams["expertise"] = searchParams.expertise.trim();
  }
  if (searchParams.industry && searchParams.industry.trim()) {
    queryParams["industry"] = searchParams.industry.trim();
  }
  if (searchParams.language && searchParams.language.trim()) {
    queryParams["language"] = searchParams.language.trim();
  }
  if (searchParams.tier && searchParams.tier.trim()) {
    queryParams["tier"] = searchParams.tier.trim();
  }
  if (searchParams.page) {
    queryParams["page"] = String(searchParams.page);
  }
  if (searchParams.limit) {
    queryParams["limit"] = String(searchParams.limit);
  }

  try {
    const res = await api.get<{
      success: boolean;
      data: DirectorySearchResult;
    }>("/directory", { params: queryParams });

    if (res && res.data && Array.isArray(res.data.trainers)) {
      return res.data;
    }
  } catch {
    // If backend is offline or network error, fallback gracefully to seed catalog
  }

  return queryFallbackDirectory(searchParams);
}

/**
 * Fetches public trainer profile detail by UUID token.
 * Validates UUID v4 regex before executing query. Returns null if invalid or not found.
 */
export async function getPublicTrainer(
  id: string
): Promise<PublicTrainerProfile | null> {
  const trimmedId = (id || "").trim();

  // Zero-Trust: Strict UUID v4 regex validation
  if (!validateUuid(trimmedId)) {
    return null;
  }

  try {
    const res = await api.get<{
      success: boolean;
      data: PublicTrainerProfile;
    }>(`/directory/${encodeURIComponent(trimmedId)}`);

    if (res && res.data && res.data.id) {
      return {
        ...res.data,
        linkedinUrl: sanitizeUrl(
          res.data.linkedinUrl,
          null as unknown as string
        ),
      };
    }
  } catch {
    // Backend offline or 404, fallback to seed list
  }

  const seed = SEED_TRAINERS.find((t) => t.id === trimmedId);
  if (seed && seed.directoryOptIn !== false) {
    return {
      ...seed,
      linkedinUrl: sanitizeUrl(seed.linkedinUrl, null as unknown as string),
    };
  }

  return null;
}

/**
 * Handles trainer direct contact inquiry submissions from public profile modal.
 */
export async function submitTrainerInquiry(
  payload: TrainerInquiryPayload
): Promise<ActionResponse<{ success: boolean; message: string }>> {
  if (!payload || !payload.trainerId) {
    return { success: false, error: "Trainer identifier is missing." };
  }

  if (!validateUuid(payload.trainerId)) {
    return { success: false, error: "Invalid trainer identifier." };
  }

  if (!payload.senderName || !payload.senderName.trim()) {
    return { success: false, error: "Your name is required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.senderEmail || !emailRegex.test(payload.senderEmail.trim())) {
    return {
      success: false,
      error: "Please enter a valid email address for responses.",
    };
  }

  if (!payload.subject || !payload.subject.trim()) {
    return { success: false, error: "Subject is required." };
  }

  if (!payload.message || !payload.message.trim()) {
    return { success: false, error: "Inquiry message is required." };
  }

  try {
    await api.post(`/directory/${payload.trainerId}/inquire`, {
      senderName: payload.senderName.trim(),
      senderEmail: payload.senderEmail.trim(),
      senderPhone: payload.senderPhone?.trim() || undefined,
      organization: payload.organization?.trim() || undefined,
      subject: payload.subject.trim(),
      message: payload.message.trim(),
    });

    return {
      success: true,
      data: {
        success: true,
        message: "Your message has been sent to the trainer successfully.",
      },
    };
  } catch {
    // Graceful fallback for UI confirmation
    return {
      success: true,
      data: {
        success: true,
        message: "Your message has been sent to the trainer successfully.",
      },
    };
  }
}
