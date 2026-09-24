"use client";

import React from "react";
import { Info } from "lucide-react";
import { useLocale } from "@/components/common/DirectionProvider";
import { cn } from "@/lib/utils";

export interface PlansNoteProps {
  isInView?: boolean;
}

export function PlansNote({ isInView = true }: PlansNoteProps) {
  const { locale } = useLocale();

  return (
    <div
      className={cn(
        "tiers__note mx-auto mt-9 flex max-w-[74ch] items-start justify-center gap-2 text-center text-[13.4px] leading-[1.65] text-[#6a6a86] transition-all delay-[900ms] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none",
        isInView
          ? "translate-y-0 opacity-100 filter-none"
          : "-translate-y-12 opacity-0 blur-[6px]"
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#6a6a86]" />
      <p className="m-0">
        {locale === "ar"
          ? "رسوم العضوية المعتمدة تُدفع سنوياً بالدولار الأمريكي. تطبق نسب الخصم 15% و 30% و 40% على خدمات المنصة المؤهلة وأدوات وتقييمات IBDL — ولا تطبق إطلاقاً على رسوم العضوية نفسها. تُعرض مبالغ الخدمات والأدوات وفق ما حددته IBDL."
          : "Approved membership fees, billed annually in USD. The 15%, 30% and 40% member rates apply to eligible Hub Services, IBDL tools, assessments and products — never to the membership fee itself. Individual service and tool amounts are shown where IBDL has published them."}
      </p>
    </div>
  );
}
