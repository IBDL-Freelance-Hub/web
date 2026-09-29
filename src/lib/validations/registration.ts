import { z } from "zod";
import { getLocalizedErrorMessage, Locale } from "./registrationErrors";

export const normalizeMobile = (mobile: string): string => {
  return mobile.replace(/[\s\-\(\)\+]/g, "");
};

export function isValidMobileForCountry(
  mobile: string,
  country?: string
): boolean {
  if (!mobile) return false;
  const cleaned = mobile.trim().replace(/[\s\-\(\)]/g, "");
  const c = (country || "").trim().toUpperCase();

  const isEG =
    ["EGYPT", "EG", "+20", "20"].includes(c) ||
    cleaned.startsWith("+20") ||
    cleaned.startsWith("0020");
  const isSA =
    ["SAUDI ARABIA", "SAUDI", "KSA", "SA", "+966", "966"].includes(c) ||
    cleaned.startsWith("+966") ||
    cleaned.startsWith("00966");
  const isAE =
    ["UNITED ARAB EMIRATES", "UAE", "AE", "+971", "971"].includes(c) ||
    cleaned.startsWith("+971") ||
    cleaned.startsWith("00971");
  const isKW =
    ["KUWAIT", "KW", "+965", "965"].includes(c) ||
    cleaned.startsWith("+965") ||
    cleaned.startsWith("00965");

  if (isEG) {
    if (cleaned.startsWith("+20")) return /^\+200?1[0125]\d{8}$/.test(cleaned);
    if (cleaned.startsWith("0020")) return /^00200?1[0125]\d{8}$/.test(cleaned);
    return /^01[0125]\d{8}$/.test(cleaned);
  }
  if (isSA) {
    if (cleaned.startsWith("+966")) return /^\+9660?5\d{8}$/.test(cleaned);
    if (cleaned.startsWith("00966")) return /^009660?5\d{8}$/.test(cleaned);
    return /^0?5\d{8}$/.test(cleaned);
  }
  if (isAE) {
    if (cleaned.startsWith("+971"))
      return /^\+9710?5[024568]\d{7}$/.test(cleaned);
    if (cleaned.startsWith("00971"))
      return /^009710?5[024568]\d{7}$/.test(cleaned);
    return /^0?5[024568]\d{7}$/.test(cleaned);
  }
  if (isKW) {
    if (cleaned.startsWith("+965")) return /^\+9650?[569]\d{7}$/.test(cleaned);
    if (cleaned.startsWith("00965")) return /^009650?[569]\d{7}$/.test(cleaned);
    return /^0?[569]\d{7}$/.test(cleaned);
  }

  return /^\+?\d{7,15}$/.test(cleaned);
}

export const normalizeExperienceBand = (val: string): string => {
  if (!val) return val;
  const trimmed = val.trim();
  if (trimmed === "Less than 2 years" || trimmed === "<2") return "<2";
  if (trimmed === "2–5 years" || trimmed === "2-5 years" || trimmed === "2-5")
    return "2-5";
  if (
    trimmed === "5–10 years" ||
    trimmed === "6-10 years" ||
    trimmed === "5-10" ||
    trimmed === "6-10"
  )
    return "6-10";
  if (
    trimmed === "10–15 years" ||
    trimmed === "11-15 years" ||
    trimmed === "10-15" ||
    trimmed === "11-15"
  )
    return "11-15";
  if (trimmed === "15+ years" || trimmed === ">15") return ">15";
  return trimmed;
};

export const getCheckDuplicateSchema = (locale: Locale = "en") =>
  z.object({
    email: z
      .string()
      .trim()
      .email(getLocalizedErrorMessage("email", "invalid", locale))
      .optional()
      .or(z.literal("")),
    mobile: z
      .string()
      .transform((val) => val.trim())
      .refine((val) => !val || normalizeMobile(val).length >= 7, {
        message: getLocalizedErrorMessage("mobile", "invalid", locale),
      })
      .optional()
      .or(z.literal("")),
    country: z.string().trim().optional().or(z.literal("")),
  });

export const normalizeLinkedInUrl = (
  val?: string | null
): string | undefined => {
  if (!val) return undefined;
  const trimmed = val.trim();
  if (!trimmed) return undefined;
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
};

export const getRegisterMemberSchema = (locale: Locale = "en") =>
  z
    .object({
      fullName: z
        .string()
        .trim()
        .min(3, getLocalizedErrorMessage("fullName", "tooShort", locale))
        .max(100, getLocalizedErrorMessage("fullName", "tooLong", locale)),
      email: z
        .string()
        .trim()
        .min(1, getLocalizedErrorMessage("email", "required", locale))
        .email(getLocalizedErrorMessage("email", "invalid", locale)),
      mobile: z
        .string()
        .trim()
        .refine((val) => val.length > 0, {
          message: getLocalizedErrorMessage("mobile", "required", locale),
        })
        .refine((val) => val.startsWith("+"), {
          message: getLocalizedErrorMessage(
            "mobile",
            "missingCountryCode",
            locale
          ),
        })
        .refine(
          (val) => !val || !val.startsWith("+") || isValidMobileForCountry(val),
          {
            message: getLocalizedErrorMessage("mobile", "invalid", locale),
          }
        ),
      country: z
        .string()
        .trim()
        .min(1, getLocalizedErrorMessage("country", "required", locale)),
      linkedinUrl: z
        .string()
        .trim()
        .optional()
        .or(z.literal(""))
        .transform((val) => normalizeLinkedInUrl(val))
        .refine((val) => !val || z.string().url().safeParse(val).success, {
          message:
            locale === "ar"
              ? "يرجى إدخال رابط لينكد إن صحيح."
              : "Please enter a valid LinkedIn URL.",
        }),
      yearsOfExperience: z
        .string()
        .trim()
        .min(
          1,
          getLocalizedErrorMessage("yearsOfExperience", "required", locale)
        )
        .transform((val) => normalizeExperienceBand(val)),
      areasOfExpertise: z.array(z.string()).default([]),
      industriesServed: z.array(z.string()).default([]),
      bio: z.string().trim().optional().or(z.literal("")).nullable(),
      message: z.string().trim().optional().or(z.literal("")).nullable(),
      cvFileId: z.string().trim().optional().or(z.literal("")).nullable(),
      directoryOptIn: z.boolean().default(true),
      termsAccepted: z.boolean().refine((val) => val === true, {
        message: getLocalizedErrorMessage("termsAccepted", "required", locale),
      }),
    })
    .superRefine((data, ctx) => {
      if (data.mobile && data.mobile.startsWith("+") && data.country) {
        if (!isValidMobileForCountry(data.mobile, data.country)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["mobile"],
            message: getLocalizedErrorMessage("mobile", "invalid", locale),
          });
        }
      }
    });

export const checkDuplicateSchema = getCheckDuplicateSchema("en");
export const registerMemberSchema = getRegisterMemberSchema("en");
