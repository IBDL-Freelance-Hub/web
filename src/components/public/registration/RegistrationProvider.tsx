"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useToast } from "@/components/ui/Toast";

export interface RegistrationFormData {
  // Step 1: Your Details
  fullName: string;
  email: string;
  phone: string;
  country: string;
  linkedInUrl?: string;

  // Step 2: Your Practice
  expertise: string[];
  yearsExperience: string;
  cvFileName?: string;
  industries?: string;
  biography?: string;
  message?: string;

  // Step 3: Confirmation
  directoryOptIn: boolean;
  consentDeclaration: boolean;
}

const initialFormData: RegistrationFormData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  linkedInUrl: "",
  expertise: [],
  yearsExperience: "",
  cvFileName: "",
  industries: "",
  biography: "",
  message: "",
  directoryOptIn: true,
  consentDeclaration: false,
};

export type StepNumber = 1 | 2 | 3 | 4;

interface RegistrationContextValue {
  isOpen: boolean;
  step: StepNumber;
  formData: RegistrationFormData;
  emailError: string | null;
  specimenCredential: string | null;
  openRegistration: () => void;
  closeRegistration: () => void;
  setStep: (step: StepNumber) => void;
  updateFormData: (fields: Partial<RegistrationFormData>) => void;
  toggleExpertise: (item: string) => void;
  validateStep1: () => boolean;
  validateStep2: () => boolean;
  submitRegistration: () => void;
}

const MOCK_EXISTING_EMAILS = [
  "trainer@ibdl.net",
  "existing@ibdl.net",
  "admin@ibdl.net",
];

const RegistrationContext = createContext<RegistrationContextValue | undefined>(
  undefined
);

export function RegistrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<StepNumber>(1);
  const [formData, setFormData] =
    useState<RegistrationFormData>(initialFormData);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [specimenCredential, setSpecimenCredential] = useState<string | null>(
    null
  );

  const { showToast } = useToast();

  const openRegistration = useCallback(() => {
    setIsOpen(true);
    setStep(1);
    setEmailError(null);
  }, []);

  const closeRegistration = useCallback(() => {
    setIsOpen(false);
  }, []);

  const updateFormData = useCallback(
    (fields: Partial<RegistrationFormData>) => {
      setFormData((prev) => ({ ...prev, ...fields }));
    },
    []
  );

  const toggleExpertise = useCallback((item: string) => {
    setFormData((prev) => {
      const exists = prev.expertise.includes(item);
      return {
        ...prev,
        expertise: exists
          ? prev.expertise.filter((i) => i !== item)
          : [...prev.expertise, item],
      };
    });
  }, []);

  const validateStep1 = useCallback(() => {
    setEmailError(null);
    if (!formData.fullName.trim()) return false;
    if (!formData.email.trim() || !formData.email.includes("@")) return false;
    if (MOCK_EXISTING_EMAILS.includes(formData.email.trim().toLowerCase())) {
      setEmailError(
        "This email address is already registered in the Hub system."
      );
      return false;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7)
      return false;
    if (!formData.country.trim()) return false;
    return true;
  }, [formData]);

  const validateStep2 = useCallback(() => {
    if (formData.expertise.length === 0) return false;
    if (!formData.yearsExperience) return false;
    if (!formData.cvFileName) return false;
    return true;
  }, [formData]);

  const submitRegistration = useCallback(() => {
    if (!formData.consentDeclaration) return;

    const credId = `PQP-FLH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSpecimenCredential(credId);

    showToast(
      "success",
      "PQP™ Access Assigned",
      `Welcome to Freelancers Hub! Credential ${credId} is now active on your Essential tier.`,
      "public"
    );

    setStep(4);
  }, [formData, showToast]);

  return (
    <RegistrationContext.Provider
      value={{
        isOpen,
        step,
        formData,
        emailError,
        specimenCredential,
        openRegistration,
        closeRegistration,
        setStep,
        updateFormData,
        toggleExpertise,
        validateStep1,
        validateStep2,
        submitRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
}
