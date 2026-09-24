export interface ProductStats {
  num: string;
  label: { en: string; ar: string };
}

export interface ProductData {
  id: string;
  slug: string;
  title: string;
  category: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  about: { en: string; ar: string };
  logoImg: string;
  stats: {
    stat1: ProductStats;
    stat2: ProductStats;
    stat3: ProductStats;
  };
  targetAudience: { en: string[]; ar: string[] };
  useCases: { en: string[]; ar: string[] };
  keyLearningAreas: { en: string[]; ar: string[] };
  chips: { en: string[]; ar: string[] };
  flyers: {
    en: string;
    ar: string;
  };
}
