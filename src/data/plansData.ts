export interface PlanTierData {
  id: string;
  kindEn: string;
  kindAr: string;
  nameEn: string;
  nameAr: string;
  promiseEn: string;
  promiseAr: string;
  priceEn: string;
  priceAr: string;
  periodEn: string;
  periodAr: string;
  taglineEn: string;
  taglineAr: string;
  benefitsEn: string[];
  benefitsAr: string[];
  svcPillEn: string;
  svcPillAr: string;
  svcPillTone: "red" | "green";
  fineEn: string;
  fineAr: string;
  isTop?: boolean;
}

export const CORE_SERVICES_LIST = [
  {
    en: "Training Needs Analysis (TNA) Assistance",
    ar: "تحليل الاحتياجات التدريبية (TNA)",
  },
  {
    en: "Program Mapping & Learning Architecture",
    ar: "هيكلة البرامج والمسارات التدريبية",
  },
  {
    en: "Proposal Building & Commercial Solution Support",
    ar: "إعداد المقترحات والعروض الفنية والمالية",
  },
  {
    en: "Content Design & Development",
    ar: "تصميم وتطوير المحتوى التدريبي",
  },
  {
    en: "Training Mode & Strategy Selection",
    ar: "تحديد أساليب واستراتيجيات التدريب",
  },
  {
    en: "Training ROI & Impact Measurement Toolkit",
    ar: "قياس الأثر وعائد الاستثمار التدريبي",
  },
  {
    en: "Trainer Help Desk & Expert Support",
    ar: "مكتب مساندة المدرب والدعم الاستشاري",
  },
  {
    en: "Professional Profile, Visibility & Opportunity Showcase",
    ar: "الملف المهني وإبراز الخبرات والفرص",
  },
  {
    en: "Business Networking & Collaboration",
    ar: "التواصل المهني والتعاون المشترك",
  },
  {
    en: "Accreditation & Professional Recognition Pathway",
    ar: "مسار الاعتماد والاعتراف المهني",
  },
  {
    en: "Templates, Tools & Resource Library",
    ar: "مكتبة النماذج والأدوات والمصادر",
  },
  {
    en: "Continuous Professional Development & Market Insights",
    ar: "التطوير المهني المستمر ورؤى السوق",
  },
];

export const PLANS_DATA: PlanTierData[] = [
  {
    id: "essential",
    kindEn: "FREE",
    kindAr: "مجانية",
    nameEn: "Essential Membership",
    nameAr: "العضوية الأساسية Essential",
    promiseEn: "Belong to the profession.",
    promiseAr: "انتمِ إلى المهنة.",
    priceEn: "Free",
    priceAr: "مجاناً",
    periodEn: "Annual membership fee",
    periodAr: "رسوم العضوية السنوية",
    taglineEn: "Free permanently. Upgrade only when your practice is ready.",
    taglineAr: "مجانية دائماً. ارتقِ بعضويتك فقط عندما تكون جاهزاً.",
    benefitsEn: [
      "Full Freelancer Hub community membership",
      "15% member rate on eligible IBDL products and services",
      "Verified member profile in the Hub Freelancer Directory",
      "Digital membership badge for LinkedIn and your professional profile",
      "Hub news, announcements and platform updates",
      "Monthly L&D market-insights briefing",
      "Open resource library — starter templates and practice guides",
      "Invitations to community webinars and open professional sessions",
      "Member-only promotional offers on Hub Services and IBDL tools",
      "Visibility of published client opportunities as announced",
    ],
    benefitsAr: [
      "عضوية مجتمع المستقلين الكاملة",
      "خصم 15% للأعضاء على منتجات وخدمات IBDL المؤهلة",
      "ملف شخصي موثق في دليل المدربين المستقلين بالمنصة",
      "شارة عضوية رقمية لشبكة LinkedIn وملفك المهني",
      "أخبار وإعلانات وتحديثات المنصة الحصرية",
      "موجز شهري لرؤى وتحليلات سوق التعلم والتطوير",
      "مكتبة المصادر المفتوحة — نماذج أولية وأدلة ممارسة",
      "دعوات لحضور ندوات المجتمع والجلسات المهنية المفتوحة",
      "عروض ترويجية حصرية للأعضاء على الخدمات والأدوات",
      "إمكانية الاطلاع على فرص العملاء المعلنة",
    ],
    svcPillEn: "HUB SERVICES — 15% MEMBER RATE",
    svcPillAr: "خدمات المنصة — خصم 15% للأعضاء",
    svcPillTone: "red",
    fineEn:
      "Essential is free permanently and requires no card. The 15% applies to eligible IBDL products and services — there is no membership fee for it to discount. Core Hub Services, IBDL tools and accreditation remain payable at the member rate.",
    fineAr:
      "عضوية Essential مجانية دائمًا ولا تتطلب بطاقة دفع. ينطبق خصم 15% على منتجات وخدمات IBDL المؤهلة. تظل خدمات المنصة وأدوات IBDL والاعتمادات مدفوعة بسعر الأعضاء.",
  },
  {
    id: "professional",
    kindEn: "PAID",
    kindAr: "مدفوعة",
    nameEn: "Professional Membership",
    nameAr: "العضوية الاحترافية Professional",
    promiseEn: "Work with the Hub behind you.",
    promiseAr: "اعمل والمنصة خلفك.",
    priceEn: "$180 / year",
    priceAr: "١٨٠ $ / سنة",
    periodEn: "Annual membership fee",
    periodAr: "رسوم العضوية السنوية",
    taglineEn: "The Hub working alongside your practice, at the member rate.",
    taglineAr: "المنصة تعمل جنبًا إلى جنب مع أعمالك، بسعر الأعضاء.",
    benefitsEn: [
      "Everything in the Essential Membership",
      "Complimentary review, quality assurance and accreditation of one training programme",
      "20 free IBDL certificates for participating trainees",
      "30% member rate on all eligible Hub Services",
      "30% member rate on all eligible IBDL tools and assessments",
      "Featured Freelancer Directory profile, searchable by client organisations",
      "Full Templates, Tools & Resource Library — proposal templates, TNA instruments and ROI calculators",
      "One complimentary 45-minute advisory session per year with a Hub expert",
      "Priority Trainer Help Desk, with responses within two business days",
      "Early notification of client opportunities before general release",
      "Quarterly market-insight report and continuous professional-development sessions",
      "Professional Member digital credential for proposals and profiles",
    ],
    benefitsAr: [
      "كل ما تضمنته العضوية الأساسية (Essential)",
      "مراجعة وضمان جودة واعتماد مجاني لبرنامج تدريبي واحد",
      "20 شهادة IBDL مجانية للمتدربين المشاركين",
      "خصم 30% للأعضاء على كافة خدمات المنصة المؤهلة",
      "خصم 30% للأعضاء على أدوات وتقييمات IBDL المؤهلة",
      "ملف مميز في دليل المدربين، قابل للبحث من قبل منظمات الأعمال",
      "المكتبة الكاملة للنماذج والأدوات — عروض فنية، أدوات TNA وحاسبات ROI",
      "جلسة استشارية مجانية مدتها 45 دقيقة سنوياً مع خبير المنصة",
      "أولوية الدعم عبر مكتب مساندة المدرب مع إجابة خلال يومي عمل",
      "إشعار مبكر بفرص العملاء قبل طرحها للعامة",
      "تقرير فصلي لرؤى السوق وجلسات تطوير مهني مستمرة",
      "اعتماد رقمي بعضوية المحترفين للعروض والملفات المهنية",
    ],
    svcPillEn: "HUB SERVICES — 30% MEMBER RATE",
    svcPillAr: "خدمات المنصة — خصم 30% للأعضاء",
    svcPillTone: "red",
    fineEn:
      "USD 180 is the annual membership fee. The 30% member rate applies to eligible Hub Services, IBDL tools and assessments — not to the membership fee. The included accreditation covers one training programme; trainer certification eligibility opens at Master.",
    fineAr:
      "180 دولارًا أمريكيًا هي رسوم العضوية السنوية. ينطبق خصم 30% على خدمات المنصة وأدوات وتدريبات IBDL المؤهلة — وليس على رسوم العضوية نفسها.",
  },
  {
    id: "master",
    kindEn: "PAID",
    kindAr: "مدفوعة",
    nameEn: "Master Membership",
    nameAr: "العضوية المتقدمة Master",
    promiseEn: "Full access. Full recognition.",
    promiseAr: "وصول كامل. واعتراف كامل.",
    priceEn: "$380 / year",
    priceAr: "٣٨٠ $ / سنة",
    periodEn: "Annual membership fee",
    periodAr: "رسوم العضوية السنوية",
    taglineEn:
      "Every Core Hub Service included, plus the pathways to IBDL recognition.",
    taglineAr:
      "تشمل جميع خدمات المنصة الأساسية، بالإضافة إلى مسارات الاعتماد الدولي.",
    benefitsEn: [
      "Everything in the Professional Membership",
      "Complimentary review, quality assurance and accreditation of two training programmes",
      "40 free IBDL certificates for participating trainees",
      "All 12 Core Hub Services included at no additional cost",
      "One eligible IBDL tool free every quarter — four per year",
      "40% member rate on all additional eligible purchases",
      "Eligibility for IBDL Trainer Certification",
      "Eligibility for course and programme accreditation",
      "A named Hub advisor throughout the year",
      "Two strategic advisory sessions per year covering practice, positioning and pricing",
      "Priority Directory placement and first consideration for Hub-sourced engagements",
      "Priority Help Desk, with responses within one business day",
      "Invitations to contribute as a speaker or author across Hub platforms",
      "Annual portfolio and positioning review",
    ],
    benefitsAr: [
      "كل ما تضمنته العضوية الاحترافية (Professional)",
      "مراجعة وضمان جودة واعتماد مجاني لبرنامجين تدريبيين",
      "40 شهادة IBDL مجانية للمتدربين المشاركين",
      "جميع خدمات المنصة الـ 12 الأساسية متضمنة مجاناً بدون تكلفة إضافية",
      "أداة IBDL مؤهلة مجاناً كل ربع سنة — 4 أدوات سنوياً",
      "خصم 40% للأعضاء على كافة المشتريات الإضافية المؤهلة",
      "الأهلية للحصول على شهادة مدرب معتمد من IBDL",
      "الأهلية لاعتماد الدوارات والبرامج التدريبية",
      "مستشار مخصص من المنصة متواجد معك على مدار العام",
      "جلستان استشاريتان استراتيجيتان سنوياً لتقييم الممارسة والتسعير",
      "أولوية الظهور في الدليل والترشيح الأولي لفرص المنصة",
      "أولوية قصوى لمكتب المساندة مع إجابة خلال يوم عمل واحد",
      "دعوات للمشاركة كمتحدث أو كاتب في منصات IBDL",
      "مراجعة سنوية لملف الأعمال والتموضع في السوق",
    ],
    svcPillEn: "HUB SERVICES — INCLUDED",
    svcPillAr: "خدمات المنصة — متضمنة بالكامل",
    svcPillTone: "green",
    fineEn:
      "USD 380 is the annual membership fee. The free tool entitlement is one eligible usage per quarter — four per year, not unlimited access. Additional eligible purchases carry the 40% member rate. Eligibility is not certification, and not automatic accreditation.",
    fineAr:
      "380 دولارًا أمريكيًا هي رسوم العضوية السنوية. تمنحك العضوية أداة مؤهلة واحدة مجانًا كل ربع سنة — أربع أدوات سنوياً.",
    isTop: true,
  },
];
