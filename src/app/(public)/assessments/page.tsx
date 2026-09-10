"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { useToast } from "@/components/ui/Toast";
import { LineChart, Download, ShieldCheck, ChevronRight } from "lucide-react";

export default function AssessmentsCataloguePage() {
  const { openRegistration } = useRegistration();
  const { showToast } = useToast();

  const diagnostics = [
    {
      title: "PQP™ — Personal Qualification Profile",
      subtitle: "Trainer & Professional Capability Battery",
      badge: "Included Free on Signup",
      description:
        "Evaluates 11 core competencies for corporate trainers, instructional designers, and executive facilitators. Identifies skill gaps and facilitation readiness.",
      features: [
        "Automated psychometric report generation",
        "Benchmark against IBDL international standards",
        "Includes 1 free credit upon Hub registration",
      ],
    },
    {
      title: "CPAT™ — Corporate Performance Diagnostic",
      subtitle: "Organizational Health & Leadership Assessment",
      badge: "Enterprise Diagnostic",
      description:
        "Measures corporate team alignment, strategic execution readiness, and leadership effectiveness across multi-tier business units.",
      features: [
        "Multi-rater 360-degree diagnostic feedback",
        "Executive dashboard for client presentation",
        "Pre-and-post workshop ROI measurement",
      ],
    },
    {
      title: "Management Drives® Integration",
      subtitle: "Behavioral Drivers & Team Dynamics Engine",
      badge: "Strategic Partner Tool",
      description:
        "Maps core psychological drivers, leadership styles, and cultural team energy blocks using color-coded behavioral profiles.",
      features: [
        "Individual & team driver software profiles",
        "Conflict resolution & team synergy debriefs",
        "Certified debriefer support via Freelancers Hub",
      ],
    },
  ];

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 pt-28 pb-12 text-start sm:px-6 sm:pt-32 lg:px-8">
      {/* Context Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="transition hover:text-white">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-white">Assessment Tools & PQP™</span>
      </nav>

      {/* Header Headline */}
      <div className="max-w-3xl space-y-4">
        <div className="bg-brand-secondary/15 border-brand-secondary/30 text-brand-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold">
          <LineChart className="h-4 w-4" />
          <span>Executive Diagnostic Toolkits</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Objective diagnostic batteries for{" "}
          <span className="text-brand-secondary">leadership teams.</span>
        </h1>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          Provide data-backed corporate diagnostics before and after your
          training engagements. Deliver measurable ROI for client sponsors.
        </p>
      </div>

      {/* Catalog Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {diagnostics.map((item, idx) => (
          <div
            key={idx}
            className="border-brand-border/15 hover:border-brand-secondary/50 group flex flex-col justify-between space-y-6 rounded-2xl border bg-slate-900/90 p-8 transition"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <StatusPill tone="ok">{item.badge}</StatusPill>
              </div>

              <div>
                <h3 className="group-hover:text-brand-secondary text-xl font-bold text-white transition">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  {item.subtitle}
                </p>
              </div>

              <p className="text-xs leading-relaxed text-slate-300">
                {item.description}
              </p>

              <ul className="space-y-2 pt-2 text-xs text-slate-400">
                {item.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="bg-brand-secondary h-1.5 w-1.5 shrink-0 rounded-full" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-800 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-1/2"
                onClick={() =>
                  showToast(
                    "info",
                    "Specimen Report Initiated",
                    `Downloading sample report for ${item.title}.`,
                    "public"
                  )
                }
              >
                <Download className="me-1 h-3.5 w-3.5" /> Specimen
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-1/2"
                onClick={openRegistration}
              >
                <ShieldCheck className="me-1 h-3.5 w-3.5" /> Deploy Tool
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
