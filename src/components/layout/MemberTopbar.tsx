"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { logoutAction } from "@/actions/authActions";
import { getInitials } from "@/lib/utils";
import {
  Menu,
  Bell,
  User,
  Shield,
  LogOut,
  Loader2,
  ChevronDown,
} from "lucide-react";
import type { MemberDto } from "@/types/api";

interface MemberTopbarProps {
  member: MemberDto;
  onOpenMobileMenu: () => void;
}

export function MemberTopbar({ member, onOpenMobileMenu }: MemberTopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    if (dropdownOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

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
  const [imageError, setImageError] = useState(false);
  const displayName =
    isAr && member?.fullNameAr
      ? member.fullNameAr
      : member?.fullNameEn || (isAr ? "عضو" : "Member");

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
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label={isAr ? "قائمة المستخدم" : "User menu"}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl p-0.5 transition-all hover:ring-2 hover:ring-slate-200 focus:ring-2 focus:ring-slate-400 focus:outline-none"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#141428] text-xs font-bold text-white shadow-xs sm:h-9 sm:w-9">
              {member?.photoFileId && !imageError ? (
                <Image
                  src={`/api/v1/files/${member.photoFileId}`}
                  alt={member?.fullNameEn || "Profile photo"}
                  width={36}
                  height={36}
                  unoptimized
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <ChevronDown
              className={`hidden h-3.5 w-3.5 text-slate-500 transition-transform duration-200 sm:block ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* User Menu Dropdown Popover */}
          {dropdownOpen && (
            <div
              role="menu"
              aria-orientation="vertical"
              className="animate-in fade-in-0 zoom-in-95 absolute end-0 top-full z-50 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 duration-150"
            >
              {/* User Details Header */}
              <div className="border-b border-slate-100 px-3 py-2.5">
                <p className="truncate text-xs font-bold text-slate-900">
                  {displayName}
                </p>
                {member?.country && (
                  <p className="mt-0.5 truncate text-[11px] text-slate-500">
                    {member.city
                      ? `${member.city}, ${member.country}`
                      : member.country}
                  </p>
                )}
              </div>

              {/* Navigation Links */}
              <div className="py-1">
                <Link
                  href="/profile"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <User className="h-4 w-4 text-slate-500" />
                  <span>{isAr ? "الملف الشخصي" : "My Profile"}</span>
                </Link>

                <Link
                  href="/settings/security"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <Shield className="h-4 w-4 text-slate-500" />
                  <span>
                    {isAr ? "الأمان والجلسات" : "Security & Sessions"}
                  </span>
                </Link>
              </div>

              {/* Divider */}
              <div className="my-1 border-t border-slate-100" />

              {/* Sign Out Action */}
              <button
                type="button"
                role="menuitem"
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 focus:bg-red-50 focus:outline-none disabled:opacity-60"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                    <span>
                      {isAr ? "جاري تسجيل الخروج..." : "Signing out..."}
                    </span>
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4 text-red-500" />
                    <span>{isAr ? "تسجيل الخروج" : "Sign out"}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
