import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { SecureLogoutButton } from "./SecureLogoutButton";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
}

export function DashboardLayout({ children, userEmail }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
      {/* Top Console Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#141428]/10 bg-[#141428] text-white shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Hub Branding */}
          <div className="flex items-center gap-6">
            <Link href="/overview" className="inline-flex items-center gap-2.5">
              <Image
                src="/Logos/FLH-white.png"
                alt="IBDL Freelancers Hub Logo"
                width={150}
                height={30}
                priority
                className="h-7 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3 sm:gap-4">
            {userEmail && (
              <span className="hidden max-w-[200px] truncate text-xs text-white/70 md:inline-block">
                {userEmail}
              </span>
            )}
            <LanguageToggle variant="dark" />
            <SecureLogoutButton variant="header" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>

      {/* Footer Branding */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4">
          © 2026 IBDL Learning Group — Freelancer Hub Workspace
        </div>
      </footer>
    </div>
  );
}
