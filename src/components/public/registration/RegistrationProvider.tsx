"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useToast } from "@/components/ui/Toast";
import {
  checkDuplicateAction,
  registerMemberAction,
} from "@/actions/registerActions";
import { RegisterMemberInput, RegistrationLocale } from "@/types/registration";
import { getLocalizedErrorMessage } from "@/lib/validations/registrationErrors";
import { normalizeLinkedInUrl } from "@/lib/validations/registration";

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
  fieldErrors: Record<string, string[]> | null;
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
  validateStep1: (locale?: RegistrationLocale) => boolean;
  validateStep2: (locale?: RegistrationLocale) => boolean;
  checkDuplicate: (locale?: RegistrationLocale) => Promise<boolean>;
  submitRegistration: (locale?: RegistrationLocale) => Promise<boolean>;
  restoreStep1FromDuplicate: () => void;
}

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
  const [fieldErrors, setFieldErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
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
    setFieldErrors(null);
    setDuplicateClashLead(null);
  }, []);

  const closeRegistration = useCallback(() => {
    setIsOpen(false);
  }, []);

  const updateFormData = useCallback(
    (fields: Partial<RegistrationFormData>) => {
      setFormData((prev) => {
        const next = { ...prev, ...fields };
        if (fields.email !== undefined) setEmailError(null);
        if (fields.phone !== undefined) setPhoneError(null);
        setFieldErrors(null);
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
    setFieldErrors(null);
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
    setFieldErrors(null);
  }, []);

  const validateStep1 = useCallback(
    (locale: RegistrationLocale = "en"): boolean => {
      setEmailError(null);
      setPhoneError(null);
      setDuplicateClashLead(null);

      const emailTrim = formData.email.trim().toLowerCase();
      const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, "");

      let isValid = true;
      const errors: Record<string, string[]> = {};

      if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
        isValid = false;
        errors.fullName = [
          getLocalizedErrorMessage("fullName", "required", locale),
        ];
      }

      if (!emailTrim || !/\S+@\S+\.\S+/.test(emailTrim)) {
        isValid = false;
        errors.email = [
          getLocalizedErrorMessage(
            "email",
            !emailTrim ? "required" : "invalid",
            locale
          ),
        ];
      }

      if (!formData.phone.trim() || cleanPhone.length < 7) {
        isValid = false;
        errors.mobile = [
          getLocalizedErrorMessage(
            "mobile",
            !formData.phone.trim() ? "required" : "invalid",
            locale
          ),
        ];
      }

      if (!formData.country.trim()) {
        isValid = false;
        errors.country = [
          getLocalizedErrorMessage("country", "required", locale),
        ];
      }

      if (!isValid) {
        setFieldErrors(errors);
      }

      return isValid;
    },
    [formData]
  );

  const validateStep2 = useCallback(
    (locale: RegistrationLocale = "en"): boolean => {
      let isValid = true;
      const errors: Record<string, string[]> = {};

      if (!formData.yearsExperience) {
        isValid = false;
        errors.yearsOfExperience = [
          getLocalizedErrorMessage("yearsOfExperience", "required", locale),
        ];
      }
      // Areas of expertise and industries served are optional in Step 2 per UI and backend schema

      if (!isValid) {
        setFieldErrors(errors);
      }

      return isValid;
    },
    [formData]
  );

  const checkDuplicate = useCallback(
    async (locale: RegistrationLocale = "en"): Promise<boolean> => {
      setEmailError(null);
      setPhoneError(null);
      setDuplicateClashLead(null);

      try {
        const res = await checkDuplicateAction({
          email: formData.email,
          mobile: formData.phone,
          country: formData.country,
          locale,
        });

        if (res.success && res.data) {
          const { isDuplicate, emailClash, mobileClash } = res.data;
          if (isDuplicate) {
            if (emailClash && mobileClash) {
              setDuplicateClashLead(
                locale === "ar"
                  ? "يوجد حساب مسجل بالفعل ببريد الإلكتروني ورقم الجوال هذا."
                  : "An account with this email address and mobile number already exists."
              );
              setEmailError(
                locale === "ar"
                  ? "هذا البريد الإلكتروني مسجل بالفعل."
                  : "This email address is already registered."
              );
              setPhoneError(
                locale === "ar"
                  ? "رقم الجوال هذا مسجل بالفعل."
                  : "This mobile number is already registered."
              );
            } else if (emailClash) {
              setDuplicateClashLead(
                locale === "ar"
                  ? "يوجد حساب مسجل بالفعل بهذا البريد الإلكتروني."
                  : "An account with this email address already exists."
              );
              setEmailError(
                locale === "ar"
                  ? "هذا البريد الإلكتروني مسجل بالفعل."
                  : "This email address is already registered."
              );
            } else {
              setDuplicateClashLead(
                locale === "ar"
                  ? "يوجد حساب مسجل بالفعل برقم الجوال هذا."
                  : "An account with this mobile number already exists."
              );
              setPhoneError(
                locale === "ar"
                  ? "رقم الجوال هذا مسجل بالفعل."
                  : "This mobile number is already registered."
              );
            }
            setStep("duplicate");
            return false;
          }
        }
      } catch {
        // Allow progression if offline
      }
      return true;
    },
    [formData]
  );

  const restoreStep1FromDuplicate = useCallback(() => {
    setStep(1);
  }, []);

  const submitRegistration = useCallback(
    async (locale: RegistrationLocale = "en"): Promise<boolean> => {
      if (!formData.consentDeclaration) return false;

      setIsSubmitting(true);
      setFieldErrors(null);

      const payload: RegisterMemberInput = {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.phone,
        country: formData.country,
        linkedinUrl: normalizeLinkedInUrl(formData.linkedInUrl),
        yearsOfExperience: formData.yearsExperience,
        areasOfExpertise: formData.expertise,
        industriesServed: formData.industries,
        bio: formData.biography || undefined,
        message: formData.message || undefined,
        cvFileId: formData.cvFileName || undefined,
        directoryOptIn: formData.directoryOptIn,
        termsAccepted: formData.consentDeclaration,
        locale,
      };

      try {
        const res = await registerMemberAction(payload);

        if (!res.success) {
          const isDuplicate =
            res.error?.toLowerCase().includes("registered") ||
            res.error?.includes("مسجل") ||
            Boolean(
              res.fieldErrors?.email &&
              res.fieldErrors.email[0]?.toLowerCase().includes("registered")
            );

          if (isDuplicate) {
            setDuplicateClashLead(
              locale === "ar"
                ? "يوجد حساب مسجل بالفعل ببيانات التواصل هذه."
                : "An account with this email address or mobile number already exists."
            );
            setStep("duplicate");
            setIsSubmitting(false);
            return false;
          }

          if (res.fieldErrors) {
            setFieldErrors(res.fieldErrors);

            const hasStep1Error = Object.keys(res.fieldErrors).some((k) =>
              ["fullName", "email", "mobile", "country"].includes(k)
            );
            const hasStep2Error = Object.keys(res.fieldErrors).some((k) =>
              [
                "yearsOfExperience",
                "areasOfExpertise",
                "industriesServed",
              ].includes(k)
            );

            if (hasStep1Error) {
              setStep(1);
            } else if (hasStep2Error) {
              setStep(2);
            }
          }
          if (res.error) {
            showToast(
              "error",
              locale === "ar" ? "فشل التسجيل" : "Registration Failed",
              res.error,
              "public"
            );
          }
          setIsSubmitting(false);
          return false;
        }

        if (res.data) {
          const pqp = res.data.pqpAccess;
          const creds: SpecimenCredentials = {
            username: pqp.username,
            password: pqp.password,
            portalUrl: pqp.assessmentLink.startsWith("http")
              ? pqp.assessmentLink
              : `https://${pqp.assessmentLink}`,
            pqpKey: `PQP-FLH-2026-${res.data.member.id.substring(0, 4)}`,
            cpatKey: `CPAT-FLH-2026-${res.data.member.id.substring(0, 4)}`,
            managementDrivesKey: `MD-FLH-2026-${res.data.member.id.substring(0, 4)}`,
          };

          try {
            sessionStorage.setItem(
              SESSION_STORAGE_KEY,
              JSON.stringify({
                formData,
                step: "success",
                member: res.data.member,
                credentials: creds,
                updatedAt: new Date().toISOString(),
              })
            );
          } catch {
            // Ignore storage write errors
          }

          showToast(
            "success",
            locale === "ar"
              ? "تم تعيين صلاحيات التقييم التشخيصي لك"
              : "Diagnostic assessment access assigned to you",
            locale === "ar"
              ? "مرحباً بك في منصة المستقلين! تم تفعيل عضويتك الأساسية."
              : "Welcome to Freelancers Hub! Your Essential Membership is active.",
            "public"
          );

          setSpecimenCredentials(creds);
          setIsSubmitting(false);
          setStep("success");
          return true;
        }

        setIsSubmitting(false);
        return false;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        showToast(
          "error",
          locale === "ar" ? "خطأ في التسجيل" : "Registration Error",
          message,
          "public"
        );
        setIsSubmitting(false);
        return false;
      }
    },
    [formData, showToast]
  );

  return (
    <RegistrationContext.Provider
      value={{
        isOpen,
        step,
        formData,
        emailError,
        phoneError,
        fieldErrors,
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
        checkDuplicate,
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
