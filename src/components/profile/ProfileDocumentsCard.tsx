"use client";

import React, { useRef, useState, useTransition } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { useOptionalToast } from "@/components/ui/Toast";
import { FileDown } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MemberDto } from "@/types/api";
import type { MemberProfileFileDto } from "@/types/member";
import { useOptionalProfileContext } from "./ProfileContext";
import { DocumentFileCard } from "./documents/DocumentFileCard";
import { DocumentUploadDropzone } from "./documents/DocumentUploadDropzone";

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
          <DocumentFileCard
            cvFile={cvFile}
            fullNameEn={member.fullNameEn}
            isAr={isAr}
            isDownloading={isDownloading}
            isUploading={isUploading}
            onDownload={handleDownload}
            onReplace={() => setShowReplaceZone(true)}
          />
        ) : (
          /* Upload Zone (Empty state or replacing state) */
          <DocumentUploadDropzone
            isUploading={isUploading}
            isDragging={isDragging}
            showCancelReplace={Boolean(cvFile && showReplaceZone)}
            isAr={isAr}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onBrowseClick={() => fileInputRef.current?.click()}
            onCancelReplace={() => setShowReplaceZone(false)}
          />
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
