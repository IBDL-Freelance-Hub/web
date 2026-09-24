/**
 * Experience bands and localized labels across profile and registration forms
 */

export const EXPERIENCE_BANDS = ["<2", "2-5", "6-10", "11-15", ">15"] as const;

export type ExperienceBand = (typeof EXPERIENCE_BANDS)[number];

export interface ExperienceBandOption {
  value: ExperienceBand;
  labelEn: string;
  labelAr: string;
}

export const EXPERIENCE_BAND_OPTIONS: readonly ExperienceBandOption[] = [
  {
    value: "<2",
    labelEn: "Less than 2 years (<2)",
    labelAr: "أقل من سنتين (<2)",
  },
  {
    value: "2-5",
    labelEn: "2 to 5 years (2-5)",
    labelAr: "٢ إلى ٥ سنوات (2-5)",
  },
  {
    value: "6-10",
    labelEn: "6 to 10 years (6-10)",
    labelAr: "٦ إلى ١٠ سنوات (6-10)",
  },
  {
    value: "11-15",
    labelEn: "11 to 15 years (11-15)",
    labelAr: "١١ إلى ١٥ سنة (11-15)",
  },
  {
    value: ">15",
    labelEn: "More than 15 years (>15)",
    labelAr: "أكثر من ١٥ سنة (>15)",
  },
] as const;
