"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useRegistration } from "../registration/RegistrationProvider";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function PqpOfferSection() {
  const { openRegistration } = useRegistration();

  return (
    <section className="border-brand-border/10 border-b bg-slate-950 px-4 py-16 text-start sm:px-6 lg:px-8">
      <div className="from-brand-primary to-brand-primary border-brand-secondary/30 relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-gradient-to-r via-slate-900 p-8 shadow-2xl sm:p-12">
        <div className="bg-brand-secondary/10 pointer-events-none absolute end-0 top-0 -me-8 -mt-8 h-48 w-48 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="bg-brand-secondary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            Phase 1 Launch Special
          </div>

          <h2 className="text-2xl leading-tight font-extrabold text-white sm:text-4xl">
            Claim your complimentary{" "}
            <span className="text-brand-secondary">
              PQP™ Assessment Voucher.
            </span>
          </h2>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Every trainer who joins the Hub during Phase 1 receives 1 free
            Personal Qualification Profile (PQP™) diagnostic assessment credit
            ($150 value) to test on themselves or a client.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button variant="primary" size="lg" onClick={openRegistration}>
              Claim Free PQP™ Voucher <ArrowRight className="ms-1.5 h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Instant Specimen Credential Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
