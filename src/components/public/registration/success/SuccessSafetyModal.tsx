import React from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Copy } from "lucide-react";

export interface SuccessSafetyModalProps {
  isOpen: boolean;
  usernameSpecimen: string;
  passwordSpecimen: string;
  onCopyAndClose: () => void;
  onConfirmClose: () => void;
  onCancel: () => void;
  isAr: boolean;
}

export function SuccessSafetyModal({
  isOpen,
  usernameSpecimen,
  passwordSpecimen,
  onCopyAndClose,
  onConfirmClose,
  onCancel,
  isAr,
}: SuccessSafetyModalProps) {
  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="animate-in fade-in fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md duration-200"
    >
      <div className="animate-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-start shadow-2xl duration-200">
        <div className="mb-3 flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-500/15 text-amber-700">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isAr
                ? "تنبيه: هل حفظت بيانات الدخول؟"
                : "Wait! Did you save your credentials?"}
            </h3>
            <p className="text-[11px] font-medium text-slate-500">
              {isAr
                ? "تأكيد هام قبل مغادرة الصفحة"
                : "Important check before leaving"}
            </p>
          </div>
        </div>

        <p className="mb-4 text-xs leading-relaxed text-slate-600">
          {isAr
            ? "لن تتمكن من رؤية كلمة المرور هذه مرة أخرى بعد إغلاق هذه النافذة. يرجى التأكد من نسخها أولاً حتى تتمكن من بدء التقييمات لاحقاً."
            : "You will not be able to view this password again after closing this window. Please copy or save it first so you can complete your assessments."}
        </p>

        {/* Quick credentials card */}
        <div className="mb-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-slate-500">
              {isAr ? "اسم المستخدم:" : "Username:"}
            </span>
            <span className="font-bold text-slate-900">{usernameSpecimen}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-slate-500">
              {isAr ? "كلمة المرور:" : "Password:"}
            </span>
            <span className="font-bold text-[#e11119]">{passwordSpecimen}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={onCopyAndClose}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e11119] py-3 text-xs font-bold text-white shadow-md shadow-red-600/25 transition-all hover:bg-[#b60d14]"
          >
            <Copy className="h-4 w-4" />
            <span>
              {isAr
                ? "نسخ البيانات كاملة وإغلاق النافذة"
                : "Copy Credentials & Close Window"}
            </span>
          </button>

          <button
            type="button"
            onClick={onConfirmClose}
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white py-2.5 text-center text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            {isAr
              ? "نعم، قمت بحفظها بالفعل (إغلاق)"
              : "Yes, I've Already Saved Them (Close)"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full cursor-pointer py-1.5 text-center text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
          >
            {isAr ? "الرجوع للبقاء في الصفحة" : "Cancel & Stay on Page"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
