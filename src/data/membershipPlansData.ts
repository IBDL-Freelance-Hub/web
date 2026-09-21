import { MembershipTierCode } from "@/types/membership";

export interface PlanContentDefinition {
  tier: MembershipTierCode;
  nameEn: string;
  nameAr: string;
  headlineEn: string;
  headlineAr: string;
  taglineEn: string;
  taglineAr: string;
  priceDisplayEn: string;
  priceDisplayAr: string;
  feeLabelEn: string;
  feeLabelAr: string;
  metrics: {
    discountRateEn: string;
    discountRateAr: string;
    coreHubServicesEn: string;
    coreHubServicesAr: string;
    accreditationEn: string;
    accreditationAr: string;
    freeCertificatesEn: string;
    freeCertificatesAr: string;
  };
  featuresEn: string[];
  featuresAr: string[];
  hubServicesHeaderEn: string;
  hubServicesHeaderAr: string;
  disclaimerEn: string;
  disclaimerAr: string;
  calloutBelowButtonEn?: string;
  calloutBelowButtonAr?: string;
}

export const CORE_12_HUB_SERVICES_EN = [
  "Training Needs Analysis (TNA) Assistance",
  "Program Mapping & Learning Architecture",
  "Proposal Building & Commercial Solution Support",
  "Content Design & Development",
  "Training Mode & Strategy Selection",
  "Training ROI & Impact Measurement Toolkit",
  "Trainer Help Desk & Expert Support",
  "Professional Profile, Visibility & Opportunity Showcase",
  "Business Networking & Collaboration",
  "Accreditation & Professional Recognition Pathway",
  "Templates, Tools & Resource Library",
  "Continuous Professional Development & Market Insights",
];

export const CORE_12_HUB_SERVICES_AR = [
  "مساعدة تحليل الاحتياجات التدريبية (TNA)",
  "تخطيط البرامج وهندسة التعلم (Learning Architecture)",
  "بناء العروض الفنية والحلول التجارية للمشاريع",
  "تصميم وتطوير المحتوى التدريبي والحقائب",
  "اختيار وتطبيق استراتيجيات وأنماط التدريب",
  "حزمة وأدوات قياس أثر التدريب وعائد الاستثمار (ROI)",
  "مكتب مساعدة المدرب والدعم الاستشاري المتخصص",
  "الملف المهني وفرص الظهور والانتشار للعملاء",
  "شبكات الأعمال والشراكات والتعاون المهني",
  "مسار الاعتماد والاعتراف المهني والدولي",
  "مكتبة القوالب والأدوات والموارد المتقدمة",
  "التطوير المهني المستمر ورؤى السوق الدورية",
];

export const MEMBERSHIP_PLANS_DATA: Record<
  MembershipTierCode,
  PlanContentDefinition
> = {
  ESSENTIAL: {
    tier: "ESSENTIAL",
    nameEn: "Essential Membership",
    nameAr: "العضوية الأساسية (Essential)",
    headlineEn: "Belong to the profession.",
    headlineAr: "الانتماء للمهنة.",
    taglineEn: "Free permanently. Upgrade only when your practice is ready.",
    taglineAr:
      "مجانية بشكل دائم. الترقية فقط عندما تكون ممارستك التدريبية جاهزة.",
    priceDisplayEn: "Free",
    priceDisplayAr: "مجاناً",
    feeLabelEn: "Free",
    feeLabelAr: "مجاناً دائماً",
    metrics: {
      discountRateEn: "15%",
      discountRateAr: "15%",
      coreHubServicesEn: "—",
      coreHubServicesAr: "—",
      accreditationEn: "—",
      accreditationAr: "—",
      freeCertificatesEn: "—",
      freeCertificatesAr: "—",
    },
    featuresEn: [
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
    featuresAr: [
      "عضوية كاملة في مجتمع منصة المدربين المستقلين Freelancer Hub",
      "خصم عضوية 15% على منتجات وخدمات IBDL المؤهلة",
      "ملف مهني موثق في دليل المدربين والمستشارين المعتمدين",
      "شارة عضوية رقمية لحسابك على LinkedIn وملفك المهني",
      "أخبار المنصة والإعلانات والتحديثات الدورية",
      "إيجاز شهري حول تحليلات ورؤى سوق التعلم والتطوير (L&D)",
      "مكتبة الموارد المفتوحة — نماذج بداية وأدلة الممارسة المهنية",
      "دعوات لحضور ندوات المجتمع والجلسات المهنية المفتوحة",
      "عروض ترويجية حصرية للأعضاء على خدمات المنصة وأدوات IBDL",
      "الاطلاع على الفرص والمشاريع المعلنة للعملاء فور طرحها",
    ],
    hubServicesHeaderEn: "Hub Services — 15% member rate",
    hubServicesHeaderAr: "خدمات المنصة — خصم 15% للأعضاء",
    disclaimerEn:
      "Essential is free permanently and requires no card. The 15% applies to eligible IBDL products and services — there is no membership fee for it to discount. Core Hub Services, IBDL tools and accreditation remain payable at the member rate.",
    disclaimerAr:
      "العضوية الأساسية مجانية دائماً ولا تتطلب بطاقة دفع. يطبق خصم الـ 15% على منتجات وخدمات IBDL المؤهلة — ولا توجد رسوم عضوية لتطبيق الخصم عليها. تبقى خدمات المنصة الأساسية وأدوات IBDL والاعتمادات مدفوعة بأسعار الأعضاء المخفضة.",
  },
  PROFESSIONAL: {
    tier: "PROFESSIONAL",
    nameEn: "Professional Membership",
    nameAr: "العضوية المهنية (Professional)",
    headlineEn: "Work with the Hub behind you.",
    headlineAr: "اعمل بدعم وشراكة المنصة خلفك.",
    taglineEn: "The Hub working alongside your practice, at the member rate.",
    taglineAr: "المنصة تعمل جنباً إلى جنب مع ممارستك، بسعر الأعضاء المخفض.",
    priceDisplayEn: "$180 / year",
    priceDisplayAr: "$180 / سنة",
    feeLabelEn: "Annual membership fee",
    feeLabelAr: "رسوم الاشتراك السنوي",
    metrics: {
      discountRateEn: "30%",
      discountRateAr: "30%",
      coreHubServicesEn: "—",
      coreHubServicesAr: "—",
      accreditationEn: "1 training programme",
      accreditationAr: "برنامج تدريبي واحد",
      freeCertificatesEn: "20 certificates",
      freeCertificatesAr: "20 شهادة للمتدربين",
    },
    featuresEn: [
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
    featuresAr: [
      "جميع المزايا والحقوق المشمولة في العضوية الأساسية",
      "مراجعة مجانية وضمان جودة واعتماد لبرنامج تدريبي واحد",
      "20 شهادة معتمدة مجانية من IBDL للمتدربين المشاركين",
      "خصم عضوية 30% على جميع خدمات المنصة المؤهلة",
      "خصم عضوية 30% على جميع أدوات وتقييمات IBDL المؤهلة",
      "ملف مميز وموثق في دليل المدربين قابل للبحث والوصول من قبل المنظمات والعملاء",
      "المكتبة الكاملة للقوالب والأدوات — نماذج عروض وأدوات TNA وحاسبات ROI",
      "جلسة استشارية سنوية مجانية لمدة 45 دقيقة مع خبير معتمد من المنصة",
      "أولوية في مكتب مساعدة المدربين مع الرد خلال يومي عمل",
      "إشعار مبكر بفرص العملاء والتعاقدات قبل طرحها العام",
      "تقرير ربع سنوي لرؤى السوق وجلسات تطوير مهني مستمرة",
      "شهادة اعتماد رقمية كعضو محترف للاستخدام في العروض والملفات المهنية",
    ],
    hubServicesHeaderEn: "Hub Services — 30% member rate",
    hubServicesHeaderAr: "خدمات المنصة — خصم 30% للأعضاء",
    disclaimerEn:
      "USD 180 is the annual membership fee. The 30% member rate applies to eligible Hub Services, IBDL tools and assessments — not to the membership fee. The included accreditation covers one training programme; trainer certification eligibility opens at Master.",
    disclaimerAr:
      "180 دولار أمريكي هي رسوم العضوية السنوية. يطبق خصم الأعضاء 30% على خدمات المنصة المؤهلة وأدوات وتقييمات IBDL — وليس على رسوم العضوية نفسها. يشمل الاعتماد برنامجاً تدريبياً واحداً؛ بينما تفتح أهلية الحصول على رخصة المدرب المعتمد في فئة الماستر.",
    calloutBelowButtonEn:
      "The included programme accreditation is a course accreditation benefit. It does not make you a Certified Trainer — trainer certification eligibility opens at Master.",
    calloutBelowButtonAr:
      "اعتماد البرامج المشمول هو ميزة لاعتماد الدورة التدريبية فقط، ولا يمنحك صفة مدرب معتمد — تفتح أهلية ترخيص المدرب المعتمد في عضوية الماستر.",
  },
  MASTER: {
    tier: "MASTER",
    nameEn: "Master Membership",
    nameAr: "عضوية خبير معتمد (Master)",
    headlineEn: "Full access. Full recognition.",
    headlineAr: "وصول كامل. اعتراف مهني شامل.",
    taglineEn:
      "Every Core Hub Service included, plus the pathways to IBDL recognition.",
    taglineAr:
      "جميع خدمات المنصة الأساسية مشمولة، بالإضافة إلى مسارات الاعتماد والاعتراف الدولي من IBDL.",
    priceDisplayEn: "$380 / year",
    priceDisplayAr: "$380 / سنة",
    feeLabelEn: "Annual membership fee",
    feeLabelAr: "رسوم الاشتراك السنوي",
    metrics: {
      discountRateEn: "40%",
      discountRateAr: "40%",
      coreHubServicesEn: "Yes",
      coreHubServicesAr: "نعم (مشمولة بالكامل)",
      accreditationEn: "2 training programmes",
      accreditationAr: "برنامجان تدريبيان معتمدان",
      freeCertificatesEn: "40 certificates",
      freeCertificatesAr: "40 شهادة للمتدربين",
    },
    featuresEn: [
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
    featuresAr: [
      "جميع المزايا والحقوق المشمولة في العضوية المهنية (Professional)",
      "مراجعة مجانية وضمان جودة واعتماد لبرنامجين تدريبيين",
      "40 شهادة معتمدة مجانية من IBDL للمتدربين المشاركين",
      "جميع خدمات المنصة الأساسية الـ 12 مشمولة مجاناً بالكامل دون أي تكلفة إضافية",
      "استخدام مجاني لأداة IBDL مؤهلة كل ربع سنة — 4 أدوات سنوياً",
      "خصم عضوية 40% على جميع المشتريات والخدمات الإضافية المؤهلة",
      "أهلية التقدم لترخيص واعتماد المدرب الدولي من IBDL",
      "أهلية اعتماد الدورات والبرامج التدريبية المتقدمة",
      "مستشار مخصص باسمه لمتابعة ممارستك وتطوير أعمالك طوال العام",
      "جلستان استشاريتان استراتيجيتان سنوياً تغطيان الممارسة والتموضع والتسعير",
      "أولوية تصدر الدليل والترشيح الأول للتعاقدات التي توفرها المنصة",
      "مكتب مساعدة ذو أولوية قصوى مع الرد خلال يوم عمل واحد",
      "دعوات للمشاركة كمتحدث أو كاتب عبر منصات وفعاليات IBDL الدولية",
      "مراجعة سنوية شاملة للمحفظة التدريبية والتموضع السوقي",
    ],
    hubServicesHeaderEn: "Hub Services — Included",
    hubServicesHeaderAr: "خدمات المنصة — مشمولة بالكامل",
    disclaimerEn:
      "USD 380 is the annual membership fee. The free tool entitlement is one eligible usage per quarter — four per year, not unlimited access. Additional eligible purchases carry the 40% member rate. Eligibility is not certification, and not automatic accreditation.",
    disclaimerAr:
      "380 دولار أمريكي هي رسوم العضوية السنوية. ميزة الأدوات المجانية هي استخدام واحد مؤهل كل ربع سنة — أربع مرات سنوياً، وليست استخداماً غير محدود. المشتريات الإضافية تخضع لخصم 40%. الأهلية لا تعني الحصول التلقائي على الشهادة أو الاعتماد الفوري.",
    calloutBelowButtonEn:
      "Master Membership is an eligibility level, not a certification. Trainer certification is earned separately through the certification pathway.",
    calloutBelowButtonAr:
      "عضوية الماستر هي مستوى تأهيلي وليست رخصة نهائية في حد ذاتها. يتم الحصول على رخصة المدرب المعتمد بشكل منفصل عبر مسار الشهادات والترخيص.",
  },
};
