"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Image from "next/image";
import { useLocale } from "@/components/common/DirectionProvider";
import { useOptionalToast } from "@/components/ui/Toast";
import {
  Camera,
  ShieldCheck,
  Edit3,
  Loader2,
  Lock,
  X,
  Trash2,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MemberDto, MembershipDto } from "@/types/api";
import { useOptionalProfileContext } from "./ProfileContext";

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

  const fileInputRef = useRef<HTMLInputElement>(null);
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

    // Reset input so subsequent selections trigger change
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

    // Clean previous object URL if any
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
            {/* Avatar Container */}
            <div className="relative h-20 w-20 shrink-0">
              <div
                className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#141428] text-xl font-bold text-white shadow-md ring-4 ring-slate-100"
                aria-label={effectiveFullNameEn || "User avatar"}
              >
                {photoSrc && !isImageFailed ? (
                  <Image
                    src={photoSrc}
                    alt={effectiveFullNameEn || "Profile photo"}
                    width={80}
                    height={80}
                    unoptimized
                    onError={() => setFailedPhotoSrc(photoSrc)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
                {isUploadingPhoto && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
                    <Loader2 className="h-6 w-6 animate-spin text-white motion-reduce:animate-none" />
                  </div>
                )}
              </div>

              {/* Hidden photo file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
                onChange={handlePhotoSelect}
              />

              {/* Photo change indicator & trigger button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto || isDeletingPhoto}
                className="absolute -end-1 -bottom-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-slate-800 text-white shadow-xs transition hover:bg-slate-700 focus:ring-2 focus:ring-slate-900 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                title={isAr ? "تغيير الصورة الشخصية" : "Change photo"}
                aria-label={
                  isAr ? "تحميل صورة شخصية جديدة" : "Upload new profile photo"
                }
              >
                {isUploadingPhoto ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
                ) : (
                  <Camera className="h-3.5 w-3.5" />
                )}
              </button>

              {/* Photo remove / delete trigger button */}
              {hasPhoto && (
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={isUploadingPhoto || isDeletingPhoto}
                  className="absolute -start-1 -bottom-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-red-600 text-white shadow-xs transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                  title={isAr ? "حذف الصورة الشخصية" : "Delete photo"}
                  aria-label={
                    isAr ? "حذف الصورة الشخصية" : "Delete profile photo"
                  }
                >
                  {isDeletingPhoto ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
            </div>

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
            {profileCtx ? (
              isEditing ? (
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={profileCtx.cancelEdit}
                    disabled={profileCtx.isPending}
                    className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="button"
                    onClick={profileCtx.saveChanges}
                    disabled={profileCtx.isPending}
                    className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {profileCtx.isPending && (
                      <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
                    )}
                    <span>
                      {profileCtx.isPending
                        ? isAr
                          ? "جاري الحفظ..."
                          : "Saving..."
                        : isAr
                          ? "حفظ التغييرات"
                          : "Save changes"}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => profileCtx.toggleDirectoryOptIn()}
                    disabled={profileCtx.isPending}
                    className={
                      Boolean(member.directoryOptIn)
                        ? "inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                        : "inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#e11119] px-3.5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#c00e15] focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    title={
                      Boolean(member.directoryOptIn)
                        ? isAr
                          ? "إلغاء نشر الملف في دليل المدربين"
                          : "Unpublish profile from directory"
                        : isAr
                          ? "نشر الملف في دليل المدربين"
                          : "Publish profile to directory"
                    }
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>
                      {Boolean(member.directoryOptIn)
                        ? isAr
                          ? "إلغاء النشر"
                          : "Unpublish"
                        : isAr
                          ? "نشر الملف الشخصي"
                          : "Publish Profile"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => profileCtx.setMode("edit")}
                    className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#141428] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>{isAr ? "تعديل الملف الشخصي" : "Edit profile"}</span>
                  </button>
                </div>
              )
            ) : (
              <button
                type="button"
                disabled
                title={isAr ? "تعديل الملف الشخصي" : "Edit profile"}
                className="inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-[#141428] px-5 py-2.5 text-xs font-semibold text-white opacity-80 shadow-xs select-none"
              >
                {isAr ? "تعديل الملف الشخصي" : "Edit profile"}
              </button>
            )}
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
      {isPreviewModalOpen && previewPhotoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-photo-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0d0d1c]/60 backdrop-blur-xs transition-opacity duration-200"
            onClick={!isUploadingPhoto ? handleCancelPreview : undefined}
            aria-hidden="true"
          />

          {/* Modal Dialog Card */}
          <div className="relative z-10 w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl transition-all duration-200 sm:p-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCancelPreview}
              disabled={isUploadingPhoto}
              aria-label={isAr ? "إغلاق" : "Close"}
              className="absolute end-5 top-5 cursor-pointer rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center">
              <h3
                id="preview-photo-title"
                className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
              >
                {isAr ? "معاينة صورتك الشخصية" : "Preview your photo"}
              </h3>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {isAr
                  ? "اختياري. يفضل استخدام صورة مربعة بصيغة JPG أو PNG."
                  : "Optional. JPG or PNG, square works best."}
              </p>
            </div>

            {/* Preview Image */}
            <div className="my-6 flex justify-center sm:my-8">
              <div className="relative h-48 w-48 overflow-hidden rounded-3xl bg-slate-100 shadow-md ring-1 ring-slate-200/80 sm:h-56 sm:w-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewPhotoUrl}
                  alt={isAr ? "معاينة الصورة الشخصية" : "Photo preview"}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCancelPreview}
                disabled={isUploadingPhoto}
                className="cursor-pointer rounded-full border border-slate-300 bg-white px-7 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              >
                {isAr ? "إلغاء" : "Cancel"}
              </button>

              <button
                type="button"
                onClick={handleConfirmSavePhoto}
                disabled={isUploadingPhoto}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] px-7 py-2.5 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(225,17,25,0.35)] transition hover:bg-[#c90f16] focus:ring-2 focus:ring-red-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
              >
                {isUploadingPhoto && (
                  <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                )}
                <span>
                  {isUploadingPhoto
                    ? isAr
                      ? "جاري الحفظ..."
                      : "Saving..."
                    : isAr
                      ? "حفظ الصورة"
                      : "Save photo"}
                </span>
              </button>
            </div>

            {/* Security / Privacy Footer Note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
              <Lock
                className="h-3.5 w-3.5 shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <span className="leading-normal">
                {isAr
                  ? "إضافة الصورة لا ينشر ملفك تلقائياً. بريدك الإلكتروني وهاتفك وسيرتك الذاتية ومستنداتك لا تظهر أبداً في الدليل."
                  : "Adding a photo does not publish your profile. Your email, mobile, CV and documents are never shown in the directory."}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Delete Photo Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-photo-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeletingPhoto}
              className="absolute end-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:cursor-not-allowed"
              aria-label={isAr ? "إغلاق" : "Close"}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <Trash2 className="h-6 w-6" />
              </div>

              <h3
                id="delete-photo-title"
                className="mt-4 text-lg font-bold text-slate-900 sm:text-xl"
              >
                {isAr ? "حذف الصورة الشخصية" : "Remove Profile Photo"}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                {isAr
                  ? "هل أنت متأكد من رغبتك في إزالة صورتك الشخصية؟ سيتم استبدالها تلقائياً بالأحرف الأولى من اسمك."
                  : "Are you sure you want to remove your profile photo? Your initials will be displayed as the avatar instead."}
              </p>

              <div className="mt-6 flex w-full items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeletingPhoto}
                  className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:opacity-50 sm:text-sm"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDeletePhoto}
                  disabled={isDeletingPhoto}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:opacity-60 sm:text-sm"
                >
                  {isDeletingPhoto && (
                    <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                  )}
                  <span>
                    {isDeletingPhoto
                      ? isAr
                        ? "جاري الحذف..."
                        : "Removing..."
                      : isAr
                        ? "تأكيد الحذف"
                        : "Yes, remove"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
