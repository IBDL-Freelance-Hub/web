import React from "react";
import { Edit3, Loader2, Globe } from "lucide-react";

export interface ProfileIdentityActionsProps {
  isEditing: boolean;
  isPending: boolean;
  directoryOptIn: boolean;
  onCancel: () => void;
  onSave: () => void;
  onToggleDirectoryOptIn: () => void;
  onStartEdit: () => void;
  isAr: boolean;
  hasProfileCtx: boolean;
}

export function ProfileIdentityActions({
  isEditing,
  isPending,
  directoryOptIn,
  onCancel,
  onSave,
  onToggleDirectoryOptIn,
  onStartEdit,
  isAr,
  hasProfileCtx,
}: ProfileIdentityActionsProps) {
  if (!hasProfileCtx) {
    return (
      <button
        type="button"
        disabled
        title={isAr ? "تعديل الملف الشخصي" : "Edit profile"}
        className="inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-[#141428] px-5 py-2.5 text-xs font-semibold text-white opacity-80 shadow-xs select-none"
      >
        {isAr ? "تعديل الملف الشخصي" : "Edit profile"}
      </button>
    );
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAr ? "إلغاء" : "Cancel"}
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isPending}
          className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending && (
            <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
          )}
          <span>
            {isPending
              ? isAr
                ? "جاري الحفظ..."
                : "Saving..."
              : isAr
                ? "حفظ التغييرات"
                : "Save changes"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={onToggleDirectoryOptIn}
        disabled={isPending}
        className={
          directoryOptIn
            ? "inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
            : "inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#e11119] px-3.5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#c00e15] focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        }
        title={
          directoryOptIn
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
          {directoryOptIn
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
        onClick={onStartEdit}
        className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#141428] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
      >
        <Edit3 className="h-3.5 w-3.5" />
        <span>{isAr ? "تعديل الملف الشخصي" : "Edit profile"}</span>
      </button>
    </div>
  );
}
