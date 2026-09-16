"use client";

import React from "react";
import { Inbox, Wrench, Award, Receipt } from "lucide-react";

interface StatTilesGridProps {
  isAr: boolean;
}

export function StatTilesGrid({ isAr }: StatTilesGridProps) {
  return (
    <section aria-labelledby="metrics-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="metrics-heading" className="text-sm font-bold text-slate-900">
          {isAr ? "المؤشرات التشغيلية" : "Operational Metrics"}
        </h2>
        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
          Sprint 2/3 Models Pending
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Tile 1: Open Requests */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              {isAr ? "الطلبات المفتوحة" : "Open requests"}
            </span>
            <Inbox className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
          <p className="mt-2 text-[10px] font-medium text-amber-700">
            Pending Requests model (Sprint 2)
          </p>
        </div>

        {/* Tile 2: Active Tools */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              {isAr ? "الأدوات النشطة" : "Active tools"}
            </span>
            <Wrench className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
          <p className="mt-2 text-[10px] font-medium text-amber-700">
            Pending Activity model (Sprint 2)
          </p>
        </div>

        {/* Tile 3: Certificates */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              {isAr ? "الشهادات الممنوحة" : "Certificates"}
            </span>
            <Award className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
          <p className="mt-2 text-[10px] font-medium text-amber-700">
            Pending Certificate model (Sprint 3)
          </p>
        </div>

        {/* Tile 4: Transactions */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              {isAr ? "المعاملات المالية" : "Transactions"}
            </span>
            <Receipt className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
          <p className="mt-2 text-[10px] font-medium text-amber-700">
            Pending Transaction model (Sprint 3)
          </p>
        </div>
      </div>
    </section>
  );
}
