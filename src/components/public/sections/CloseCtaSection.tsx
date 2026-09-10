"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useRegistration } from "../registration/RegistrationProvider";
import { ShieldCheck } from "lucide-react";

export function CloseCtaSection() {
  const { openRegistration } = useRegistration();

  return (
    <section className="bg-brand-primary border-brand-border/10 border-b px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Elevate your freelance training business today.
        </h2>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          No setup fees. No mandatory credit card. Join hundreds of accredited
          trainers scaling their practice with IBDL.
        </p>
        <div className="flex justify-center pt-2">
          <Button variant="primary" size="lg" onClick={openRegistration}>
            <ShieldCheck className="me-2 h-5 w-5" />
            Join the Hub — Free Permanently
          </Button>
        </div>
      </div>
    </section>
  );
}
