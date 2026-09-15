"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/components/common/DirectionProvider";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { ActivateAccountForm } from "./ActivateAccountForm";
import { RequestActivationLinkForm } from "./RequestActivationLinkForm";
import { AUTH_STRINGS } from "@/lib/constants/authStrings";
import { Loader2 } from "lucide-react";

function ActivateDispatcherContent() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  const rawToken = searchParams.get("token");
  const [forceRequestMode, setForceRequestMode] = useState(false);

  const hasToken = Boolean(rawToken && rawToken.trim().length > 0);
  const showActivateForm = hasToken && !forceRequestMode;

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-white px-8 pt-6 pb-8 text-start sm:px-12 sm:pt-8 lg:min-h-full lg:px-16 lg:pt-8 lg:pb-12">
      {/* Top Header Row aligned at logo height */}
      <div className="relative z-20 flex h-8 w-full items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6a6a86] transition-colors hover:text-[#1d1d39]"
        >
          <span>{AUTH_STRINGS.common.backToPublic[locale]}</span>
        </Link>
        <LanguageToggle variant="light" />
      </div>

      {/* Center Form Area */}
      <div className="mx-auto my-auto w-full max-w-md py-6">
        {showActivateForm ? (
          <ActivateAccountForm
            token={rawToken!}
            onRequestNewLink={() => setForceRequestMode(true)}
          />
        ) : (
          <RequestActivationLinkForm />
        )}
      </div>

      {/* Mobile Footer Credit */}
      <div className="mt-6 text-center text-xs text-[#6a6a86] lg:hidden">
        {AUTH_STRINGS.common.copyright}
      </div>
    </div>
  );
}

export function ActivateDispatcher() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#419257]" />
        </div>
      }
    >
      <ActivateDispatcherContent />
    </Suspense>
  );
}
