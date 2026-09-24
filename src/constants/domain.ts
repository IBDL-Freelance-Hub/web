/**
 * Domain-wide constants and system limits for IBDL Freelancer Hub
 */

// Profile Completion Engine Rules
export const CANONICAL_PROFILE_FIELDS_COUNT = 11;
export const CANONICAL_PROFILE_FIELD_WEIGHT = 1 / 11;

// File Upload Limits
export const MAX_PHOTO_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB (PRO-45)
export const MAX_CV_UPLOAD_BYTES = 10 * 1024 * 1024; // 10MB (PRO-52)

export const SUPPORTED_PHOTO_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const SUPPORTED_CV_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

// Membership System
export const MEMBERSHIP_TIER_CODES = [
  "ESSENTIAL",
  "PROFESSIONAL",
  "MASTER",
] as const;

export type MembershipTierCode = (typeof MEMBERSHIP_TIER_CODES)[number];

export const MEMBERSHIP_STATUS_CODES = [
  "ACTIVE",
  "GRACE_PERIOD",
  "EXPIRED",
  "PENDING_PAYMENT",
  "SUSPENDED",
  "CANCELLED",
] as const;

export type MembershipStatusCode = (typeof MEMBERSHIP_STATUS_CODES)[number];
