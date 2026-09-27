import type { MembershipTier } from "@/types/member";
import type { DirectoryBadgeType } from "@/types/directory";

export interface FilterOption {
  value: string;
  labelEn: string;
  labelAr: string;
}

export const DIRECTORY_EXPERTISE_OPTIONS: readonly FilterOption[] = [
  {
    value: "Leadership Development",
    labelEn: "Leadership Development",
    labelAr: "تطوير القيادة",
  },
  {
    value: "Sales & Negotiation",
    labelEn: "Sales & Negotiation",
    labelAr: "المبيعات والتفاوض",
  },
  {
    value: "Strategy & Planning",
    labelEn: "Strategy & Planning",
    labelAr: "الاستراتيجية والتخطيط",
  },
  {
    value: "Team Building",
    labelEn: "Team Building",
    labelAr: "بناء فرق العمل",
  },
  {
    value: "Coaching & Mentoring",
    labelEn: "Coaching & Mentoring",
    labelAr: "التوجيه والإرشاد المهني",
  },
  {
    value: "Assessment & Psychometrics",
    labelEn: "Assessment & Psychometrics",
    labelAr: "التقييم والقياس النفسي",
  },
  {
    value: "Change Management",
    labelEn: "Change Management",
    labelAr: "إدارة التغيير",
  },
  {
    value: "Marketing & Branding",
    labelEn: "Marketing & Branding",
    labelAr: "التسويق والهوية المؤسسية",
  },
  {
    value: "Operations & Supply Chain",
    labelEn: "Operations & Supply Chain",
    labelAr: "العمليات وسلاسل الإمداد",
  },
  {
    value: "HR & Talent Management",
    labelEn: "HR & Talent Management",
    labelAr: "الموارد البشرية والمواهب",
  },
  {
    value: "Finance for Non-Finance",
    labelEn: "Finance for Non-Finance",
    labelAr: "المالية لغير الماليين",
  },
  {
    value: "Customer Experience",
    labelEn: "Customer Experience",
    labelAr: "تجربة العملاء",
  },
] as const;

export const DIRECTORY_INDUSTRY_OPTIONS: readonly FilterOption[] = [
  {
    value: "Banking & Financial Services",
    labelEn: "Banking & Financial Services",
    labelAr: "الخدمات المصرفية والمالية",
  },
  {
    value: "Telecommunications",
    labelEn: "Telecommunications",
    labelAr: "الاتصالات وتكنولوجيا المعلومات",
  },
  {
    value: "Oil, Gas & Energy",
    labelEn: "Oil, Gas & Energy",
    labelAr: "النفط والغاز والطاقة",
  },
  {
    value: "Healthcare & Pharmaceuticals",
    labelEn: "Healthcare & Pharmaceuticals",
    labelAr: "الرعاية الصحية والأدوية",
  },
  {
    value: "Government & Public Sector",
    labelEn: "Government & Public Sector",
    labelAr: "القطاع الحكومي والعام",
  },
  {
    value: "Education & Academia",
    labelEn: "Education & Academia",
    labelAr: "التعليم والأوساط الأكاديمية",
  },
  {
    value: "Manufacturing & Industrial",
    labelEn: "Manufacturing & Industrial",
    labelAr: "التصنيع والقطاع الصناعي",
  },
  {
    value: "Retail & FMCG",
    labelEn: "Retail & FMCG",
    labelAr: "التجزئة والسلع الاستهلاكية",
  },
  {
    value: "Technology & Software",
    labelEn: "Technology & Software",
    labelAr: "التقنية والبرمجيات",
  },
  {
    value: "Construction & Real Estate",
    labelEn: "Construction & Real Estate",
    labelAr: "البناء والتطوير العقاري",
  },
  {
    value: "Hospitality & Tourism",
    labelEn: "Hospitality & Tourism",
    labelAr: "الضيافة والسياحة",
  },
  {
    value: "Logistics & Transport",
    labelEn: "Logistics & Transport",
    labelAr: "اللوجستيات والنقل",
  },
] as const;

export const DIRECTORY_LANGUAGE_OPTIONS: readonly FilterOption[] = [
  { value: "Arabic", labelEn: "Arabic", labelAr: "العربية" },
  { value: "English", labelEn: "English", labelAr: "الإنجليزية" },
  { value: "French", labelEn: "French", labelAr: "الفرنسية" },
  { value: "German", labelEn: "German", labelAr: "الألمانية" },
  { value: "Spanish", labelEn: "Spanish", labelAr: "الإسبانية" },
  { value: "Turkish", labelEn: "Turkish", labelAr: "التركية" },
] as const;

export interface TierDisplayConfig {
  labelEn: string;
  labelAr: string;
  badgeType: DirectoryBadgeType;
  badgeStyle: string;
  tagStyle: string;
}

export const DIRECTORY_TIER_CONFIG: Record<MembershipTier, TierDisplayConfig> =
  {
    MASTER: {
      labelEn: "Master Trainer",
      labelAr: "مدرب خبير (Master)",
      badgeType: "PRIORITY",
      badgeStyle:
        "border-amber-400/40 bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/30",
      tagStyle: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    },
    PROFESSIONAL: {
      labelEn: "Professional Trainer",
      labelAr: "مدرب محترف (Pro)",
      badgeType: "FEATURED",
      badgeStyle:
        "border-emerald-400/40 bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/30",
      tagStyle: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    },
    ESSENTIAL: {
      labelEn: "Certified Member",
      labelAr: "عضو معتمد",
      badgeType: "STANDARD",
      badgeStyle:
        "border-slate-500/40 bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/20",
      tagStyle: "border-slate-500/30 bg-slate-500/10 text-slate-300",
    },
  };

export const DIRECTORY_PAGE_SIZE = 12;
