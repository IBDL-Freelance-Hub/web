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
    deliveryNotice: {
      en: "Delivery can occasionally take a few minutes. If it doesn't arrive, check spam or request a new link.",
      ar: "قد يستغرق وصول البريد بضع دقائق أحياناً. إذا لم يصلك، يرجى التحقق من مجلد الرسائل غير المرغوب فيها (Spam) أو طلب رابط جديد.",
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

  // Sign-In Gate Strings
  signIn: {
    title: {
      en: "Sign in to the Hub",
      ar: "تسجيل الدخول للمنصة",
    },
    subtitle: {
      en: "Your Freelancer Hub account was created from your original registration. You never need to register twice.",
      ar: "تم إنشاء حسابك في المنصة أثناء عملية تسجيلك الأساسية. لن تحتاج للتسجيل أكثر من مرة.",
    },
    emailLabel: {
      en: "Email address",
      ar: "البريد الإلكتروني",
    },
    passwordLabel: {
      en: "Password",
      ar: "كلمة المرور",
    },
    forgotPassword: {
      en: "Forgot password?",
      ar: "نسيت كلمة المرور؟",
    },
    submitButton: {
      en: "Sign in",
      ar: "تسجيل الدخول",
    },
    submittingButton: {
      en: "Signing in...",
      ar: "جاري تسجيل الدخول...",
    },
    showPassword: {
      en: "Show password",
      ar: "إظهار كلمة المرور",
    },
    hidePassword: {
      en: "Hide password",
      ar: "إخفاء كلمة المرور",
    },
    notActivatedPrompt: {
      en: "Registered but never activated your account? ",
      ar: "مسجل ولم تفعل حسابك بعد؟ ",
    },
    activateLink: {
      en: "Activate it here",
      ar: "فعل حسابك من هنا",
    },
    accountActivatedTitle: {
      en: "Account Activated!",
      ar: "تم تفعيل الحساب بنجاح!",
    },
    accountActivatedDescription: {
      en: "Account activated successfully! You can now log in.",
      ar: "تم تفعيل حسابك بنجاح! يمكنك الآن تسجيل الدخول.",
    },
  },

  // Gate Branding Panel Strings (Canonical Single Source of Truth for Branding Panel)
  branding: {
    heading: {
      en: "Your professional workspace.",
      ar: "مساحة عملك المهنية المتكاملة.",
    },
    lead: {
      en: "Everything IBDL Learning Group has built — simulations, assessments, accreditation and certification — organised around your independent practice.",
      ar: "كل ما طورته مجموعة IBDL للتعلم — من ألعاب محاكاة، وتقييمات، واعتمادات وشهادات مهنية — مُنظم بالكامل لدعم ممارستك التدريبية المستقلة.",
    },
    bullets: [
      {
        en: "Access the IBDL toolkit under your membership",
        ar: "الوصول لمحفظة أدوات IBDL بموجب عضويتك",
      },
      {
        en: "Submit programmes for IBDL accreditation",
        ar: "تقديم البرامج والحقائب للاعتماد من IBDL",
      },
      {
        en: "Follow every request through to completion",
        ar: "متابعة تنفيذ كافة طلباتك واستشاراتك خطوة بخطوة",
      },
    ],
    logoAlt: {
      en: "IBDL Freelancers Hub Logo",
      ar: "شعار منصة المستقلين IBDL",
    },
    login: {
      heading: {
        en: "Your professional workspace.",
        ar: "مساحة عملك المهنية المتكاملة.",
      },
      lead: {
        en: "Everything IBDL Learning Group has built — simulations, assessments, accreditation and certification — organised around your independent practice.",
        ar: "كل ما طورته مجموعة IBDL للتعلم — من ألعاب محاكاة، وتقييمات، واعتمادات وشهادات مهنية — مُنظم بالكامل لدعم ممارستك التدريبية المستقلة.",
      },
      bullets: [
        {
          en: "Access the IBDL toolkit under your membership",
          ar: "الوصول لمحفظة أدوات IBDL بموجب عضويتك",
        },
        {
          en: "Submit programmes for IBDL accreditation",
          ar: "تقديم البرامج والحقائب للاعتماد من IBDL",
        },
        {
          en: "Follow every request through to completion",
          ar: "متابعة تنفيذ كافة طلباتك واستشاراتك خطوة بخطوة",
        },
      ],
      logoAlt: {
        en: "IBDL Freelancers Hub Logo",
        ar: "شعار منصة المستقلين IBDL",
      },
    },
    activate: {
      heading: {
        en: "Activate your Hub account.",
        ar: "تفعيل حسابك في المنصة.",
      },
      lead: {
        en: "One final step to secure your account with a password and unlock your member dashboard and diagnostic tools.",
        ar: "خطوة واحدة أخيرة لتأمين حسابك وتعيين كلمة المرور الخاصة بك للوصول إلى لوحة التحكم وكافة مزايا العضوية.",
      },
      bullets: [
        {
          en: "Set up your secure password once to complete registration",
          ar: "عيّن كلمة مرور آمنة لمرة واحدة لإتمام تسجيلك في المنصة",
        },
        {
          en: "Unlock 3 free diagnostic assessments automatically",
          ar: "احصل على وصول فوري ومجاني لـ ٣ تقييمات تشخيصية دولية",
        },
        {
          en: "Start building and managing your trainer visibility",
          ar: "ابدأ في بناء هويتك التدريبية وإدارة ملفك المهني المعتمد",
        },
      ],
      logoAlt: {
        en: "IBDL Freelancers Hub Logo",
        ar: "شعار منصة المستقلين IBDL",
      },
    },
    resetPassword: {
      heading: {
        en: "Reset your password.",
        ar: "إعادة ضبط كلمة المرور.",
      },
      lead: {
        en: "Choose a secure new password to regain access to your Freelancers Hub account, simulation toolkit, and professional certifications.",
        ar: "اختر كلمة مرور جديدة وآمنة لاستعادة الوصول إلى حسابك في منصة المستقلين وحقيبة المحاكاة والاعتمادات المهنية.",
      },
      bullets: [],
      logoAlt: {
        en: "IBDL Freelancers Hub Logo",
        ar: "شعار منصة المستقلين IBDL",
      },
    },
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
