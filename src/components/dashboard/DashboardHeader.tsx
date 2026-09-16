"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getInitials } from "@/lib/utils";
import type { MemberDto, MembershipDto } from "@/types/api";

interface DashboardHeaderProps {
  member: MemberDto;
  membership: MembershipDto | null;
  isAr: boolean;
}

export function getTierDisplay(tier?: string, isAr?: boolean): string {
  if (!tier) return isAr ? "عضوية أساسية" : "Essential Membership";
  const normalized = tier.toUpperCase();
  if (normalized === "MASTER") {
    return isAr ? "عضوية خبير معتمد" : "Master Membership";
  }
  if (normalized === "PROFESSIONAL") {
    return isAr ? "عضوية مهنية" : "Professional Membership";
  }
  return isAr ? "عضوية أساسية" : "Essential Membership";
}

export function DashboardHeader({
  member,
  membership,
  isAr,
}: DashboardHeaderProps) {
  const getFirstName = () => {
    const rawName =
      isAr && member.fullNameAr ? member.fullNameAr : member.fullNameEn;
    if (!rawName) return isAr ? "عضو منصة المستقلين" : "Member";
    return rawName.trim().split(/\s+/)[0];
  };

  const firstName = getFirstName();
  const initials = getInitials(member.fullNameEn);

  return (
    <section
      aria-labelledby="identity-strip-heading"
      className="relative overflow-hidden rounded-2xl border border-[#1e2238] bg-[#141428] p-6 text-white shadow-md sm:p-8"
    >
      <h2 id="identity-strip-heading" className="sr-only">
        {isAr ? "شريط الترحيب بالمدرب" : "Welcome Banner"}
      </h2>

      {/* Ambient subtle glow background */}
      <div
        className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Avatar */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#222442] text-xl font-bold shadow-inner">
            {member.photoFileId ? (
              <Image
                src={`/api/v1/files/${member.photoFileId}`}
                alt={member.fullNameEn}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase sm:text-xs">
                {isAr ? "مساحة عمل المدرب" : "Trainer Workspace"}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span className="text-[11px] font-medium text-white/70 sm:text-xs">
                {getTierDisplay(membership?.tier, isAr)}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isAr
                ? `مرحباً بعودتك، ${firstName}`
                : `Welcome back, ${firstName}`}
            </h1>
            <p className="text-xs text-slate-400">
              {isAr
                ? "تابع إحصائيات نشاطك، اعتماداتك المهنية، ومستوى ظهورك في الدليل."
                : "Track your activity metrics, professional accreditation, and directory standing."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-[#141428] shadow-xs transition hover:bg-amber-400 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#141428] focus:outline-none"
          >
            <span>{isAr ? "الملف الشخصي" : "View profile"}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
