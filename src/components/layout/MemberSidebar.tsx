"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { X } from "lucide-react";
import { SecureLogoutButton } from "@/components/dashboard/SecureLogoutButton";
import type { MemberDto, MembershipDto } from "@/types/api";
import {
  NAVIGATION_GROUPS,
  type NavItemConfig,
  type NavGroupConfig,
} from "@/constants/navigation";

export type { NavItemConfig, NavGroupConfig };

interface MemberSidebarProps {
  member: MemberDto;
  membership: MembershipDto | null;
  onCloseMobile?: () => void;
  isMobile?: boolean;
}

export function MemberSidebar({
  membership,
  onCloseMobile,
  isMobile = false,
}: MemberSidebarProps) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const isAr = locale === "ar";

  // Helper to format tier string
  const formatTier = (tier?: string) => {
    if (!tier) return isAr ? "عضوية أساسية" : "Essential Membership";
    const normalized = tier.toUpperCase();
    if (normalized === "MASTER") {
      return isAr ? "عضوية خبير معتمد" : "Master Membership";
    }
    if (normalized === "PROFESSIONAL") {
      return isAr ? "عضوية مهنية" : "Professional Membership";
    }
    return isAr ? "عضوية أساسية" : "Essential Membership";
  };

  return (
    <aside
      className="flex h-full w-72 flex-col justify-between border-e border-[#1e2238] bg-[#141428] text-slate-300"
      aria-label={isAr ? "شريط التنقل الجانبي" : "Sidebar Navigation"}
    >
      {/* Top Header with Logo */}
      <div>
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-4 sm:px-6">
          <Link
            href="/overview"
            className="inline-flex items-center gap-2 rounded-lg p-1 focus:ring-2 focus:ring-[#E11119] focus:outline-none"
            onClick={onCloseMobile}
          >
            <Image
              src="/Logos/FLH-white.png"
              alt="IBDL Freelancers Hub"
              width={140}
              height={28}
              priority
              className="h-7 w-auto object-contain"
            />
          </Link>
          {isMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label={isAr ? "إغلاق القائمة" : "Close menu"}
              className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-slate-400 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation Groups */}
        <nav className="max-h-[calc(100vh-12rem)] space-y-6 overflow-y-auto px-4 py-5">
          {NAVIGATION_GROUPS.map((group) => (
            <div key={group.titleEn}>
              <h2 className="px-3 text-[11px] font-bold tracking-wider text-slate-400/70 uppercase select-none">
                {isAr ? group.titleAr : group.titleEn}
              </h2>
              <ul className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.isLive &&
                    (pathname === item.href ||
                      (item.href !== "/overview" &&
                        pathname.startsWith(item.href)));

                  if (!item.isLive) {
                    return (
                      <li key={item.href}>
                        <div
                          aria-disabled="true"
                          className="flex cursor-not-allowed items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium text-slate-500 transition-colors select-none"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 shrink-0 text-slate-600" />
                            <span>{isAr ? item.labelAr : item.labelEn}</span>
                          </div>
                          {item.badge && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-normal text-slate-400">
                              {isAr ? item.badge.textAr : item.badge.textEn}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onCloseMobile}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200 focus:ring-2 focus:ring-[#E11119] focus:outline-none ${
                          isActive
                            ? "bg-[#222442] font-semibold text-white shadow-xs"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`h-4 w-4 shrink-0 ${
                              isActive ? "text-[#E11119]" : "text-slate-400"
                            }`}
                          />
                          <span>{isAr ? item.labelAr : item.labelEn}</span>
                        </div>
                        {isActive && (
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-[#E11119]"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Membership Summary Card & Mobile Logout */}
      <div className="space-y-3 border-t border-white/5 bg-[#101124] p-4">
        <div className="rounded-xl border border-white/10 bg-[#191b35] p-3.5 shadow-xs">
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            {isAr ? "عضويتك الحالية" : "YOUR MEMBERSHIP"}
          </p>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <h3 className="truncate text-xs font-semibold text-white">
              {formatTier(membership?.tier)}
            </h3>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                membership?.status === "ACTIVE"
                  ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  membership?.status === "ACTIVE"
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
              />
              {membership?.status === "ACTIVE"
                ? isAr
                  ? "نشط"
                  : "Active"
                : isAr
                  ? "غير نشط"
                  : "Inactive"}
            </span>
          </div>
        </div>

        {/* Mobile Sign Out Button */}
        {isMobile && <SecureLogoutButton variant="full" />}
      </div>
    </aside>
  );
}
