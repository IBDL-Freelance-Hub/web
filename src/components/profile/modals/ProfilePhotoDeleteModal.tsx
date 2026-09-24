import React from "react";
import { X, Trash2, Loader2 } from "lucide-react";

export interface ProfilePhotoDeleteModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isAr: boolean;
}

export function ProfilePhotoDeleteModal({
  isOpen,
  isDeleting,
  onCancel,
  onConfirm,
  isAr,
}: ProfilePhotoDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-photo-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onCancel}
          disabled={isDeleting}
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
              onClick={onCancel}
              disabled={isDeleting}
              className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:opacity-50 sm:text-sm"
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:opacity-60 sm:text-sm"
            >
              {isDeleting && (
                <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
              )}
              <span>
                {isDeleting
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
  );
}
