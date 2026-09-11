import React from "react";
import { PublicProviders } from "@/components/providers/PublicProviders";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicProviders>
      <div className="bg-brand-primary flex min-h-screen flex-col text-slate-50">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </PublicProviders>
  );
}
