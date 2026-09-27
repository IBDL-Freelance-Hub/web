export const EXPERTISE_OPTIONS = [
  "Leadership Development",
  "Sales & Negotiation",
  "Strategy & Planning",
  "Team Building",
  "Coaching & Mentoring",
  "Assessment & Psychometrics",
  "Change Management",
  "Marketing & Branding",
  "Operations & Supply Chain",
  "HR & Talent Management",
  "Finance for Non-Finance",
  "Customer Experience",
  "Others",
];

export const EXPERIENCE_BANDS = [
  "Less than 2 years",
  "2–5 years",
  "5–10 years",
  "10–15 years",
  "15+ years",
];

export const INDUSTRY_OPTIONS = [
  "Banking & Financial Services",
  "Telecommunications",
  "Oil, Gas & Energy",
  "Healthcare & Pharmaceuticals",
  "Government & Public Sector",
  "Education & Academia",
  "Manufacturing & Industrial",
  "Retail & FMCG",
  "Technology & Software",
  "Construction & Real Estate",
  "Hospitality & Tourism",
  "Logistics & Transport",
  "Others",
];

export interface CountryOption {
  code: string;
  nameEn: string;
  nameAr: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: "EG", nameEn: "Egypt", nameAr: "مصر" },
  { code: "SA", nameEn: "Saudi Arabia", nameAr: "المملكة العربية السعودية" },
  { code: "AE", nameEn: "UAE", nameAr: "الإمارات العربية المتحدة" },
  { code: "KW", nameEn: "Kuwait", nameAr: "الكويت" },
  { code: "QA", nameEn: "Qatar", nameAr: "قطر" },
  { code: "BH", nameEn: "Bahrain", nameAr: "البحرين" },
  { code: "OM", nameEn: "Oman", nameAr: "عمان" },
  { code: "JO", nameEn: "Jordan", nameAr: "الأردن" },
  { code: "LB", nameEn: "Lebanon", nameAr: "لبنان" },
  { code: "IQ", nameEn: "Iraq", nameAr: "العراق" },
  { code: "PS", nameEn: "Palestine", nameAr: "فلسطين" },
  { code: "SY", nameEn: "Syria", nameAr: "سوريا" },
  { code: "YE", nameEn: "Yemen", nameAr: "اليمن" },
  { code: "LY", nameEn: "Libya", nameAr: "ليبيا" },
  { code: "TN", nameEn: "Tunisia", nameAr: "تونس" },
  { code: "DZ", nameEn: "Algeria", nameAr: "الجزائر" },
  { code: "MA", nameEn: "Morocco", nameAr: "المغرب" },
  { code: "SD", nameEn: "Sudan", nameAr: "السودان" },
  { code: "GB", nameEn: "UK", nameAr: "المملكة المتحدة" },
  { code: "US", nameEn: "US", nameAr: "الولايات المتحدة" },
  { code: "CA", nameEn: "Canada", nameAr: "كندا" },
  { code: "DE", nameEn: "Germany", nameAr: "ألمانيا" },
  { code: "FR", nameEn: "France", nameAr: "فرنسا" },
  { code: "TR", nameEn: "Türkiye", nameAr: "تركيا" },
  { code: "PK", nameEn: "Pakistan", nameAr: "باكستان" },
  { code: "IN", nameEn: "India", nameAr: "الهند" },
  { code: "NG", nameEn: "Nigeria", nameAr: "نيجيريا" },
  { code: "KE", nameEn: "Kenya", nameAr: "كينيا" },
  { code: "ZA", nameEn: "South Africa", nameAr: "جنوب أفريقيا" },
  { code: "OTHER", nameEn: "Other", nameAr: "أخرى" },
];

export function getCountryByCode(code: string): CountryOption | undefined {
  if (!code) return undefined;
  const normalized = code.trim().toUpperCase();
  return COUNTRIES.find(
    (c) =>
      c.code.toUpperCase() === normalized ||
      c.nameEn.toUpperCase() === normalized ||
      c.nameAr === code.trim()
  );
}

export function getCountryLabel(
  code: string,
  locale: "en" | "ar" = "en"
): string {
  const country = getCountryByCode(code);
  if (!country) return code;
  return locale === "ar" ? country.nameAr : country.nameEn;
}
