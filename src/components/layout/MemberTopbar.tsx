"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { SecureLogoutButton } from "@/components/dashboard/SecureLogoutButton";
import { getInitials } from "@/lib/utils";
import { Menu, Bell } from "lucide-react";
import type { MemberDto } from "@/types/api";

interface MemberTopbarProps {
  member: MemberDto;
  onOpenMobileMenu: () => void;
}

export function MemberTopbar({ member, onOpenMobileMenu }: MemberTopbarProps) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const isAr = locale === "ar";

  // Breadcrumb mapping
  const getBreadcrumb = () => {
    if (pathname.startsWith("/profile")) {
      return {
        section: isAr ? "الحساب" : "Account",
        page: isAr ? "الملف الشخصي" : "My Profile",
      };
    }
    if (pathname.startsWith("/settings")) {
      return {
        section: isAr ? "الحساب" : "Account",
        page: isAr ? "الأمان والجلسات" : "Security & Sessions",
      };
    }
    return {
      section: isAr ? "مساحة العمل" : "Workspace",
      page: isAr ? "لوحة التحكم" : "Dashboard",
    };
  };

  const breadcrumb = getBreadcrumb();
  const initials = getInitials(member?.fullNameEn);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Start: Mobile Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label={isAr ? "فتح القائمة الجانبية" : "Open sidebar menu"}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:ring-2 focus:ring-slate-300 focus:outline-none lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb Hierarchy */}
        <nav aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}>
          <ol className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <li>
              <span>{breadcrumb.section}</span>
            </li>
            <li aria-hidden="true" className="text-slate-300 select-none">
              /
            </li>
            <li className="font-semibold text-slate-900" aria-current="page">
              <h1>{breadcrumb.page}</h1>
            </li>
          </ol>
        </nav>
      </div>

      {/* End: Action Bar (Language Toggle, Notifications, Avatar, Logout) */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Language Switcher */}
        <LanguageToggle variant="light" />

        {/* Notifications Icon (Placeholder bell per spec) */}
        <button
          type="button"
          aria-label={isAr ? "الإشعارات" : "Notifications"}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 focus:outline-none"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* Member Avatar */}
        <div className="flex items-center gap-2.5 border-s border-slate-200 ps-1 sm:ps-2">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#141428] text-xs font-bold text-white shadow-xs"
            aria-label={member.fullNameEn || "User avatar"}
          >
            {member.photoFileId ? (
              <Image
                src={`/api/v1/files/${member.photoFileId}`}
                alt={member.fullNameEn || "Profile photo"}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <span className="hidden max-w-[150px] truncate text-xs font-medium text-slate-700 md:inline-block">
            {isAr && member.fullNameAr ? member.fullNameAr : member.fullNameEn}
          </span>
        </div>

        {/* Secure Logout Button */}
        <SecureLogoutButton
          variant="header"
          className="border-slate-200 bg-slate-50 text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        />
      </div>
    </header>
  );
}
