"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileCheck, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { validateCvFile, ACCEPT_CV_STRING } from "@/lib/validations/files";
import { cn } from "@/lib/utils";

export interface CVUploadProps {
  value?: File | null;
  fileName?: string;
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  isUploading?: boolean;
  isAr?: boolean;
  disabled?: boolean;
  id?: string;
  ariaDescribedBy?: string;
}

export function CVUpload({
  value,
  fileName,
  onFileSelect,
  onFileRemove,
  isUploading = false,
  isAr = false,
  disabled = false,
  id = "cv-upload",
  ariaDescribedBy,
}: CVUploadProps) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const displayName = fileName || value?.name || "";

  const handleProcessFile = (file: File) => {
    const result = validateCvFile(file);
    if (!result.valid) {
      showToast(
        "error",
        isAr ? "صيغة غير مدعومة" : "Unsupported File Format",
        (isAr ? result.errorAr : result.error) ||
          (isAr
            ? "يتم قبول ملفات PDF و DOC و DOCX فقط."
            : "Only PDF, DOC, and DOCX files verified by signature are accepted."),
        "public"
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    onFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isUploading) return;
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled || isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        accept={ACCEPT_CV_STRING}
        onChange={handleInputChange}
        disabled={disabled || isUploading}
        aria-describedby={ariaDescribedBy}
        className="hidden"
      />

      {displayName ? (
        <div className="flex items-center justify-between rounded-2xl border border-[#419257]/40 bg-[#419257]/10 p-4 text-xs font-semibold text-[#16162c]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <FileCheck className="h-5 w-5 shrink-0 text-[#419257]" />
            <div className="truncate">
              <span className="block font-bold text-[#16162c]">
                {displayName}
              </span>
              <span className="block text-[10px] text-[#419257]">
                {isAr ? "جاهز للإرسال" : "Ready to submit"}
              </span>
            </div>
          </div>
          {onFileRemove && !isUploading && (
            <button
              type="button"
              onClick={() => {
                onFileRemove();
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="cursor-pointer p-1 text-[#6a6a86] transition-colors hover:text-red-600"
              title={isAr ? "حذف الملف" : "Remove file"}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() =>
            !disabled && !isUploading && fileInputRef.current?.click()
          }
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-[#f6f6fa] p-6 text-center transition-all outline-none",
            dragActive
              ? "border-[#419257] bg-[#419257]/10"
              : "border-[#e2e2ec] hover:border-[#6a6a86]",
            isUploading && "pointer-events-none opacity-60"
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-[#419257]" />
              <p className="text-xs font-medium text-[#16162c]">
                {isAr ? "جاري الرفع..." : "Uploading..."}
              </p>
            </div>
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d1d39]/5 text-[#1d1d39]">
                <UploadCloud className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold text-[#16162c]">
                {isAr
                  ? "اضغط لاختيار الملف أو اسحبه وأفلته هنا"
                  : "Click to upload or drag & drop"}
              </p>
              <p className="text-[11px] text-[#6a6a86]">
                {isAr
                  ? "ملفات PDF أو Word (DOC, DOCX) حتى 10 ميجابايت"
                  : "PDF, DOC, or DOCX documents up to 10MB"}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CVUpload;
