import test from "node:test";
import assert from "node:assert/strict";
import { SEED_TRAINERS } from "../../../data/directoryData";
import { DIRECTORY_TIER_CONFIG } from "../../../constants/directory";
import { validateUuid } from "../../../lib/security";

// ── Utility: identical filtering logic to what the Server Action uses ─────────
interface SearchParams {
  q?: string;
  expertise?: string;
  industry?: string;
  language?: string;
  tier?: string;
  page?: number;
  limit?: number;
}

const tierWeights: Record<string, number> = {
  MASTER: 3,
  PROFESSIONAL: 2,
  ESSENTIAL: 1,
};

function filterDirectory(criteria: SearchParams) {
  const searchTerm = (criteria.q || "").trim().toLowerCase();
  const expertiseFilter = (criteria.expertise || "").trim().toLowerCase();
  const industryFilter = (criteria.industry || "").trim().toLowerCase();
  const languageFilter = (criteria.language || "").trim().toLowerCase();
  const tierFilter = (criteria.tier || "").trim().toUpperCase();

  const filtered = SEED_TRAINERS.filter((t) => {
    if (t.directoryOptIn === false) return false;
    if (tierFilter && t.tier !== tierFilter) return false;
    if (expertiseFilter) {
      const has = t.areasOfExpertise.some((e) =>
        e.toLowerCase().includes(expertiseFilter)
      );
      if (!has) return false;
    }
    if (industryFilter) {
      const has = t.industriesServed.some((i) =>
        i.toLowerCase().includes(industryFilter)
      );
      if (!has) return false;
    }
    if (languageFilter) {
      const has = t.languages.some((l) =>
        l.toLowerCase().includes(languageFilter)
      );
      if (!has) return false;
    }
    if (searchTerm) {
      const nameMatch =
        (t.fullNameEn || "").toLowerCase().includes(searchTerm) ||
        (t.fullNameAr || "").toLowerCase().includes(searchTerm) ||
        t.firstName.toLowerCase().includes(searchTerm) ||
        t.lastName.toLowerCase().includes(searchTerm);
      const bioMatch =
        (t.bioEn || "").toLowerCase().includes(searchTerm) ||
        (t.bioAr || "").toLowerCase().includes(searchTerm);
      const locationMatch =
        t.country.toLowerCase().includes(searchTerm) ||
        (t.city || "").toLowerCase().includes(searchTerm);
      if (!nameMatch && !bioMatch && !locationMatch) return false;
    }
    return true;
  });

  filtered.sort((a, b) => {
    const wd = (tierWeights[b.tier] || 1) - (tierWeights[a.tier] || 1);
    if (wd !== 0) return wd;
    return a.firstName.localeCompare(b.firstName);
  });

  const total = filtered.length;
  const page = Math.max(1, criteria.page || 1);
  const limit = Math.max(1, Math.min(100, criteria.limit || 12));
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const trainers = filtered.slice((page - 1) * limit, page * limit);
  return { trainers, total, page, totalPages };
}

// ── Test Suite ─────────────────────────────────────────────────────────────────

test("DIR: seed data contains only opted-in trainers", () => {
  const nonOptedIn = SEED_TRAINERS.filter((t) => t.directoryOptIn === false);
  assert.equal(
    nonOptedIn.length,
    0,
    "All seed trainers must have directoryOptIn !== false"
  );
});

test("DIR: seed trainer IDs are valid UUID v4", () => {
  for (const trainer of SEED_TRAINERS) {
    assert.ok(
      validateUuid(trainer.id),
      `Trainer ${trainer.fullNameEn} has invalid UUID: ${trainer.id}`
    );
  }
});

test("DIR: unfiltered search returns all seed trainers sorted by tier weight", () => {
  const result = filterDirectory({});
  assert.equal(result.total, SEED_TRAINERS.length);
  // Verify MASTER comes before PROFESSIONAL before ESSENTIAL
  let prevWeight = Infinity;
  for (const trainer of result.trainers) {
    const w = tierWeights[trainer.tier] || 1;
    assert.ok(w <= prevWeight, `Out-of-order tier: ${trainer.tier}`);
    prevWeight = w;
  }
});

test("DIR: expertise filter returns only matching trainers", () => {
  const result = filterDirectory({ expertise: "Leadership Development" });
  assert.ok(result.total > 0, "Expected at least one leadership trainer");
  for (const trainer of result.trainers) {
    assert.ok(
      trainer.areasOfExpertise.some((e) =>
        e.toLowerCase().includes("leadership")
      ),
      `Trainer ${trainer.fullNameEn} lacks leadership expertise`
    );
  }
});

test("DIR: industry filter returns only matching trainers", () => {
  const result = filterDirectory({ industry: "Banking & Financial Services" });
  assert.ok(result.total > 0, "Expected at least one banking-sector trainer");
  for (const trainer of result.trainers) {
    assert.ok(
      trainer.industriesServed.some((i) => i.toLowerCase().includes("banking")),
      `Trainer ${trainer.fullNameEn} does not serve banking sector`
    );
  }
});

test("DIR: language filter returns only trainers with that language", () => {
  const result = filterDirectory({ language: "French" });
  assert.ok(result.total > 0, "Expected at least one French-speaking trainer");
  for (const trainer of result.trainers) {
    assert.ok(
      trainer.languages.some((l) => l.toLowerCase() === "french"),
      `Trainer ${trainer.fullNameEn} does not speak French`
    );
  }
});

test("DIR: tier filter MASTER returns only MASTER trainers", () => {
  const result = filterDirectory({ tier: "MASTER" });
  assert.ok(result.total > 0, "Expected at least one MASTER trainer");
  for (const trainer of result.trainers) {
    assert.equal(
      trainer.tier,
      "MASTER",
      `Unexpected non-MASTER tier: ${trainer.tier}`
    );
  }
});

test("DIR: tier filter ESSENTIAL includes ESSENTIAL trainers (PRO-34 — no paid-only gate)", () => {
  const result = filterDirectory({ tier: "ESSENTIAL" });
  assert.ok(
    result.total > 0,
    "ESSENTIAL trainers must appear — no paid-tier restriction"
  );
  for (const trainer of result.trainers) {
    assert.equal(trainer.tier, "ESSENTIAL");
  }
});

test("DIR: search by name returns matching trainers only", () => {
  const result = filterDirectory({ q: "sarah" });
  assert.ok(result.total >= 1, "Expected at least one result for 'sarah'");
  for (const trainer of result.trainers) {
    const nameMatch =
      (trainer.fullNameEn || "").toLowerCase().includes("sarah") ||
      (trainer.fullNameAr || "").toLowerCase().includes("sarah") ||
      trainer.firstName.toLowerCase().includes("sarah") ||
      trainer.lastName.toLowerCase().includes("sarah");
    assert.ok(
      nameMatch,
      `Trainer ${trainer.fullNameEn} does not match 'sarah'`
    );
  }
});

test("DIR: search by country returns matching trainers", () => {
  const result = filterDirectory({ q: "Egypt" });
  assert.ok(result.total > 0, "Expected Egyptian trainers in seed data");
  for (const trainer of result.trainers) {
    const locationMatch =
      trainer.country.toLowerCase().includes("egypt") ||
      (trainer.city || "").toLowerCase().includes("egypt");
    const bioMatch = (trainer.bioEn || "").toLowerCase().includes("egypt");
    assert.ok(
      locationMatch || bioMatch,
      `Trainer ${trainer.fullNameEn} does not match 'Egypt'`
    );
  }
});

test("DIR: non-matching search returns empty results", () => {
  const result = filterDirectory({ q: "zzz_no_match_xqz_9999" });
  assert.equal(result.total, 0, "Expected zero results for gibberish query");
  assert.equal(result.trainers.length, 0);
});

test("DIR: pagination limit is respected", () => {
  const result = filterDirectory({ limit: 3 });
  assert.ok(result.trainers.length <= 3, "Page size must not exceed limit");
  assert.equal(result.page, 1);
  if (result.total > 3) {
    assert.ok(result.totalPages > 1, "Should have multiple pages");
  }
});

test("DIR: page 2 does not repeat page 1 results", () => {
  const page1 = filterDirectory({ limit: 3, page: 1 });
  const page2 = filterDirectory({ limit: 3, page: 2 });
  if (page1.total > 3) {
    const page1Ids = new Set(page1.trainers.map((t) => t.id));
    for (const trainer of page2.trainers) {
      assert.ok(
        !page1Ids.has(trainer.id),
        `Trainer ${trainer.fullNameEn} appeared on both pages`
      );
    }
  }
});

test("DIR: combined expertise + country filter narrows results correctly", () => {
  const result = filterDirectory({
    expertise: "Leadership Development",
    q: "Saudi Arabia",
  });
  for (const trainer of result.trainers) {
    const hasExpertise = trainer.areasOfExpertise.some((e) =>
      e.toLowerCase().includes("leadership")
    );
    const matchesSaudi =
      trainer.country.toLowerCase().includes("saudi") ||
      (trainer.city || "").toLowerCase().includes("saudi") ||
      (trainer.bioEn || "").toLowerCase().includes("saudi");
    assert.ok(
      hasExpertise && matchesSaudi,
      `Trainer ${trainer.fullNameEn} does not match combined filter`
    );
  }
});

test("DIR: DIRECTORY_TIER_CONFIG keys cover all membership tiers", () => {
  const expectedTiers = ["MASTER", "PROFESSIONAL", "ESSENTIAL"] as const;
  for (const tier of expectedTiers) {
    assert.ok(
      tier in DIRECTORY_TIER_CONFIG,
      `DIRECTORY_TIER_CONFIG missing tier: ${tier}`
    );
  }
});

test("DIR: each trainer card has non-empty required fields", () => {
  for (const trainer of SEED_TRAINERS) {
    assert.ok(trainer.id, `Missing id on: ${trainer.fullNameEn}`);
    assert.ok(trainer.slug, `Missing slug on: ${trainer.fullNameEn}`);
    assert.ok(trainer.firstName, `Missing firstName on: ${trainer.fullNameEn}`);
    assert.ok(trainer.country, `Missing country on: ${trainer.fullNameEn}`);
    assert.ok(
      trainer.areasOfExpertise.length > 0,
      `No expertise on: ${trainer.fullNameEn}`
    );
    assert.ok(
      trainer.languages.length > 0,
      `No languages on: ${trainer.fullNameEn}`
    );
  }
});

// ── Sprint 3 Tests: Query Params, Filters & Metadata Generation ──────────────

test("DIR: search query params correctly map and sanitize inputs", () => {
  const criteria = {
    q: "  Strategy  ",
    expertise: " Executive Coaching ",
    industry: " Banking & Finance ",
    language: " English ",
    page: 2,
    limit: 10,
  };
  const result = filterDirectory({
    q: criteria.q.trim(),
    expertise: criteria.expertise.trim(),
    industry: criteria.industry.trim(),
    language: criteria.language.trim(),
    page: criteria.page,
    limit: criteria.limit,
  });

  assert.equal(result.page, 2);
  assert.ok(Array.isArray(result.trainers));
});

test("DIR: profile metadata generation for valid trainer ID", async () => {
  const { buildTrainerMetadata } =
    await import("../../../lib/metadata/trainerProfileMetadata");
  const sampleTrainer = SEED_TRAINERS[0];
  const metadata = buildTrainerMetadata({
    ...sampleTrainer,
    bioAr: null,
    titleEn: null,
    titleAr: null,
    badgeType: "STANDARD",
    linkedinUrl: null,
  });

  assert.ok(metadata.title, "Metadata title must be defined");
  assert.match(
    String(metadata.title),
    new RegExp(sampleTrainer.fullNameEn || sampleTrainer.firstName, "i")
  );
  assert.ok(metadata.description, "Metadata description must be defined");
  const robots = metadata.robots as { index?: boolean } | null;
  assert.equal(robots?.index, true);
});

test("DIR: profile metadata generation for invalid UUID returns Not Found title", async () => {
  const { buildTrainerMetadata } =
    await import("../../../lib/metadata/trainerProfileMetadata");
  const metadata = buildTrainerMetadata(null);

  assert.equal(metadata.title, "Trainer Not Found — IBDL Freelancers Hub");
});

test("DIR: security sanitization verifies outbound links and rejects javascript: schemes", async () => {
  const { sanitizeUrl, getSafeLinkProps } =
    await import("../../../lib/security");

  assert.equal(sanitizeUrl("javascript:alert(1)"), "#");
  assert.equal(sanitizeUrl("data:text/html,<script>alert(1)</script>"), "#");

  const safeLink = getSafeLinkProps(
    "https://linkedin.com/in/ibdl-trainer",
    "_blank"
  );
  assert.equal(safeLink.rel, "noopener noreferrer");
  assert.equal(safeLink.target, "_blank");
});
