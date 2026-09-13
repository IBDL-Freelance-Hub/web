"use client";

import React, { useEffect, useRef, useState } from "react";
import { Lock, ShieldCheck, TrendingUp, Globe } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";

interface ChallengeCardData {
  icon: React.ReactNode;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

const CHALLENGES_DATA: ChallengeCardData[] = [
  {
    icon: <Lock className="h-6 w-6 stroke-[1.75]" />,
    titleEn: "Locked behind enterprise licensing",
    titleAr: "محصورة خلف تراخيص الشركات الضخمة",
    bodyEn:
      "Validated assessments and simulation platforms are priced and packaged for large organisations, leaving independents without access at any realistic scale.",
    bodyAr:
      "أدوات التقييم المعتمدة ومنصات المحاكاة مسعرة ومجهزة للمؤسسات الكبرى فقط، مما يحرم المدرب المستقل من الوصول إليها بأي نطاق أو تكلفة واقعية.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 stroke-[1.75]" />,
    titleEn: "Credibility questioned in the room",
    titleAr: "التشكيك في المصداقية أمام العميل",
    bodyEn:
      "Without a recognised accreditation to stand on, independent consultants spend the first half of every pitch defending their legitimacy instead of designing the solution.",
    bodyAr:
      "في غياب اعتماد مهني معترف به يستند إليه المدرب، يقضي المستقلون النصف الأول من كل عرض في إثبات جدارتهم بدلاً من التركيز على تصميم الحل التدريبي.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 stroke-[1.75]" />,
    titleEn: "No measurement, no renewal",
    titleAr: "غياب أدوات القياس يعني عدم تجديد العقود",
    bodyEn:
      "Programmes delivered without pre- and post-measurement cannot demonstrate impact — and engagements that cannot prove impact are rarely renewed.",
    bodyAr:
      "البرامج التدريبية التي تُقدم دون قياس قبلي وبعدي تعجز عن إثبات الأثر الواقعي — والتعاقدات التي لا تثبت عائد الاستثمار نادراً ما يتم تجديدها.",
  },
  {
    icon: <Globe className="h-6 w-6 stroke-[1.75]" />,
    titleEn: "Bilingual delivery is a hard barrier",
    titleAr: "تقديم المحتوى بلغتين يمثل عقبة شاقة",
    bodyEn:
      "Regional clients expect Arabic and English materials of equal quality. Producing both alone is a cost most independents simply cannot carry.",
    bodyAr:
      "يتوقع العملاء في المنطقة حقائب تدريبية بالعربية والإنجليزية بنفس الجودة والاحترافية، وتطوير كليهما بمفردك يمثل تكلفة وجهداً لا يقوى أغلب المستقلين على تحمله.",
  },
];

export function AboutContent() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* Section Heading Area - Comes Down From Top */}
      <div
        className={`head mb-12 ${
          isVisible ? "anim-from-top" : "-translate-y-10 opacity-0"
        }`}
      >
        {/* Eyebrow with leading dash line */}
        <div className="eyebrow mb-4 flex items-center gap-2.5 text-[13px] font-bold tracking-[0.14em] text-[#e11119] uppercase">
          <span
            className="inline-block h-[2px] w-6 rounded-full bg-[#e11119]"
            aria-hidden="true"
          />
          <span>
            {isArabic ? "لماذا منصة المستقلين" : "WHY FREELANCER HUB"}
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="mb-6 max-w-[760px] text-[clamp(32px,3.8vw,46px)] leading-[1.18] font-bold tracking-tight text-[#16162c]">
          {isArabic
            ? "خبرة مستقلة، بدون التعقيدات المؤسسية."
            : "Independent expertise, without the institutional scaffolding."}
        </h2>

        {/* Subtitle / Lead Paragraph */}
        <p className="lead max-w-[68ch] text-[16.5px] leading-[1.68] text-[#4a4d6b]">
          {isArabic
            ? "يتنافس المدربون المستقلون في دول مجلس التعاون الخليجي مع شركات استشارية تمتلك فريق دعم وتصميم، وفريق لتقديم العروض، وأطر قياس، واعتمادات معترف بها. الخبرة متساوية، لكن البنية التحتية ليست كذلك — وتلك الفجوة هي حيث تضيع الفرص."
            : "Freelance trainers across the GCC compete with consultancies that arrive with design support, proposal teams, measurement frameworks and recognised accreditation behind them. The expertise is equal. The infrastructure is not — and that gap is where opportunities are lost."}
        </p>
      </div>

      {/* 2x2 Grid: Left Cards from Left, Right Cards from Right */}
      <div className="grid max-w-[1140px] grid-cols-1 gap-6 overflow-hidden py-2 md:grid-cols-2">
        {CHALLENGES_DATA.map((card, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`group relative flex flex-col rounded-[20px] border border-[#e5e7eb] bg-white p-8 text-start transition-all duration-300 hover:-translate-y-1 hover:border-[#d1d5db] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] ${
                isVisible
                  ? isLeft
                    ? "anim-from-left"
                    : "anim-from-right"
                  : "opacity-0"
              }`}
              style={{
                animationDelay: isVisible ? `${0.2 + idx * 0.15}s` : "0s",
              }}
            >
              {/* Pale green icon container */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5ea] text-[#1b7a43] transition-transform duration-300 group-hover:scale-105">
                {card.icon}
              </div>

              <h3 className="mb-3 text-[18px] leading-snug font-bold text-[#16162c]">
                {isArabic ? card.titleAr : card.titleEn}
              </h3>

              <p className="text-[14.5px] leading-[1.65] text-[#5f6368]">
                {isArabic ? card.bodyAr : card.bodyEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
