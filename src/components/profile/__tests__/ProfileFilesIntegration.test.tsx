import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DirectionProvider } from "../../common/DirectionProvider";
import { ProfileIdentityCard } from "../ProfileIdentityCard";
import { ProfileDocumentsCard } from "../ProfileDocumentsCard";
import { ProfileProvider } from "../ProfileContext";
import { calculateProfileCompletion } from "@/lib/profile-completion";
import {
  validateProfilePhotoFile,
  validateCvFile,
} from "@/lib/validations/files";
import type { MemberDto } from "@/types/api";
import type { MemberProfileFileDto } from "@/types/member";

const baseMember: MemberDto = {
  fullNameEn: "Sarah Connor",
  fullNameAr: "سارة كونور",
  phone: "+201234567890",
  country: "Egypt",
  city: "Cairo",
  yearsOfExperience: "5–10 years",
  areasOfExpertise: ["Project Management"],
  industriesServed: ["Technology"],
  languages: ["English", "Arabic"],
  bioEn: "Senior certified trainer and consultant.",
  bioAr: "مدربة واستشارية معتمدة.",
  linkedinUrl: "https://linkedin.com/in/sarahconnor",
  photoFileId: "photo-123",
  directoryOptIn: true,
  profileCompletionRate: 91,
};

test("Profile Completion Engine: CV document presence is the 11th canonical field (PRO-13 & PRO-13d)", () => {
  // 10 fields filled, no CV
  const withoutCv = calculateProfileCompletion({
    fullName: baseMember.fullNameEn,
    email: "sarah@example.com",
    phone: baseMember.phone,
    country: baseMember.country,
    city: baseMember.city,
    yearsOfExperience: baseMember.yearsOfExperience,
    areasOfExpertise: baseMember.areasOfExpertise,
    industriesServed: baseMember.industriesServed,
    languages: baseMember.languages,
    bio: baseMember.bioEn,
    cvUrl: null,
  });

  assert.strictEqual(withoutCv.rate, 91, "Expected 10/11 fields to equal 91%");
  assert.ok(
    withoutCv.missingFields.includes("cvUrl"),
    "Expected cvUrl to be reported missing"
  );

  // 11 fields filled with CV
  const withCv = calculateProfileCompletion({
    fullName: baseMember.fullNameEn,
    email: "sarah@example.com",
    phone: baseMember.phone,
    country: baseMember.country,
    city: baseMember.city,
    yearsOfExperience: baseMember.yearsOfExperience,
    areasOfExpertise: baseMember.areasOfExpertise,
    industriesServed: baseMember.industriesServed,
    languages: baseMember.languages,
    bio: baseMember.bioEn,
    cvUrl: "Sarah-Connor-CV.pdf",
  });

  assert.strictEqual(withCv.rate, 100, "Expected 11/11 fields to equal 100%");
  assert.strictEqual(
    withCv.missingFields.length,
    0,
    "Expected 0 missing fields"
  );
});

test("validateProfilePhotoFile: rejects empty, oversized (>5MB), and non-image files", () => {
  // 1. Missing file
  const emptyResult = validateProfilePhotoFile(null);
  assert.strictEqual(emptyResult.valid, false);
  assert.ok(emptyResult.error?.includes("select an image"));

  // 2. Oversized file (> 5MB)
  const oversizedFile = new File(
    [new Uint8Array(6 * 1024 * 1024)],
    "huge.png",
    {
      type: "image/png",
    }
  );
  const oversizedResult = validateProfilePhotoFile(oversizedFile);
  assert.strictEqual(oversizedResult.valid, false);
  assert.ok(oversizedResult.error?.includes("5MB"));

  // 3. Invalid MIME type (text file)
  const textFile = new File(["not an image"], "notes.txt", {
    type: "text/plain",
  });
  const textResult = validateProfilePhotoFile(textFile);
  assert.strictEqual(textResult.valid, false);
  assert.ok(textResult.error?.includes("Invalid image format"));

  // 4. Valid file
  const validFile = new File([new Uint8Array(1024)], "avatar.png", {
    type: "image/png",
  });
  const validResult = validateProfilePhotoFile(validFile);
  assert.strictEqual(validResult.valid, true);
});

test("validateCvFile: rejects empty, oversized (>10MB), and unsupported document types", () => {
  // 1. Missing file
  const emptyResult = validateCvFile(null);
  assert.strictEqual(emptyResult.valid, false);
  assert.ok(emptyResult.error?.includes("select a CV document"));

  // 2. Oversized file (> 10MB)
  const oversizedFile = new File(
    [new Uint8Array(11 * 1024 * 1024)],
    "large_cv.pdf",
    { type: "application/pdf" }
  );
  const oversizedResult = validateCvFile(oversizedFile);
  assert.strictEqual(oversizedResult.valid, false);
  assert.ok(oversizedResult.error?.includes("10MB"));

  // 3. Invalid document format (.exe / octet-stream)
  const invalidFile = new File(["malicious"], "run.exe", {
    type: "application/x-msdownload",
  });
  const invalidResult = validateCvFile(invalidFile);
  assert.strictEqual(invalidResult.valid, false);
  assert.ok(invalidResult.error?.includes("PDF and DOCX"));

  // 4. Valid PDF file
  const validPdf = new File([new Uint8Array(1024)], "resume.pdf", {
    type: "application/pdf",
  });
  const validResult = validateCvFile(validPdf);
  assert.strictEqual(validResult.valid, true);
});

test("ProfileIdentityCard: renders avatar with upload trigger and hidden file input", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <ProfileProvider
        user={{ email: "sarah@example.com" }}
        member={baseMember}
      >
        <ProfileIdentityCard member={baseMember} />
      </ProfileProvider>
    </DirectionProvider>
  );

  assert.ok(
    html.includes('type="file"'),
    "Expected hidden file input for photo"
  );
  assert.ok(
    html.includes('accept="image/jpeg,image/png,image/webp"'),
    "Expected image accept types on photo input"
  );
  assert.ok(
    html.includes("Upload new profile photo") ||
      html.includes("تغيير الصورة الشخصية"),
    "Expected change photo button"
  );
});

test("ProfileDocumentsCard: renders drag-and-drop upload zone when no CV exists", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <ProfileProvider
        user={{ email: "sarah@example.com" }}
        member={baseMember}
        initialCvFile={null}
      >
        <ProfileDocumentsCard member={baseMember} initialCvFile={null} />
      </ProfileProvider>
    </DirectionProvider>
  );

  assert.ok(
    html.includes("drag and drop your CV here") ||
      html.includes("اسحبه وأفلته هنا"),
    "Expected drag and drop prompt when no CV exists"
  );
  assert.ok(html.includes('type="file"'), "Expected file input for CV upload");
});

test("ProfileDocumentsCard: renders existing document view with verified badge, download, and replace", () => {
  const mockCvFile: MemberProfileFileDto = {
    id: "cv-file-uuid-123",
    category: "CV",
    originalName: "Sarah_Connor_Resume.pdf",
    sizeBytes: 1048576,
    mimeType: "application/pdf",
    createdAt: "2025-06-15T12:00:00.000Z",
  };

  const html = renderToStaticMarkup(
    <DirectionProvider>
      <ProfileProvider
        user={{ email: "sarah@example.com" }}
        member={baseMember}
        initialCvFile={mockCvFile}
      >
        <ProfileDocumentsCard member={baseMember} initialCvFile={mockCvFile} />
      </ProfileProvider>
    </DirectionProvider>
  );

  assert.ok(
    html.includes("Sarah_Connor_Resume.pdf"),
    "Expected original filename to be displayed"
  );
  assert.ok(
    html.includes("Verified") || html.includes("مستند معتمد"),
    "Expected verified badge"
  );
  assert.ok(
    html.includes("Download") || html.includes("تنزيل"),
    "Expected Download button"
  );
  assert.ok(
    html.includes("Replace") || html.includes("استبدال"),
    "Expected Replace CV button"
  );
});

test("ProfileDirectoryCard: renders compact layout with integrated opt-in toggle in edit mode", async () => {
  const { ProfileDirectoryCard } = await import("../ProfileDirectoryCard");

  const html = renderToStaticMarkup(
    <DirectionProvider>
      <ProfileProvider
        user={{ email: "sarah@example.com" }}
        member={{ ...baseMember, directoryOptIn: false }}
        completionRate={85}
        initialMode="edit"
      >
        <ProfileDirectoryCard
          member={{ ...baseMember, directoryOptIn: false }}
          completionRate={85}
        />
      </ProfileProvider>
    </DirectionProvider>
  );

  // Checkbox toggle must exist in edit mode
  assert.ok(
    html.includes('id="directoryOptInToggle"'),
    "Expected directoryOptInToggle checkbox to exist in edit mode"
  );

  // Redundant separate footer should NOT be present
  assert.ok(
    !html.includes("border-t-0 sm:pt-0"),
    "Expected redundant bottom duplicate footer to be removed"
  );

  // Explanatory line should appear only once
  const matches = html.match(
    /requires an active membership and 100% profile completion/gi
  );
  assert.strictEqual(
    matches?.length,
    1,
    "Expected explanation to appear only once, not duplicated across boxes"
  );
});
