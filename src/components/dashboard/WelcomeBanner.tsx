import React from "react";
import { UserSessionDto } from "@/types/api";
import { Award, ShieldCheck, User } from "lucide-react";

interface WelcomeBannerProps {
  user: UserSessionDto;
  locale: "en" | "ar";
}

export function WelcomeBanner({ user, locale }: WelcomeBannerProps) {
  const member = user.member;
  const fullName =
    locale === "ar"
      ? member?.fullNameAr || member?.fullNameEn || user.email.split("@")[0]
      : member?.fullNameEn || member?.fullNameAr || user.email.split("@")[0];

  const tier = member?.tier || "ACCREDITED";
  const userRole =
    user.userType === "STAFF" ? "IBDL Staff" : "Freelancer Member";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#141428] via-[#1d1d39] to-[#252549] p-6 text-white shadow-md sm:p-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 select-none">
        <div className="absolute -end-24 -top-24 h-64 w-64 rounded-full bg-[#419257]/30 blur-3xl" />
        <div className="absolute start-1/3 -bottom-24 h-64 w-64 rounded-full bg-[#e11119]/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner ring-1 ring-white/20">
            <User className="h-8 w-8 text-white/90" />
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold text-white/70">
                {locale === "ar" ? "مرحباً بك مجدداً،" : "Welcome back,"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>
                  {locale === "ar" ? "حساب نشط ومفعل" : "Active Member"}
                </span>
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {fullName}
            </h1>

            <p className="text-xs text-white/60">{user.email}</p>
          </div>
        </div>

        {/* Membership Tier & Status Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              <div>
                <div className="text-[10px] font-bold tracking-wider text-white/50 uppercase">
                  {locale === "ar" ? "فئة العضوية" : "Membership Tier"}
                </div>
                <div className="text-xs font-bold text-white">{tier}</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xs">
            <div className="text-[10px] font-bold tracking-wider text-white/50 uppercase">
              {locale === "ar" ? "نوع الحساب" : "Role"}
            </div>
            <div className="text-xs font-bold text-white/90">{userRole}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
