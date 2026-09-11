import React from "react";
import { AboutContent } from "./about/AboutContent";

export function AboutSection() {
  return (
    <section
      id="about"
      className="section section--light relative overflow-hidden bg-white py-[118px] text-start"
    >
      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <AboutContent />
      </div>
    </section>
  );
}

// Sub-components export for backward compatibility
AboutSection.Content = AboutContent;
