/**
 * Centralized language presets for trainer and freelancer profiles
 */

export const LANGUAGE_PRESETS = [
  "English",
  "Arabic",
  "French",
  "German",
  "Spanish",
  "Turkish",
] as const;

export type LanguagePreset = (typeof LANGUAGE_PRESETS)[number];
