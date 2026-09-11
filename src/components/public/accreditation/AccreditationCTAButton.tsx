"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { useRegistration } from "@/components/public/registration/RegistrationProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function AccreditationCTAButton() {
  const { locale } = useLocale();
  const { openRegistration } = useRegistration();

  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={openRegistration}
      className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#1d1d39] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:bg-[#141428]"
    >
      <span>
        {isArabic ? "اطلب تفاصيل الاعتماد" : "Request Accreditation Details"}
      </span>
      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </button>
  );
}
