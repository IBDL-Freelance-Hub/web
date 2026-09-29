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
    missingCountryCode: {
      en: "Enter your number with the country code (e.g. +20 for Egypt).",
      ar: "أدخل رقمك مع رمز الدولة (مثلاً +20 لمصر).",
    },
    invalid: {
      en: "Please enter a valid mobile number matching your selected country code.",
      ar: "يرجى إدخال رقم هاتف صحيح يبدأ بـ (010, 011, 012, 015) لمصر، أو رقم خليجي صالح.",
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
  cvFile: {
    required: {
      en: "Please attach your CV to continue.",
      ar: "يرجى إرفاق السيرة الذاتية للمتابعة.",
    },
    invalid: {
      en: "Invalid CV file format. Only PDF, DOC, and DOCX files verified by signature are accepted.",
      ar: "صيغة السيرة الذاتية غير صالحة. نقبل فقط ملفات PDF و DOC و DOCX المؤكدة بالتوقيع الرقمي.",
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
