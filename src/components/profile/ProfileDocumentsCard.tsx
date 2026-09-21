"use client";

import React, { useRef, useState, useTransition } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { useOptionalToast } from "@/components/ui/Toast";
import {
  FileDown,
  FileText,
  UploadCloud,
  Download,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MemberDto } from "@/types/api";
import type { MemberProfileFileDto } from "@/types/member";
import { useOptionalProfileContext } from "./ProfileContext";

export interface ProfileDocumentsCardProps {
  member?: MemberDto;
  initialCvFile?: MemberProfileFileDto | null;
}

export function ProfileDocumentsCard({
  member: propMember,
  initialCvFile: propInitialCvFile,
}: ProfileDocumentsCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const toast = useOptionalToast();
  const profileCtx = useOptionalProfileContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, startUploadTransition] = useTransition();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showReplaceZone, setShowReplaceZone] = useState(false);

  const member = profileCtx?.member || propMember || ({} as MemberDto);
  const cvFile =
    profileCtx && profileCtx.cvFile !== undefined
      ? profileCtx.cvFile
      : propInitialCvFile || null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (isUploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // Reset so the same file can be selected again
    e.target.value = "";
  };

  const processFile = (file: File) => {
    // Client-side validation: Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast?.showToast(
        "error",
        isAr ? "حجم الملف كبير جداً" : "File size exceeded",
        isAr
          ? "الحد الأقصى لحجم ملف السيرة الذاتية هو 10 ميجابايت."
          : "CV file size must not exceed 10MB."
      );
      return;
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase();
    const isDocExtension =
      fileExt === "pdf" || fileExt === "docx" || fileExt === "doc";
    const allowedMimes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!isDocExtension && !allowedMimes.includes(file.type)) {
      toast?.showToast(
        "error",
        isAr ? "صيغة مستند غير مدعومة" : "Unsupported document format",
        isAr
          ? "يتم قبول ملفات PDF و DOCX فقط."
          : "Only PDF and DOCX files are supported."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file, file.name);

    startUploadTransition(async () => {
      const { uploadCvAction } = await import("@/actions/fileActions");
      const res = await uploadCvAction(formData);
      if (res.success) {
        const newCvFile: MemberProfileFileDto = {
          id: res.data.fileId,
          category: "CV",
          originalName: res.data.originalName,
          sizeBytes: file.size,
          mimeType: file.type || "application/pdf",
          createdAt: res.data.createdAt || new Date().toISOString(),
        };

        profileCtx?.setCvFile(newCvFile);
        setShowReplaceZone(false);

        toast?.showToast(
          "success",
          isAr ? "تم حفظ السيرة الذاتية" : "CV uploaded successfully",
          isAr
            ? "تم حفظ السيرة الذاتية وتحديث معدل اكتمال الملف الشخصي."
            : "Your CV has been saved and your profile completion rate updated."
        );
      } else {
        toast?.showToast(
          "error",
          isAr ? "تعذر رفع السيرة الذاتية" : "Upload failed",
          res.error ||
            (isAr
              ? "حدث خطأ أثناء رفع ملف السيرة الذاتية. يرجى المحاولة مرة أخرى."
              : "An error occurred while uploading your CV.")
        );
      }
    });
  };

  const handleDownload = async () => {
    if (!cvFile?.id || isDownloading) return;

    setIsDownloading(true);
    try {
      const { getFileDownloadUrlAction } =
        await import("@/actions/fileActions");
      const res = await getFileDownloadUrlAction(cvFile.id);
      if (res.success) {
        const link = document.createElement("a");
        link.href = res.downloadUrl;
        link.download = cvFile.originalName || "CV.pdf";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast?.showToast(
          "error",
          isAr ? "تعذر تنزيل المستند" : "Download failed",
          res.error ||
            (isAr
              ? "تعذر إنشاء رابط تنزيل الملف."
              : "Could not generate file download URL.")
        );
      }
    } catch {
      toast?.showToast(
        "error",
        isAr ? "تعذر تنزيل المستند" : "Download failed",
        isAr
          ? "حدث خطأ أثناء محاولة التنزيل."
          : "An unexpected error occurred during download."
      );
    } finally {
      setIsDownloading(false);
    }
  };

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

  return (
    <Card
      as="section"
      aria-labelledby="documents-heading"
      className="flex flex-col justify-between"
    >
      <div>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <FileDown className="h-5 w-5 text-slate-600" />
            <CardTitle id="documents-heading">
              {isAr ? "المستندات والسيرة الذاتية" : "Documents & CV"}
            </CardTitle>
          </div>
          {cvFile && (
            <Badge variant="success" dot className="py-0.5">
              {isAr ? "مستند معتمد" : "Verified"}
            </Badge>
          )}
        </CardHeader>

        {/* Hidden CV File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={handleFileInputChange}
        />

        {/* Existing CV View */}
        {cvFile && !showReplaceZone ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-bold text-slate-900">
                    {cvFile.originalName ||
                      (member.fullNameEn
                        ? `${member.fullNameEn.replace(/\s+/g, "-")}-CV.pdf`
                        : "Curriculum-Vitae.pdf")}
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
                {/* Download Button */}
                <button
                  type="button"
                  onClick={handleDownload}
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

                {/* Replace CV Button */}
                <button
                  type="button"
                  onClick={() => setShowReplaceZone(true)}
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
        ) : (
          /* Upload Zone (Empty state or replacing state) */
          <div className="mt-4 space-y-3">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
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
                  fileInputRef.current?.click();
                }
              }}
              aria-label={
                isAr
                  ? "منطقة رفع ملف السيرة الذاتية"
                  : "CV upload dropzone area"
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

            {/* Cancel replacement option if user had a CV already */}
            {cvFile && showReplaceZone && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowReplaceZone(false)}
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
        )}
      </div>

      <p className="mt-4 text-[11px] leading-normal text-slate-500">
        {isAr
          ? "تخضع السيرة الذاتية للتحقق والتدقيق عبر أنظمة IBDL المعتمدة. المستند المستبدل يبقى في الأرشيف الآمن مع توثيق تاريخ الاستبدال."
          : "Uploaded documents are verified via IBDL accreditation standards. Superseded documents are retained in the secure archive with timestamp logs."}
      </p>
    </Card>
  );
}
