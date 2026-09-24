"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { Menu, Bell } from "lucide-react";
import type { MemberDto } from "@/types/api";
import { MemberUserDropdown } from "./MemberUserDropdown";

export interface MemberTopbarProps {
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

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between gap-2 border-b border-slate-200 bg-white/95 px-3 backdrop-blur-md sm:gap-4 sm:px-6 lg:px-8">
      {/* Start: Mobile Hamburger & Page Title */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Mobile menu trigger button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label={isAr ? "فتح القائمة الجانبية" : "Open sidebar menu"}
          className="shrink-0 rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 focus:ring-2 focus:ring-slate-300 focus:outline-none sm:p-2 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page Title */}
        <nav
          aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}
          className="min-w-0"
        >
          <h1 className="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-base lg:text-lg">
            {breadcrumb.page}
          </h1>
        </nav>
      </div>

      {/* End: Action Bar — exactly 3 items: Language, Notifications, Avatar */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        {/* 1. Language Switcher */}
        <div className="shrink-0">
          <LanguageToggle variant="light" />
        </div>

        {/* 2. Notifications Icon */}
        <button
          type="button"
          aria-label={isAr ? "الإشعارات" : "Notifications"}
          className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 focus:outline-none sm:h-9 sm:w-9"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* 3. Member Avatar with Dropdown Menu */}
        <MemberUserDropdown member={member} isAr={isAr} />
      </div>
    </header>
  );
}
