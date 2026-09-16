import React from "react";
import { PageHeader } from "@/components/public/catalog/PageHeader";
import { CloseCtaSection } from "@/components/public/sections/CloseCtaSection";
import { SIMULATION_GAMES_DATA } from "@/data/catalogData";
import { GamesHeaderArea } from "@/components/public/catalog/GamesHeaderArea";
import { CatalogGridClient } from "@/components/public/catalog/CatalogGridClient";

export default function GamesCataloguePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Page Header */}
      <PageHeader
        sectionTitle="Business Simulation Games"
        sectionTitleAr="ألعاب محاكاة الأعمال"
        title="Business Simulation Games"
        titleAr="ألعاب محاكاة الأعمال"
        subtitle="The complete catalogue — open any simulation for its full profile, materials and flyers."
        subtitleAr="الكتالوج الكامل — استعرض أي لعبة محاكاة للاطلاع على ملفها التعريفي، وموادها التدريبية، وبروشوراتها."
      />

      {/* 2. Main Content Section & Grid (.section.section--light) */}
      <section className="section section--light relative bg-white pt-[80px] pb-[100px] text-start">
        <div className="wrap mx-auto max-w-[1240px] px-7">
          <GamesHeaderArea />
          <CatalogGridClient
            products={SIMULATION_GAMES_DATA}
            gridClassName="pgrid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          />
        </div>
      </section>

      {/* 3. Full-width Closing CTA Band Section */}
      <CloseCtaSection />

      {/* 4. Bottom Empty Section */}
      <section className="bg-white" />
    </main>
  );
}
