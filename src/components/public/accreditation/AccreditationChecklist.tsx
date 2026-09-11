"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { Check } from "lucide-react";

export interface ChecklistItemData {
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
}

interface AccreditationChecklistProps {
  items: ChecklistItemData[];
}

export function AccreditationChecklist({ items }: AccreditationChecklistProps) {
  const { locale } = useLocale();

  return (
    <div className="mb-9 space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-4 rounded-xl border border-[#e2e2ec] bg-[#f6f6fa] p-4 text-start"
        >
          <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#419257]/15 text-[#419257]">
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </div>

          <div className="flex-1">
            <b className="mb-0.5 block text-sm font-bold text-[#16162c]">
              {item.title[locale]}
            </b>
            <span className="block text-xs leading-relaxed text-[#6a6a86] sm:text-[13.5px]">
              {item.desc[locale]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
