"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import { AUTH_STRINGS } from "@/lib/constants/authStrings";

export interface AuthBrandingPanelProps {
  type?: "login" | "activate" | "resetPassword";
}

export function AuthBrandingPanel({ type = "login" }: AuthBrandingPanelProps) {
  const { locale } = useLocale();
  const branding = AUTH_STRINGS.branding[type] || AUTH_STRINGS.branding;

  return (
    <div
      data-testid="auth-branding-panel"
      className="relative hidden flex-col justify-between overflow-hidden bg-[#141428] bg-gradient-to-br from-[#141428] via-[#1d1d39] to-[#0d0d1c] px-8 pt-6 pb-8 text-start text-white sm:px-12 sm:pt-8 lg:flex lg:px-16 lg:pt-8 lg:pb-12"
    >
      {/* Background Photo & Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <div className="hero__photo opacity-75" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141428] via-[#141428]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1c] via-transparent to-[#141428]/50" />
      </div>

      {/* Top Header: Freelancers Hub White Logo */}
      <div className="relative z-10 flex h-8 items-center">
        <Link href="/" className="inline-block">
          <Image
            src="/Logos/FLH-white.png"
            alt={branding.logoAlt[locale]}
            width={160}
            height={32}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Center Value Proposition */}
      <div className="relative z-10 my-auto max-w-md py-12">
        <h2
          data-testid="branding-heading"
          className="mb-4 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl"
        >
          {branding.heading[locale]}
        </h2>

        <p
          data-testid="branding-lead"
          className="mb-8 text-sm leading-relaxed text-white/70 sm:text-base"
        >
          {branding.lead[locale]}
        </p>

        {branding.bullets && branding.bullets.length > 0 && (
          <ul
            data-testid="branding-bullets"
            className="space-y-3.5 text-sm font-medium text-white/85"
          >
            {branding.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{bullet[locale]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 text-xs font-medium text-white/40">
        {AUTH_STRINGS.common.copyright}
      </div>
    </div>
  );
}
