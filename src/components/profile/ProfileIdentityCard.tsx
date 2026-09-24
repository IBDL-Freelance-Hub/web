"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { useOptionalToast } from "@/components/ui/Toast";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MemberDto, MembershipDto } from "@/types/api";
import { useOptionalProfileContext } from "./ProfileContext";
import { ProfileAvatar } from "./identity/ProfileAvatar";
import { ProfileIdentityActions } from "./identity/ProfileIdentityActions";
import { ProfilePhotoPreviewModal } from "./modals/ProfilePhotoPreviewModal";
import { ProfilePhotoDeleteModal } from "./modals/ProfilePhotoDeleteModal";

export interface ProfileIdentityCardProps {
  member?: MemberDto;
  membership?: MembershipDto | null;
  isPublishedInDirectory?: boolean;
  initials?: string;
}

export function ProfileIdentityCard({
  member: propMember,
  membership: propMembership,
  isPublishedInDirectory: propIsPublished,
  initials: propInitials,
}: ProfileIdentityCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const toast = useOptionalToast();
  const profileCtx = useOptionalProfileContext();

  const [isUploadingPhoto, startPhotoUploadTransition] = useTransition();
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  // Photo Preview Modal States
  const [pendingPhotoFile, setPendingPhotoFile] = useState<File | null>(null);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [failedPhotoSrc, setFailedPhotoSrc] = useState<string | null>(null);

  // Photo Deletion States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletingPhoto, startDeletePhotoTransition] = useTransition();

  const member = profileCtx?.member || propMember || ({} as MemberDto);
  const membership =
    profileCtx && profileCtx.membership !== undefined
      ? profileCtx.membership
      : propMembership || null;

  const isEditing = profileCtx?.mode === "edit";

  const effectiveFullNameEn = isEditing
    ? profileCtx.formData.fullNameEn || member.fullNameEn
    : member.fullNameEn;
  const effectiveFullNameAr = isEditing
    ? profileCtx.formData.fullNameAr || member.fullNameAr
    : member.fullNameAr;
  const effectiveCity = isEditing ? profileCtx.formData.city : member.city;
  const effectiveCountry = isEditing
    ? profileCtx.formData.country
    : member.country;

  const isPublishedInDirectory =
    propIsPublished !== undefined
      ? propIsPublished
      : Boolean(member.directoryOptIn && membership?.status === "ACTIVE");

  const initials =
    propInitials ||
    (effectiveFullNameEn
      ? effectiveFullNameEn
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "FL");

  const photoSrc =
    uploadedPhotoUrl ||
    (member.photoFileId ? `/api/v1/files/${member.photoFileId}` : null);

  const isImageFailed = failedPhotoSrc === photoSrc;

  const handleCancelPreview = useCallback(() => {
    if (previewPhotoUrl) {
      URL.revokeObjectURL(previewPhotoUrl);
    }
    setPendingPhotoFile(null);
    setPreviewPhotoUrl(null);
    setIsPreviewModalOpen(false);
  }, [previewPhotoUrl]);

  // Clean up object URL when modal unmounts
  useEffect(() => {
    return () => {
      if (previewPhotoUrl) {
        URL.revokeObjectURL(previewPhotoUrl);
      }
    };
  }, [previewPhotoUrl]);

  // Escape key listener for modal
  useEffect(() => {
    if (!isPreviewModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isUploadingPhoto) {
        handleCancelPreview();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewModalOpen, isUploadingPhoto, handleCancelPreview]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";

    // Client-side bounds: max 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast?.showToast(
        "error",
        isAr ? "حجم الصورة كبير جداً" : "File size exceeded",
        isAr
          ? "الحد الأقصى لحجم الصورة هو 5 ميجابايت."
          : "Profile photo must be 5MB or less."
      );
      return;
    }

    // Client-side bounds: JPEG, PNG, WebP
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast?.showToast(
        "error",
        isAr ? "صيغة صورة غير مدعومة" : "Unsupported image format",
        isAr
          ? "يرجى اختيار صورة بصيغة JPEG أو PNG أو WebP."
          : "Please select an image in JPEG, PNG, or WebP format."
      );
      return;
    }

    if (previewPhotoUrl) {
      URL.revokeObjectURL(previewPhotoUrl);
    }

    const objUrl = URL.createObjectURL(file);
    setPendingPhotoFile(file);
    setPreviewPhotoUrl(objUrl);
    setIsPreviewModalOpen(true);
  };

  const handleConfirmSavePhoto = () => {
    if (!pendingPhotoFile) return;

    const formData = new FormData();
    formData.append("file", pendingPhotoFile, pendingPhotoFile.name);

    startPhotoUploadTransition(async () => {
      const { uploadProfilePhotoAction } =
        await import("@/actions/fileActions");
      const res = await uploadProfilePhotoAction(formData);
      if (res.success) {
        setUploadedPhotoUrl(`${res.data.photoUrl}?t=${Date.now()}`);
        profileCtx?.updatePhotoFileId(res.data.fileId);
        toast?.showToast(
          "success",
          isAr ? "تم تحديث الصورة الشخصية" : "Profile photo updated",
          isAr
            ? "تم حفظ وتحديث صورتك الشخصية بنجاح."
            : "Your profile photo has been updated successfully."
        );
        handleCancelPreview();
      } else {
        toast?.showToast(
          "error",
          isAr ? "تعذر رفع الصورة" : "Upload failed",
          res.error ||
            (isAr
              ? "حدث خطأ أثناء رفع الصورة الشخصية. يرجى المحاولة مرة أخرى."
              : "An error occurred while uploading your profile photo.")
        );
      }
    });
  };

  const handleConfirmDeletePhoto = () => {
    startDeletePhotoTransition(async () => {
      const { deleteProfilePhotoAction } =
        await import("@/actions/fileActions");
      const res = await deleteProfilePhotoAction();
      if (res.success) {
        setUploadedPhotoUrl(null);
        setFailedPhotoSrc(null);
        profileCtx?.updatePhotoFileId(null);
        setIsDeleteModalOpen(false);
        toast?.showToast(
          "success",
          isAr ? "تم حذف الصورة الشخصية" : "Profile photo removed",
          isAr
            ? "تمت إزالة صورتك الشخصية والرجوع للأحرف الأولى بنجاح."
            : "Your profile photo has been removed successfully."
        );
      } else {
        toast?.showToast(
          "error",
          isAr ? "تعذر حذف الصورة" : "Failed to remove photo",
          res.error ||
            (isAr
              ? "حدث خطأ أثناء محاولة حذف الصورة الشخصية."
              : "An error occurred while removing your profile photo.")
        );
      }
    });
  };

  const hasPhoto = Boolean(photoSrc && !isImageFailed);

  const getTierDisplay = (tier?: string) => {
    if (!tier) return isAr ? "عضوية أساسية" : "Essential Membership";
    const normalized = tier.toUpperCase();
    if (normalized === "MASTER") {
      return isAr ? "عضوية خبير معتمد" : "Master Membership";
    }
    if (normalized === "PROFESSIONAL") {
      return isAr ? "عضوية مهنية" : "Professional Membership";
    }
    return isAr ? "عضوية أساسية" : "Essential Membership";
  };

  return (
    <>
      <Card as="section" aria-labelledby="identity-heading">
        <h2 id="identity-heading" className="sr-only">
          {isAr ? "الهوية والملف التعريفي" : "Member Identity Overview"}
        </h2>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <ProfileAvatar
              photoSrc={photoSrc}
              isImageFailed={isImageFailed}
              initials={initials}
              fullName={effectiveFullNameEn}
              isUploadingPhoto={isUploadingPhoto}
              isDeletingPhoto={isDeletingPhoto}
              hasPhoto={hasPhoto}
              onPhotoSelect={handlePhotoSelect}
              onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
              onImageError={() => setFailedPhotoSrc(photoSrc)}
              isAr={isAr}
            />

            {/* Name, Location & Status Pills */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {isAr && effectiveFullNameAr
                  ? effectiveFullNameAr
                  : effectiveFullNameEn}
              </h3>
              <p className="text-xs font-medium text-slate-500">
                {effectiveCity ? `${effectiveCity}, ` : ""}
                {effectiveCountry}
              </p>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Badge variant="neutral" className="gap-1.5 py-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
                  <span>{getTierDisplay(membership?.tier)}</span>
                </Badge>

                <Badge
                  variant={isPublishedInDirectory ? "success" : "default"}
                  dot
                  className="py-1"
                >
                  {isPublishedInDirectory
                    ? isAr
                      ? "منشور في دليل المدربين"
                      : "Published in the directory"
                    : isAr
                      ? "غير منشور في الدليل"
                      : "Not published in directory"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center">
            <ProfileIdentityActions
              isEditing={Boolean(isEditing)}
              isPending={Boolean(profileCtx?.isPending)}
              directoryOptIn={Boolean(member.directoryOptIn)}
              onCancel={() => profileCtx?.cancelEdit()}
              onSave={() => profileCtx?.saveChanges()}
              onToggleDirectoryOptIn={() => profileCtx?.toggleDirectoryOptIn()}
              onStartEdit={() => profileCtx?.setMode("edit")}
              isAr={isAr}
              hasProfileCtx={Boolean(profileCtx)}
            />
          </div>
        </div>

        {/* Photo Privacy Explanation Note */}
        <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
          {isAr
            ? "صورتك الشخصية اختيارية ويمكن تغييرها أو إزالتها في أي وقت. تظهر في المنصة وفي دليل المدربين العام فقط في حال نشر ملفك. إضافة الصورة لا ينشر ملفك تلقائياً. بريدك الإلكتروني وهاتفك وسيرتك الذاتية لا تظهر أبداً في الدليل."
            : "Your photo is optional and can be changed or removed at any time. It appears in the Hub, and in the public Trainer Directory only if your profile is published there. Adding a photo does not publish your profile. Your email, mobile, CV and documents are never shown in the directory."}
        </p>
      </Card>

      {/* Photo Preview & Confirmation Modal */}
      <ProfilePhotoPreviewModal
        isOpen={isPreviewModalOpen}
        previewPhotoUrl={previewPhotoUrl}
        isUploading={isUploadingPhoto}
        onCancel={handleCancelPreview}
        onConfirm={handleConfirmSavePhoto}
        isAr={isAr}
      />

      {/* Delete Photo Confirmation Modal */}
      <ProfilePhotoDeleteModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeletingPhoto}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDeletePhoto}
        isAr={isAr}
      />
    </>
  );
}
