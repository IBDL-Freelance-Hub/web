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
