import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password — IBDL Freelancers Hub",
  description: "Reset your IBDL Freelancers Hub account password securely.",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const resolvedParams = await searchParams;
  const token =
    typeof resolvedParams.token === "string" ? resolvedParams.token : undefined;

  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Left Column: Dark Branding Panel (Desktop Only) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#141428] bg-gradient-to-br from-[#141428] via-[#1d1d39] to-[#0d0d1c] px-8 pt-6 pb-8 text-white sm:px-12 sm:pt-8 lg:flex lg:px-16 lg:pt-8 lg:pb-12">
        {/* Ambient lighting & background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <div className="hero__photo opacity-75" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141428] via-[#141428]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1c] via-transparent to-[#141428]/50" />
        </div>

        {/* Top Header Logo */}
        <div className="relative z-10 flex h-8 items-center">
          <Link href="/" className="inline-block">
            <Image
              src="/Logos/FLH-white.png"
              alt="IBDL Freelancers Hub Logo"
              width={160}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center Value Proposition */}
        <div className="relative z-10 my-auto max-w-md py-12">
          <h2 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
            Reset your password.
          </h2>
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            Choose a secure new password to regain access to your Freelancers
            Hub account, simulation toolkit, and professional certifications.
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 text-xs font-medium text-white/40">
          © 2026 IBDL Learning Group
        </div>
      </div>

      {/* Right Column: Reset Password Interactive Container */}
      <div className="relative flex flex-col items-center justify-center bg-white">
        <Suspense
          fallback={
            <div className="p-8 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#419257]" />
            </div>
          }
        >
          <ResetPasswordForm token={token} />
        </Suspense>
      </div>
    </main>
  );
}
