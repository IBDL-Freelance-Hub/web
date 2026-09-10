"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

interface ValueChainRowData {
  challengeEn: string;
  challengeAr: string;
  supportEn: string;
  supportAr: string;
  valueEn: string;
  valueAr: string;
  outcomeEn: string;
  outcomeAr: string;
}

const CHAIN_DATA: ValueChainRowData[] = [
  {
    challengeEn: "Unclear client need",
    challengeAr: "عدم وضوح احتياج العميل بدقة",
    supportEn: "TNA assistance",
    supportAr: "تحليل الاحتياجات التدريبية (TNA)",
    valueEn: "Sharper diagnosis",
    valueAr: "تشخيص أدق وأكثر عمقاً",
    outcomeEn: "More relevant solutions",
    outcomeAr: "حلول تدريبية شديدة المطابقة",
  },
  {
    challengeEn: "Weak or inconsistent proposals",
    challengeAr: "عروض فنية غير متسقة أو ضعيفة",
    supportEn: "Proposal building",
    supportAr: "إعداد وتطوير العروض الفنية",
    valueEn: "Professional client submission",
    valueAr: "تقديم عرض فني بمستوى احترافي",
    outcomeEn: "Higher opportunity conversion",
    outcomeAr: "معدل أعلى للفوز بالعقود والصفقات",
  },
  {
    challengeEn: "Content takes too long to build",
    challengeAr: "استغراق وقت طويل في تطوير المحتوى",
    supportEn: "Instructional design support",
    supportAr: "دعم التصميم التعليمي والمحتوى",
    valueEn: "Faster, stronger course development",
    valueAr: "تطوير برامج أسرع وبجودة أعلى",
    outcomeEn: "More scalable delivery",
    outcomeAr: "قدرة أكبر على التوسع في التنفيذ",
  },
  {
    challengeEn: "Unsure how to deliver",
    challengeAr: "الحيرة في اختيار طريقة التنفيذ المثلى",
    supportEn: "Mode & strategy selection",
    supportAr: "تحديد نمط واستراتيجية التدريب",
    valueEn: "Better learner experience",
    valueAr: "تجربة تعليمية أفضل للمتدربين",
    outcomeEn: "Stronger client satisfaction",
    outcomeAr: "رضا أكبر للعميل واستدامة العلاقة",
  },
  {
    challengeEn: "Difficulty proving impact",
    challengeAr: "صعوبة قياس وإثبات أثر التدريب",
    supportEn: "ROI & measurement tools",
    supportAr: "أدوات قياس الأثر وعائد الاستثمار",
    valueEn: "Evidence-based reporting",
    valueAr: "تقارير معتمدة مبنية على الأدلة",
    outcomeEn: "Repeat business potential",
    outcomeAr: "فرص متكررة لتجديد التعاقد",
  },
  {
    challengeEn: "Limited market exposure",
    challengeAr: "محدودية الوصول والظهور في السوق",
    supportEn: "Profile + networking",
    supportAr: "الملف المهني وشبكة العلاقات",
    valueEn: "Greater discoverability",
    valueAr: "سهولة اكتشاف العملاء لخبراتك",
    outcomeEn: "More leads and partnerships",
    outcomeAr: "شراكات جديدة وفرص تدريب أوسع",
  },
  {
    challengeEn: "Working alone",
    challengeAr: "العمل منفرداً دون فريق مساند",
    supportEn: "Help desk + community",
    supportAr: "مكتب الدعم ومجتمع المدربين",
    valueEn: "Access to expertise and peers",
    valueAr: "الوصول لاستشارات ودعم الأقران",
    outcomeEn: "Higher productivity and confidence",
    outcomeAr: "إنتاجية وثقة أعلى في السوق",
  },
];

/* -------------------------------------------------------------------------- */
/* Sub-components for Compound Pattern Compliance                            */
/* -------------------------------------------------------------------------- */

export function ValueChainEyebrow({ isInView = true }: { isInView?: boolean }) {
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        "eyebrow mb-5 flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-[#e11119] uppercase transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      <span
        className="inline-block h-[2px] w-[26px] rounded-full bg-[#e11119]"
        aria-hidden="true"
      />
      <span className={cn(locale === "ar" && "text-[13px] tracking-normal")}>
        {locale === "ar"
          ? "كيف تدعم المنصة أعمالك التدريبية"
          : "HOW THE HUB SUPPORTS YOUR TRAINING BUSINESS"}
      </span>
    </div>
  );
}

export function ValueChainHeadline({
  isInView = true,
}: {
  isInView?: boolean;
}) {
  const { locale } = useLocale();

  return (
    <h2
      className={cn(
        "h2 mb-4 max-w-[820px] text-[clamp(30px,3.6vw,50px)] leading-[1.14] font-bold tracking-[-0.012em] text-[#16162c] transition-all delay-100 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        locale === "ar" && "leading-[1.36] tracking-normal",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {locale === "ar"
        ? "من التحدي الذي تواجهه اليوم إلى نتائج الأعمال المحققة."
        : "From the challenge you have today to the business outcome."}
    </h2>
  );
}

export function ValueChainLead({ isInView = true }: { isInView?: boolean }) {
  const { locale } = useLocale();

  return (
    <p
      className={cn(
        "lead mb-12 text-[17.5px] leading-[1.62] text-[#3e3e5c] transition-all delay-200 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-6 opacity-0 blur-[5px]"
      )}
    >
      {locale === "ar"
        ? "صُممت كل خدمة لنقلك خطوة بخطوة عبر أحد هذه المسارات."
        : "Every service exists to move you along one of these lines."}
    </p>
  );
}

export function ValueChainHeader({ isInView = true }: { isInView?: boolean }) {
  return (
    <div className="head text-start">
      <ValueChainEyebrow isInView={isInView} />
      <ValueChainHeadline isInView={isInView} />
      <ValueChainLead isInView={isInView} />
    </div>
  );
}

export function ValueChainRow({
  row,
  index,
  isInView = true,
}: {
  row: ValueChainRowData;
  index: number;
  isInView?: boolean;
}) {
  const { locale } = useLocale();
  const delayMs = Math.min(index * 60, 300);

  const colLabels =
    locale === "ar"
      ? ["تحدي المدرب", "دعم المنصة", "القيمة المباشرة", "نتيجة الأعمال"]
      : [
          "TRAINER CHALLENGE",
          "HUB SUPPORT",
          "IMMEDIATE VALUE",
          "BUSINESS OUTCOME",
        ];

  return (
    <div
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "chain__row grid grid-cols-1 border-t border-[#e2e2ec] py-3 transition-all duration-300 first:border-t-0 hover:bg-[#f6f6fa] min-[880px]:grid-cols-[1.15fr_1fr_1fr_1.1fr] min-[880px]:py-0 min-[880px]:first:border-t",
        "transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-4 opacity-0 blur-[4px]"
      )}
    >
      {/* Col 0: Challenge */}
      <div className="chain__c chain__c--0 flex items-center p-3 text-[14.9px] leading-[1.55] font-semibold text-[#16162c] min-[880px]:p-[17px_22px]">
        <span className="me-2 text-xs font-bold text-slate-400 min-[880px]:hidden">
          {colLabels[0]}:
        </span>
        {locale === "ar" ? row.challengeAr : row.challengeEn}
      </div>

      {/* Col 1: Hub Support */}
      <div className="chain__c chain__c--1 flex items-center p-3 text-[14.9px] leading-[1.55] font-semibold text-[#e11119] min-[880px]:p-[17px_22px]">
        <span className="me-2 text-xs font-bold text-slate-400 min-[880px]:hidden">
          {colLabels[1]}:
        </span>
        {locale === "ar" ? row.supportAr : row.supportEn}
      </div>

      {/* Col 2: Immediate Value */}
      <div className="chain__c chain__c--2 flex items-center p-3 text-[14.9px] leading-[1.55] text-[#3e3e5c] min-[880px]:p-[17px_22px]">
        <span className="me-2 text-xs font-bold text-slate-400 min-[880px]:hidden">
          {colLabels[2]}:
        </span>
        {locale === "ar" ? row.valueAr : row.valueEn}
      </div>

      {/* Col 3: Business Outcome */}
      <div className="chain__c chain__c--3 flex items-center p-3 text-[14.9px] leading-[1.55] font-bold text-[#419257] min-[880px]:p-[17px_22px]">
        <span className="me-2 text-xs font-bold text-slate-400 min-[880px]:hidden">
          {colLabels[3]}:
        </span>
        {locale === "ar" ? row.outcomeAr : row.outcomeEn}
      </div>
    </div>
  );
}

export function ValueChainTable({ isInView = true }: { isInView?: boolean }) {
  const { locale } = useLocale();

  return (
    <div className="chain overflow-hidden rounded-[24px] border border-[#e2e2ec] bg-white shadow-[0_2px_8px_rgba(20,20,40,0.05)]">
      {/* Table Header (Desktop Only) */}
      <div className="chain__head hidden bg-[#1d1d39] text-white min-[880px]:grid min-[880px]:grid-cols-[1.15fr_1fr_1fr_1.1fr] min-[880px]:items-center">
        <div className="chain__h p-[16px_22px] text-[11.6px] font-extrabold tracking-[0.11em] text-white/85 uppercase">
          {locale === "ar" ? "تحدي المدرب" : "TRAINER CHALLENGE"}
        </div>
        <div className="chain__h p-[16px_22px] text-[11.6px] font-extrabold tracking-[0.11em] text-white/85 uppercase">
          {locale === "ar" ? "دعم المنصة" : "HUB SUPPORT"}
        </div>
        <div className="chain__h p-[16px_22px] text-[11.6px] font-extrabold tracking-[0.11em] text-white/85 uppercase">
          {locale === "ar" ? "القيمة المباشرة" : "IMMEDIATE VALUE"}
        </div>
        <div className="chain__h p-[16px_22px] text-[11.6px] font-extrabold tracking-[0.11em] text-white/85 uppercase">
          {locale === "ar" ? "نتيجة الأعمال" : "BUSINESS OUTCOME"}
        </div>
      </div>

      {/* Table Rows */}
      {CHAIN_DATA.map((row, idx) => (
        <ValueChainRow key={idx} row={row} index={idx} isInView={isInView} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Composite Value Chain Section                                         */
/* -------------------------------------------------------------------------- */

export function ValueChainSection() {
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
      id="chain"
      className="section section--light relative overflow-hidden bg-white py-[118px] text-start"
    >
      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ValueChainHeader isInView={isInView} />
        <ValueChainTable isInView={isInView} />
      </div>
    </section>
  );
}

// Attach sub-components for Compound Component pattern compliance
ValueChainSection.Header = ValueChainHeader;
ValueChainSection.Eyebrow = ValueChainEyebrow;
ValueChainSection.Headline = ValueChainHeadline;
ValueChainSection.Lead = ValueChainLead;
ValueChainSection.Table = ValueChainTable;
ValueChainSection.Row = ValueChainRow;
