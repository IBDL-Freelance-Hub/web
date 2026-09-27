import React from "react";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export interface SuccessMembershipSummaryProps {
  currentDateFormatted: string;
  nextYearDateFormatted: string;
  isAr: boolean;
  email?: string;
}

export function SuccessMembershipSummary({
  currentDateFormatted,
  nextYearDateFormatted,
  isAr,
  email,
}: SuccessMembershipSummaryProps) {
  return (
    <div className="actv mb-8 overflow-hidden rounded-2xl border border-[#419257]/40 bg-[#419257]/5 text-start shadow-sm">
      {/* Top Banner: Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#419257]/20 bg-[#419257]/10 p-3.5 px-5 text-xs font-bold sm:text-sm">
        <div className="flex items-center gap-2 text-[#419257]">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>
            {isAr
              ? "تفاصيل العضوية وبيانات الحساب"
              : "Membership & Account Summary"}
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/80 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
          </span>
          <span>
            {isAr
              ? "الحساب: غير مفعل (١٠ دقائق)"
              : "Account: Inactive (10 min)"}
          </span>
        </div>
      </div>

      {/* Grid of Details */}
      <div className="grid grid-cols-1 gap-px bg-[#419257]/20 sm:grid-cols-2">
        {/* Item 1: Membership Type */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "نوع العضوية" : "Membership Tier"}
          </span>
          <span className="font-bold text-[#16162c]">
            {isAr ? "عضوية Essential" : "Essential Membership"}
          </span>
        </div>

        {/* Item 2: Membership Fee */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "رسوم العضوية" : "Membership fee"}
          </span>
          <span className="font-bold text-[#419257]">
            {isAr ? "مجاناً" : "Free"}
          </span>
        </div>

        {/* Item 3: Membership Status */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "حالة العضوية التجارية" : "Membership Status"}
          </span>
          <span className="flex items-center gap-1 font-bold text-[#419257]">
            <span>✓</span>
            <span>{isAr ? "مؤكدة (مجاناً)" : "Confirmed (Free)"}</span>
          </span>
        </div>

        {/* Item 4: Account Status (CRITICAL HIGHLIGHT: UNACTIVATED) */}
        <div className="flex flex-col gap-1 border-l-2 border-amber-400 bg-amber-50/50 p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-amber-900">
            {isAr ? "حالة الحساب (تسجيل الدخول)" : "Account Status (Sign In)"}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-[#e11119]">
              {isAr
                ? "غير مفعل — بانتظار التفعيل"
                : "Inactive — Pending Activation"}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-800">
              <Clock className="inline h-3 w-3 shrink-0" />
              <span>
                {isAr
                  ? "صالح لمدة ١٠ دقائق فقط"
                  : "Link valid for 10 minutes only"}
              </span>
            </span>
          </div>
        </div>

        {/* Item 5: Registered Email for Activation */}
        {email && (
          <div className="flex flex-col gap-1 border-t border-[#419257]/10 bg-white p-4 px-5 text-xs sm:col-span-2 sm:text-sm">
            <span className="font-medium text-[#6a6a86]">
              {isAr ? "البريد الإلكتروني للتفعيل" : "Activation Sent To"}
            </span>
            <span className="font-bold break-all text-[#16162c]">{email}</span>
          </div>
        )}

        {/* Item 6: Start Date */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "تاريخ البدء" : "Start date"}
          </span>
          <span className="font-bold text-[#16162c]">
            {currentDateFormatted}
          </span>
        </div>

        {/* Item 7: Renews On */}
        <div className="flex flex-col gap-1 bg-white p-4 px-5 text-xs sm:text-sm">
          <span className="font-medium text-[#6a6a86]">
            {isAr ? "تاريخ التجديد" : "Renews on"}
          </span>
          <span className="font-bold text-[#16162c]">
            {nextYearDateFormatted}
          </span>
        </div>
      </div>

      {/* Warning Notice Card at Bottom */}
      <div className="border-t border-[#419257]/15 bg-amber-50/80 p-4 px-5 text-xs leading-relaxed text-[#3e3e5c]">
        <div className="mb-1 flex items-center gap-1.5 font-bold text-amber-950">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#e11119]" />
          <span>
            {isAr
              ? "تنبيه هام: حسابك غير مفعل حتى تكتمل خطوة التفعيل"
              : "Important Notice: Your account is inactive until activation"}
          </span>
        </div>
        <p className="text-amber-900">
          {isAr
            ? "تم إرسال رابط التفعيل فوراً إلى بريدك الإلكتروني وهو صالح لمدة ١٠ دقائق فقط. لن تتمكن من تسجيل الدخول إلى المنصة إلا بعد الضغط على الرابط وتعيين كلمة المرور الخاصة بك."
            : "An activation link was dispatched immediately to your email and is valid for 10 minutes only. You will not be able to sign in until you click the link and set your password."}
        </p>
      </div>
    </div>
  );
}
