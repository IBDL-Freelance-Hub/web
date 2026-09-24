import React from "react";
import { Check, Copy, KeyRound, UserCheck } from "lucide-react";

export interface SuccessCredentialsCardProps {
  usernameSpecimen: string;
  passwordSpecimen: string;
  copiedUsername: boolean;
  copiedPassword: boolean;
  copiedAll: boolean;
  credentialsAcknowledged: boolean;
  onCopyUsername: () => void;
  onCopyPassword: () => void;
  onCopyAll: () => void;
  onAcknowledgeChange: (checked: boolean) => void;
  isAr: boolean;
}

export function SuccessCredentialsCard({
  usernameSpecimen,
  passwordSpecimen,
  copiedUsername,
  copiedPassword,
  copiedAll,
  credentialsAcknowledged,
  onCopyUsername,
  onCopyPassword,
  onCopyAll,
  onAcknowledgeChange,
  isAr,
}: SuccessCredentialsCardProps) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-bold tracking-tight text-[#16162c]">
          {isAr
            ? "بيانات الدخول للتقييمات التجريبية"
            : "Specimen Credentials for Assessments"}
        </h3>
        <p className="mt-1 text-xs text-[#6a6a86]">
          {isAr
            ? "احفظ اسم المستخدم وكلمة المرور للدخول إلى منصات تقييم IBDL المفتوحة لحسابك."
            : "Save your specimen credentials to access the 3 complimentary assessment portals."}
        </p>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Username */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <div className="flex items-center gap-2.5 truncate">
            <UserCheck className="h-4 w-4 shrink-0 text-slate-500" />
            <div className="truncate">
              <span className="block text-[10px] font-medium text-slate-500">
                {isAr ? "اسم المستخدم" : "Username"}
              </span>
              <span className="truncate font-mono text-xs font-bold text-slate-900">
                {usernameSpecimen}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCopyUsername}
            aria-label={isAr ? "نسخ اسم المستخدم" : "Copy username"}
            className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            {copiedUsername ? (
              <Check className="h-3 w-3 text-emerald-600" />
            ) : (
              <Copy className="h-3 w-3 text-slate-500" />
            )}
            <span>
              {copiedUsername ? (isAr ? "تم" : "Done") : isAr ? "نسخ" : "Copy"}
            </span>
          </button>
        </div>

        {/* Password */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <div className="flex items-center gap-2.5 truncate">
            <KeyRound className="h-4 w-4 shrink-0 text-slate-500" />
            <div className="truncate">
              <span className="block text-[10px] font-medium text-slate-500">
                {isAr ? "كلمة المرور" : "Password"}
              </span>
              <span className="truncate font-mono text-xs font-bold text-[#e11119]">
                {passwordSpecimen}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCopyPassword}
            aria-label={isAr ? "نسخ كلمة المرور" : "Copy password"}
            className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            {copiedPassword ? (
              <Check className="h-3 w-3 text-emerald-600" />
            ) : (
              <Copy className="h-3 w-3 text-slate-500" />
            )}
            <span>
              {copiedPassword ? (isAr ? "تم" : "Done") : isAr ? "نسخ" : "Copy"}
            </span>
          </button>
        </div>
      </div>

      {/* Master Copy All Button */}
      <div className="mb-4 space-y-2">
        <button
          type="button"
          onClick={onCopyAll}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition-all ${
            copiedAll
              ? "border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "border-emerald-600/30 bg-emerald-50/90 text-emerald-800 hover:bg-emerald-100"
          }`}
        >
          {copiedAll ? (
            <>
              <Check className="h-4 w-4" />
              <span>
                {isAr
                  ? "✓ تم نسخ جميع بيانات الدخول بنجاح!"
                  : "✓ All Credentials Copied to Clipboard!"}
              </span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>
                {isAr
                  ? "نسخ جميع بيانات الدخول (اسم المستخدم وكلمة المرور)"
                  : "Copy All Login Credentials (Username & Password)"}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Confirmation Checkbox */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-start transition-colors select-none hover:bg-amber-500/15">
          <input
            type="checkbox"
            checked={credentialsAcknowledged}
            onChange={(e) => onAcknowledgeChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-amber-400 text-[#e11119] focus:ring-[#e11119]"
          />
          <span className="text-xs font-semibold text-amber-950">
            {isAr
              ? "أؤكد أنني قمت بحفظ وتدوين اسم المستخدم وكلمة المرور للدخول للتقييمات لاحقاً."
              : "I confirm that I have recorded and saved my username and password securely."}
          </span>
        </label>
      </div>
    </div>
  );
}
