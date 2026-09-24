import React from "react";
import { UploadCloud, Loader2 } from "lucide-react";

export interface DocumentUploadDropzoneProps {
  isUploading: boolean;
  isDragging: boolean;
  showCancelReplace: boolean;
  isAr: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowseClick: () => void;
  onCancelReplace: () => void;
}

export function DocumentUploadDropzone({
  isUploading,
  isDragging,
  showCancelReplace,
  isAr,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowseClick,
  onCancelReplace,
}: DocumentUploadDropzoneProps) {
  return (
    <div className="mt-4 space-y-3">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !isUploading && onBrowseClick()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
          isDragging
            ? "border-emerald-500 bg-emerald-50/60"
            : "border-slate-300 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-50"
        } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onBrowseClick();
          }
        }}
        aria-label={
          isAr ? "منطقة رفع ملف السيرة الذاتية" : "CV upload dropzone area"
        }
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600 motion-reduce:animate-none" />
            <p className="text-xs font-medium text-slate-700">
              {isAr
                ? "جاري رفع ومعالجة السيرة الذاتية..."
                : "Uploading and validating CV document..."}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <UploadCloud className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold text-slate-900">
              {isAr
                ? "اضغط لاختيار الملف أو اسحبه وأفلته هنا"
                : "Click to browse or drag and drop your CV here"}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {isAr
                ? "صيغ PDF أو DOCX حتى 10 ميجابايت"
                : "PDF or DOCX documents up to 10MB"}
            </p>
          </>
        )}
      </div>

      {showCancelReplace && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancelReplace}
            disabled={isUploading}
            className="cursor-pointer text-xs text-slate-600 underline hover:text-slate-800"
          >
            {isAr
              ? "إلغاء الاستبدال والاحتفاظ بالسيرة الحالية"
              : "Cancel and keep existing CV"}
          </button>
        </div>
      )}
    </div>
  );
}
