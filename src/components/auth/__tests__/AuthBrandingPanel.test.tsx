import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DirectionProvider } from "@/components/common/DirectionProvider";
import { AuthBrandingPanel } from "../AuthBrandingPanel";
import { AUTH_STRINGS } from "@/lib/constants/authStrings";

test("AUTH-BRANDING 1: AUTH_STRINGS contains complete bilingual branding and signIn dictionaries", () => {
  assert.ok(AUTH_STRINGS.branding, "AUTH_STRINGS.branding must be defined");
  assert.ok(
    AUTH_STRINGS.branding.login,
    "AUTH_STRINGS.branding.login must be defined"
  );
  assert.ok(AUTH_STRINGS.signIn, "AUTH_STRINGS.signIn must be defined");

  // Check English and Arabic values for login branding
  assert.equal(
    AUTH_STRINGS.branding.login.heading.en,
    "Your professional workspace."
  );
  assert.equal(
    AUTH_STRINGS.branding.login.heading.ar,
    "مساحة عملك المهنية المتكاملة."
  );

  assert.ok(
    AUTH_STRINGS.branding.login.lead.en.includes("simulations, assessments")
  );
  assert.ok(
    AUTH_STRINGS.branding.login.lead.ar.includes("ألعاب محاكاة، وتقييمات")
  );

  assert.equal(AUTH_STRINGS.branding.login.bullets.length, 3);
  assert.equal(
    AUTH_STRINGS.branding.login.bullets[0].en,
    "Access the IBDL toolkit under your membership"
  );
  assert.equal(
    AUTH_STRINGS.branding.login.bullets[0].ar,
    "الوصول لمحفظة أدوات IBDL بموجب عضويتك"
  );

  assert.equal(
    AUTH_STRINGS.branding.login.bullets[1].en,
    "Submit programmes for IBDL accreditation"
  );
  assert.equal(
    AUTH_STRINGS.branding.login.bullets[1].ar,
    "تقديم البرامج والحقائب للاعتماد من IBDL"
  );

  assert.equal(
    AUTH_STRINGS.branding.login.bullets[2].en,
    "Follow every request through to completion"
  );
  assert.equal(
    AUTH_STRINGS.branding.login.bullets[2].ar,
    "متابعة تنفيذ كافة طلباتك واستشاراتك خطوة بخطوة"
  );

  assert.equal(
    AUTH_STRINGS.branding.login.logoAlt.en,
    "IBDL Freelancers Hub Logo"
  );
  assert.equal(
    AUTH_STRINGS.branding.login.logoAlt.ar,
    "شعار منصة المستقلين IBDL"
  );
});

test("AUTH-BRANDING 2: AuthBrandingPanel renders English text when locale is en", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider initialLocale="en">
      <AuthBrandingPanel type="login" />
    </DirectionProvider>
  );

  // Check English strings present
  assert.ok(
    html.includes("Your professional workspace."),
    "Should contain English heading"
  );
  assert.ok(
    html.includes("simulations, assessments, accreditation"),
    "Should contain English lead"
  );
  assert.ok(
    html.includes("Access the IBDL toolkit under your membership"),
    "Should contain English bullet 1"
  );
  assert.ok(
    html.includes("Submit programmes for IBDL accreditation"),
    "Should contain English bullet 2"
  );
  assert.ok(
    html.includes("Follow every request through to completion"),
    "Should contain English bullet 3"
  );
  assert.ok(
    html.includes('alt="IBDL Freelancers Hub Logo"'),
    "Should have English logo alt"
  );

  // Confirm NO Arabic strings leaked into English view
  assert.ok(
    !html.includes("مساحة عملك المهنية"),
    "Must NOT contain Arabic heading in EN mode"
  );
  assert.ok(
    !html.includes("الوصول لمحفظة أدوات"),
    "Must NOT contain Arabic bullet in EN mode"
  );
});

test("AUTH-BRANDING 3: AuthBrandingPanel renders Arabic text when locale is ar", () => {
  const html = renderToStaticMarkup(
    <DirectionProvider initialLocale="ar">
      <AuthBrandingPanel type="login" />
    </DirectionProvider>
  );

  // Check Arabic strings present
  assert.ok(
    html.includes("مساحة عملك المهنية المتكاملة."),
    "Should contain Arabic heading"
  );
  assert.ok(
    html.includes("ألعاب محاكاة، وتقييمات"),
    "Should contain Arabic lead"
  );
  assert.ok(
    html.includes("الوصول لمحفظة أدوات IBDL بموجب عضويتك"),
    "Should contain Arabic bullet 1"
  );
  assert.ok(
    html.includes("تقديم البرامج والحقائب للاعتماد من IBDL"),
    "Should contain Arabic bullet 2"
  );
  assert.ok(
    html.includes("متابعة تنفيذ كافة طلباتك واستشاراتك خطوة بخطوة"),
    "Should contain Arabic bullet 3"
  );
  assert.ok(
    html.includes('alt="شعار منصة المستقلين IBDL"'),
    "Should have Arabic logo alt"
  );

  // Confirm NO English strings leaked into Arabic view
  assert.ok(
    !html.includes("Your professional workspace."),
    "Must NOT contain English heading in AR mode"
  );
  assert.ok(
    !html.includes("Access the IBDL toolkit"),
    "Must NOT contain English bullet in AR mode"
  );
});

test("AUTH-BRANDING 4: Activate and ResetPassword panel variants switch accurately", () => {
  const activateHtmlEn = renderToStaticMarkup(
    <DirectionProvider initialLocale="en">
      <AuthBrandingPanel type="activate" />
    </DirectionProvider>
  );
  assert.ok(activateHtmlEn.includes("Activate your Hub account."));

  const activateHtmlAr = renderToStaticMarkup(
    <DirectionProvider initialLocale="ar">
      <AuthBrandingPanel type="activate" />
    </DirectionProvider>
  );
  assert.ok(activateHtmlAr.includes("تفعيل حسابك في المنصة."));

  const resetHtmlEn = renderToStaticMarkup(
    <DirectionProvider initialLocale="en">
      <AuthBrandingPanel type="resetPassword" />
    </DirectionProvider>
  );
  assert.ok(resetHtmlEn.includes("Reset your password."));

  const resetHtmlAr = renderToStaticMarkup(
    <DirectionProvider initialLocale="ar">
      <AuthBrandingPanel type="resetPassword" />
    </DirectionProvider>
  );
  assert.ok(resetHtmlAr.includes("إعادة ضبط كلمة المرور."));
});
