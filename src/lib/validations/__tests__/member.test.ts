import test from "node:test";
import assert from "node:assert/strict";
import {
  updateMemberProfileSchema,
  normalizePhoneE164,
  normalizeLinkedInUrl,
  experienceBands,
} from "../member";

test("VAL-50 / PRO-04: updateMemberProfileSchema rejects email field if provided", () => {
  const result = updateMemberProfileSchema.safeParse({
    fullNameEn: "Jane Doe",
    phone: "+201234567890",
    country: "Egypt",
    city: "Cairo",
    email: "jane@example.com",
  });

  assert.strictEqual(result.success, false);
  if (!result.success) {
    const emailIssue = result.error.issues.find((i) =>
      i.path.includes("email")
    );
    assert.ok(emailIssue, "Expected an issue for email field");
    assert.ok(
      emailIssue?.message.includes("Email is read-only"),
      "Expected email read-only error message"
    );
  }
});

test("E.164 Phone Formatting: normalizes valid phone and rejects non-E.164", () => {
  // Test normalization
  assert.strictEqual(normalizePhoneE164("+20 123 456 7890"), "+201234567890");
  assert.strictEqual(normalizePhoneE164("+20-123-456-7890"), "+201234567890");
  assert.strictEqual(normalizePhoneE164("+1 (555) 234-5678"), "+15552345678");

  // Valid parsed input
  const validResult = updateMemberProfileSchema.safeParse({
    fullNameEn: "Jane Doe",
    phone: "+20 123 456 7890",
    country: "Egypt",
    city: "Cairo",
  });
  assert.strictEqual(validResult.success, true);
  if (validResult.success) {
    assert.strictEqual(validResult.data.phone, "+201234567890");
  }

  // Missing plus sign or invalid format
  const invalidResult = updateMemberProfileSchema.safeParse({
    fullNameEn: "Jane Doe",
    phone: "01234567890",
    country: "Egypt",
    city: "Cairo",
  });
  assert.strictEqual(invalidResult.success, false);
});

test("LinkedIn URL Normalization and Validation", () => {
  // Normalization
  assert.strictEqual(normalizeLinkedInUrl(""), null);
  assert.strictEqual(normalizeLinkedInUrl(null), null);
  assert.strictEqual(
    normalizeLinkedInUrl("linkedin.com/in/janedoe"),
    "https://linkedin.com/in/janedoe"
  );
  assert.strictEqual(
    normalizeLinkedInUrl("https://linkedin.com/in/janedoe"),
    "https://linkedin.com/in/janedoe"
  );

  // Valid schema test
  const validParsed = updateMemberProfileSchema.safeParse({
    fullNameEn: "Jane Doe",
    phone: "+201234567890",
    country: "Egypt",
    city: "Cairo",
    linkedinUrl: "linkedin.com/in/janedoe",
  });
  assert.strictEqual(validParsed.success, true);
  if (validParsed.success) {
    assert.strictEqual(
      validParsed.data.linkedinUrl,
      "https://linkedin.com/in/janedoe"
    );
  }

  // Invalid non-linkedin URL
  const invalidParsed = updateMemberProfileSchema.safeParse({
    fullNameEn: "Jane Doe",
    phone: "+201234567890",
    country: "Egypt",
    city: "Cairo",
    linkedinUrl: "https://facebook.com/janedoe",
  });
  assert.strictEqual(invalidParsed.success, false);
});

test("Years of Experience: validates and normalizes against experience bands", () => {
  for (const band of experienceBands) {
    const result = updateMemberProfileSchema.safeParse({
      fullNameEn: "Jane Doe",
      phone: "+201234567890",
      country: "Egypt",
      city: "Cairo",
      yearsOfExperience: band,
    });
    assert.strictEqual(
      result.success,
      true,
      `Expected band ${band} to be valid`
    );
  }

  // Normalizes label formats
  const normalizedResult = updateMemberProfileSchema.safeParse({
    fullNameEn: "Jane Doe",
    phone: "+201234567890",
    country: "Egypt",
    city: "Cairo",
    yearsOfExperience: "2–5 years",
  });
  assert.strictEqual(normalizedResult.success, true);
  if (normalizedResult.success) {
    assert.strictEqual(normalizedResult.data.yearsOfExperience, "2-5");
  }
});
