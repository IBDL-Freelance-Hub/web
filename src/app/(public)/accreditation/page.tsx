"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { Award, ShieldCheck, ChevronRight, CheckCircle2 } from "lucide-react";

export default function AccreditationCataloguePage() {
  const { openRegistration } = useRegistration();

  const programs = [
    {
      title: "IBDL Accredited Trainer (IAT™)",
      subtitle: "Trainer Profile & Facilitation Verification",
      badge: "Individual Credential",
      description:
        "Rigorous verification of your academic background, facilitation hours, and subject matter expertise. Gain the official IBDL Accredited Trainer seal.",
      criteria: [
        "Minimum 3+ years verified training facilitation experience",
        "PQP™ assessment score verification",
        "Digital verifiable badge with QR authenticity code",
      ],
    },
    {
      title: "IBDL Content Endorsement (ICE™)",
      subtitle: "Workshop Materials & Curriculum Seal",
      badge: "Course Credential",
      description:
        "Submit your custom workshop slides, participant workbooks, and case studies for academic review and formal IBDL seal of endorsement.",
      criteria: [
        "Evaluation against Bloom's Taxonomy learning objectives",
        "Bilingual formatting & instructional design review",
        "Official co-branded certificate issuance privileges",
      ],
    },
    {
      title: "Master Facilitator & Corporate Partner",
      subtitle: "Enterprise RFP Institutional Endorsement",
      badge: "Master Credential",
      description:
        "For senior consultants bidding on large corporate RFPs requiring international institutional backing and master facilitator credentials.",
      criteria: [
        "10+ years executive facilitation track record",
        "Direct joint-bid support for corporate tenders",
        "Dedicated IBDL academic board reviewer assigned",
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
        <span className="text-white">IBDL Training Accreditation</span>
      </nav>

      {/* Header Headline */}
      <div className="max-w-3xl space-y-4">
        <div className="bg-brand-secondary/15 border-brand-secondary/30 text-brand-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold">
          <Award className="h-4 w-4" />
          <span>International Endorsement</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          International institutional endorsement for{" "}
          <span className="text-brand-secondary">trainers & content.</span>
        </h1>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          Differentiate your practice in competitive markets with globally
          recognized credentials issued directly by IBDL Learning Group.
        </p>
      </div>

      {/* Catalog Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {programs.map((item, idx) => (
          <div
            key={idx}
            className="border-brand-border/15 hover:border-brand-secondary/50 group flex flex-col justify-between space-y-6 rounded-2xl border bg-slate-900/90 p-8 transition"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <StatusPill tone="info">{item.badge}</StatusPill>
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

              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <p className="font-semibold text-slate-400">
                  Key Criteria & Benefits:
                </p>
                {item.criteria.map((crit, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span className="text-slate-300">{crit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={openRegistration}
              >
                <ShieldCheck className="me-1.5 h-4 w-4" /> Apply for
                Accreditation
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
