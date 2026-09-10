"use client";

import React, { useEffect, useState } from "react";
import { Lock, ShieldCheck, TrendingUp, Globe } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

interface ChallengeCardData {
  icon: React.ReactNode;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

const CHALLENGES_DATA: ChallengeCardData[] = [
  {
    icon: <Lock className="h-6 w-6" strokeWidth={1.8} />,
    titleEn: "Locked behind enterprise licensing",
    titleAr: "محصورة خلف تراخيص الشركات الضخمة",
    bodyEn:
      "Validated assessments and simulation platforms are priced and packaged for large organisations, leaving independents without access at any realistic scale.",
    bodyAr:
      "أدوات التقييم المعتمدة ومنصات المحاكاة مسعرة ومجهزة للمؤسسات الكبرى فقط، مما يحرم المدرب المستقل من الوصول إليها بأي نطاق أو تكلفة واقعية.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.8} />,
    titleEn: "Credibility questioned in the room",
    titleAr: "التشكيك في المصداقية أمام العميل",
    bodyEn:
      "Without a recognised accreditation to stand on, independent consultants spend the first half of every pitch defending their legitimacy instead of designing the solution.",
    bodyAr:
      "في غياب اعتماد مهني معترف به يستند إليه المدرب، يقضي المستقلون النصف الأول من كل عرض في إثبات جدارتهم بدلاً من التركيز على تصميم الحل التدريبي.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" strokeWidth={1.8} />,
    titleEn: "No measurement, no renewal",
    titleAr: "غياب أدوات القياس يعني عدم تجديد العقود",
    bodyEn:
      "Programmes delivered without pre- and post-measurement cannot demonstrate impact — and engagements that cannot prove impact are rarely renewed.",
    bodyAr:
      "البرامج التدريبية التي تُقدم دون قياس قبلي وبعدي تعجز عن إثبات الأثر الواقعي — والتعاقدات التي لا تثبت عائد الاستثمار نادراً ما يتم تجديدها.",
  },
  {
    icon: <Globe className="h-6 w-6" strokeWidth={1.8} />,
    titleEn: "Bilingual delivery is a hard barrier",
    titleAr: "تقديم المحتوى بلغتين يمثل عقبة شاقة",
    bodyEn:
      "Regional clients expect Arabic and English materials of equal quality. Producing both alone is a cost most independents simply cannot carry.",
    bodyAr:
      "يتوقع العملاء في المنطقة حقائب تدريبية بالعربية والإنجليزية بنفس الجودة والاحترافية، وتطوير كليهما بمفردك يمثل تكلفة وجهداً لا يقوى أغلب المستقلين على تحمله.",
  },
];

/* -------------------------------------------------------------------------- */
/* Sub-components for Compound Pattern Compliance                            */
/* -------------------------------------------------------------------------- */

export function AboutEyebrow({ mounted = true }: { mounted?: boolean }) {
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        "eyebrow mb-5 flex transform items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-[#e11119] uppercase transition-all duration-700 ease-out",
        mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <span
        className="inline-block h-[2px] w-[26px] rounded-full bg-[#e11119]"
        aria-hidden="true"
      />
      <span className={cn(locale === "ar" && "text-[13px] tracking-normal")}>
        {locale === "ar" ? "لماذا منصة المستقلين" : "WHY FREELANCER HUB"}
      </span>
    </div>
  );
}

export function AboutHeadline({ mounted = true }: { mounted?: boolean }) {
  const { locale } = useLocale();

  return (
    <h2
      className={cn(
        "h2 mb-5 max-w-[820px] transform text-[clamp(30px,3.6vw,50px)] leading-[1.14] font-bold tracking-[-0.012em] text-[#16162c] transition-all delay-100 duration-700 ease-out",
        locale === "ar" && "leading-[1.42] tracking-normal",
        mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      {locale === "ar"
        ? "خبرة مستقلة، دون قيود البنية المؤسسية."
        : "Independent expertise, without the institutional scaffolding."}
    </h2>
  );
}

export function AboutLead({ mounted = true }: { mounted?: boolean }) {
  const { locale } = useLocale();

  return (
    <p
      className={cn(
        "lead mb-16 max-w-[62ch] transform text-[clamp(17px,1.35vw,19.5px)] leading-[1.62] text-[#3e3e5c] transition-all delay-200 duration-700 ease-out",
        mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      {locale === "ar"
        ? "يتنافس المدربون المستقلون في دول مجلس التعاون الخليجي مع كبرى بيوت الخبرة والاستشارات التي تمتلك فرق دعم للمقترحات، وأطر قياس معتمدة، واعتمادات مهنية قوية. الخبرة متساوية، لكن البنية التحتية ليست كذلك — وفي هذه الفجوة تضيع الفرص."
        : "Freelance trainers across the GCC compete with consultancies that arrive with design support, proposal teams, measurement frameworks and recognised accreditation behind them. The expertise is equal. The infrastructure is not — and that gap is where opportunities are lost."}
    </p>
  );
}

export function AboutCard({
  item,
  index,
  mounted = true,
}: {
  item: ChallengeCardData;
  index: number;
  mounted?: boolean;
}) {
  const { isRTL, locale } = useLocale();

  // Determine slide direction: left column cards slide from start, right column cards slide from end
  const isLeftColumn = index % 2 === 0;

  // Stagger delays based on card index
  const delays = ["delay-200", "delay-350", "delay-300", "delay-450"];
  const currentDelay = delays[index % delays.length];

  const initialTransform = isLeftColumn
    ? isRTL
      ? "translate-x-12 opacity-0"
      : "-translate-x-12 opacity-0"
    : isRTL
      ? "-translate-x-12 opacity-0"
      : "translate-x-12 opacity-0";

  return (
    <div
      className={cn(
        "chal__item group relative transform rounded-[24px] border border-[#e2e2ec] bg-white p-[34px_32px_32px] transition-all duration-700 ease-out hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_12px_32px_rgba(20,20,40,0.09)]",
        currentDelay,
        mounted ? "translate-x-0 opacity-100" : initialTransform
      )}
    >
      <div className="chal__ic mb-[22px] grid h-[52px] w-[52px] place-items-center rounded-[15px] bg-gradient-to-br from-[rgba(65,146,87,0.16)] to-[rgba(65,146,87,0.05)] text-[#419257]">
        {item.icon}
      </div>

      <h3 className="mb-2.5 text-[19.5px] font-bold tracking-[-0.012em] text-[#16162c]">
        {locale === "ar" ? item.titleAr : item.titleEn}
      </h3>

      <p className="m-0 text-[15.8px] leading-[1.66] text-[#6a6a86]">
        {locale === "ar" ? item.bodyAr : item.bodyEn}
      </p>
    </div>
  );
}

export function AboutGrid({ mounted = true }: { mounted?: boolean }) {
  return (
    <div className="chal grid grid-cols-1 gap-5 md:grid-cols-2">
      {CHALLENGES_DATA.map((item, idx) => (
        <AboutCard key={idx} item={item} index={idx} mounted={mounted} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Composite About / Trainer Challenges Section                          */
/* -------------------------------------------------------------------------- */

export function AboutSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <section
      id="about"
      className="section section--light relative overflow-hidden bg-white py-[118px] text-start"
    >
      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="head">
          <AboutEyebrow mounted={mounted} />
          <AboutHeadline mounted={mounted} />
          <AboutLead mounted={mounted} />
        </div>

        <AboutGrid mounted={mounted} />
      </div>
    </section>
  );
}

// Attach sub-components for Compound Component pattern compliance
AboutSection.Eyebrow = AboutEyebrow;
AboutSection.Headline = AboutHeadline;
AboutSection.Lead = AboutLead;
AboutSection.Card = AboutCard;
AboutSection.Grid = AboutGrid;
