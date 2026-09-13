"use client";

import React from "react";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";
import { Check, ShieldCheck } from "lucide-react";

export interface AssessmentItem {
  id: string;
  name: string;
  subTitle: string;
  descEn: string;
  descAr: string;
}

const THREE_ASSESSMENTS: AssessmentItem[] = [
  {
    id: "pqp",
    name: "PQP™",
    subTitle: "Personality & Qualities",
    descEn:
      "Work-based behavioral diagnostic measuring 20 key personality & motive dimensions.",
    descAr:
      "تشخيص سلوكي مهني يقيس 20 بعداً للشخصية ودوافع العمل للتنبؤ بالنجاح الوظيفي.",
  },
  {
    id: "cpat",
    name: "CPAT™",
    subTitle: "Professional Assessment",
    descEn:
      "Comprehensive competency evaluator assessing technical, managerial, and operational skills.",
    descAr:
      "مقياس متكامل لتقييم الكفاءات والقدرات الفنية والإدارية والتشغيلية.",
  },
  {
    id: "md",
    name: "Management Drives®",
    subTitle: "Leadership Dynamics",
    descEn:
      "Evaluates organizational drive dynamics & leadership behavior patterns across 6 core drives.",
    descAr:
      "تقييم ديناميكيات القيادة والأنماط السلوكية المؤسسية عبر 6 دوافع ملونة.",
  },
];

export function PqpOfferContent() {
  const { openRegistration } = useRegistration();
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const checklistItems = [
    {
      en: "Full assessment access for your own professional profile",
      ar: "وصول كامل للتقييم لملفك المهني الشامل",
    },
    {
      en: "Comprehensive diagnostic report across key professional dimensions",
      ar: "تقرير تشخيصي متكامل يشمل الأبعاد القيادية والسلوكية",
    },
    {
      en: "Bilingual assessment experience in Arabic and English",
      ar: "تجربة تقييم ثنائية اللغة متوفرة بالعربية والإنجليزية",
    },
    {
      en: "Zero financial commitment — complimentary upon registration",
      ar: "بدون أي التزام مالي — مجاني تماماً بمجرد التسجيل",
    },
  ];

  return (
    <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-start shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:p-14">
        {/* Decorative Top Red Accent Line */}
        <div className="absolute start-0 top-0 h-1.5 w-full bg-[#e11119]" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading & Offer Value */}
          <div className="lg:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-[#1b7a43]">
              <ShieldCheck className="h-4 w-4" />
              <span>
                {isArabic ? "عرض حصري للمستقلين" : "EXCLUSIVE FREELANCER OFFER"}
              </span>
            </div>

            <h2 className="mb-6 text-[clamp(28px,3.2vw,42px)] leading-tight font-extrabold text-[#16162c]">
              {isArabic
                ? "احصل على استخدام مجاني لمرة واحدة لـ ٣ تقييمات تشخيصية عند الانضمام لمنصة المستقلين"
                : "Claim 1 Free Use for 3 Diagnostic Assessments Upon Joining the Hub"}
            </h2>

            <p className="mb-8 text-[16.5px] leading-relaxed text-[#4b5563]">
              {isArabic
                ? "احصل على صلاحية استخدام مجاني لمرة واحدة لأدوات التقييم الثلاث (PQP™ و CPAT™ و Management Drives®) كعضو مستقل مسجل. جرب قوة التقييمات العلمية واستخدم نتائجك لتعزيز مصداقيتك المهنية."
                : "Enjoy 1 single-use complimentary access for all 3 diagnostic assessment tools (PQP™, CPAT™, and Management Drives®) upon completing your freelancer registration."}
            </p>

            {/* Checklist */}
            <ul className="mb-10 space-y-4">
              {checklistItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[#374151]">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#1b7a43]">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-medium md:text-base">
                    {isArabic ? item.ar : item.en}
                  </span>
                </li>
              ))}
            </ul>

            {/* Action CTA */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => openRegistration()}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#e11119] px-8 py-4 text-base font-bold text-white shadow-[0_10px_25px_rgba(225,17,25,0.30)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#b60d14] active:scale-[0.98]"
              >
                {isArabic
                  ? "سجل الآن واحصل على تقييمك المجاني"
                  : "Register Now & Claim Free Assessment"}
              </button>
              <span className="text-xs font-medium text-[#6b7280]">
                {isArabic ? "استلام فوري للتقرير" : "Instant Report Delivery"}
              </span>
            </div>
          </div>

          {/* Right Column: 3 Assessment Tool Cards */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {THREE_ASSESSMENTS.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-6 transition-all duration-300 hover:border-slate-300 hover:bg-white hover:shadow-md"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#16162c] transition-colors group-hover:text-[#e11119]">
                      {tool.name}
                    </h3>
                    <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-[#e11119]">
                      {isArabic ? "متاح للطلب" : "AVAILABLE"}
                    </span>
                  </div>
                  <p className="mb-2 text-xs font-medium text-[#6b7280]">
                    {tool.subTitle}
                  </p>
                  <p className="text-xs leading-relaxed text-[#4b5563]">
                    {isArabic ? tool.descAr : tool.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
