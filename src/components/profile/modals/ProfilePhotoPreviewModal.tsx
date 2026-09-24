import React from "react";
import { X, Loader2, Lock } from "lucide-react";

export interface ProfilePhotoPreviewModalProps {
  isOpen: boolean;
  previewPhotoUrl: string | null;
  isUploading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isAr: boolean;
}

export function ProfilePhotoPreviewModal({
  isOpen,
  previewPhotoUrl,
  isUploading,
  onCancel,
  onConfirm,
  isAr,
}: ProfilePhotoPreviewModalProps) {
  if (!isOpen || !previewPhotoUrl) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-photo-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={!isUploading ? onCancel : undefined}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl transition-all duration-200 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={isUploading}
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
            onClick={onCancel}
            disabled={isUploading}
            className="cursor-pointer rounded-full border border-slate-300 bg-white px-7 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          >
            {isAr ? "إلغاء" : "Cancel"}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isUploading}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e11119] px-7 py-2.5 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(225,17,25,0.35)] transition hover:bg-[#c90f16] focus:ring-2 focus:ring-red-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            {isUploading && (
              <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
            )}
            <span>
              {isUploading
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
  );
}
