"use client";

import React, { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useRegistration } from "./RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import {
  SuccessHeader,
  SuccessMembershipSummary,
  SuccessCredentialsCard,
  SuccessPortalLinks,
  SuccessSafetyModal,
} from "./success";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function RegistrationSuccess() {
  const isClient = useIsClient();
  const { locale } = useLocale();
  const isAr = locale === "ar";

  const {
    formData,
    specimenCredentials,
    closeRegistration,
    credentialsAcknowledged,
    setCredentialsAcknowledged,
    showCredentialsConfirm,
    setShowCredentialsConfirm,
  } = useRegistration();

  const [copiedUsername, setCopiedUsername] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const firstName = useMemo(() => {
    return formData.fullName.trim().split(" ")[0] || "Freelancer";
  }, [formData.fullName]);

  const usernameSpecimen = useMemo(() => {
    return specimenCredentials?.username || `flh.${firstName.toLowerCase()}`;
  }, [specimenCredentials, firstName]);

  const passwordSpecimen = specimenCredentials?.password || "PQP-2026-DEMO";

  const copyText = async (text: string): Promise<boolean> => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback
    }
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const res = document.execCommand("copy");
      document.body.removeChild(textarea);
      return res;
    } catch {
      return false;
    }
  };

  const handleCopyUsername = async () => {
    const ok = await copyText(usernameSpecimen);
    if (ok) {
      setCopiedUsername(true);
      setCredentialsAcknowledged(true);
      setTimeout(() => setCopiedUsername(false), 2500);
    }
  };

  const handleCopyPassword = async () => {
    const ok = await copyText(passwordSpecimen);
    if (ok) {
      setCopiedPassword(true);
      setCredentialsAcknowledged(true);
      setTimeout(() => setCopiedPassword(false), 2500);
    }
  };

  const handleCopyAll = async () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const text = isAr
      ? `بيانات الدخول لبوابات تقييمات IBDL التشخيصية:\nاسم المستخدم: ${usernameSpecimen}\nكلمة المرور: ${passwordSpecimen}\nالبوابات: PQP (pqp.ibdl.net) | CPAT (cpat.ibdl.net) | Management Drives (md.ibdl.net)`
      : `IBDL Diagnostic Assessment Credentials:\nUsername: ${usernameSpecimen}\nPassword: ${passwordSpecimen}\nPortals: PQP (pqp.ibdl.net) | CPAT (cpat.ibdl.net) | Management Drives (md.ibdl.net)`;
    const ok = await copyText(text);
    if (ok) {
      setCopiedAll(true);
      setCredentialsAcknowledged(true);
      setTimeout(() => setCopiedAll(false), 3000);
    }
  };

  const handleProceedToWorkspace = (e: React.MouseEvent) => {
    if (!credentialsAcknowledged) {
      e.preventDefault();
      setShowCredentialsConfirm(true);
    } else {
      closeRegistration();
    }
  };

  const handleBackToWebsite = () => {
    if (!credentialsAcknowledged) {
      setShowCredentialsConfirm(true);
    } else {
      closeRegistration();
    }
  };

  const handleCopyAndClose = async () => {
    await handleCopyAll();
    setCredentialsAcknowledged(true);
    setTimeout(() => {
      closeRegistration();
    }, 450);
  };

  const { currentDateFormatted, nextYearDateFormatted } = useMemo(() => {
    const now = new Date();
    const currentDate = now.toLocaleDateString(isAr ? "ar-EG" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const nextYear = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const nextYearDate = nextYear.toLocaleDateString(isAr ? "ar-EG" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return {
      currentDateFormatted: currentDate,
      nextYearDateFormatted: nextYearDate,
    };
  }, [isAr]);

  return (
    <div className="animate-in fade-in py-2 text-start duration-300">
      {/* 1. Header & Success Ring */}
      <SuccessHeader firstName={firstName} isAr={isAr} email={formData.email} />

      {/* 2. Activated Membership Block */}
      <SuccessMembershipSummary
        currentDateFormatted={currentDateFormatted}
        nextYearDateFormatted={nextYearDateFormatted}
        isAr={isAr}
        email={formData.email}
      />

      {/* 3. Specimen Credentials Box */}
      <SuccessCredentialsCard
        usernameSpecimen={usernameSpecimen}
        passwordSpecimen={passwordSpecimen}
        copiedUsername={copiedUsername}
        copiedPassword={copiedPassword}
        copiedAll={copiedAll}
        credentialsAcknowledged={credentialsAcknowledged}
        onCopyUsername={handleCopyUsername}
        onCopyPassword={handleCopyPassword}
        onCopyAll={handleCopyAll}
        onAcknowledgeChange={setCredentialsAcknowledged}
        isAr={isAr}
      />

      {/* 4. Assessment Portals */}
      <SuccessPortalLinks isAr={isAr} />

      {/* 5. Modal Action Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleProceedToWorkspace}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] py-4 text-center text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-[#b60d14]"
        >
          <Mail className="h-4 w-4 shrink-0" />
          <span>
            {isAr
              ? "افتح بريدك الإلكتروني لتفعيل الحساب (صالح ١٠ دقائق) ←"
              : "Check Email to Activate Account (Valid 10 min) →"}
          </span>
        </button>

        <div className="flex items-center justify-center gap-1.5 py-0.5 text-xs text-[#6a6a86]">
          <span>
            {isAr
              ? "لم يصلك البريد أو انتهت صلاحيته؟"
              : "Didn't receive email or link expired?"}
          </span>
          <Link
            href="/activate"
            onClick={closeRegistration}
            className="font-bold text-amber-700 hover:underline"
          >
            {isAr ? "إعادة إرسال رابط التفعيل" : "Resend activation link"}
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 py-1 text-xs text-[#6a6a86]">
          <span>{isAr ? "هل قمت بالتفعيل بالفعل؟" : "Already activated?"}</span>
          <Link
            href="/login"
            onClick={closeRegistration}
            className="font-bold text-[#e11119] hover:underline"
          >
            {isAr ? "تسجيل الدخول" : "Sign In"}
          </Link>
        </div>

        <button
          type="button"
          onClick={handleBackToWebsite}
          className="w-full cursor-pointer py-2 text-center text-xs font-bold text-[#6a6a86] transition-colors hover:text-[#16162c]"
        >
          {isAr ? "العودة للموقع" : "Back to the website"}
        </button>
      </div>

      {/* 6. Safety Confirmation Guard Modal */}
      {isClient && (
        <SuccessSafetyModal
          isOpen={showCredentialsConfirm}
          usernameSpecimen={usernameSpecimen}
          passwordSpecimen={passwordSpecimen}
          onCopyAndClose={handleCopyAndClose}
          onConfirmClose={() => {
            setCredentialsAcknowledged(true);
            closeRegistration();
          }}
          onCancel={() => setShowCredentialsConfirm(false)}
          isAr={isAr}
        />
      )}
    </div>
  );
}

// Compound component attachments
RegistrationSuccess.Header = SuccessHeader;
RegistrationSuccess.MembershipSummary = SuccessMembershipSummary;
RegistrationSuccess.CredentialsCard = SuccessCredentialsCard;
RegistrationSuccess.PortalLinks = SuccessPortalLinks;
RegistrationSuccess.SafetyModal = SuccessSafetyModal;
