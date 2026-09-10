"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getCategoryHref } from "@/config/presentation";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

interface PillarItem {
  num: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  linkTextEn: string;
  linkTextAr: string;
  href: string;
}

const PILLARS_DATA: PillarItem[] = [
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

/* -------------------------------------------------------------------------- */
/* Animated Number Sub-component for Pillar Index                             */
/* -------------------------------------------------------------------------- */

export function PillarCardNumber({
  value,
  isInView = true,
}: {
  value: string;
  isInView?: boolean;
}) {
  const { formatNumber } = useLocale();
  const numericVal = parseInt(value, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || isNaN(numericVal)) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * numericVal);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(numericVal);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, numericVal]);

  const displayString = isNaN(numericVal)
    ? value
    : String(count).padStart(2, "0");

  return (
    <span className="pillar__n mb-5 block text-[13px] font-extrabold tracking-[0.12em] text-[#5cb374] tabular-nums transition-transform duration-500 group-hover:scale-105">
      {formatNumber(displayString)}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-components for Compound Pattern Compliance                            */
/* -------------------------------------------------------------------------- */

export function OfferPillarsEyebrow({
  isInView = true,
}: {
  isInView?: boolean;
}) {
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        "eyebrow mb-5 flex items-center justify-center gap-2.5 text-center text-xs font-bold tracking-[0.16em] text-[#ff5c62] uppercase transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      <span
        className="inline-block h-[2px] w-[26px] rounded-full bg-[#ff5c62]"
        aria-hidden="true"
      />
      <span className={cn(locale === "ar" && "text-[13px] tracking-normal")}>
        {locale === "ar" ? "أدوات IBDL المتخصصة" : "SPECIALIZED IBDL TOOLS"}
      </span>
    </div>
  );
}

export function OfferPillarsHeadline({
  isInView = true,
}: {
  isInView?: boolean;
}) {
  const { locale } = useLocale();

  return (
    <h2
      className={cn(
        "h2 mx-auto mb-5 max-w-[820px] text-center text-[clamp(30px,3.6vw,48px)] leading-[1.15] font-bold text-white transition-all delay-100 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        locale === "ar" && "leading-[1.38] tracking-normal",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {locale === "ar"
        ? "الأدوات المعتمدة خلف الحلول التي تصممها."
        : "The instruments behind the solutions you design."}
    </h2>
  );
}

export function OfferPillarsLead({ isInView = true }: { isInView?: boolean }) {
  const { locale } = useLocale();

  return (
    <p
      className={cn(
        "lead mx-auto mb-16 max-w-[64ch] text-center text-[clamp(16px,1.3vw,18.5px)] leading-relaxed text-white/75 transition-all delay-200 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {locale === "ar"
        ? "إلى جانب خدمات المنصة الأساسية، يمكن للأعضاء الوصول إلى ألعاب المحاكاة، وأدوات التقييم، وبرامج الاعتماد التي طورتها مجموعة IBDL عبر عقدين من التنفيذ المؤسسي المتميز."
        : "Alongside the Core Hub Services, members can access the simulations, assessments and accreditation IBDL Learning Group has built over two decades of enterprise delivery."}
    </p>
  );
}

export function OfferPillarsHeader({
  isInView = true,
}: {
  isInView?: boolean;
}) {
  return (
    <div className="head head--center text-center">
      <OfferPillarsEyebrow isInView={isInView} />
      <OfferPillarsHeadline isInView={isInView} />
      <OfferPillarsLead isInView={isInView} />
    </div>
  );
}

export function OfferPillarsCard({
  item,
  index = 0,
  isInView = true,
}: {
  item: PillarItem;
  index?: number;
  isInView?: boolean;
}) {
  const { isRTL, locale } = useLocale();
  const delayMs = Math.min(index * 100, 300);

  return (
    <div
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "pillar group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.11] bg-gradient-to-br from-white/[0.075] to-white/[0.025] p-[30px_26px_26px] transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-white/[0.24] hover:bg-gradient-to-br hover:from-white/[0.11] hover:to-white/[0.04]",
        "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {/* Top Glowing Border */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#5cb374] to-transparent opacity-0 transition-opacity duration-450 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div>
        <PillarCardNumber value={item.num} isInView={isInView} />

        <h3 className="mb-2.5 text-[20px] leading-[1.3] font-bold text-white">
          {locale === "ar" ? item.titleAr : item.titleEn}
        </h3>

        <p className="mb-4 flex-1 text-[14.8px] leading-[1.62] text-white/70">
          {locale === "ar" ? item.descAr : item.descEn}
        </p>
      </div>

      <Link
        href={item.href}
        className="pillar__link inline-flex items-center gap-[9px] text-[14.5px] font-bold text-white transition-all duration-300 group-hover:gap-[14px] group-hover:text-[#5cb374]"
      >
        <span>{locale === "ar" ? item.linkTextAr : item.linkTextEn}</span>
        {isRTL ? (
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        ) : (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </Link>
    </div>
  );
}

export function OfferPillarsGrid({ isInView = true }: { isInView?: boolean }) {
  return (
    <div className="pillars grid grid-cols-1 gap-[22px] md:grid-cols-3">
      {PILLARS_DATA.map((item, idx) => (
        <OfferPillarsCard
          key={item.num}
          item={item}
          index={idx}
          isInView={isInView}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Composite Offer Pillars Section                                       */
/* -------------------------------------------------------------------------- */

export function OfferPillarsSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="offer"
      className="section section--deep relative overflow-hidden bg-[#141428] py-[118px] text-start text-white"
    >
      {/* Top Ambient Glow */}
      <div
        className="pointer-events-none absolute start-1/2 -top-40 h-80 w-[600px] -translate-x-1/2 rounded-full bg-[#5cb374]/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <OfferPillarsHeader isInView={isInView} />
        <OfferPillarsGrid isInView={isInView} />
      </div>
    </section>
  );
}

// Attach sub-components for Compound Component pattern compliance
OfferPillarsSection.Header = OfferPillarsHeader;
OfferPillarsSection.Eyebrow = OfferPillarsEyebrow;
OfferPillarsSection.Headline = OfferPillarsHeadline;
OfferPillarsSection.Lead = OfferPillarsLead;
OfferPillarsSection.Grid = OfferPillarsGrid;
OfferPillarsSection.Pillar = OfferPillarsCard;
