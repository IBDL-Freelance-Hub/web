"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRegistration } from "./registration/RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { getCategoryHref } from "@/config/presentation";
import { Mail, MapPin, Globe } from "lucide-react";

export function Footer() {
  const { openRegistration } = useRegistration();
  const { locale } = useLocale();

  return (
    <footer
      id="contact"
      className="footer relative overflow-hidden bg-[#1d1d39] pt-24 text-start text-white"
    >
      {/* Ambient Red Light Background Glow */}
      <div
        className="pointer-events-none absolute -top-[260px] -right-[160px] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(225,17,25,0.16),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="wrap mx-auto max-w-[1240px] px-7">
        {/* 3-Column Main Grid */}
        <div className="footer__grid relative z-10 grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.15fr] lg:gap-16">
          {/* Column 1: Brand & Proposition */}
          <div className="footer__logo">
            <Link href="/" className="inline-block">
              <Image
                src="/Logos/FLH-white.png"
                alt="IBDL Freelancers Hub"
                width={220}
                height={52}
                className="mb-6.5 h-[52px] w-auto object-contain"
              />
            </Link>

            <h3 className="mb-1.5 text-[21px] font-bold tracking-[-0.012em] text-white">
              {locale === "ar"
                ? "ما وراء التدريب التقليدي"
                : "Beyond Traditional Training"}
            </h3>

            <p className="mb-5 text-[14.5px] font-bold tracking-[0.01em] text-[#e11119]">
              {locale === "ar"
                ? "تمكين. تأهيل. تميز."
                : "Empower. Equip. Excel."}
            </p>

            <p className="m-0 max-w-[44ch] text-[14.8px] leading-[1.72] text-white/60">
              {locale === "ar"
                ? "منصة متخصصة لتمكين محترفي التعلم والتطوير بأدوات وتقييمات ومحاكاة وحلول تطوير مهني بمعايير عالمية."
                : "A specialized platform empowering L&D professionals with world-class tools, assessments, simulations, and professional development solutions."}
            </p>

            <div className="footer__rule my-6 h-[1px] max-w-[340px] bg-white/[0.13]" />

            <div className="footer__powered flex items-center gap-3.5">
              <span className="text-[11px] font-extrabold tracking-[0.15em] text-white/45 uppercase">
                {locale === "ar" ? "بدعم من" : "POWERED BY"}
              </span>
              <Image
                src="/Logos/IBDL-white.png"
                alt="IBDL Learning Group"
                width={100}
                height={28}
                className="h-[28px] w-auto object-contain"
              />
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div id="ftExplore">
            <span className="footer__ttl mb-6.5 block text-[11.5px] font-extrabold tracking-[0.17em] text-white/45 uppercase">
              {locale === "ar" ? "استكشف" : "EXPLORE"}
            </span>
            <div className="footer__links flex flex-col gap-0.5">
              <Link
                href="/#about"
                className="block w-fit py-2 text-[15.4px] text-white/75 transition-colors hover:text-white"
              >
                {locale === "ar" ? "عن المنصة" : "About the Hub"}
              </Link>
              <Link
                href="/#services"
                className="block w-fit py-2 text-[15.4px] text-white/75 transition-colors hover:text-white"
              >
                {locale === "ar" ? "ما نقدمه" : "What We Offer"}
              </Link>
              <Link
                href={getCategoryHref("games")}
                className="block w-fit py-2 text-[15.4px] text-white/75 transition-colors hover:text-white"
              >
                {locale === "ar"
                  ? "ألعاب المحاكاة الإدارية"
                  : "Business Simulation Games"}
              </Link>
              <Link
                href={getCategoryHref("assess")}
                className="block w-fit py-2 text-[15.4px] text-white/75 transition-colors hover:text-white"
              >
                {locale === "ar"
                  ? "أدوات التقييم التشخيصية"
                  : "Assessment Tools"}
              </Link>
              <Link
                href={getCategoryHref("accred")}
                className="block w-fit py-2 text-[15.4px] text-white/75 transition-colors hover:text-white"
              >
                {locale === "ar"
                  ? "اعتماد IBDL للتدريب"
                  : "IBDL Training Accreditation"}
              </Link>
            </div>
          </div>

          {/* Column 3: Contact & CTA Action */}
          <div className="footer__contact">
            <span className="footer__ttl mb-6.5 block text-[11.5px] font-extrabold tracking-[0.17em] text-white/45 uppercase">
              {locale === "ar" ? "اتصل بنا" : "CONTACT"}
            </span>

            <div className="footer__ci mb-7 grid gap-4.5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-[19px] w-[19px] shrink-0 text-[#5cb374]" />
                <div>
                  <span className="mb-0.5 block text-[15.4px] font-bold text-white">
                    IBDL MENA
                  </span>
                  <address className="block text-[14.6px] leading-snug text-white/70 not-italic">
                    {locale === "ar"
                      ? "A 109 مجمع لينكس للأعمال، القرية الذكية، الجيزة، مصر"
                      : "A 109 Linx Business Park, Smart Village, Giza, Egypt"}
                  </address>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-[19px] w-[19px] shrink-0 text-[#5cb374]" />
                <div>
                  <span className="mb-0.5 block text-[11.5px] text-white/45">
                    {locale === "ar" ? "البريد الإلكتروني" : "Email"}
                  </span>
                  <a
                    href="mailto:freelancers.hub@ibdl.net"
                    className="text-[15.4px] font-medium text-white/90 transition-colors hover:text-[#5cb374]"
                  >
                    freelancers.hub@ibdl.net
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3">
                <Globe className="mt-1 h-[19px] w-[19px] shrink-0 text-[#5cb374]" />
                <div>
                  <span className="mb-0.5 block text-[11.5px] text-white/45">
                    {locale === "ar" ? "الموقع الإلكتروني" : "Website"}
                  </span>
                  <a
                    href="https://flh.ibdl.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15.4px] font-medium text-white/90 transition-colors hover:text-[#5cb374]"
                  >
                    flh.ibdl.net
                  </a>
                </div>
              </div>
            </div>

            {/* Conversion CTA Button */}
            <button
              type="button"
              onClick={openRegistration}
              className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#e11119] px-8 py-4 text-[16px] font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:scale-[1.01] hover:bg-[#b60d14]"
            >
              {locale === "ar"
                ? "← احصل على التقييم المجاني"
                : "Get Free Assessment →"}
            </button>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer__bar relative z-10 flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.12] py-6 text-[13.8px] text-white/50">
          <span>
            © 2026 IBDL Learning Group.{" "}
            {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </span>
          <span>
            {locale === "ar"
              ? "إلهام للتعلم • إلهام للبناء"
              : "Inspire to Learn • Inspire to Build"}
          </span>
        </div>
      </div>
    </footer>
  );
}
