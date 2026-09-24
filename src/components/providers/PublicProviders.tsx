import React from "react";
import { RegistrationProvider } from "@/components/public/registration/RegistrationProvider";
import { RegistrationModal } from "@/components/public/registration/RegistrationModal";
import { FloatingCTA } from "@/components/public/FloatingCTA";

export function PublicProviders({ children }: { children: React.ReactNode }) {
  return (
    <RegistrationProvider>
      {children}
      <FloatingCTA />
      <RegistrationModal />
    </RegistrationProvider>
  );
}
