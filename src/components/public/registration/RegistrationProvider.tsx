"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
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
  industries: string[];
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
  industries: [],
  biography: "",
  message: "",
  directoryOptIn: true,
  consentDeclaration: false,
};

export type StepNumber = 1 | 2 | 3 | "duplicate" | "success";

export interface SpecimenCredentials {
  username: string;
  password: string;
  portalUrl: string;
  pqpKey: string;
  cpatKey: string;
  managementDrivesKey: string;
}

interface RegistrationContextValue {
  isOpen: boolean;
  step: StepNumber;
  formData: RegistrationFormData;
  emailError: string | null;
  phoneError: string | null;
  duplicateClashLead: string | null;
  isSubmitting: boolean;
  completionPercentage: number;
  specimenCredentials: SpecimenCredentials | null;
  openRegistration: () => void;
  closeRegistration: () => void;
  setStep: (step: StepNumber) => void;
  updateFormData: (fields: Partial<RegistrationFormData>) => void;
  toggleExpertise: (item: string) => void;
  toggleIndustry: (item: string) => void;
  validateStep1: () => boolean;
  validateStep2: () => boolean;
  submitRegistration: () => Promise<void>;
  restoreStep1FromDuplicate: () => void;
}

const MOCK_EXISTING_REGISTRATIONS = [
  { email: "trainer@ibdl.net", phone: "201000000000" },
  { email: "existing@ibdl.net", phone: "966500000000" },
  { email: "admin@ibdl.net", phone: "20123456789" },
];

const SESSION_STORAGE_KEY = "flh_registration_snapshot";

function getInitialFormData(): RegistrationFormData {
  if (typeof window === "undefined") return initialFormData;
  try {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.formData) {
        return { ...initialFormData, ...parsed.formData };
      }
    }
  } catch {
    // Ignore storage read errors
  }
  return initialFormData;
}

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
    useState<RegistrationFormData>(getInitialFormData);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [duplicateClashLead, setDuplicateClashLead] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specimenCredentials, setSpecimenCredentials] =
    useState<SpecimenCredentials | null>(null);

  const { showToast } = useToast();

  // Save snapshot to sessionStorage whenever formData changes
  useEffect(() => {
    try {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({ formData, step, updatedAt: new Date().toISOString() })
      );
    } catch {
      // Ignore storage write errors
    }
  }, [formData, step]);

  // Calculate 10-criteria profile completion percentage (SCR-17)
  const calculateCompletion = useCallback(
    (data: RegistrationFormData): number => {
      let completedCount = 0;

      if (data.fullName.trim()) completedCount++;
      if (data.email.trim() && /\S+@\S+\.\S+/.test(data.email.trim()))
        completedCount++;
      if (data.phone.trim().length >= 7) completedCount++;
      if (data.country.trim()) completedCount++;
      if (data.linkedInUrl && data.linkedInUrl.trim()) completedCount++;
      if (data.expertise.length > 0) completedCount++;
      if (data.yearsExperience.trim()) completedCount++;
      if (data.industries.length > 0) completedCount++;
      if (data.biography && data.biography.trim()) completedCount++;
      if (data.cvFileName && data.cvFileName.trim()) completedCount++;

      return Math.round((completedCount / 10) * 100);
    },
    []
  );

  const completionPercentage = calculateCompletion(formData);

  const openRegistration = useCallback(() => {
    setIsOpen(true);
    setStep(1);
    setEmailError(null);
    setPhoneError(null);
    setDuplicateClashLead(null);
  }, []);

  const closeRegistration = useCallback(() => {
    setIsOpen(false);
  }, []);

  const updateFormData = useCallback(
    (fields: Partial<RegistrationFormData>) => {
      setFormData((prev) => {
        const next = { ...prev, ...fields };
        // Clear errors immediately when field is typed in
        if (fields.email !== undefined) setEmailError(null);
        if (fields.phone !== undefined) setPhoneError(null);
        return next;
      });
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

  const toggleIndustry = useCallback((item: string) => {
    setFormData((prev) => {
      const exists = prev.industries.includes(item);
      return {
        ...prev,
        industries: exists
          ? prev.industries.filter((i) => i !== item)
          : [...prev.industries, item],
      };
    });
  }, []);

  const validateStep1 = useCallback(() => {
    setEmailError(null);
    setPhoneError(null);
    setDuplicateClashLead(null);

    const emailTrim = formData.email.trim().toLowerCase();
    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, "");

    let isValid = true;

    if (!formData.fullName.trim()) isValid = false;

    if (!emailTrim || !/\S+@\S+\.\S+/.test(emailTrim)) {
      isValid = false;
    }

    if (!formData.phone.trim() || cleanPhone.length < 7) {
      isValid = false;
    }

    if (!formData.country.trim()) isValid = false;

    if (!isValid) return false;

    // Check SCR-18 Duplicate Registrations
    const duplicateByEmail = MOCK_EXISTING_REGISTRATIONS.find(
      (r) => r.email === emailTrim
    );
    const duplicateByPhone = MOCK_EXISTING_REGISTRATIONS.find(
      (r) => r.phone === cleanPhone
    );

    if (duplicateByEmail || duplicateByPhone) {
      if (duplicateByEmail && duplicateByPhone) {
        setDuplicateClashLead(
          "An account with this email address and mobile number already exists."
        );
        setEmailError("This email address is already registered.");
        setPhoneError("This mobile number is already registered.");
      } else if (duplicateByEmail) {
        setDuplicateClashLead(
          "An account with this email address already exists."
        );
        setEmailError("This email address is already registered.");
      } else {
        setDuplicateClashLead(
          "An account with this mobile number already exists."
        );
        setPhoneError("This mobile number is already registered.");
      }
      setStep("duplicate");
      return false;
    }

    return true;
  }, [formData]);

  const validateStep2 = useCallback(() => {
    if (!formData.yearsExperience) return false;
    if (!formData.cvFileName) return false;
    return true;
  }, [formData]);

  const restoreStep1FromDuplicate = useCallback(() => {
    setStep(1);
  }, []);

  const submitRegistration = useCallback(async () => {
    if (!formData.consentDeclaration) return;

    setIsSubmitting(true);

    const firstName = formData.fullName.trim().split(" ")[0].toLowerCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);

    const creds: SpecimenCredentials = {
      username: `flh.${firstName || "freelancer"}`,
      password: "PQP-2026-DEMO",
      portalUrl: "https://pqp.ibdl.net/start",
      pqpKey: `PQP-FLH-2026-${randomSuffix}`,
      cpatKey: `CPAT-FLH-2026-${randomSuffix}`,
      managementDrivesKey: `MD-FLH-2026-${randomSuffix}`,
    };

    // Show instant toast feedback
    showToast(
      "success",
      "Diagnostic assessment access assigned to you",
      `Welcome to Freelancers Hub! Your Essential Membership is being activated.`,
      "public"
    );

    // Simulate 1100ms API write delay according to SCR-16
    await new Promise((res) => setTimeout(res, 1100));

    setSpecimenCredentials(creds);
    setIsSubmitting(false);
    setStep("success");
  }, [formData, showToast]);

  return (
    <RegistrationContext.Provider
      value={{
        isOpen,
        step,
        formData,
        emailError,
        phoneError,
        duplicateClashLead,
        isSubmitting,
        completionPercentage,
        specimenCredentials,
        openRegistration,
        closeRegistration,
        setStep,
        updateFormData,
        toggleExpertise,
        toggleIndustry,
        validateStep1,
        validateStep2,
        submitRegistration,
        restoreStep1FromDuplicate,
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
