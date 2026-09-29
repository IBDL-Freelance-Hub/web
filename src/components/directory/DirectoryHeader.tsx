import React from "react";

export interface DirectoryHeaderProps {
  locale?: "en" | "ar";
}

export function DirectoryHeader({ locale = "en" }: DirectoryHeaderProps) {
  const isAr = locale === "ar";

  return (
    <div className="mb-6">
      {/* Category breadcrumb */}
      <p className="text-xs font-medium text-slate-400">
        {isAr ? "المجتمع" : "Community"}
      </p>

      {/* Page Title */}
      <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {isAr ? "دليل المدربين" : "Trainer Directory"}
      </h1>

      {/* Subtitle */}
      <p className="mt-1 text-xs text-slate-500">
        {isAr
          ? "المشتركون المعتمدون الذين اختاروا النشر في الدليل. هذا دليل مهني، وليس سوقاً للخدمات."
          : "Professional and Master subscribers who have opted into publication. This is a professional directory, not a marketplace."}
      </p>
    </div>
  );
}
