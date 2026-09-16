"use client";

import React, { useEffect, useRef, useState } from "react";
import { SERVICES_DATA, ServiceItem } from "@/data/servicesData";
import { ServicesHeader } from "./services/ServicesHeader";
import { ServiceCard, ServicesGrid } from "./services/ServiceCard";
import { ServicesCarousel, ServicesFooter } from "./services/ServicesCarousel";
import { ServiceCardNumber } from "./services/ServiceCardNumber";
import { ServiceModal } from "./services/ServiceModal";

export function ServicesSection() {
  const [isInView, setIsInView] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section section--deep bg-navy-deep relative overflow-hidden py-[118px] text-start text-white"
    >
      {/* Top & Bottom Ambient Glows */}
      <div
        className="bg-green-brand/10 pointer-events-none absolute start-1/2 -top-40 h-80 w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="bg-red-brand/10 pointer-events-none absolute end-0 -bottom-40 h-80 w-[500px] rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <div className="wrap mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ServicesHeader isInView={isInView} />
        <ServicesGrid
          services={SERVICES_DATA}
          isInView={isInView}
          onSelectService={(item) => setSelectedService(item)}
        />
        <ServicesFooter />
      </div>

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}

// Attach sub-components for Compound Component pattern compliance
ServicesSection.Header = ServicesHeader;
ServicesSection.Card = ServiceCard;
ServicesSection.CardNumber = ServiceCardNumber;
ServicesSection.Grid = ServicesGrid;
ServicesSection.Carousel = ServicesCarousel;
ServicesSection.Footer = ServicesFooter;
ServicesSection.Modal = ServiceModal;
