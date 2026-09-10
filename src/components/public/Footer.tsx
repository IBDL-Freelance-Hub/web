"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useRegistration } from "./registration/RegistrationProvider";
import { getCategoryHref } from "@/config/presentation";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  const { openRegistration } = useRegistration();

  return (
    <footer className="border-brand-border/10 w-full border-t bg-slate-950 text-slate-400">
      {/* Full-width Registration Banner */}
      <div className="border-brand-border/10 bg-brand-primary w-full border-b px-4 py-12 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            Ready to empower your freelance training practice?
          </h3>
          <p className="text-sm text-slate-300 sm:text-base">
            Join the Essential tier today for free. Access global simulation
            games, diagnostic toolkits, and IBDL accreditation.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="lg" onClick={openRegistration}>
              <ShieldCheck className="me-2 h-5 w-5" />
              Join the Hub — Free Permanently
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 text-start sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Brand Block */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/Logos/FLH-white.png"
              alt="IBDL Freelancers Hub"
              width={180}
              height={44}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-xs leading-relaxed text-slate-400">
            The business support ecosystem for independent trainers, executive
            coaches, and management consultants across MENA and global markets.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <Image
              src="/Logos/IBDL-white.png"
              alt="IBDL Learning Group"
              width={80}
              height={24}
              className="h-5 w-auto object-contain opacity-80"
            />
            <span className="text-[11px] font-semibold text-slate-500">
              Powered by IBDL Learning Group
            </span>
          </div>
        </div>

        {/* Explore Navigation */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold tracking-wider text-white uppercase">
            Explore Platform
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home Overview
              </Link>
            </li>
            <li>
              <Link
                href={getCategoryHref("games")}
                className="transition hover:text-white"
              >
                Business Simulation Games
              </Link>
            </li>
            <li>
              <Link
                href={getCategoryHref("assess")}
                className="transition hover:text-white"
              >
                Assessment Tools & PQP™
              </Link>
            </li>
            <li>
              <Link
                href={getCategoryHref("accred")}
                className="transition hover:text-white"
              >
                IBDL Trainer Accreditation
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold tracking-wider text-white uppercase">
            Contact & Support
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Mail className="text-brand-secondary h-4 w-4 shrink-0" />
              <a
                href="mailto:freelancers.hub@ibdl.net"
                className="transition hover:text-white"
              >
                freelancers.hub@ibdl.net
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="text-brand-secondary mt-0.5 h-4 w-4 shrink-0" />
              <span>IBDL Learning Group Regional HQ, MENA Operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-7xl border-t border-slate-900 px-4 py-6 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} IBDL Learning Group. All rights reserved.
          Freelancers Hub is a registered trademark of IBDL.
        </p>
      </div>
    </footer>
  );
}
