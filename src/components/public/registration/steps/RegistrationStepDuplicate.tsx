"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";
import { useRegistration } from "../RegistrationProvider";
import { useLocale } from "@/components/common/DirectionProvider";

export function RegistrationStepDuplicate() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const { duplicateClashLead, closeRegistration, restoreStep1FromDuplicate } =
    useRegistration();

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="animate-step-enter py-4 text-start">
      <div className="mb-6 flex h-14 w-14 place-items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-50 text-amber-600 shadow-sm">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h3 className="mb-2 text-xl font-bold tracking-tight text-[#16162c] sm:text-2xl">
        {isAr ? "أنت مسجل بالفعل في المنصة" : "You are already registered"}
      </h3>

      <p className="mb-3 text-sm font-bold text-amber-700">
        {duplicateClashLead ||
          (isAr
            ? "يوجد حساب مسجل بالفعل ببيانات التواصل هذه."
            : "An account with this email address or mobile number already exists.")}
      </p>

      <p className="mb-8 max-w-2xl text-xs leading-relaxed text-[#6a6a86] sm:text-sm">
        {isAr
          ? "لا داعي للتسجيل مرة أخرى. تسجيلك الأصلي هو الأساس لحسابك في منصة المستقلين — يمكنك تفعيله وتسجيل الدخول دون الحاجة لإعادة إدخال بياناتك المهنية."
          : "There is no need to register again. Your original registration is the foundation of your Hub account — you can activate it and sign in without re-entering your professional details."}
      </p>

      <div className="flex flex-col gap-3.5 sm:flex-row">
        <Link
          href="/login?activate=1"
          onClick={closeRegistration}
          className="flex items-center justify-center gap-2 rounded-full bg-[#e11119] px-7 py-3.5 text-xs font-bold text-white shadow-[0_14px_34px_rgba(225,17,25,0.30)] transition-all hover:bg-[#b60d14] sm:text-sm"
        >
          <span>
            {isAr
              ? "تفعيل الحساب أو تسجيل الدخول"
              : "Activate or sign in to the Hub"}
          </span>
          <ArrowIcon className="h-4 w-4" />
        </Link>

        <button
          type="button"
          onClick={restoreStep1FromDuplicate}
          className="cursor-pointer rounded-full border border-[#e2e2ec] bg-white px-6 py-3.5 text-xs font-bold text-[#1d1d39] transition-all hover:bg-[#f6f6fa] sm:text-sm"
        >
          {isAr ? "استخدام بيانات مختلفة" : "Use different details"}
        </button>
      </div>

      <div className="mt-8 border-t border-[#e2e2ec] pt-4 text-[11px] text-[#6a6a86]">
        <span>
          {isAr
            ? "هل تحتاج لمساعدة في الوصول لحسابك؟ تواصل مع الفريق عبر "
            : "Need help accessing your account? Contact support at "}
        </span>
        <a
          href="mailto:freelancers.hub@ibdl.net"
          className="font-bold text-[#1d1d39] underline"
        >
          freelancers.hub@ibdl.net
        </a>
      </div>
    </div>
  );
}
