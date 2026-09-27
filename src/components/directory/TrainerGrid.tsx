import React from "react";
import { TrainerCard } from "./TrainerCard";
import { TrainerCardSkeleton } from "./TrainerCardSkeleton";
import type { PublicTrainerListItem } from "@/types/directory";

export interface TrainerGridProps {
  trainers: PublicTrainerListItem[];
  locale?: "en" | "ar";
  loading?: boolean;
}

export function TrainerGrid({
  trainers,
  locale = "en",
  loading = false,
}: TrainerGridProps) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-busy="true"
        aria-label="Loading trainer profiles"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <TrainerCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!trainers || trainers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 text-5xl" aria-hidden="true">
          🔍
        </div>
        <h3 className="text-lg font-semibold text-slate-200">
          {locale === "ar" ? "لم يتم العثور على مدربين" : "No trainers found"}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-slate-400">
          {locale === "ar"
            ? "حاول تعديل معايير البحث أو مسح الفلاتر للعثور على مدربين مؤهلين"
            : "Try adjusting your search or clearing filters to find qualified trainers"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trainers.map((trainer) => (
        <TrainerCard key={trainer.id} trainer={trainer} locale={locale} />
      ))}
    </div>
  );
}
