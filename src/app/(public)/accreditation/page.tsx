import React from "react";
import { PageHeader } from "@/components/public/catalog/PageHeader";
import { CloseCtaSection } from "@/components/public/sections/CloseCtaSection";
import { ChecklistItemData } from "@/components/public/accreditation/AccreditationChecklist";
import { AccreditationSectionClient } from "@/components/public/accreditation/AccreditationSectionClient";

const checklistItems: ChecklistItemData[] = [
  {
    title: {
      en: "Content review",
      ar: "مراجعة المحتوى",
    },
    desc: {
      en: "Structured evaluation of learning objectives, materials, sequencing and instructional design against international standards.",
      ar: "تقييم منظم للأهداف التدريبية والمواد والتسلسل والتصميم التعليمي وفقاً للمعايير الدولية.",
    },
  },
  {
    title: {
      en: "Delivery recognition",
      ar: "الاعتراف بكفاءة التدريب",
    },
    desc: {
      en: "Formal validation of personal facilitation and delivery competence to deliver accredited content.",
      ar: "اعتماد رسمي لكفاءة التيسير والتقديم الشخصي لتقديم المحتوى المعتمد.",
    },
  },
  {
    title: {
      en: "The Accredited Content mark",
      ar: "خاتم المحتوى المعتمد",
    },
    desc: {
      en: "Use the IBDL Accredited Content mark across your proposals, certificates and marketing materials.",
      ar: "استخدم خاتم محتوى IBDL المعتمد في عروضك وشهاداتك وموادك التسويقية.",
    },
  },
  {
    title: {
      en: "Client-verifiable standing",
      ar: "مصداقية قابلة للتحقق من العملاء",
    },
    desc: {
      en: "Clients and procurement departments can confirm your accreditation status directly with IBDL Learning Group.",
      ar: "يمكن للعملاء وإدارات المشتريات التحقق من حالة اعتمادك مباشرة مع مجموعة IBDL.",
    },
  },
];

export default function AccreditationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Reusable Page Header */}
      <PageHeader
        sectionTitle="IBDL Training Accreditation"
        sectionTitleAr="اعتماد IBDL للتدريب"
        title="IBDL Training Accreditation"
        titleAr="اعتماد IBDL للتدريب والمحتوى"
        subtitle="Recognition for your programmes and for your capability to deliver them."
        subtitleAr="اعتراف مهني ببرامجك التدريبية وبكفاءتك العالية في تقديمها."
      />

      {/* 2. Accreditation Showcase Section */}
      <AccreditationSectionClient checklistItems={checklistItems} />

      {/* 3. Full-width Closing CTA Band Section */}
      <CloseCtaSection />

      {/* 4. Bottom Empty Section */}
      <section className="bg-white" />
    </main>
  );
}
