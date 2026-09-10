"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, Info } from "lucide-react";
import { useRegistration } from "../registration/RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

interface PlanTierData {
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

const CORE_SERVICES_LIST = [
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

const PLANS_DATA: PlanTierData[] = [
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

/* -------------------------------------------------------------------------- */
/* Sub-components for Compound Pattern Compliance                            */
/* -------------------------------------------------------------------------- */

export function PlansEyebrow({ isInView = true }: { isInView?: boolean }) {
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        "eyebrow mb-5 flex items-center justify-center gap-2.5 text-center text-xs font-bold tracking-[0.16em] text-[#e11119] uppercase transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-12 opacity-0 blur-[6px]"
      )}
    >
      <span
        className="inline-block h-[2px] w-[26px] rounded-full bg-[#e11119]"
        aria-hidden="true"
      />
      <span className={cn(locale === "ar" && "text-[13px] tracking-normal")}>
        {locale === "ar" ? "العضوية" : "MEMBERSHIP"}
      </span>
    </div>
  );
}

export function PlansHeadline({ isInView = true }: { isInView?: boolean }) {
  const { locale } = useLocale();

  return (
    <h2
      className={cn(
        "h2 mx-auto mb-4 max-w-[820px] text-center text-[clamp(30px,3.6vw,48px)] leading-[1.14] font-bold text-[#16162c] transition-all delay-150 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        locale === "ar" && "leading-[1.38] tracking-normal",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-12 opacity-0 blur-[6px]"
      )}
    >
      {locale === "ar"
        ? "اختر كيف تعمل المنصة في مساندتك."
        : "Choose how you work with the Hub."}
    </h2>
  );
}

export function PlansLead({ isInView = true }: { isInView?: boolean }) {
  const { locale } = useLocale();

  return (
    <p
      className={cn(
        "lead mx-auto mb-16 max-w-[66ch] text-center text-[clamp(16px,1.3vw,18.5px)] leading-relaxed text-[#3e3e5c] transition-all delay-300 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-12 opacity-0 blur-[6px]"
      )}
    >
      {locale === "ar"
        ? "ثلاثة مستويات للعضوية، يبني كل مستوى منها على ما قبله — وتبدأ بعضوية Essential مجاناً بمجرد التسجيل."
        : "Three membership levels. Everything above builds on the level before it — and you start on Essential, free, the moment you register."}
    </p>
  );
}

export function PlansHeader({ isInView = true }: { isInView?: boolean }) {
  return (
    <div className="head head--center text-center">
      <PlansEyebrow isInView={isInView} />
      <PlansHeadline isInView={isInView} />
      <PlansLead isInView={isInView} />
    </div>
  );
}

export function PlanCard({
  tier,
  index = 0,
  isInView = true,
}: {
  tier: PlanTierData;
  index?: number;
  isInView?: boolean;
}) {
  const { openRegistration } = useRegistration();
  const { locale, formatNumber } = useLocale();
  const delayMs = 400 + index * 150;

  const isAr = locale === "ar";
  const benefits = isAr ? tier.benefitsAr : tier.benefitsEn;

  return (
    <div
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "tier relative flex min-h-full flex-col rounded-[24px] border border-[#e2e2ec] bg-white p-[36px_30px_30px] transition-all duration-450 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(20,20,40,0.09)]",
        tier.isTop &&
          "tier--top border-[#1d1d39] shadow-[0_8px_24px_rgba(20,20,40,0.06)]",
        "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-14 opacity-0 blur-[6px]"
      )}
    >
      {/* 1. Kind Badge */}
      <span className="tier__kind mb-3 block text-[11.6px] font-extrabold tracking-[0.13em] text-[#e11119] uppercase">
        {isAr ? tier.kindAr : tier.kindEn}
      </span>

      {/* 2. Tier Name */}
      <h3 className="tier__name mb-1.5 text-[22px] font-bold tracking-[-0.015em] text-[#16162c]">
        {isAr ? tier.nameAr : tier.nameEn}
      </h3>

      {/* 3. Tier Promise */}
      <p className="tier__promise mb-5 text-[15.2px] font-bold text-[#1d1d39]">
        {isAr ? tier.promiseAr : tier.promiseEn}
      </p>

      {/* 4. Price Block */}
      <div className="tier__price mb-6 rounded-[16px] border border-[#e2e2ec] bg-[#f6f6fa] p-[16px_18px]">
        <b className="mb-1 block text-[19px] font-bold tracking-[-0.015em] text-[#16162c]">
          {isAr
            ? tier.id === "essential"
              ? "مجاناً"
              : `${formatNumber(tier.priceEn.split(" ")[0])} / سنة`
            : tier.priceEn}
        </b>
        <small className="block text-[12.4px] text-[#6a6a86]">
          {isAr ? tier.periodAr : tier.periodEn}
        </small>
      </div>

      {/* 5. Sub-condition Tagline */}
      <p className="mb-6 text-[14px] leading-relaxed text-[#3e3e5c]">
        {isAr ? tier.taglineAr : tier.taglineEn}
      </p>

      {/* 6. Benefits List */}
      <ul className="tier__list mb-[26px] grid list-none gap-3 p-0 text-[14.8px] leading-[1.55] text-[#3e3e5c]">
        {benefits.map((b, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#419257]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* 7. Embedded 12 Core Services Block */}
      <div className="svclist mb-5 border-t border-[#e2e2ec] pt-[18px]">
        <span
          className={cn(
            "svclist__t mb-3.5 inline-block rounded-full px-3 py-1.5 text-[11.8px] font-extrabold tracking-[0.09em] uppercase",
            tier.svcPillTone === "green"
              ? "border border-[#419257]/25 bg-[#419257]/10 text-[#419257]"
              : "border border-[#e11119]/20 bg-[#e11119]/[0.07] text-[#e11119]"
          )}
        >
          {isAr ? tier.svcPillAr : tier.svcPillEn}
        </span>

        <ul className="svclist__l grid list-none gap-2.5 p-0 text-[13.5px] text-[#3e3e5c]">
          {CORE_SERVICES_LIST.map((svc, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#419257]" />
              <span>{isAr ? svc.ar : svc.en}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Fine Print Text */}
      <p className="tier__fine mb-6 text-[12.2px] leading-relaxed text-[#6a6a86]">
        {isAr ? tier.fineAr : tier.fineEn}
      </p>

      {/* 9. Action Button (Triggers Registration Modal on all cards) */}
      {tier.isTop ? (
        <button
          type="button"
          onClick={openRegistration}
          className="mt-auto w-full cursor-pointer rounded-full bg-[#e11119] px-6 py-3.5 text-center text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:bg-[#b60d14] active:scale-95"
        >
          {isAr ? "انضم إلى المنصة — مجاناً" : "Join the Hub — free"}
        </button>
      ) : (
        <button
          type="button"
          onClick={openRegistration}
          className="mt-auto w-full cursor-pointer rounded-full border border-[#e2e2ec] bg-white px-6 py-3.5 text-center text-[15px] font-bold text-[#16162c] transition-all hover:border-[#1d1d39] active:scale-95"
        >
          {isAr ? "انضم إلى المنصة — مجاناً" : "Join the Hub — free"}
        </button>
      )}
    </div>
  );
}

export function PlansGrid({ isInView = true }: { isInView?: boolean }) {
  return (
    <div className="tiers mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-[22px] lg:grid-cols-3">
      {PLANS_DATA.map((tier, idx) => (
        <PlanCard key={tier.id} tier={tier} index={idx} isInView={isInView} />
      ))}
    </div>
  );
}

export function PlansNote({ isInView = true }: { isInView?: boolean }) {
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        "tiers__note mx-auto mt-9 flex max-w-[74ch] items-start justify-center gap-2 text-center text-[13.4px] leading-[1.65] text-[#6a6a86] transition-all delay-[900ms] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-12 opacity-0 blur-[6px]"
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#6a6a86]" />
      <p className="m-0">
        {locale === "ar"
          ? "رسوم العضوية المعتمدة تُدفع سنوياً بالدولار الأمريكي. تطبق نسب الخصم 15% و 30% و 40% على خدمات المنصة المؤهلة وأدوات وتقييمات IBDL — ولا تطبق إطلاقاً على رسوم العضوية نفسها. تُعرض مبالغ الخدمات والأدوات وفق ما حددته IBDL."
          : "Approved membership fees, billed annually in USD. The 15%, 30% and 40% member rates apply to eligible Hub Services, IBDL tools, assessments and products — never to the membership fee itself. Individual service and tool amounts are shown where IBDL has published them."}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Composite Plans Section                                               */
/* -------------------------------------------------------------------------- */

export function PlansSection() {
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
      id="plans"
      className="section section--light relative overflow-hidden bg-white py-[118px] text-start"
    >
      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <PlansHeader isInView={isInView} />
        <PlansGrid isInView={isInView} />
        <PlansNote isInView={isInView} />
      </div>
    </section>
  );
}

// Attach sub-components for Compound Component pattern compliance
PlansSection.Header = PlansHeader;
PlansSection.Eyebrow = PlansEyebrow;
PlansSection.Headline = PlansHeadline;
PlansSection.Lead = PlansLead;
PlansSection.Grid = PlansGrid;
PlansSection.Card = PlanCard;
PlansSection.Note = PlansNote;
