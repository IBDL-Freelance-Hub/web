import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  COUNTRIES,
  getCountryByCode,
  getCountryLabel,
} from "@/data/registrationFormData";
import { CustomSelect } from "../steps/CustomSelect";

// Approved 30-country ordered list from the registration spec
const EXPECTED_30_COUNTRIES = [
  "Egypt",
  "Saudi Arabia",
  "UAE",
  "Kuwait",
  "Qatar",
  "Bahrain",
  "Oman",
  "Jordan",
  "Lebanon",
  "Iraq",
  "Palestine",
  "Syria",
  "Yemen",
  "Libya",
  "Tunisia",
  "Algeria",
  "Morocco",
  "Sudan",
  "UK",
  "US",
  "Canada",
  "Germany",
  "France",
  "Türkiye",
  "Pakistan",
  "India",
  "Nigeria",
  "Kenya",
  "South Africa",
  "Other",
];

test("REG-COUNTRY 1: Bilingual country list has exactly 30 approved countries in exact specified order", () => {
  assert.equal(
    COUNTRIES.length,
    30,
    `Expected exactly 30 countries, found ${COUNTRIES.length}`
  );

  const actualNamesEn = COUNTRIES.map((c) => c.nameEn);
  assert.deepEqual(
    actualNamesEn,
    EXPECTED_30_COUNTRIES,
    "The 30-country list must match the approved spec ordered list"
  );

  // Confirm each entry has non-empty code, nameEn, nameAr
  for (const country of COUNTRIES) {
    assert.ok(
      country.code && country.code.trim().length > 0,
      `Country ${country.nameEn} must have a valid code`
    );
    assert.ok(
      country.nameEn && country.nameEn.trim().length > 0,
      `Country ${country.code} must have an English name`
    );
    assert.ok(
      country.nameAr && country.nameAr.trim().length > 0,
      `Country ${country.code} must have an Arabic name`
    );
  }

  // Ensure codes are unique (no duplicates)
  const codes = new Set(COUNTRIES.map((c) => c.code));
  assert.equal(
    codes.size,
    30,
    "Each of the 30 countries must have a unique stable code"
  );
});

test("REG-COUNTRY 2: Select country in English, switch to Arabic -> stays selected and displays in Arabic (not reset to placeholder)", () => {
  const selectedCode = "EG";
  const enPlaceholder = "Select Country";
  const arPlaceholder = "اختر الدولة";

  // 1. Render in English
  const englishOptions = COUNTRIES.map((c) => ({
    value: c.code,
    label: c.nameEn,
  }));

  const htmlEn = renderToStaticMarkup(
    <CustomSelect
      id="reg-country-select"
      value={selectedCode}
      onChange={() => {}}
      options={englishOptions}
      placeholder={enPlaceholder}
    />
  );

  // Must show "Egypt", not placeholder
  assert.ok(
    htmlEn.includes("Egypt"),
    "English render should display 'Egypt' for code 'EG'"
  );
  assert.ok(
    !htmlEn.includes(enPlaceholder),
    "English render should NOT display the placeholder when country is selected"
  );

  // 2. Switch language to Arabic with the SAME stored code 'EG'
  const arabicOptions = COUNTRIES.map((c) => ({
    value: c.code,
    label: c.nameAr,
  }));

  const htmlAr = renderToStaticMarkup(
    <CustomSelect
      id="reg-country-select"
      value={selectedCode}
      onChange={() => {}}
      options={arabicOptions}
      placeholder={arPlaceholder}
    />
  );

  // Must show "مصر", NOT the Arabic placeholder "اختر الدولة", and NOT English "Egypt"
  assert.ok(
    htmlAr.includes("مصر"),
    "Arabic render should display 'مصر' for code 'EG' when language is switched"
  );
  assert.ok(
    !htmlAr.includes(arPlaceholder),
    "Arabic render should NOT reset to the placeholder 'اختر الدولة'"
  );
  assert.ok(
    !htmlAr.includes("Egypt"),
    "Arabic render should display Arabic name rather than English name"
  );
});

test("REG-COUNTRY 3: Language toggle preserves selection across multiple distinct countries", () => {
  const testCases = [
    { code: "SA", en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
    { code: "AE", en: "UAE", ar: "الإمارات العربية المتحدة" },
    { code: "DE", en: "Germany", ar: "ألمانيا" },
    { code: "TR", en: "Türkiye", ar: "تركيا" },
    { code: "OTHER", en: "Other", ar: "أخرى" },
  ];

  for (const { code, en, ar } of testCases) {
    // English view
    const htmlEn = renderToStaticMarkup(
      <CustomSelect
        value={code}
        onChange={() => {}}
        options={COUNTRIES.map((c) => ({ value: c.code, label: c.nameEn }))}
        placeholder="Select Country"
      />
    );
    assert.ok(
      htmlEn.includes(en),
      `Expected English label '${en}' for code '${code}'`
    );

    // Switch to Arabic
    const htmlAr = renderToStaticMarkup(
      <CustomSelect
        value={code}
        onChange={() => {}}
        options={COUNTRIES.map((c) => ({ value: c.code, label: c.nameAr }))}
        placeholder="اختر الدولة"
      />
    );
    assert.ok(
      htmlAr.includes(ar),
      `Expected Arabic label '${ar}' for code '${code}' after language switch`
    );
    assert.ok(
      !htmlAr.includes("اختر الدولة"),
      `Should not show placeholder for '${code}'`
    );
  }
});

test("REG-COUNTRY 4: getCountryLabel helper returns correct bilingual labels and handles lookups gracefully", () => {
  assert.equal(getCountryLabel("EG", "en"), "Egypt");
  assert.equal(getCountryLabel("EG", "ar"), "مصر");
  assert.equal(getCountryLabel("SA", "en"), "Saudi Arabia");
  assert.equal(getCountryLabel("SA", "ar"), "المملكة العربية السعودية");
  assert.equal(getCountryLabel("UNKNOWN", "en"), "UNKNOWN");

  const egypt = getCountryByCode("EG");
  assert.equal(egypt?.nameEn, "Egypt");
  assert.equal(egypt?.nameAr, "مصر");
});
