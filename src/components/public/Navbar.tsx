"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { useRegistration } from "./registration/RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { getCategoryHref } from "@/config/presentation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { openRegistration } = useRegistration();
  const { locale } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    {
      label: locale === "ar" ? "الرئيسية" : "Home",
      href: "/",
    },
    {
      label:
        locale === "ar" ? "ألعاب محاكاة الأعمال" : "Business Simulation Games",
      href: getCategoryHref("games"),
    },
    {
      label: locale === "ar" ? "أدوات التقييم" : "Assessment Tools",
      href: getCategoryHref("assess"),
    },
    {
      label:
        locale === "ar"
          ? "اعتماد IBDL التدريبي"
          : "IBDL Training Accreditation",
      href: getCategoryHref("accred"),
    },
  ];

  return (
    <header
      className={cn(
        "fixed start-0 end-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-white/10 bg-[#141226]/95 py-1 shadow-2xl shadow-black/60 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-2 shadow-none backdrop-blur-none"
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex max-w-[1360px] items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8",
          isScrolled ? "h-16" : "h-20"
        )}
      >
        {/* Brand Logo Image — Left side */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 transition-transform duration-300 hover:opacity-95"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Logos/FLH-white.png"
            alt={
              locale === "ar"
                ? "شعار منصة المستقلين IBDL"
                : "IBDL Freelancers Hub Logo"
            }
            className={cn(
              "w-auto object-contain transition-all duration-300",
              isScrolled ? "h-6 sm:h-7" : "h-7 sm:h-8"
            )}
          />
        </Link>

        {/* Desktop Links — Positioned in the exact center of the Navbar */}
        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 text-xs sm:text-sm lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200",
                  isActive
                    ? "bg-slate-700/80 font-bold text-white shadow-inner"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls — Right side */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageToggle />

          <Link
            href="/login"
            className="rounded-full border border-slate-700/80 bg-slate-900/60 px-5 py-2 text-xs font-semibold text-white transition-all hover:border-slate-500 hover:bg-slate-800"
          >
            {locale === "ar" ? "تسجيل الدخول" : "Sign in"}
          </Link>

          {/* Join the Hub CTA with red outer glow */}
          <button
            type="button"
            onClick={openRegistration}
            className="bg-brand-secondary cursor-pointer rounded-full px-6 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(225,17,25,0.6)] transition-all hover:bg-red-600 hover:shadow-[0_0_25px_rgba(225,17,25,0.85)] active:scale-95"
          >
            {locale === "ar" ? "انضم إلى المنصة" : "Join the Hub"}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="relative z-50 rounded-xl p-2 text-slate-200 transition-all hover:bg-white/10 hover:text-white focus:outline-none active:scale-95 lg:hidden"
          aria-label={locale === "ar" ? "فتح القائمة" : "Toggle menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="animate-in slide-in-from-top-2 relative z-50 w-full border-b border-white/10 bg-[#141226]/98 px-6 pt-3 pb-6 text-start shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-slate-700/80 font-bold text-white shadow-inner"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-2 flex flex-col gap-4 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {locale === "ar" ? "اللغة" : "Language"}
              </span>
              <LanguageToggle />
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-1/2 rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-2.5 text-center text-xs font-semibold text-white hover:bg-slate-800"
              >
                {locale === "ar" ? "تسجيل الدخول" : "Sign in"}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRegistration();
                }}
                className="bg-brand-secondary w-1/2 rounded-full px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(225,17,25,0.6)] hover:bg-red-600"
              >
                {locale === "ar" ? "انضم إلى المنصة" : "Join the Hub"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
