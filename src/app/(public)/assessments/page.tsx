import React from "react";
import { PageHeader } from "@/components/public/catalog/PageHeader";
import { BackHomeCard } from "@/components/public/catalog/BackHomeCard";
import { CloseCtaSection } from "@/components/public/sections/CloseCtaSection";
import { ASSESSMENT_TOOLS_DATA } from "@/data/catalogData";
import { AssessmentsHeaderArea } from "@/components/public/catalog/AssessmentsHeaderArea";
import { CatalogGridClient } from "@/components/public/catalog/CatalogGridClient";

export default function AssessmentsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Reusable Page Header */}
      <PageHeader
        sectionTitle="Assessment Tools"
        sectionTitleAr="أدوات التقييم"
        title="Assessment Tools"
        titleAr="أدوات التقييم والتشخيص"
        subtitle="PQP, CPAT and Management Drives — in full, with their reports and flyers."
        subtitleAr="أدوات PQP و CPAT و Management Drives — مع كافة تقاريرها وبروشوراتها المعتمدة."
      />

      {/* 2. Main Content Section */}
      <section className="section section--light relative bg-white pt-[80px] pb-[100px] text-start">
        <div className="wrap mx-auto max-w-[1240px] px-7">
          <AssessmentsHeaderArea />
          <CatalogGridClient
            products={ASSESSMENT_TOOLS_DATA}
            badge={{ en: "COMPLIMENTARY", ar: "مجاني" }}
          />
        </div>
      </section>

      {/* 3. Full-width Closing CTA Band */}
      <CloseCtaSection />

      {/* 4. Bottom Back Home Card */}
      <section className="bg-white py-[60px]">
        <div className="wrap mx-auto max-w-[1240px] px-7">
          <BackHomeCard />
        </div>
      </section>
    </main>
  );
}
