"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";

export function NextStepsSection() {
  const { formatNumber } = useLocale();

  const steps = [
    {
      num: "01",
      title: "Complete Essential Registration",
      desc: "Fill out your trainer details and upload your CV in under 2 minutes.",
    },
    {
      num: "02",
      title: "Access Free PQP™ Voucher",
      desc: "Receive immediate specimen credentials and access your complimentary diagnostic test.",
    },
    {
      num: "03",
      title: "Explore Simulation Catalog",
      desc: "Review 8 business games and diagnostic toolkits with 15% member discount.",
    },
    {
      num: "04",
      title: "Deliver & Scale Engagements",
      desc: "Deploy IBDL-backed tools to enterprise clients and earn certified facilitator status.",
    },
  ];

  return (
    <section className="border-brand-border/10 border-b bg-slate-950 px-4 py-20 text-start sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
            What Happens Next?
          </h2>
          <p className="text-sm text-slate-400 sm:text-base">
            Your 4-step journey to unlocking enterprise support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-brand-primary/80 border-brand-border/15 relative space-y-3 rounded-2xl border p-6"
            >
              <span className="text-brand-secondary block font-mono text-2xl font-extrabold">
                {formatNumber(step.num)}
              </span>
              <h3 className="text-base leading-snug font-bold text-white">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
