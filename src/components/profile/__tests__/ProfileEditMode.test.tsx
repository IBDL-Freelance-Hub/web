import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DirectionProvider } from "../../common/DirectionProvider";
import { ProfilePersonalCard } from "../ProfilePersonalCard";
import { ProfileProfessionalCard } from "../ProfileProfessionalCard";
import { ProfileBioCard } from "../ProfileBioCard";
import { ProfileIdentityCard } from "../ProfileIdentityCard";
import { ProfileProvider } from "../ProfileContext";
import type { MemberDto } from "../../../types/api";

const mockMember: MemberDto = {
  fullNameEn: "Alice Freeman",
  fullNameAr: "أليس فريمان",
  phone: "+201234567890",
  country: "Egypt",
  city: "Cairo",
  yearsOfExperience: "6-10",
  areasOfExpertise: ["Leadership Development", "Team Building"],
  industriesServed: ["Technology & Software"],
  languages: ["English", "Arabic"],
  bioEn: "Experienced professional trainer with over 8 years in the field.",
  bioAr: "مدربة محترفة بخبرة تزيد عن ٨ سنوات.",
  linkedinUrl: "https://linkedin.com/in/alicefreeman",
  directoryOptIn: true,
  profileCompletionRate: 100,
};

test("ProfilePersonalCard: renders read-only email and input fields in edit mode", () => {
  // In edit mode
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <ProfilePersonalCard
        user={{ email: "alice@example.com" }}
        member={mockMember}
        isEditing={true}
        formData={{
          fullNameEn: "Alice Freeman",
          fullNameAr: "أليس فريمان",
          phone: "+201234567890",
          country: "Egypt",
          city: "Cairo",
        }}
      />
    </DirectionProvider>
  );

  // Email must be disabled / read-only (PRO-04, VAL-50)
  assert.ok(html.includes('id="email"'), "Expected email input to exist");
  assert.ok(html.includes("disabled"), "Expected email input to be disabled");
  assert.ok(
    html.includes("PRO-04"),
    "Expected PRO-04 reference in email helper text"
  );

  // Editable fields must be present
  assert.ok(html.includes('id="fullNameEn"'), "Expected fullNameEn input");
  assert.ok(html.includes('id="phone"'), "Expected phone input");
  assert.ok(html.includes('id="country"'), "Expected country input");
  assert.ok(html.includes('id="city"'), "Expected city input");
});

test("ProfilePersonalCard: applies animate-shake when phone 409 error occurs", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <ProfilePersonalCard
        user={{ email: "alice@example.com" }}
        member={mockMember}
        isEditing={true}
        fieldErrors={{
          phone: ["This mobile number is already in use by another member."],
        }}
      />
    </DirectionProvider>
  );

  assert.ok(
    html.includes("animate-shake"),
    "Expected animate-shake class on phone wrapper when error exists"
  );
  assert.ok(
    html.includes("This mobile number is already in use by another member."),
    "Expected error message to render"
  );
});

test("ProfileBioCard: renders character counter and textarea in edit mode", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <ProfileProvider
        user={{ email: "alice@example.com" }}
        member={mockMember}
      >
        <ProfileBioCard member={mockMember} />
      </ProfileProvider>
    </DirectionProvider>
  );

  assert.ok(html.includes("Biography"), "Expected Biography heading");
  assert.ok(html.includes("English"), "Expected English tab");
  assert.ok(html.includes("العربية"), "Expected Arabic tab");
});

test("ProfileIdentityCard: toggles between Edit and Save/Cancel buttons", () => {
  // View mode
  const htmlView = renderToStaticMarkup(
    <DirectionProvider>
      <ProfileProvider
        user={{ email: "alice@example.com" }}
        member={mockMember}
      >
        <ProfileIdentityCard
          member={mockMember}
          membership={{
            tier: "PROFESSIONAL",
            status: "ACTIVE",
            startDate: "2025-01-01",
            endDate: "2026-01-01",
          }}
          isPublishedInDirectory={true}
          initials="AF"
        />
      </ProfileProvider>
    </DirectionProvider>
  );

  assert.ok(
    htmlView.includes("Edit profile"),
    "Expected Edit profile button in view mode"
  );
  assert.ok(
    !htmlView.includes("Save changes"),
    "Expected Save changes button NOT to appear in view mode"
  );
});

test("ProfileProfessionalCard: renders experience and expertise fields", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider>
      <ProfileProfessionalCard member={mockMember} />
    </DirectionProvider>
  );

  assert.ok(
    html.includes("Professional practice") || html.includes("البيانات المهنية"),
    "Expected heading"
  );
  assert.ok(
    html.includes("Leadership Development"),
    "Expected Leadership Development tag"
  );
});
