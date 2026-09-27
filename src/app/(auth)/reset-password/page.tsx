import React, { Suspense } from "react";
import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password — IBDL Freelancers Hub",
  description: "Reset your IBDL Freelancers Hub account password securely.",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const resolvedParams = await searchParams;
  const token =
    typeof resolvedParams.token === "string" ? resolvedParams.token : undefined;

  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Left Column: Client-Aware Dark Branding Panel (Desktop Only) */}
      <AuthBrandingPanel type="resetPassword" />

      {/* Right Column: Reset Password Interactive Container */}
      <div className="relative flex flex-col items-center justify-center bg-white">
        <Suspense
          fallback={
            <div className="p-8 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#419257]" />
            </div>
          }
        >
          <ResetPasswordForm token={token} />
        </Suspense>
      </div>
    </main>
  );
}
