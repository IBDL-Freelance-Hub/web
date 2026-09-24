import { z } from "zod";
import { normalizeExperienceBand } from "./registration";
import { EXPERIENCE_BANDS } from "@/constants/experience";

export const experienceBands = EXPERIENCE_BANDS;

export const normalizePhoneE164 = (phone: string): string => {
  return phone.replace(/[\s\-\(\)]/g, "");
};

export const normalizeLinkedInUrl = (val?: string | null): string | null => {
  if (!val) return null;
  const trimmed = val.trim();
  if (!trimmed) return null;
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
};

export const updateMemberProfileSchema = z
  .object({
    fullNameEn: z
      .string()
      .trim()
      .min(2, "Full name in English must be at least 2 characters long"),
    fullNameAr: z
      .string()
      .trim()
      .refine((val) => !val || val.length >= 2, {
        message:
          "Arabic full name must be at least 2 characters long if provided",
      })
      .transform((val) => (val ? val : null))
      .nullable()
      .optional(),
    phone: z
      .string()
      .trim()
      .transform(normalizePhoneE164)
      .pipe(
        z
          .string()
          .regex(
            /^\+[1-9]\d{6,14}$/,
            "Phone number must be in valid E.164 format (e.g. +201234567890)"
          )
      ),
    country: z.string().trim().min(1, "Country is required"),
    city: z.string().trim().min(1, "City cannot be empty (VAL-52, VAL-57)"),
    yearsOfExperience: z
      .string()
      .trim()
      .transform((val) => (val ? normalizeExperienceBand(val) : ""))
      .refine(
        (val) => !val || (experienceBands as readonly string[]).includes(val),
        {
          message: "Years of experience must be a valid band",
        }
      )
      .optional()
      .nullable(),
    areasOfExpertise: z.array(z.string().trim()).default([]),
    industriesServed: z.array(z.string().trim()).default([]),
    languages: z.array(z.string().trim()).default([]),
    bioEn: z
      .string()
      .trim()
      .max(5000, "English biography must not exceed 5,000 characters")
      .transform((val) => (val ? val : null))
      .nullable()
      .optional(),
    bioAr: z
      .string()
      .trim()
      .max(5000, "النبذة التعريفية باللغة العربية يجب ألا تتجاوز ٥٠٠٠ حرف")
      .transform((val) => (val ? val : null))
      .nullable()
      .optional(),
    linkedinUrl: z
      .string()
      .trim()
      .transform((val) => normalizeLinkedInUrl(val))
      .refine(
        (val) => {
          if (!val) return true;
          return /^https?:\/\/((www|\w{2,3})\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-\.%]+\/?$/i.test(
            val
          );
        },
        {
          message:
            "Invalid LinkedIn URL format (e.g. https://linkedin.com/in/username)",
        }
      )
      .nullable()
      .optional(),
    directoryOptIn: z.boolean().default(false),
  })
  .passthrough()
  .superRefine((data, ctx) => {
    if ("email" in data && (data as { email?: unknown }).email !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is read-only and cannot be updated (PRO-04, VAL-50)",
        path: ["email"],
      });
    }
  });

export type UpdateMemberProfileFormInput = z.infer<
  typeof updateMemberProfileSchema
>;
