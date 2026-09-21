"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface CompletionGaugeCardProps {
  completionRate: number;
  completedCount: number;
  isAr: boolean;
}

export function CompletionGaugeCard({
  completionRate,
  completedCount,
  isAr,
}: CompletionGaugeCardProps) {
  const isComplete = completionRate >= 100;

  return (
    <section
      aria-labelledby="completion-card-heading"
      className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8"
    >
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <Sparkles
              className={`h-5 w-5 ${
                isComplete ? "text-emerald-500" : "text-amber-500"
              }`}
            />
            <h3
              id="completion-card-heading"
              className="text-base font-bold text-slate-900"
            >
              {isAr ? "اكتمال الملف الشخصي" : "Profile completion"}
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {completedCount}/11 {isAr ? "حقول" : "fields"}
          </span>
        </div>

        <div className="my-6 flex flex-col items-center justify-center">
          {/* Circular Progress Display */}
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg
              className="h-full w-full -rotate-90 transform"
              viewBox="0 0 36 36"
            >
              {/* Background Track */}
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Progress Arc */}
              <path
                className={
                  isComplete
                    ? "text-emerald-500 transition-all duration-1000 ease-out motion-reduce:transition-none"
                    : "text-amber-500 transition-all duration-1000 ease-out motion-reduce:transition-none"
                }
                strokeDasharray={`${Math.min(completionRate, 100)}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900">
                {completionRate}%
              </span>
              <span
                className={`text-[10px] font-semibold uppercase ${
                  isComplete ? "font-bold text-emerald-600" : "text-amber-600"
                }`}
              >
                {isComplete
                  ? isAr
                    ? "مكتمل"
                    : "Complete"
                  : isAr
                    ? "قيد الإكمال"
                    : "In progress"}
              </span>
            </div>
          </div>

          <p className="mt-3 max-w-xs text-center text-xs leading-relaxed text-slate-500">
            {isComplete
              ? isAr
                ? "أحسنت! ملفك الشخصي مكتمل ومؤهل للظهور في دليل المدربين المعتمدين."
                : "Excellent! Your profile is complete and eligible for publication in the Trainer Directory."
              : isAr
                ? "أكمل بقية الحقول الـ ١١ للحصول على معدل اكتمال ١٠٠٪ وتفعيل الظهور في الدليل."
                : "Complete all 11 canonical fields to reach 100% and unlock public Trainer Directory visibility."}
          </p>
        </div>
      </div>

      <Link
        href="/profile"
        className={
          isComplete
            ? "flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 py-2.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
            : "flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
        }
      >
        {isComplete
          ? isAr
            ? "مراجعة الملف"
            : "Review profile"
          : isAr
            ? "إكمال الملف الآن"
            : "Complete profile"}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
