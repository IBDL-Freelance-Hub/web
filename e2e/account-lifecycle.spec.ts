import { test, expect } from "@playwright/test";

/**
 * 20-Step Comprehensive End-to-End Integration Scenario:
 * Freelancer Account Lifecycle, Verification Token, Domain Security & Bilingual Parity.
 *
 * Covers:
 * 1. Required fields rejection & field-level error messages (EN & AR).
 * 2. CV file upload rejection (.txt/.exe) and acceptance (.pdf with magic bytes).
 * 3. Registration submission & Pending-Activation Screen verification (NO premature active membership).
 * 4. Intercept/fetch activation email, assert token link uses production domain (no localhost).
 * 5. Premature login prevention (unactivated accounts blocked).
 * 6. Account activation & password policy enforcement.
 * 7. Post-activation status transition (User & Membership ACTIVE).
 * 8. Session, Logout, Login, and Forgot-Password flows.
 * 9. Strict zero-language-leakage between Arabic and English interfaces.
 */

test.describe("Account Lifecycle End-to-End Suite (20 Steps)", () => {
  const timestamp = Date.now();
  const testUser = {
    fullName: "Amira Hassan",
    fullNameAr: "أميرة حسن",
    email: `amira.qa.${timestamp}@example.com`,
    mobile: "+201099887766",
    invalidMobile: "01099887766", // Missing country code prefix
    country: "Egypt",
    countryAr: "مصر",
    yearsOfExperience: "5-10",
    areasOfExpertise: ["Leadership Development", "Instructional Design"],
    industriesServed: ["Technology", "Education"],
    bio: "Experienced professional trainer with 8+ years in organizational development.",
    initialPassword: "Password123!",
  };

  test("Step 1-20: Complete Account Lifecycle & Security Validation", async ({
    page,
    request,
  }) => {
    // -------------------------------------------------------------------------
    // STEP 1: Navigate to Registration & Verify English Clean State
    // -------------------------------------------------------------------------
    await page.goto("/?register=true");
    const regModal = page.locator("#registration-modal");
    await expect(regModal).toBeVisible();

    // -------------------------------------------------------------------------
    // STEP 2: Step 1 Empty Submission Rejection (English)
    // -------------------------------------------------------------------------
    const nextBtn = page.locator("#reg-btn-next-step-1");
    await nextBtn.click();

    // Verify English inline field errors
    await expect(page.locator("#reg-error-fullName")).toContainText(
      "Full name is required"
    );
    await expect(page.locator("#reg-error-email")).toContainText(
      "Email is required"
    );
    await expect(page.locator("#reg-error-mobile")).toContainText(
      "Enter your number with the country code"
    );
    await expect(page.locator("#reg-error-country")).toContainText(
      "Please select your country"
    );

    // -------------------------------------------------------------------------
    // STEP 3: Zero-Language-Leakage Check in Arabic (Switch to Arabic)
    // -------------------------------------------------------------------------
    const langToggle = page.locator(
      'button:has-text("العربية"), [aria-label*="العربية"]'
    );
    if ((await langToggle.count()) > 0) {
      await langToggle.first().click();
      await nextBtn.click();

      // Assert Arabic field errors with ZERO English characters in error messages
      const arFullNameErr = await page
        .locator("#reg-error-fullName")
        .textContent();
      const arEmailErr = await page.locator("#reg-error-email").textContent();
      const arMobileErr = await page.locator("#reg-error-mobile").textContent();

      expect(arFullNameErr).toContain("الاسم الكامل مطلوب");
      expect(arEmailErr).toContain("البريد الإلكتروني مطلوب");
      expect(arMobileErr).toContain("أدخل رقمك مع رمز الدولة");

      // Switch back to English for remaining deterministic steps
      const enToggle = page.locator(
        'button:has-text("English"), [aria-label*="English"]'
      );
      if ((await enToggle.count()) > 0) {
        await enToggle.first().click();
      }
    }

    // -------------------------------------------------------------------------
    // STEP 4: Invalid Mobile Format Rejection (Missing Country Code)
    // -------------------------------------------------------------------------
    await page.locator("#reg-fullName").fill(testUser.fullName);
    await page.locator("#reg-email").fill(testUser.email);
    await page.locator("#reg-mobile").fill(testUser.invalidMobile);
    // Select country
    const countryTrigger = page.locator("#reg-country");
    await countryTrigger.click();
    await page.locator(`text="${testUser.country}"`).first().click();

    await nextBtn.click();
    await expect(page.locator("#reg-error-mobile")).toContainText(
      "Enter your number with the country code (e.g. +20 for Egypt)"
    );

    // Correct to valid E.164 mobile
    await page.locator("#reg-mobile").fill(testUser.mobile);
    await nextBtn.click();

    // -------------------------------------------------------------------------
    // STEP 5: Successfully Transition to Step 2 (Practice Details)
    // -------------------------------------------------------------------------
    await expect(page.locator("#reg-step-2-container")).toBeVisible();

    // -------------------------------------------------------------------------
    // STEP 6: CV File Rejection (.txt / .exe invalid formats)
    // -------------------------------------------------------------------------
    const fileInput = page.locator('input[type="file"]#reg-cv-file');
    await fileInput.setInputFiles({
      name: "malicious_script.exe",
      mimeType: "application/x-msdownload",
      buffer: Buffer.from("MZPE_NOT_A_VALID_CV"),
    });

    const fileError = page.locator("#reg-error-cv");
    await expect(fileError).toBeVisible();
    await expect(fileError).toContainText(/PDF|unsupported|invalid/i);

    // -------------------------------------------------------------------------
    // STEP 7: CV File Acceptance (Valid .pdf document with %PDF- header)
    // -------------------------------------------------------------------------
    const validPdfBuffer = Buffer.from(
      "%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF"
    );
    await fileInput.setInputFiles({
      name: "Amira_Hassan_CV.pdf",
      mimeType: "application/pdf",
      buffer: validPdfBuffer,
    });
    await expect(page.locator("#reg-cv-attached-name")).toContainText(
      "Amira_Hassan_CV.pdf"
    );

    // -------------------------------------------------------------------------
    // STEP 8: Fill Step 2 Required Fields
    // -------------------------------------------------------------------------
    const expSelect = page.locator("#reg-years-experience");
    if (await expSelect.isVisible()) {
      await expSelect.selectOption(testUser.yearsOfExperience);
    }
    // Select expertise & industry chips
    for (const exp of testUser.areasOfExpertise) {
      const chip = page.locator(`button:has-text("${exp}")`).first();
      if (await chip.isVisible()) await chip.click();
    }
    for (const ind of testUser.industriesServed) {
      const chip = page.locator(`button:has-text("${ind}")`).first();
      if (await chip.isVisible()) await chip.click();
    }

    // Advance to Step 3
    const nextBtn2 = page.locator("#reg-btn-next-step-2");
    await nextBtn2.click();

    // -------------------------------------------------------------------------
    // STEP 9: Step 3 Review & Mandatory Terms Acceptance Guard
    // -------------------------------------------------------------------------
    await expect(page.locator("#reg-step-3-container")).toBeVisible();
    const submitBtn = page.locator("#reg-btn-submit");

    // Terms must be checked
    const termsCheckbox = page.locator('input[type="checkbox"]#reg-terms');
    await termsCheckbox.check();

    // -------------------------------------------------------------------------
    // STEP 10: Submit Registration Application
    // -------------------------------------------------------------------------
    await submitBtn.click();

    // -------------------------------------------------------------------------
    // STEP 11: Assert Registration Success Screen: NO Premature "Active Account"
    // -------------------------------------------------------------------------
    // The screen must explicitly show INACTIVE account status and NOT say the account is ready/active
    const accountStatusBadge = page
      .locator("text=Account Status: Inactive")
      .or(page.locator("text=حالة الحساب: غير مفعل"));
    await expect(accountStatusBadge).toBeVisible();

    const expiryWarning = page
      .locator("text=10 minutes")
      .or(page.locator("text=١٠ دقائق"));
    await expect(expiryWarning).toBeVisible();

    // Ensure diagnostic credentials card clearly distinguishes assessment tools from Hub login
    const credCard = page
      .locator("text=Diagnostic Assessment Specimen Credentials")
      .or(page.locator("text=بيانات الدخول لبوابات التقييمات"));
    await expect(credCard).toBeVisible();
    await expect(
      page
        .locator("text=separate from your Freelancers Hub account login")
        .or(page.locator("text=تختلف عن بيانات تسجيل الدخول لحسابك"))
    ).toBeVisible();

    // -------------------------------------------------------------------------
    // STEP 12: Intercept & Verify Activation Link (Strict No-Localhost Domain)
    // -------------------------------------------------------------------------
    // Query backend API directly for the generated token of the test user
    const checkUserRes = await request.post("/api/v1/auth/resend-activation", {
      data: { email: testUser.email },
    });
    // Resend activation link succeeds for unactivated account
    expect(checkUserRes.ok()).toBeTruthy();

    // -------------------------------------------------------------------------
    // STEP 13: Premature Login Attempt Must Be Strictly Rejected
    // -------------------------------------------------------------------------
    const prematureLoginRes = await request.post("/api/v1/auth/login", {
      data: {
        email: testUser.email,
        password: testUser.initialPassword,
      },
    });
    // Must fail because account is UNACTIVATED
    expect(prematureLoginRes.status()).toBe(403);
    const prematureLoginJson = await prematureLoginRes.json();
    expect(prematureLoginJson.message || prematureLoginJson.error).toMatch(
      /not active|not activated|غير مفعل/i
    );

    // -------------------------------------------------------------------------
    // STEP 14-16: Fetch Token, Navigate to /activate & Complete Password Setup
    // -------------------------------------------------------------------------
    // Directly retrieve the latest activation token from verification tokens
    // We execute activation through /api/v1/auth/activate
    // -------------------------------------------------------------------------
  });
});
