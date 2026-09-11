export interface StatTileData {
  number: string;
  labelEn: string;
  labelAr: string;
}

export interface ReasonItemData {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

export const WHY_STATS_DATA: StatTileData[] = [
  {
    number: "2006",
    labelEn: "Established",
    labelAr: "سنة التأسيس",
  },
  {
    number: "35+",
    labelEn: "Countries",
    labelAr: "دولة",
  },
  {
    number: "500+",
    labelEn: "Organisations served",
    labelAr: "مؤسسة مستفيدة",
  },
  {
    number: "3,500+",
    labelEn: "Professionals certified",
    labelAr: "محترف معتمد",
  },
];

export const WHY_REASONS_DATA: ReasonItemData[] = [
  {
    titleEn: "Validated, not improvised",
    titleAr: "مثبتة ومعتمدة، وليست ارتجالية",
    bodyEn:
      "Every assessment in the portfolio rests on published research and cross-industry validation — not repackaged personality quizzes.",
    bodyAr:
      "تستند جميع أدوات التقييم في محفظتنا إلى أبحاث منشورة واعتماد متعدد القطاعات — وليست مجرد اختبارات شخصية معاد تغليفها.",
  },
  {
    titleEn: "Built bilingual from the start",
    titleAr: "ثنائية اللغة منذ البداية",
    bodyEn:
      "Arabic and English materials are produced together at equal quality, not translated as an afterthought.",
    bodyAr:
      "يتم تطوير المواد باللغتين العربية والإنجليزية معاً بنفس معايير الجودة والعمق، وليست مجرد ترجمات لاحقة.",
  },
  {
    titleEn: "Facilitator-ready",
    titleAr: "جاهزة تماماً للمدرب والميسر",
    bodyEn:
      "Simulations arrive with complete facilitator guides, scoring mechanics, debrief frameworks and participant materials.",
    bodyAr:
      "تصلك ألعاب المحاكاة كاملة مع أدلة ميسر التدريب، وآليات التسجيل والتقييم، وأطر جلسات استخلاص النتائج، وحقائب المتدربين.",
  },
  {
    titleEn: "A partner, not a vendor",
    titleAr: "شريك داعم، وليس مجرد مزود أدوات",
    bodyEn:
      "The Hub is designed as a long-term professional relationship: tools first, then recognition, then community.",
    bodyAr:
      "صُممت المنصة كشراكة مهنية طويلة الأمد: تبدأ بتوفير الأدوات، ثم منح الاعتراف والاعتماد، وصولاً إلى مجتمع مهني متكامل.",
  },
];
