import React from "react";
import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";
import { ActivateDispatcher } from "@/components/auth/ActivateDispatcher";

export const metadata = {
  title: "Activate Account — IBDL Freelancers Hub",
  description:
    "Set your password and activate your IBDL Freelancers Hub account.",
};

export default function ActivatePage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Left Column: Client-Aware Dark Branding Panel (Desktop Only) */}
      <AuthBrandingPanel type="activate" />

      {/* Right Column: Interactive Client Leaf (ActivateDispatcher) */}
      <div className="relative flex flex-col items-center justify-center bg-white">
        <ActivateDispatcher />
      </div>
    </main>
  );
}
