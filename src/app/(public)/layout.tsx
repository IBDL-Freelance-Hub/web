"use client";

import React from "react";
import { RegistrationProvider } from "@/components/public/registration/RegistrationProvider";
import { RegistrationModal } from "@/components/public/registration/RegistrationModal";
import { Navbar } from "@/components/public/Navbar";
import { FloatingCTA } from "@/components/public/FloatingCTA";
import { Footer } from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RegistrationProvider>
      <div className="bg-brand-primary flex min-h-screen flex-col text-slate-50">
        <Navbar />
        <div className="flex-1">{children}</div>
        <FloatingCTA />
        <Footer />
        <RegistrationModal />
      </div>
    </RegistrationProvider>
  );
}
