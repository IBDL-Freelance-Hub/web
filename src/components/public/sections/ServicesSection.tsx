"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

interface ServiceItem {
  num: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    num: "01",
    titleEn: "Training Needs Analysis (TNA) Assistance",
    titleAr: "تحليل الاحتياجات التدريبية (TNA)",
    descEn: "Turn a client request into a defensible learning need.",
    descAr: "تحويل طلب العميل الأولي إلى احتياج تدريبي دقيق ومثبت.",
  },
  {
    num: "02",
    titleEn: "Program Mapping & Learning Architecture",
    titleAr: "هيكلة البرامج والمسارات التدريبية",
    descEn: "Convert identified needs into a coherent learning journey.",
    descAr: "صياغة الاحتياجات في مسار تعليمي متكامل ومترابط.",
  },
  {
    num: "03",
    titleEn: "Proposal Building & Commercial Solution Support",
    titleAr: "إعداد المقترحات والعروض الفنية والمالية",
    descEn: "Transform expertise into a client-ready proposal.",
    descAr: "تحويل خبرتك المهنية إلى عرض فني جاهز للتقديم للعملاء.",
  },
  {
    num: "04",
    titleEn: "Content Design & Development",
    titleAr: "تصميم وتطوير المحتوى التدريبي",
    descEn:
      "Build learning content that is instructionally sound and professionally structured.",
    descAr: "بناء محتوى تدريبي متين تعليمياً ومصمم باحترافية عالية.",
  },
  {
    num: "05",
    titleEn: "Training Mode & Strategy Selection",
    titleAr: "تحديد أساليب واستراتيجيات التدريب",
    descEn: "Choose the right delivery approach for the audience and outcome.",
    descAr: "اختيار نمط التنفيذ الأنسب للجمهور ولتحقيق أهداف التعلم.",
  },
  {
    num: "06",
    titleEn: "Training ROI & Impact Measurement Toolkit",
    titleAr: "قياس الأثر وعائد الاستثمار التدريبي",
    descEn: "Show clients what changed because of the training.",
    descAr: "إثبات التغيير والقيمة المضافة التي أحدثها التدريب للعميل.",
  },
  {
    num: "07",
    titleEn: "Trainer Help Desk & Expert Support",
    titleAr: "مكتب مساندة المدرب والدعم الاستشاري",
    descEn:
      "Get practical support when an opportunity or delivery challenge arises.",
    descAr: "مساندة عملية فورية عند ظهور تحديات تدريبية أو فرص جديدة.",
  },
  {
    num: "08",
    titleEn: "Professional Profile, Visibility & Opportunity Showcase",
    titleAr: "الملف المهني وإبراز الخبرات والفرص",
    descEn: "Make your expertise easier for the market to discover.",
    descAr: "تسهيل وصول سوق التدريب والشركات إلى خبراتك وسيرتك.",
  },
  {
    num: "09",
    titleEn: "Business Networking & Collaboration",
    titleAr: "التواصل المهني والتعاون المشترك",
    descEn:
      "Turn a network of independent trainers into a professional community.",
    descAr: "تحويل مجتمع المدربين المستقلين إلى شبكة تعاون احترافية.",
  },
  {
    num: "10",
    titleEn: "Accreditation & Professional Recognition Pathway",
    titleAr: "مسار الاعتماد والاعتراف المهني",
    descEn: "Strengthen market credibility through recognized standards.",
    descAr: "تعزيز مصداقيتك في السوق عبر معايير اعتماد معترف بها دولياً.",
  },
  {
    num: "11",
    titleEn: "Templates, Tools & Resource Library",
    titleAr: "مكتبة النماذج والأدوات والمصادر",
    descEn: "Stop rebuilding essential documents from scratch.",
    descAr: "توفير وقتك ونماذج العمل الجاهزة دون الحاجة للبدء من الصفر.",
  },
  {
    num: "12",
    titleEn: "Continuous Professional Development & Market Insights",
    titleAr: "التطوير المهني المستمر ورؤى السوق",
    descEn: "Keep your capability relevant to a changing GCC learning market.",
    descAr: "مواكبة متغيرات واحتياجات سوق التدريب في الخليج باستمرار.",
  },
];

/* -------------------------------------------------------------------------- */
/* Sub-components for Compound Pattern Compliance                            */
/* -------------------------------------------------------------------------- */

export function ServicesEyebrow({ isInView = true }: { isInView?: boolean }) {
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
        {locale === "ar" ? "خدمات المنصة الأساسية" : "CORE HUB SERVICES"}
      </span>
    </div>
  );
}

export function ServicesHeadline({ isInView = true }: { isInView?: boolean }) {
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
        ? "كل ما تحتاجه لبناء حلول تدريبية استثنائية."
        : "Everything you need to build better training solutions."}
    </h2>
  );
}

export function ServicesLead({ isInView = true }: { isInView?: boolean }) {
  const { locale } = useLocale();

  return (
    <p
      className={cn(
        "lead mx-auto mb-14 max-w-[66ch] text-center text-[clamp(16px,1.3vw,18.5px)] leading-relaxed text-white/75 transition-all delay-200 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {locale === "ar"
        ? "اثنتا عشرة خدمة مهنية ترافق دورة عملك التجارية والتدريبية بالكامل — بدءاً من تحديد احتياجات العميل، وتصميم الحقيبة، وتقديم العرض، وحتى جودة التنفيذ وإثبات العائد على الاستثمار."
        : "Twelve professional services that follow your complete commercial and learning-solution lifecycle — from identifying the client's need, to designing the solution, submitting the proposal, delivering it well, and proving what changed."}
    </p>
  );
}

export function ServicesHeader({ isInView = true }: { isInView?: boolean }) {
  return (
    <div className="head head--center text-center">
      <ServicesEyebrow isInView={isInView} />
      <ServicesHeadline isInView={isInView} />
      <ServicesLead isInView={isInView} />
    </div>
  );
}

export function ServiceCardNumber({
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
    <span className="svcard__n mb-3 block text-[13px] font-extrabold tracking-[0.12em] text-[#5cb374] tabular-nums transition-transform duration-500 group-hover:scale-105">
      {formatNumber(displayString)}
    </span>
  );
}

export function ServiceCard({
  item,
  index = 0,
  isInView = true,
}: {
  item: ServiceItem;
  index?: number;
  isInView?: boolean;
}) {
  const { locale } = useLocale();
  const delayMs = Math.min(index * 75, 300);

  return (
    <div
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "svcard group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.11] bg-gradient-to-br from-white/[0.075] to-white/[0.025] p-7 transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.09] hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]",
        "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {/* Top Accent Line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#5cb374] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div>
        <ServiceCardNumber value={item.num} isInView={isInView} />

        <h3 className="svcard__t mb-2.5 text-[18px] leading-[1.35] font-bold tracking-[-0.01em] text-white">
          {locale === "ar" ? item.titleAr : item.titleEn}
        </h3>

        <p className="svcard__d m-0 text-[14.8px] leading-[1.62] text-white/70">
          {locale === "ar" ? item.descAr : item.descEn}
        </p>
      </div>
    </div>
  );
}

export function ServicesCarousel({ isInView = true }: { isInView?: boolean }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isRTL } = useLocale();

  const totalCards = SERVICES_DATA.length;
  const cardsPerPage = 3;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  // Dynamic automatic sliding loop every 4.5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, totalPages]);

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const visibleCards = SERVICES_DATA.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cards Container Grid (3 per view) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((item, idx) => (
          <ServiceCard
            key={item.num}
            item={item}
            index={idx}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Slider Controls (Prev/Next buttons & Pagination Dots) */}
      <div className="mt-10 flex items-center justify-between">
        {/* Page counter label */}
        <span className="text-xs font-semibold text-white/50">
          {currentPage + 1} / {totalPages}
        </span>

        {/* Pagination Dots */}
        <div className="flex gap-2.5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                currentPage === idx
                  ? "w-8 bg-[#5cb374]"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Arrow Buttons with Glassmorphism styling */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevPage}
            aria-label="Previous services"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 active:scale-95"
          >
            {isRTL ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={nextPage}
            aria-label="Next services"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 active:scale-95"
          >
            {isRTL ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ServicesGrid({ isInView = true }: { isInView?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES_DATA.map((item, idx) => (
        <ServiceCard
          key={item.num}
          item={item}
          index={idx}
          isInView={isInView}
        />
      ))}
    </div>
  );
}

export function ServicesFooter() {
  const { locale } = useLocale();

  return (
    <div className="svfoot mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 text-center sm:flex-row sm:text-start">
      <p className="m-0 text-sm text-white/60">
        {locale === "ar"
          ? "تُشرح كل خدمة بالتفصيل داخل المنصة، حيث يمكنك طلبها."
          : "Each service is explained in full inside the Hub, where you can request it."}
      </p>

      <Link
        href="#plans"
        className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 active:scale-95"
      >
        {locale === "ar" ? (
          <>
            <span>تعرف على كيفية الوصول لهذه الخدمات</span>
            <ArrowLeft className="h-4 w-4" />
          </>
        ) : (
          <>
            <span>See how to access these services</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Composite Services Section                                            */
/* -------------------------------------------------------------------------- */

export function ServicesSection() {
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
      id="services"
      className="section section--deep relative overflow-hidden bg-[#141428] py-[118px] text-start text-white"
    >
      {/* Top & Bottom Ambient Glows */}
      <div
        className="pointer-events-none absolute start-1/2 -top-40 h-80 w-[600px] -translate-x-1/2 rounded-full bg-[#5cb374]/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute end-0 -bottom-40 h-80 w-[500px] rounded-full bg-[#ff5c62]/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ServicesHeader isInView={isInView} />
        <ServicesGrid isInView={isInView} />
        <ServicesFooter />
      </div>
    </section>
  );
}

// Attach sub-components for Compound Component pattern compliance
ServicesSection.Header = ServicesHeader;
ServicesSection.Eyebrow = ServicesEyebrow;
ServicesSection.Headline = ServicesHeadline;
ServicesSection.Lead = ServicesLead;
ServicesSection.Card = ServiceCard;
ServicesSection.Grid = ServicesGrid;
ServicesSection.Carousel = ServicesCarousel;
ServicesSection.Footer = ServicesFooter;
