import { z } from "zod";
import { getLocalizedErrorMessage, Locale } from "./registrationErrors";

export const normalizeMobile = (mobile: string): string => {
  return mobile.replace(/[\s\-\(\)\+]/g, "");
};

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
  z.object({
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
      .refine((val) => normalizeMobile(val).length >= 7, {
        message: getLocalizedErrorMessage("mobile", "invalid", locale),
      }),
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
      .min(1, getLocalizedErrorMessage("yearsOfExperience", "required", locale))
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
  });

export const checkDuplicateSchema = getCheckDuplicateSchema("en");
export const registerMemberSchema = getRegisterMemberSchema("en");
