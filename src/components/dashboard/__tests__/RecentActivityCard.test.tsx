import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  RecentActivityCard,
  getActivityToneStyles,
} from "../RecentActivityCard";
import type { DashboardRecentActivityItem } from "../../../types/member";

test("FIX 3: Tone helper returns exact styling and dot classes for ok, now, stop", () => {
  // Test 1: 'ok' tone
  const okStyles = getActivityToneStyles("ok");
  assert.match(okStyles.badgeClasses, /emerald/i);
  assert.strictEqual(okStyles.dotClass, "bg-emerald-500");
  assert.strictEqual(okStyles.iconType, "ok");

  // Test 2: 'now' tone
  const nowStyles = getActivityToneStyles("now");
  assert.match(nowStyles.badgeClasses, /blue/i);
  assert.strictEqual(nowStyles.dotClass, "bg-blue-500");
  assert.strictEqual(nowStyles.iconType, "now");

  // Test 3: 'stop' tone
  const stopStyles = getActivityToneStyles("stop");
  assert.match(stopStyles.badgeClasses, /rose/i);
  assert.strictEqual(stopStyles.dotClass, "bg-rose-500");
  assert.strictEqual(stopStyles.iconType, "stop");
});

test("FIX 3: RecentActivityCard renders activity items styled with backend tones", () => {
  const mockActivities: DashboardRecentActivityItem[] = [
    {
      text: { en: "Registration completed", ar: "تم إكمال التسجيل" },
      date: "2026-09-19T10:00:00.000Z",
      tone: "ok",
    },
    {
      text: { en: "Profile updated", ar: "تم تحديث الملف الشخصي" },
      date: "2026-09-19T11:00:00.000Z",
      tone: "now",
    },
    {
      text: { en: "Session signed out", ar: "تم تسجيل الخروج من الجلسة" },
      date: "2026-09-19T12:00:00.000Z",
      tone: "stop",
    },
  ];

  // Render in English
  const htmlEn = renderToStaticMarkup(
    <RecentActivityCard recentActivity={mockActivities} isAr={false} />
  );

  assert.match(htmlEn, /Registration completed/i);
  assert.match(htmlEn, /Profile updated/i);
  assert.match(htmlEn, /Session signed out/i);
  assert.match(htmlEn, />OK</);
  assert.match(htmlEn, />NOW</);
  assert.match(htmlEn, />STOP</);

  // Render in Arabic
  const htmlAr = renderToStaticMarkup(
    <RecentActivityCard recentActivity={mockActivities} isAr={true} />
  );

  assert.ok(htmlAr.includes("تم إكمال التسجيل"));
  assert.ok(htmlAr.includes("تم تحديث الملف الشخصي"));
  assert.ok(htmlAr.includes("تم تسجيل الخروج من الجلسة"));
});

test("FIX 3: RecentActivityCard renders empty state when activity list is empty", () => {
  const htmlEmpty = renderToStaticMarkup(
    <RecentActivityCard recentActivity={[]} isAr={false} />
  );

  assert.match(htmlEmpty, /Nothing has happened on your account yet/i);
  assert.match(htmlEmpty, /ACT-58/);
});
