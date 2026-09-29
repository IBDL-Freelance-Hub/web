import React from "react";
import { TrainerCard } from "./TrainerCard";
import { TrainerCardSkeleton } from "./TrainerCardSkeleton";
import { Users } from "lucide-react";
import type { PublicTrainerListItem } from "@/types/directory";

export interface TrainerGridProps {
  trainers: PublicTrainerListItem[];
  /** The logged-in member's ID — used to highlight the member's own listing */
  currentMemberId?: string;
  locale?: "en" | "ar";
  loading?: boolean;
}

export function TrainerGrid({
  trainers,
  currentMemberId,
  locale = "en",
  loading = false,
}: TrainerGridProps) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-6 py-16 text-center shadow-xs">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Users className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          {locale === "ar" ? "لم يتم العثور على مدربين" : "No trainers found"}
        </h3>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
          {locale === "ar"
            ? "حاول تعديل معايير البحث أو مسح الفلاتر للعثور على مدربين مؤهلين"
            : "Try adjusting your search criteria or resetting filters to find qualified trainers."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          isOwnListing={!!currentMemberId && trainer.id === currentMemberId}
          locale={locale}
        />
      ))}
    </div>
  );
}
