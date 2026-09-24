import React from "react";
import { FileText, Download, RefreshCw, Loader2 } from "lucide-react";
import type { MemberProfileFileDto } from "@/types/member";

export interface DocumentFileCardProps {
  cvFile: MemberProfileFileDto;
  fullNameEn?: string;
  isAr: boolean;
  isDownloading: boolean;
  isUploading: boolean;
  onDownload: () => void;
  onReplace: () => void;
}

export function DocumentFileCard({
  cvFile,
  fullNameEn,
  isAr,
  isDownloading,
  isUploading,
  onDownload,
  onReplace,
}: DocumentFileCardProps) {
  const formatTimestamp = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(isAr ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const displayName =
    cvFile.originalName ||
    (fullNameEn
      ? `${fullNameEn.replace(/\s+/g, "-")}-CV.pdf`
      : "Curriculum-Vitae.pdf");

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-xs font-bold text-slate-900">
              {displayName}
            </h4>
            <p className="text-[11px] text-slate-500">
              {cvFile.createdAt
                ? isAr
                  ? `تم الرفع في: ${formatTimestamp(cvFile.createdAt)}`
                  : `Uploaded on: ${formatTimestamp(cvFile.createdAt)}`
                : isAr
                  ? "تم إيداع السيرة الذاتية في المنصة"
                  : "CV document on record"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
            title={isAr ? "تنزيل السيرة الذاتية" : "Download CV"}
            aria-label={isAr ? "تنزيل السيرة الذاتية" : "Download CV"}
          >
            {isDownloading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            <span>{isAr ? "تنزيل" : "Download"}</span>
          </button>

          <button
            type="button"
            onClick={onReplace}
            disabled={isUploading}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
            title={isAr ? "استبدال السيرة الذاتية" : "Replace CV"}
            aria-label={isAr ? "استبدال السيرة الذاتية" : "Replace CV"}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{isAr ? "استبدال" : "Replace"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
