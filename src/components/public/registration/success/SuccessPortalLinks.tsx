import React from "react";
import { ExternalLink } from "lucide-react";

export interface SuccessPortalLinksProps {
  isAr: boolean;
}

export function SuccessPortalLinks({ isAr }: SuccessPortalLinksProps) {
  return (
    <div className="mb-8 space-y-3">
      <span className="block text-xs font-bold tracking-wider text-[#16162c] uppercase">
        {isAr
          ? "بوابات التقييمات الثلاثة (اضغط لبدء التقييم):"
          : "3 Assessment Portals (Click to start):"}
      </span>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* 1. PQP */}
        <a
          href="https://pqp.ibdl.net/start"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl border border-[#e2e2ec] bg-white p-3.5 text-xs font-bold text-[#1d1d39] transition-all hover:border-[#419257] hover:bg-[#419257]/5 hover:shadow-sm"
        >
          <div className="truncate">
            <span className="block text-[10px] text-[#6a6a86]">
              PQP™ Portal
            </span>
            <span className="truncate text-xs text-[#16162c]">
              {isAr ? "بدء تقييم PQP™ ←" : "Start PQP™ Assessment →"}
            </span>
          </div>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#419257]" />
        </a>

        {/* 2. CPAT */}
        <a
          href="https://cpat.ibdl.net/start"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl border border-[#e2e2ec] bg-white p-3.5 text-xs font-bold text-[#1d1d39] transition-all hover:border-[#419257] hover:bg-[#419257]/5 hover:shadow-sm"
        >
          <div className="truncate">
            <span className="block text-[10px] text-[#6a6a86]">
              CPAT™ Portal
            </span>
            <span className="truncate text-xs text-[#16162c]">
              {isAr ? "بدء تقييم CPAT™ ←" : "Start CPAT™ Assessment →"}
            </span>
          </div>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#419257]" />
        </a>

        {/* 3. Management Drives */}
        <a
          href="https://md.ibdl.net/start"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl border border-[#e2e2ec] bg-white p-3.5 text-xs font-bold text-[#1d1d39] transition-all hover:border-[#419257] hover:bg-[#419257]/5 hover:shadow-sm"
        >
          <div className="truncate">
            <span className="block text-[10px] text-[#6a6a86]">
              Management Drives®
            </span>
            <span className="truncate text-xs text-[#16162c]">
              {isAr ? "بدء Management Drives® ←" : "Start Management Drives® →"}
            </span>
          </div>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#419257]" />
        </a>
      </div>

      <p className="mt-4 border-t border-[#e2e2ec] pt-3 text-[11.5px] leading-relaxed text-[#6a6a86]">
        {isAr
          ? "استخدم اسم المستخدم وكلمة المرور الموحدة أعلاه لتسجيل الدخول لأي من أدوات التقييم الثلاث. يتيح كل رابط محاولة مكتملة واحدة فقط ضمن استحقاق المرحلة الأولى المجاني."
          : "Use your unified username and password above to log in to any of the 3 assessments. Each test link allows 1 completed attempt under your complimentary Phase 1 entitlement."}
      </p>
    </div>
  );
}
