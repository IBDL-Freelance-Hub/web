"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { useToast } from "@/components/ui/Toast";
import { Gamepad2, Download, ShieldCheck, ChevronRight } from "lucide-react";

export default function GamesCataloguePage() {
  const { openRegistration } = useRegistration();
  const { showToast } = useToast();

  const games = [
    {
      title: "Strategic Victory™",
      tagline: "Executive Strategy & Market Competition Simulation",
      players: "12 - 30 Participants",
      duration: "1 to 2 Days",
      description:
        "Teams navigate complex market entries, capital allocation, and competitive positioning in real-time round-based scenarios.",
      badge: "Flagship Game",
    },
    {
      title: "Master Board Game™",
      tagline: "Corporate Governance & Financial Decision Making",
      players: "8 - 24 Participants",
      duration: "1 Day",
      description:
        "Simulates board-level P&L responsibility, balance sheet optimization, and stakeholder management.",
      badge: "Executive Favorite",
    },
    {
      title: "Sparta™",
      tagline: "Operational Excellence & Supply Chain Resilience",
      players: "10 - 20 Participants",
      duration: "Half-Day / 1 Day",
      description:
        "Focuses on lean operations, bottleneck elimination, and inventory throughput optimization under tight deadlines.",
      badge: "Operations",
    },
    {
      title: "Target Hunter™",
      tagline: "High-Performance B2B Sales & Key Account Management",
      players: "12 - 32 Participants",
      duration: "1 Day",
      description:
        "Sales professionals master client discovery, objection handling, and multi-tier account negotiation dynamics.",
      badge: "Sales & Growth",
    },
    {
      title: "Micromatic™",
      tagline: "Agile Project Management & Cross-Functional Delivery",
      players: "6 - 18 Participants",
      duration: "1 Day",
      description:
        "Challenges teams to deliver complex tech products using agile iterations, sprint planning, and risk mitigation.",
      badge: "Agile Tech",
    },
    {
      title: "Mogul CEO™",
      tagline: "Entrepreneurial Growth & Venture Scaling",
      players: "8 - 25 Participants",
      duration: "1 to 2 Days",
      description:
        "Participants scale a startup from Series A funding to global market expansion and IPO preparation.",
      badge: "Leadership",
    },
    {
      title: "Maven™",
      tagline: "Human Capital Strategy & Organizational Behavior",
      players: "10 - 30 Participants",
      duration: "1 Day",
      description:
        "Simulates HR talent acquisition, performance coaching, retention strategies, and organizational alignment.",
      badge: "HR & Talent",
    },
    {
      title: "SynergyStack®",
      tagline: "Cross-Departmental Collaboration & Crisis Leadership",
      players: "15 - 40 Participants",
      duration: "Half-Day",
      description:
        "High-intensity team building simulation uncovering silo mentalities and building unified organizational synergy.",
      badge: "Team Building",
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
        <span className="text-white">Business Simulation Games</span>
      </nav>

      {/* Header Headline */}
      <div className="max-w-3xl space-y-4">
        <div className="bg-brand-secondary/15 border-brand-secondary/30 text-brand-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold">
          <Gamepad2 className="h-4 w-4" />
          <span>8 Enterprise Business Games</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Learning that behaves like the{" "}
          <span className="text-brand-secondary">real business.</span>
        </h1>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          Interactive, turn-based simulations engineered for corporate executive
          workshops. Licensed exclusively through Freelancers Hub with member
          preferential pricing.
        </p>
      </div>

      {/* Grid of 8 Games */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, idx) => (
          <div
            key={idx}
            className="border-brand-border/15 hover:border-brand-secondary/50 group flex flex-col justify-between space-y-6 rounded-2xl border bg-slate-900/90 p-6 transition"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <StatusPill tone="info">{game.badge}</StatusPill>
                <span className="text-[11px] font-medium text-slate-400">
                  {game.duration}
                </span>
              </div>

              <div>
                <h3 className="group-hover:text-brand-secondary text-xl font-bold text-white transition">
                  {game.title}
                </h3>
                <p className="mt-0.5 text-xs font-semibold text-slate-400">
                  {game.tagline}
                </p>
              </div>

              <p className="text-xs leading-relaxed text-slate-300">
                {game.description}
              </p>
            </div>

            <div className="space-y-3 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Capacity:</span>
                <span className="font-semibold text-slate-200">
                  {game.players}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-1/2"
                  onClick={() =>
                    showToast(
                      "info",
                      "Flyer Download Initiated",
                      `Downloading product brochure for ${game.title}.`,
                      "public"
                    )
                  }
                >
                  <Download className="me-1 h-3.5 w-3.5" /> Brochure
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-1/2"
                  onClick={openRegistration}
                >
                  <ShieldCheck className="me-1 h-3.5 w-3.5" /> License
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
