export interface StepItemData {
  num: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  isHighlighted?: boolean;
}

export const NEXT_STEPS_DATA: StepItemData[] = [
  {
    num: "01",
    titleEn: "You register",
    titleAr: "تسجيل حسابك",
    bodyEn:
      "Share your professional details, expertise, and experience so the Hub can understand your background and connect you with the right solutions.",
    bodyAr:
      "أدخل بياناتك المهنية ومجالات خبرتك وسنوات ممارستك لتتعرف المنصة على خلفيتك وتربطك بالحلول الأنسب لمسارك.",
  },
  {
    num: "02",
    titleEn: "Explore your toolkit",
    titleAr: "استكشف حقيبتك المهنية",
    bodyEn:
      "Discover specialized L&D solutions including simulations, assessments, and professional services designed to enhance your learning impact.",
    bodyAr:
      "اطلع على حلول التدريب المتخصصة بما في ذلك ألعاب المحاكاة وأدوات التقييم والخدمات المصممة لتعظيم أثرك التدريبي.",
  },
  {
    num: "03",
    titleEn: "Start your Hub journey",
    titleAr: "ابدأ رحلتك في المنصة",
    bodyEn:
      "Receive your welcome communication with available resources, guidance, and access to opportunities designed for your professional growth.",
    bodyAr:
      "استلم رسالة الترحيب مع المصادر والأدلة المتاحة، وانطلق في استثمار الفرص المصممة لتطوير ممارستك التدريبية.",
  },
  {
    num: "04",
    titleEn: "Stay connected with IBDL",
    titleAr: "تواصل مستمر مع IBDL",
    bodyEn:
      "Continue your journey through future tools, accreditation pathways, collaboration opportunities, and Hub experiences.",
    bodyAr:
      "واصل نموك المهني عبر الأدوات المستحدثة، ومسارات الاعتماد، وفرص التعاون والشراكة ضمن مجتمع المدربين.",
  },
];
