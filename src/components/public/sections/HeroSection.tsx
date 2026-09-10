"use client";

import React, { useState, useEffect } from "react";
import { useRegistration } from "../registration/RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

// Stat item structure
interface StatItem {
  value: number;
  labelEn: string;
  labelAr: string;
}

const STATS_DATA: StatItem[] = [
  {
    value: 12,
    labelEn: "Core Hub Services",
    labelAr: "خدمات المنصة الأساسية",
  },
  {
    value: 11,
    labelEn: "Specialized IBDL tools",
    labelAr: "أدوات IBDL المتخصصة",
  },
  {
    value: 3,
    labelEn: "Membership levels",
    labelAr: "مستويات العضوية",
  },
  {
    value: 1,
    labelEn: "Free assessment on signup",
    labelAr: "تقييم مجاني عند التسجيل",
  },
];

/* -------------------------------------------------------------------------- */
/* Animated Counter Sub-component                                             */
/* -------------------------------------------------------------------------- */

export function AnimatedCounter({
  target,
  duration = 1200,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { formatNumber } = useLocale();

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out quad for smooth deceleration
      const easeOut = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(easeOut * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return <>{formatNumber(count)}</>;
}

/* -------------------------------------------------------------------------- */
/* Sub-components for Compound Pattern Compliance                            */
/* -------------------------------------------------------------------------- */

export function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  const { isRTL } = useLocale();

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div className="hero__bg pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* Deep canvas base color */}
      <div className="absolute inset-0 bg-[#141226]" />

      {/* Trainer photo container positioned on right in LTR / left in RTL with slide-in entrance */}
      <div
        className={cn(
          "absolute top-0 bottom-0 h-full w-full transform overflow-hidden transition-all duration-1000 ease-out md:w-[60%] lg:w-[55%]",
          isRTL ? "start-0" : "end-0",
          mounted
            ? "translate-x-0 opacity-100"
            : isRTL
              ? "-translate-x-12 opacity-0"
              : "translate-x-12 opacity-0"
        )}
      >
        {/* Animated Hero Photo matching official specification */}
        <div className="hero__photo" aria-hidden="true" />

        {/* Soft edge mask fading towards center text */}
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 z-10 w-1/3",
            isRTL
              ? "end-0 bg-gradient-to-l from-[#141226] to-transparent"
              : "start-0 bg-gradient-to-r from-[#141226] to-transparent"
          )}
        />

        {/* Subtle top & bottom vignettes */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#141226]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#141226]/80 to-transparent" />
      </div>

      {/* Ambient Glowing Orbs & Lighting Bubbles */}
      <div className="orb orb--1" aria-hidden="true" />
      <div className="orb orb--2" aria-hidden="true" />
      <div className="orb orb--3" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      {/* Subtle full section dark vignette gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#141226]/30 via-[#141226]/45 to-[#141226]"
        aria-hidden="true"
      />
    </div>
  );
}

export function HeroEyebrow({ mounted = true }: { mounted?: boolean }) {
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex transform items-center gap-2.5 rounded-full border border-white/10 bg-[#1a1936]/80 px-4 py-1.5 shadow-sm backdrop-blur-md transition-all delay-100 duration-700",
        mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#419257] opacity-75"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#419257]"></span>
      </span>
      <span className="text-xs font-medium text-slate-300 md:text-sm">
        {locale === "ar"
          ? "بدعم من مجموعة IBDL للتعلم"
          : "Powered by IBDL Learning Group"}
      </span>
    </div>
  );
}

export function HeroHeadline({ mounted = true }: { mounted?: boolean }) {
  const { locale } = useLocale();

  return (
    <h1
      className={cn(
        "max-w-3xl transform text-4xl leading-[1.15] font-bold tracking-tight text-white transition-all delay-200 duration-700 sm:text-5xl md:text-6xl",
        mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      {locale === "ar" ? (
        <>
          منظومة دعم أعمالك
          <br className="hidden sm:inline" />
          المتكاملة
          <br className="hidden sm:inline" />
          للمدربين المستقلين.
        </>
      ) : (
        <>
          Your business support
          <br className="hidden sm:inline" />
          ecosystem
          <br className="hidden sm:inline" />
          for freelance trainers.
        </>
      )}
    </h1>
  );
}

export function HeroParagraph({ mounted = true }: { mounted?: boolean }) {
  const { locale } = useLocale();

  return (
    <p
      className={cn(
        "mt-6 max-w-2xl transform text-base leading-relaxed text-slate-300 transition-all delay-300 duration-700 md:text-lg",
        mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      {locale === "ar"
        ? "رؤية أوضح. عروض أكثر قوة. حلول تدريبية مصممة باحترافية. قيمة ملموسة للعملاء. تمنح المنصة المدربين المستقلين البنية التحتية المهنية التي توجد عادةً فقط داخل مؤسسات التدريب الكبرى — لتقضي وقتاً أقل في إدارة أعمال التدريب ووقتاً أكثر في الفوز بالفرص والتقديم والنمو."
        : "More visibility. Stronger proposals. Better-designed learning solutions. Measurable client value. The Hub gives independent trainers the professional infrastructure usually found only inside large training organisations — so you spend less time on the business of training and more time winning, delivering and growing."}
    </p>
  );
}

export function HeroActions({ mounted = true }: { mounted?: boolean }) {
  const { openRegistration } = useRegistration();
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        "mt-8 flex transform flex-wrap items-center gap-4 transition-all delay-500 duration-700",
        mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      {/* Primary Button ("Get Your Free PQP →") */}
      <button
        type="button"
        onClick={openRegistration}
        className="bg-brand-secondary inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3.5 font-semibold text-white shadow-lg shadow-red-600/35 transition-transform duration-200 hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98]"
        aria-label={
          locale === "ar" ? "احصل على PQP مجاناً" : "Get Your Free PQP"
        }
      >
        {locale === "ar" ? "← مجاناً PQP احصل على" : "Get Your Free PQP →"}
      </button>

      {/* Secondary Button ("See what the Hub does") */}
      <a
        href="#offer"
        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
      >
        {locale === "ar" ? "استكشف ما تقدمه المنصة" : "See what the Hub does"}
      </a>
    </div>
  );
}

export function HeroStats({ mounted = true }: { mounted?: boolean }) {
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        "mt-12 grid w-full max-w-4xl transform grid-cols-2 gap-8 border-t border-white/10 pt-12 transition-all delay-500 duration-700 md:grid-cols-4",
        mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      {STATS_DATA.map((stat, idx) => (
        <div
          key={idx}
          className="relative flex flex-col pe-4 md:border-e md:border-white/15 md:last:border-e-0"
        >
          <span className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {mounted ? <AnimatedCounter target={stat.value} /> : stat.value}
          </span>
          <span className="mt-1 text-xs font-normal text-slate-400 md:text-sm">
            {locale === "ar" ? stat.labelAr : stat.labelEn}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HeroScrollIndicator() {
  const { locale } = useLocale();

  return (
    <div className="mt-8 mb-2 flex w-full justify-center">
      <a
        href="#offer"
        className="group inline-flex cursor-pointer flex-col items-center gap-2 text-slate-500 transition-colors select-none hover:text-slate-300"
        aria-label={locale === "ar" ? "مرر للاستكشاف" : "Scroll to explore"}
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase group-hover:text-slate-300">
          {locale === "ar" ? "مرر للاستكشاف" : "SCROLL TO EXPLORE"}
        </span>
        <div className="flex h-8 w-5 justify-center rounded-full border-2 border-slate-500/60 p-1 pt-1.5 transition-colors group-hover:border-slate-400">
          <div className="h-2 w-1 animate-bounce rounded-full bg-slate-400 group-hover:bg-slate-200" />
        </div>
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Composite Hero Section                                                */
/* -------------------------------------------------------------------------- */

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] w-full flex-col justify-between overflow-hidden bg-[#141226] text-start">
      {/* Background layer with trainer image & animations */}
      <HeroBackground />

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 pt-28 pb-12 sm:px-6 md:pt-36 lg:px-8">
        <div className="flex max-w-3xl flex-col items-start space-y-6">
          <HeroEyebrow mounted={mounted} />
          <HeroHeadline mounted={mounted} />
          <HeroParagraph mounted={mounted} />
          <HeroActions mounted={mounted} />
        </div>

        <div>
          <HeroStats mounted={mounted} />
          <HeroScrollIndicator />
        </div>
      </div>
    </section>
  );
}

// Compound Pattern assignments
HeroSection.Background = HeroBackground;
HeroSection.Eyebrow = HeroEyebrow;
HeroSection.Headline = HeroHeadline;
HeroSection.Paragraph = HeroParagraph;
HeroSection.Actions = HeroActions;
HeroSection.Stats = HeroStats;
HeroSection.ScrollIndicator = HeroScrollIndicator;
