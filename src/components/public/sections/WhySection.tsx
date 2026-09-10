"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { Award, Globe, Users, CheckCircle2 } from "lucide-react";

export function WhySection() {
  const { formatNumber } = useLocale();

  const achievements = [
    {
      icon: <Award className="text-brand-secondary h-6 w-6" />,
      title: `${formatNumber(15)}+ Years`,
      desc: "Of global business management education leadership.",
    },
    {
      icon: <Globe className="text-brand-secondary h-6 w-6" />,
      title: `${formatNumber(45)}+ Countries`,
      desc: "Active network of certified trainers and institutions.",
    },
    {
      icon: <Users className="text-brand-secondary h-6 w-6" />,
      title: `${formatNumber(120000)}+ Candidates`,
      desc: "Assessed & certified across MENA and international markets.",
    },
  ];

  return (
    <section className="bg-brand-primary border-brand-border/10 border-b px-4 py-20 text-start sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
            Why Partner with IBDL Learning Group?
          </h2>
          <p className="text-sm text-slate-400 sm:text-base">
            Backed by international certification standards and recognized
            executive education benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="border-brand-border/15 space-y-3 rounded-2xl border bg-slate-900/80 p-6 text-center"
            >
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800">
                {item.icon}
              </div>
              <h3 className="font-mono text-xl font-extrabold text-white">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="border-brand-border/15 mx-auto max-w-3xl space-y-3 rounded-2xl border bg-slate-900 p-6">
          <h4 className="flex items-center gap-2 text-base font-bold text-white">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            Institutional Quality & Ethics Guarantee
          </h4>
          <p className="text-xs leading-relaxed text-slate-300">
            All simulation software, assessment engines, and accreditation
            badges distributed through Freelancers Hub undergo rigorous
            psychometric and educational validation by the IBDL Global Academic
            Board.
          </p>
        </div>
      </div>
    </section>
  );
}
