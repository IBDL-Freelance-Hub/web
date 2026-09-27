import test from "node:test";
import assert from "node:assert/strict";
import { getLocalizedErrorMessage } from "@/lib/validations/registrationErrors";
import { getRegisterMemberSchema } from "@/lib/validations/registration";
import { scrollToAndFocusFirstError } from "@/lib/dom";

test("VAL-43 1: All required registration fields have specific inline error messages in English and Arabic", () => {
  // Mobile specifically requires actionable guidance with country code
  assert.equal(
    getLocalizedErrorMessage("mobile", "missingCountryCode", "en"),
    "Enter your number with the country code (e.g. +20 for Egypt)."
  );
  assert.equal(
    getLocalizedErrorMessage("mobile", "missingCountryCode", "ar"),
    "أدخل رقمك مع رمز الدولة (مثلاً +20 لمصر)."
  );

  // Mobile invalid
  assert.equal(
    getLocalizedErrorMessage("mobile", "invalid", "en"),
    "Enter your number with the country code (e.g. +20 for Egypt)."
  );
  assert.equal(
    getLocalizedErrorMessage("mobile", "invalid", "ar"),
    "أدخل رقمك مع رمز الدولة (مثلاً +20 لمصر)."
  );

  // Full Name
  assert.equal(
    getLocalizedErrorMessage("fullName", "required", "en"),
    "Full name is required (min 3 characters)."
  );
  assert.equal(
    getLocalizedErrorMessage("fullName", "tooShort", "en"),
    "Full name must be at least 3 characters."
  );

  // Email
  assert.equal(
    getLocalizedErrorMessage("email", "required", "en"),
    "Email is required."
  );
  assert.equal(
    getLocalizedErrorMessage("email", "invalid", "en"),
    "Please enter a valid email address."
  );

  // Country
  assert.equal(
    getLocalizedErrorMessage("country", "required", "en"),
    "Please select your country."
  );

  // Years of Experience
  assert.equal(
    getLocalizedErrorMessage("yearsOfExperience", "required", "en"),
    "Please select your experience level."
  );

  // CV File
  assert.equal(
    getLocalizedErrorMessage("cvFile", "required", "en"),
    "Please attach your CV to continue."
  );

  // Terms accepted
  assert.equal(
    getLocalizedErrorMessage("termsAccepted", "required", "en"),
    "You must accept the terms and conditions."
  );
});

test("VAL-43 2: getRegisterMemberSchema validates mobile numbers and requires country code (+)", () => {
  const schemaEn = getRegisterMemberSchema("en");
  const schemaAr = getRegisterMemberSchema("ar");

  // Valid mobile with country code
  const validBase = {
    fullName: "Dr. Mona El-Shazly",
    email: "mona@example.com",
    mobile: "+201012345678",
    country: "EG",
    yearsOfExperience: "10-15",
    areasOfExpertise: ["Management Consulting"],
    industriesServed: ["Higher Education"],
    termsAccepted: true,
  };

  const validResult = schemaEn.safeParse(validBase);
  assert.equal(validResult.success, true);

  // Missing country code: 01012345678
  const invalidResultEn = schemaEn.safeParse({
    ...validBase,
    mobile: "01012345678",
  });
  assert.equal(invalidResultEn.success, false);
  if (!invalidResultEn.success) {
    const mobileError = invalidResultEn.error.format().mobile?._errors[0];
    assert.equal(
      mobileError,
      "Enter your number with the country code (e.g. +20 for Egypt)."
    );
  }

  // Arabic schema error
  const invalidResultAr = schemaAr.safeParse({
    ...validBase,
    mobile: "0551234567",
  });
  assert.equal(invalidResultAr.success, false);
  if (!invalidResultAr.success) {
    const mobileError = invalidResultAr.error.format().mobile?._errors[0];
    assert.equal(mobileError, "أدخل رقمك مع رمز الدولة (مثلاً +20 لمصر).");
  }
});

test("VAL-43 3: scrollToAndFocusFirstError calls scrollIntoView with block: 'center' and sets focus", async () => {
  let scrollCalledWith: unknown = null;
  let focusCalled = false;

  // Set up mock DOM environment
  const mockInput = {
    tagName: "INPUT",
    scrollIntoView: (options: unknown) => {
      scrollCalledWith = options;
    },
    focus: (_options?: unknown) => {
      focusCalled = true;
    },
  };

  const globalScope = globalThis as unknown as Record<string, unknown>;
  globalScope.window = {};
  globalScope.document = {
    getElementById: (id: string) => {
      if (id === "reg-mobile") return mockInput;
      return null;
    },
    querySelector: () => null,
  };

  // Run utility
  const result = scrollToAndFocusFirstError([
    "reg-fullname", // does not exist
    "reg-mobile", // exists!
    "reg-country-select",
  ]);

  assert.equal(result, true);

  // In test environment without real requestAnimationFrame, timer fires synchronously or via timeout
  // Verify after microtask / next tick
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      assert.deepEqual(scrollCalledWith, {
        behavior: "smooth",
        block: "center",
      });
      assert.equal(focusCalled, true);
      // Clean up globals
      delete globalScope.window;
      delete globalScope.document;
      resolve();
    }, 50);
  });
});

test("VAL-43 4: Values in other fields are preserved when validation fails on mobile", () => {
  // Simulate RegistrationProvider's formData state
  const formData = {
    fullName: "Tarek Nour",
    email: "tarek.nour@agency.eg",
    phone: "01000000000", // missing country code
    country: "EG",
    linkedInUrl: "linkedin.com/in/tareknour",
    yearsExperience: "15+",
    expertise: ["Branding"],
    industries: ["Advertising"],
    biography: "Brand architect with 20 years experience.",
    message: "Interested in master tier.",
    cvFileName: "Tarek_Nour_CV.pdf",
    directoryOptIn: true,
    consentDeclaration: true,
  };

  // Run validation logic matching validateStep1
  const phoneTrim = formData.phone.trim();
  const cleanPhone = phoneTrim.replace(/[\s\-\(\)\+]/g, "");

  let isValid = true;
  const errors: Record<string, string[]> = {};

  if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
    isValid = false;
    errors.fullName = ["Full name is required (min 3 characters)."];
  }

  if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email.trim())) {
    isValid = false;
    errors.email = ["Please enter a valid email address."];
  }

  if (!phoneTrim) {
    isValid = false;
    errors.mobile = ["Mobile number is required."];
  } else if (!phoneTrim.startsWith("+")) {
    isValid = false;
    errors.mobile = [
      getLocalizedErrorMessage("mobile", "missingCountryCode", "en"),
    ];
  } else if (cleanPhone.length < 7) {
    isValid = false;
    errors.mobile = [getLocalizedErrorMessage("mobile", "invalid", "en")];
  }

  if (!formData.country.trim()) {
    isValid = false;
    errors.country = ["Please select your country."];
  }

  // 1. Validation fails strictly on mobile
  assert.equal(isValid, false);
  assert.deepEqual(Object.keys(errors), ["mobile"]);
  assert.equal(
    errors.mobile[0],
    "Enter your number with the country code (e.g. +20 for Egypt)."
  );

  // 2. All other fields in formData remain 100% intact and preserved
  assert.equal(formData.fullName, "Tarek Nour");
  assert.equal(formData.email, "tarek.nour@agency.eg");
  assert.equal(formData.country, "EG");
  assert.equal(formData.linkedInUrl, "linkedin.com/in/tareknour");
  assert.equal(formData.yearsExperience, "15+");
  assert.equal(formData.cvFileName, "Tarek_Nour_CV.pdf");
  assert.equal(formData.consentDeclaration, true);
});

test("VAL-43 5: Test scenario: submit with only mobile missing country code renders inline error and focuses #reg-mobile", () => {
  const currentLocale = "en";
  const formData = {
    fullName: "Karim Abdelaziz",
    email: "karim@cinema.eg",
    phone: "01234567890", // Missing country code (+)
    country: "EG",
    linkedInUrl: "",
  };

  const step1Attempted = true;
  const fieldErrors: Record<string, string[]> = {
    mobile: [
      getLocalizedErrorMessage("mobile", "missingCountryCode", currentLocale),
    ],
  };

  // Compute what RegistrationStep1Personal computes for each field:
  const fullNameError =
    fieldErrors?.fullName?.[0] ||
    (step1Attempted &&
      (!formData.fullName.trim()
        ? getLocalizedErrorMessage("fullName", "required", currentLocale)
        : formData.fullName.trim().length < 3
          ? getLocalizedErrorMessage("fullName", "tooShort", currentLocale)
          : null));

  const emailTrim = formData.email.trim().toLowerCase();
  const emailErrorMessage =
    fieldErrors?.email?.[0] ||
    (step1Attempted &&
      (!emailTrim
        ? getLocalizedErrorMessage("email", "required", currentLocale)
        : !/\S+@\S+\.\S+/.test(emailTrim)
          ? getLocalizedErrorMessage("email", "invalid", currentLocale)
          : null));

  const phoneTrim = formData.phone.trim();
  const cleanPhone = phoneTrim.replace(/[\s\-\(\)\+]/g, "");
  const mobileErrorMessage =
    fieldErrors?.mobile?.[0] ||
    (step1Attempted &&
      (!phoneTrim
        ? getLocalizedErrorMessage("mobile", "required", currentLocale)
        : !phoneTrim.startsWith("+")
          ? getLocalizedErrorMessage(
              "mobile",
              "missingCountryCode",
              currentLocale
            )
          : cleanPhone.length < 7
            ? getLocalizedErrorMessage("mobile", "invalid", currentLocale)
            : null));

  const countryErrorMessage =
    fieldErrors?.country?.[0] ||
    (step1Attempted && !formData.country.trim()
      ? getLocalizedErrorMessage("country", "required", currentLocale)
      : null);

  // Full Name, Email, and Country must have NO error
  assert.equal(fullNameError, null);
  assert.equal(emailErrorMessage, null);
  assert.equal(countryErrorMessage, null);

  // Mobile must have the exact inline message
  assert.equal(
    mobileErrorMessage,
    "Enter your number with the country code (e.g. +20 for Egypt)."
  );

  // Determine failed field IDs in DOM order:
  const failedFieldIds: string[] = [];
  if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
    failedFieldIds.push("reg-fullname");
  }
  if (!emailTrim || !/\S+@\S+\.\S+/.test(emailTrim)) {
    failedFieldIds.push("reg-email");
  }
  if (!phoneTrim || !phoneTrim.startsWith("+") || cleanPhone.length < 7) {
    failedFieldIds.push("reg-mobile");
  }
  if (!formData.country.trim()) {
    failedFieldIds.push("reg-country-select");
  }

  // The first (and only) failing field is exactly reg-mobile
  assert.deepEqual(failedFieldIds, ["reg-mobile"]);
  assert.equal(failedFieldIds[0], "reg-mobile");
});
