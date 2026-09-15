export type Locale = "en" | "ar";

export interface LocalizedString {
  en: string;
  ar: string;
}

export const AUTH_STRINGS = {
  // Password Complexity Policy Strings (Canonical Single Source of Truth)
  policy: {
    length: {
      en: "At least 8 characters",
      ar: "8 أحرف على الأقل",
    },
    uppercase: {
      en: "At least one uppercase letter (A-Z)",
      ar: "حرف كبير واحد على الأقل (A-Z)",
    },
    lowercase: {
      en: "At least one lowercase letter (a-z)",
      ar: "حرف صغير واحد على الأقل (a-z)",
    },
    number: {
      en: "At least one number (0-9)",
      ar: "رقم واحد على الأقل (0-9)",
    },
    match: {
      en: "Passwords match",
      ar: "كلمتا المرور متطابقتان",
    },
  },

  // Password Reset Strings
  resetPassword: {
    pageTitle: {
      en: "Reset your password",
      ar: "إعادة ضبط كلمة المرور",
    },
    pageSubtitle: {
      en: "Set up a secure new password to regain access to your Freelancers Hub account.",
      ar: "قم بتعيين كلمة مرور قوية وجديدة لاستعادة الوصول إلى حسابك في منصة المستقلين.",
    },
    newPasswordLabel: {
      en: "New Password",
      ar: "كلمة المرور الجديدة",
    },
    confirmPasswordLabel: {
      en: "Confirm New Password",
      ar: "تأكيد كلمة المرور الجديدة",
    },
    submitButton: {
      en: "Reset Password",
      ar: "إعادة تعيين كلمة المرور",
    },
    submittingButton: {
      en: "Resetting password...",
      ar: "جاري إعادة تعيين كلمة المرور...",
    },
    successTitle: {
      en: "Password Reset Successfully!",
      ar: "تمت إعادة تعيين كلمة المرور بنجاح!",
    },
    bannerDescription: {
      en: "Password reset successfully! You can now log in with your new password.",
      ar: "تمت إعادة تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.",
    },
  },

  // Forgot Password Strings
  forgotPassword: {
    pageTitle: {
      en: "Reset your password",
      ar: "إعادة ضبط كلمة المرور",
    },
    pageSubtitle: {
      en: "Enter the email you registered with and we will send you a reset link.",
      ar: "أدخل بريدك الإلكتروني المسجل وسنرسل لك رابط إعادة الضبط.",
    },
    emailLabel: {
      en: "Email address",
      ar: "البريد الإلكتروني",
    },
    submitButton: {
      en: "Send reset link",
      ar: "إرسال رابط إعادة الضبط",
    },
    submittingButton: {
      en: "Sending reset link...",
      ar: "جاري إرسال الرابط...",
    },
    // SEC-23 Anti-Enumeration Generic Message
    genericSuccess: {
      en: "If an account exists with this email, a password reset link has been sent.",
      ar: "إذا كان هناك حساب مسجل بهذا البريد الإلكتروني، فقد تم إرسال رابط إعادة تعيين كلمة المرور.",
    },
    confirmationTitle: {
      en: "Check your email",
      ar: "تحقق من بريدك الإلكتروني",
    },
    confirmationText: {
      en: "If an account exists with this email, a password reset link has been sent. Please check your inbox and spam folders.",
      ar: "إذا كان هناك حساب مسجل بهذا البريد الإلكتروني، فقد تم إرسال رابط إعادة تعيين كلمة المرور. يرجى مراجعة صندوق الوارد والبريد غير الهام.",
    },
    backToSignIn: {
      en: "Back to sign in",
      ar: "العودة لتسجيل الدخول",
    },
  },

  // VAL-142 Dedicated Recovery State (Invalid / Expired Token)
  recovery: {
    invalidLinkTitle: {
      en: "Link no longer valid",
      ar: "الرابط لم يعد صالحاً",
    },
    invalidLinkError: {
      en: "This reset link has expired or has already been used.",
      ar: "انتهت صلاحية رابط إعادة التعيين أو تم استخدامه بالفعل.",
    },
    requestNewLinkAction: {
      en: "Request a new link",
      ar: "طلب رابط جديد",
    },
  },

  // Account Lockout Strings
  lockout: {
    title: {
      en: "Account temporarily locked",
      ar: "تم قفل الحساب مؤقتاً",
    },
  },

  // Shared Common / Error Strings
  common: {
    somethingWentWrong: {
      en: "Something went wrong. Please try again.",
      ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    },
    backToPublic: {
      en: "‹ Back to the public site",
      ar: "‹ العودة للموقع العام",
    },
    copyright: "© 2026 IBDL Learning Group",
  },

  // Form Validation Strings
  validation: {
    emailRequired: {
      en: "Email address is required.",
      ar: "البريد الإلكتروني مطلوب.",
    },
    emailInvalid: {
      en: "Please enter a valid email address.",
      ar: "يرجى إدخال بريد إلكتروني صحيح.",
    },
    tokenRequired: {
      en: "Reset token is required.",
      ar: "رمز إعادة التعيين مطلوب.",
    },
    passwordRequired: {
      en: "Password is required.",
      ar: "الرجاء إدخال كلمة المرور.",
    },
    passwordCriteriaFailed: {
      en: "Password does not meet required criteria.",
      ar: "كلمة المرور لا تستوفي الشروط المطلوبة.",
    },
    confirmPasswordRequired: {
      en: "Please confirm your password.",
      ar: "الرجاء تأكيد كلمة المرور.",
    },
    passwordsDoNotMatch: {
      en: "Passwords do not match.",
      ar: "كلمتا المرور غير متطابقتين.",
    },
  },
} as const;
