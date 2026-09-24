export type RegistrationLocale = "en" | "ar";

export interface CheckDuplicateInput {
  email?: string;
  mobile?: string;
  country?: string;
  locale?: RegistrationLocale;
}

export interface CheckDuplicateResponseData {
  isDuplicate: boolean;
  clashType: "none" | "email" | "mobile" | "both";
  emailClash: boolean;
  mobileClash: boolean;
}

export interface RegisterMemberInput {
  fullName: string;
  email: string;
  mobile: string;
  country: string;
  linkedinUrl?: string;
  yearsOfExperience: string;
  areasOfExpertise: string[];
  industriesServed: string[];
  bio?: string;
  message?: string;
  cvFileId?: string;
  directoryOptIn?: boolean;
  termsAccepted: boolean;
  locale?: RegistrationLocale;
}

export interface RegisterMemberResponseData {
  member: {
    id: string;
    fullName: string;
    email: string;
  };
  membership: {
    tier: string;
    fee: string;
    payment: string;
    status: string;
    startDate: string;
    renewsOn: string;
  };
  pqpAccess: {
    username: string;
    password: string;
    assessmentLink: string;
    note: string;
  };
  welcomeEmail: {
    from: string;
    senderName: string;
    subject: string;
  };
}

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

export type StepNumber = 1 | 2 | 3 | "duplicate" | "success";

export interface SpecimenCredentials {
  username: string;
  password: string;
  portalUrl: string;
  pqpKey: string;
  cpatKey: string;
  managementDrivesKey: string;
}

export interface RegistrationContextValue {
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
  safeCloseRegistration: () => void;
  credentialsAcknowledged: boolean;
  setCredentialsAcknowledged: (ack: boolean) => void;
  showCredentialsConfirm: boolean;
  setShowCredentialsConfirm: (show: boolean) => void;
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
