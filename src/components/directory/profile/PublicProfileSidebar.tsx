import React from "react";
import { Info } from "lucide-react";
import type { PublicTrainerProfile } from "@/types/directory";

export interface PublicProfileSidebarProps {
  profile: PublicTrainerProfile;
  locale?: "en" | "ar";
}

export function PublicProfileSidebar({
  profile,
  locale = "en",
}: PublicProfileSidebarProps) {
  const isAr = locale === "ar";

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-label={isAr ? "معلومات الاتصال" : "Contact information"}
    >
      {/* LinkedIn row */}
      {profile.linkedinUrl && (
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <span className="text-sm text-slate-500">LinkedIn</span>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm font-medium text-red-600 underline decoration-red-300 hover:text-red-700"
          >
            {profile.linkedinUrl
              .replace(
                /^https?:\/\/(www\.)?linkedin\.com\/in\//,
                "linkedin.com/in/"
              )
              .replace(/\/$/, "")}
          </a>
        </div>
      )}

      {/* Info notices */}
      <div className="space-y-3">
        <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-400">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {isAr
            ? "يقوم المحور بإعادة توجيه الاستفسارات للأعضاء المدرجين. المحور لا يتوسط في العمل بين الأعضاء والمنظمات."
            : "IBDL passes enquiries to listed members. The Hub does not broker work between members and organisations."}
        </p>
        <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-400">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {isAr
            ? "مستوى العضوية وحده لا يجعل المدرب معتمداً. فقط الأعضاء الحاصلون على شهادة المدرب من IBDL يحملون الشارة."
            : "Membership level alone does not make a trainer certified. Only members who have earned IBDL trainer certification carry the badge."}
        </p>
      </div>
    </section>
  );
}
