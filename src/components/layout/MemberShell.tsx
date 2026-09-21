"use client";

import React, { useState } from "react";
import { MemberSidebar } from "./MemberSidebar";
import { MemberTopbar } from "./MemberTopbar";
import type { MemberDto, MembershipDto } from "@/types/api";

import { ToastProvider } from "@/components/ui/Toast";

interface MemberShellProps {
  member: MemberDto;
  membership: MembershipDto | null;
  children: React.ReactNode;
}

export function MemberShell({
  member,
  membership,
  children,
}: MemberShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="fixed inset-0 flex h-dvh w-full overflow-hidden bg-[#f8fafc] text-slate-900">
        {/* Desktop Sidebar (hidden on mobile/tablet) */}
        <div className="hidden lg:flex lg:h-full lg:shrink-0">
          <MemberSidebar member={member} membership={membership} />
        </div>

        {/* Mobile Drawer & Backdrop */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop overlay */}
            <div
              className="animate-in fade-in fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 motion-reduce:animate-none"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer Sidebar */}
            <div className="animate-in slide-in-from-start-full relative z-10 flex h-full w-72 max-w-[85vw] flex-col shadow-2xl duration-300 ease-out motion-reduce:animate-none">
              <MemberSidebar
                member={member}
                membership={membership}
                onCloseMobile={() => setMobileMenuOpen(false)}
                isMobile
              />
            </div>
          </div>
        )}

        {/* Main Workspace Column */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Top Navigation Bar */}
          <MemberTopbar
            member={member}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto p-4 pb-12 sm:p-6 sm:pb-14 lg:p-8 lg:pb-16">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
