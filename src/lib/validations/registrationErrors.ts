export type Locale = "en" | "ar";

export interface LocalizedMessage {
  en: string;
  ar: string;
}

export const REGISTRATION_ERROR_DICTIONARY: Record<
  string,
  Record<string, LocalizedMessage>
> = {
  fullName: {
    required: {
      en: "Full name is required (min 3 characters).",
      ar: "الاسم الكامل مطلوب (٣ أحرف على الأقل).",
    },
    tooShort: {
      en: "Full name must be at least 3 characters.",
      ar: "يجب أن يكون الاسم الكامل ٣ أحرف على الأقل.",
    },
    tooLong: {
      en: "Full name cannot exceed 100 characters.",
      ar: "لا يمكن أن يتجاوز الاسم الكامل ١٠٠ حرف.",
    },
  },
  email: {
    required: {
      en: "Email is required.",
      ar: "البريد الإلكتروني مطلوب.",
    },
    invalid: {
      en: "Please enter a valid email address.",
      ar: "يرجى إدخال بريد إلكتروني صحيح.",
    },
  },
  mobile: {
    required: {
      en: "Mobile number is required.",
      ar: "رقم الهاتف مطلوب.",
    },
    invalid: {
      en: "Please enter a valid phone number (min 7 digits).",
      ar: "يرجى إدخال رقم هاتف صالح (٧ أرقام على الأقل).",
    },
  },
  country: {
    required: {
      en: "Please select your country.",
      ar: "يرجى اختيار الدولة.",
    },
  },
  yearsOfExperience: {
    required: {
      en: "Please select your experience level.",
      ar: "يرجى اختيار مستوى الخبرة.",
    },
  },
  areasOfExpertise: {
    required: {
      en: "Select at least one option.",
      ar: "يرجى اختيار خيار واحد على الأقل.",
    },
  },
  industriesServed: {
    required: {
      en: "Select at least one option.",
      ar: "يرجى اختيار خيار واحد على الأقل.",
    },
  },
  termsAccepted: {
    required: {
      en: "You must accept the terms and conditions.",
      ar: "يجب الموافقة على الشروط والأحكام للمتابعة.",
    },
  },
};

export function getLocalizedErrorMessage(
  field: string,
  rule: string,
  locale: Locale = "en"
): string {
  const fieldRules = REGISTRATION_ERROR_DICTIONARY[field];
  if (fieldRules && fieldRules[rule]) {
    return fieldRules[rule][locale] || fieldRules[rule].en;
  }
  return locale === "ar" ? "بيانات غير صالحة" : "Invalid input";
}
