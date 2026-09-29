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
import {
  RegisterMemberInput,
  RegistrationLocale,
  type RegistrationFormData,
  type StepNumber,
  type SpecimenCredentials,
  type RegistrationContextValue,
} from "@/types/registration";
import { getLocalizedErrorMessage } from "@/lib/validations/registrationErrors";
import {
  normalizeLinkedInUrl,
  isValidMobileForCountry,
} from "@/lib/validations/registration";

export type {
  RegistrationFormData,
  StepNumber,
  SpecimenCredentials,
  RegistrationContextValue,
};

const initialFormData: RegistrationFormData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  linkedInUrl: "",
  expertise: [],
  yearsExperience: "",
  cvFileName: "",
  cvFile: null,
  industries: [],
  biography: "",
  message: "",
  directoryOptIn: true,
  consentDeclaration: false,
};

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
  const [credentialsAcknowledged, setCredentialsAcknowledged] = useState(false);
  const [showCredentialsConfirm, setShowCredentialsConfirm] = useState(false);

  const { showToast } = useToast();

  // Save snapshot to sessionStorage whenever formData changes
  useEffect(() => {
    try {
      const serializableFormData = { ...formData, cvFile: undefined };
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          formData: serializableFormData,
          step,
          updatedAt: new Date().toISOString(),
        })
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
    setCredentialsAcknowledged(false);
    setShowCredentialsConfirm(false);
  }, []);

  const closeRegistration = useCallback(() => {
    setIsOpen(false);
    setShowCredentialsConfirm(false);
  }, []);

  const safeCloseRegistration = useCallback(() => {
    if (step === "success" && !credentialsAcknowledged) {
      setShowCredentialsConfirm(true);
    } else {
      setIsOpen(false);
      setShowCredentialsConfirm(false);
    }
  }, [step, credentialsAcknowledged]);

  const updateFormData = useCallback(
    (fields: Partial<RegistrationFormData>) => {
      setFormData((prev) => ({ ...prev, ...fields }));
      if (fields.email !== undefined) setEmailError(null);
      if (fields.phone !== undefined) setPhoneError(null);
      setFieldErrors((prev) => {
        if (!prev) return null;
        const next = { ...prev };
        for (const k of Object.keys(fields)) {
          delete next[k];
          if (k === "phone") delete next.mobile;
          if (k === "yearsExperience") delete next.yearsOfExperience;
          if (k === "cvFileName" || k === "cvFile") delete next.cvFile;
          if (k === "consentDeclaration") delete next.termsAccepted;
        }
        return Object.keys(next).length > 0 ? next : null;
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
      const phoneTrim = formData.phone.trim();

      let isValid = true;
      const errors: Record<string, string[]> = {};

      if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
        isValid = false;
        errors.fullName = [
          getLocalizedErrorMessage(
            "fullName",
            !formData.fullName.trim() ? "required" : "tooShort",
            locale
          ),
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

      if (!phoneTrim) {
        isValid = false;
        errors.mobile = [
          getLocalizedErrorMessage("mobile", "required", locale),
        ];
      } else if (!phoneTrim.startsWith("+")) {
        isValid = false;
        errors.mobile = [
          getLocalizedErrorMessage("mobile", "missingCountryCode", locale),
        ];
      } else if (!isValidMobileForCountry(phoneTrim, formData.country)) {
        isValid = false;
        errors.mobile = [getLocalizedErrorMessage("mobile", "invalid", locale)];
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

      if (!formData.cvFileName) {
        isValid = false;
        errors.cvFile = [
          getLocalizedErrorMessage("cvFile", "required", locale),
        ];
      }

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
        let fileBase64: string | undefined;
        let fileName: string | undefined;
        let fileType: string | undefined;

        if (formData.cvFile) {
          const arrayBuffer = await formData.cvFile.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          let binary = "";
          const len = bytes.byteLength;
          for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          fileBase64 = btoa(binary);
          fileName = formData.cvFile.name;
          fileType = formData.cvFile.type || "application/pdf";
        }

        const res = await registerMemberAction({
          payload,
          fileBase64,
          fileName,
          fileType,
        });

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
                "cvFile",
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
          try {
            sessionStorage.setItem(
              SESSION_STORAGE_KEY,
              JSON.stringify({
                formData,
                step: "success",
                member: res.data.member,
                updatedAt: new Date().toISOString(),
              })
            );
          } catch {
            // Ignore storage write errors
          }

          showToast(
            "success",
            locale === "ar"
              ? "تم إنشاء الحساب بنجاح"
              : "Account created successfully",
            locale === "ar"
              ? "يرجى مراجعة بريدك الإلكتروني لتفعيل الحساب وتعيين كلمة المرور للوصول إلى بيانات التقييم."
              : "Please check your email to activate your account and set your password to access your assessment credentials.",
            "public"
          );

          setSpecimenCredentials(null);
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
        safeCloseRegistration,
        credentialsAcknowledged,
        setCredentialsAcknowledged,
        showCredentialsConfirm,
        setShowCredentialsConfirm,
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
