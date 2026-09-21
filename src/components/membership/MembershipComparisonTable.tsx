"use client";

import React from "react";
import { Check, Info } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";

export function MembershipComparisonTable() {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  const rows = [
    {
      capabilityEn: "Annual membership fee",
      capabilityAr: "رسوم الاشتراك السنوي",
      essential: isAr ? "مجاناً" : "Free",
      professional: isAr ? "$180 / سنة" : "$180 / year",
      master: isAr ? "$380 / سنة" : "$380 / year",
      isHighlight: true,
    },
    {
      capabilityEn: "Hub community and Directory profile",
      capabilityAr: "مجتمع المنصة والملف الشخصي في الدليل",
      essential: true,
      professional: true,
      master: true,
    },
    {
      capabilityEn: "Hub news, briefings and updates",
      capabilityAr: "أخبار المنصة والإيجازات والتحديثات",
      essential: true,
      professional: true,
      master: true,
    },
    {
      capabilityEn: "Member-only offers",
      capabilityAr: "عروض ترويجية حصرية للأعضاء",
      essential: true,
      professional: true,
      master: true,
    },
    {
      capabilityEn: "Member rate on eligible IBDL products and services",
      capabilityAr: "خصم العضوية على منتجات وخدمات IBDL المؤهلة",
      essential: "15%",
      professional: "30%",
      master: "40%",
    },
    {
      capabilityEn: "Core Hub Services included",
      capabilityAr: "خدمات المنصة الأساسية مشمولة",
      essential: false,
      professional: false,
      master: true,
    },
    {
      capabilityEn: "Free eligible tool usage",
      capabilityAr: "استخدام الأدوات المؤهلة مجاناً",
      essential: false,
      professional: false,
      master: isAr ? "أداة مؤهلة واحدة / ربع سنة" : "1 eligible tool / quarter",
    },
    {
      capabilityEn: "Member rate on additional eligible purchases",
      capabilityAr: "خصم الأعضاء على المشتريات الإضافية المؤهلة",
      essential: "15%",
      professional: "30%",
      master: isAr
        ? "40% على المشتريات الإضافية"
        : "40% on additional purchases",
    },
    {
      capabilityEn: "Programme accreditation included",
      capabilityAr: "اعتماد البرامج التدريبية المشمولة",
      essential: false,
      professional: isAr ? "برنامج تدريبي واحد" : "1 training programme",
      master: isAr ? "برنامجان تدريبيان" : "2 training programmes",
    },
    {
      capabilityEn: "Free IBDL certificates for trainees",
      capabilityAr: "شهادات IBDL المجانية للمتدربين",
      essential: false,
      professional: isAr ? "20 شهادة" : "20 certificates",
      master: isAr ? "40 شهادة" : "40 certificates",
    },
    {
      capabilityEn: "Trainer certification eligibility",
      capabilityAr: "أهلية ترخيص المدرب الدولي",
      essential: false,
      professional: false,
      master: true,
    },
  ];

  const renderValue = (val: boolean | string) => {
    if (typeof val === "boolean") {
      if (val) {
        return (
          <span className="inline-flex h-6 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          </span>
        );
      }
      return (
        <span className="inline-flex h-6 w-7 items-center justify-center rounded-full bg-slate-100/80 text-xs font-semibold text-slate-400">
          —
        </span>
      );
    }
    return (
      <span className="text-xs font-semibold text-slate-800 sm:text-[13px]">
        {val}
      </span>
    );
  };

  return (
    <section className="mt-10 space-y-6">
      {/* Section Title */}
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          {isAr ? "مقارنة باقات العضوية" : "Membership comparison"}
        </h2>
      </div>

      {/* Comparison Table Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs sm:rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left rtl:text-right">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <th
                  scope="col"
                  className="w-2/5 px-5 py-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase sm:px-6"
                >
                  {isAr ? "الميزة / القدرة" : "CAPABILITY"}
                </th>
                <th
                  scope="col"
                  className="w-1/5 px-4 py-4 text-center text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                >
                  {isAr ? "العضوية الأساسية" : "ESSENTIAL MEMBERSHIP"}
                </th>
                <th
                  scope="col"
                  className="w-1/5 px-4 py-4 text-center text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                >
                  {isAr ? "العضوية المهنية" : "PROFESSIONAL MEMBERSHIP"}
                </th>
                <th
                  scope="col"
                  className="w-1/5 px-4 py-4 text-center text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                >
                  {isAr ? "عضوية خبير معتمد" : "MASTER MEMBERSHIP"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/90 text-xs sm:text-[13px]">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition-colors hover:bg-slate-50/60"
                >
                  <td className="px-5 py-3.5 font-medium text-slate-800 sm:px-6">
                    {isAr ? row.capabilityAr : row.capabilityEn}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {renderValue(row.essential)}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {renderValue(row.professional)}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {renderValue(row.master)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explanatory Callout Box (Exact match to screenshot 1) */}
      <div className="space-y-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-5 text-xs leading-relaxed text-slate-600 sm:p-6">
        <p className="m-0">
          {isAr
            ? "ينتمي أعضاء العضوية الأساسية إلى المهنة دون أي تكلفة، مع خصم عضوية 15%. يعمل أعضاء العضوية المهنية بدعم من المنصة بخصم 30%، واعتماد برنامج تدريبي واحد و20 شهادة متدرب مجانية. يحصل أعضاء الماستر على جميع خدمات المنصة الأساسية مجاناً، وأداة مجانية مؤهلة كل ربع سنة، وخصم 40% على المشتريات الإضافية، واعتماد برنامجين تدريبيين، و40 شهادة متدرب وأهلية ترخيص المدرب المعتمد."
            : "Essential members belong to the profession at no cost, with a 15% member rate. Professional members work with the Hub behind them at a 30% member rate, one included programme accreditation and 20 free trainee certificates. Master members receive every Core Hub Service, a free eligible tool each quarter, a 40% rate on additional purchases, two included programme accreditations, 40 free certificates and trainer-certification eligibility."}
        </p>

        <p className="m-0 flex items-start gap-1.5 text-slate-500">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span>
            {isAr
              ? "تعتبر نسب خصم الأعضاء 15% و30% و40% قيماً تجارية معتمدة تطبق على الخدمات والأدوات والمنتجات المؤهلة — وليس على رسوم العضوية. رسوم العضوية معتمدة ويتم فوترتها سنوياً بالدولار الأمريكي. نسب خصم الأعضاء تطبق على المنتجات المؤهلة — لا تطبق أبداً على رسوم العضوية نفسها."
              : "The 15%, 30% and 40% member rates are approved commercial values and apply to eligible services, tools and products — not to the membership fee. Approved membership fees, billed annually in USD. The 15%, 30% and 40% member rates apply to eligible services, tools and products — never to the membership fee."}
          </span>
        </p>

        <p className="m-0 text-slate-400">
          {isAr
            ? "تتم إدارة تخفيض العضويات بواسطة فريق المنصة — تواصل عبر freelancers.hub@ibdl.net."
            : "Downgrades are handled by the Hub team — contact freelancers.hub@ibdl.net."}
        </p>
      </div>
    </section>
  );
}
