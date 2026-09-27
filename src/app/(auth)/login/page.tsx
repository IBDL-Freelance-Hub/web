import React from "react";
import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In — IBDL Freelancers Hub",
  description:
    "Sign in to access your IBDL Freelancers Hub workspace, diagnostics, and profile.",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Left Column: Client-Aware Dark Branding Panel (Desktop Only) */}
      <AuthBrandingPanel type="login" />

      {/* Right Column: Interactive Client Leaf (LoginForm) */}
      <div className="relative flex flex-col items-center justify-center bg-white">
        <LoginForm />
      </div>
    </main>
  );
}
