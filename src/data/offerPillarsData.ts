import { getCategoryHref } from "@/config/presentation";

export interface PillarItem {
  num: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  linkTextEn: string;
  linkTextAr: string;
  href: string;
}

export const OFFER_PILLARS_DATA: PillarItem[] = [
  {
    num: "01",
    titleEn: "Business Simulation Games",
    titleAr: "ألعاب محاكاة الأعمال",
    descEn:
      "Eight immersive, facilitator-led simulations spanning strategy, leadership, sales, marketing, operations and team dynamics. Full facilitator packs, bilingual materials and scoring systems included.",
    descAr:
      "ثماني تجارب محاكاة تفاعلية بقيادة المدرب تغطي الاستراتيجية، والقيادة، والمبيعات، والتسويق، والعمليات، وديناميكيات الفريق، مع حقائب كاملة للمدرب ومواد ثنائية اللغة ونظم تقييم متقدمة.",
    linkTextEn: "View the 8 simulations",
    linkTextAr: "استعرض ألعاب المحاكاة الثمانية",
    href: getCategoryHref("games"),
  },
  {
    num: "02",
    titleEn: "Assessment Tools",
    titleAr: "أدوات التقييم والتشخيص",
    descEn:
      "Three scientifically validated instruments for hiring, development, change readiness and motivation mapping — with individual, team and organisational reporting.",
    descAr:
      "ثلاث أدوات تقييم مثبتة علمياً للتوظيف، والتطوير القيادي، والجاهزية للتغيير، ومصفوفات الدوافع — مع تقارير شاملة على مستوى الفرد، والفريق، والمنظمة.",
    linkTextEn: "View the 3 assessments",
    linkTextAr: "استعرض أدوات التقييم الثلاث",
    href: getCategoryHref("assess"),
  },
  {
    num: "03",
    titleEn: "IBDL Training Accreditation",
    titleAr: "اعتماد IBDL للتدريب والمحتوى",
    descEn:
      "Formal recognition of your programmes and delivery capability under the IBDL Accredited Content mark — a credential your clients can verify.",
    descAr:
      "اعتراف مهني رسمي ببرامجك التدريبية وبكفاءتك في التنفيذ تحت خاتم محتوى IBDL المعتمد — وسام مهني موثق يمكن لعملائك التحقق منه إلكترونياً.",
    linkTextEn: "About accreditation",
    linkTextAr: "عن برامج الاعتماد",
    href: getCategoryHref("accred"),
  },
];
