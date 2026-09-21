import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CompletionGaugeCard } from "../CompletionGaugeCard";

test("CompletionGaugeCard: when completion is under 100%, displays yellow/amber gauge and In Progress status", () => {
  const html = renderToStaticMarkup(
    <CompletionGaugeCard completionRate={91} completedCount={10} isAr={false} />
  );

  assert.match(
    html,
    /text-amber-500/,
    "Expected progress arc / icon to have yellow/amber color (text-amber-500) when < 100%"
  );
  assert.match(
    html,
    /In progress/i,
    "Expected status text to display 'In progress' when < 100%"
  );
  assert.doesNotMatch(
    html,
    /text-emerald-500/,
    "Expected progress arc NOT to have green color when < 100%"
  );
});

test("CompletionGaugeCard: when completion reaches 100%, displays green gauge and Complete status", () => {
  const html = renderToStaticMarkup(
    <CompletionGaugeCard
      completionRate={100}
      completedCount={11}
      isAr={false}
    />
  );

  assert.match(
    html,
    /text-emerald-500/,
    "Expected progress arc to have green color (text-emerald-500) when = 100%"
  );
  assert.match(
    html,
    /Complete/i,
    "Expected status text to display 'Complete' when = 100%"
  );
  assert.match(
    html,
    /text-emerald-600/,
    "Expected label to have emerald text when = 100%"
  );
});
