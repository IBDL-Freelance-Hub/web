import React from "react";
import { UserSessionDto } from "@/types/api";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Layers,
  Building,
  CheckCircle2,
} from "lucide-react";

interface ProfileSummaryCardProps {
  user: UserSessionDto;
  locale: "en" | "ar";
}

const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

function formatNumerals(
  val: string | number | undefined,
  locale: "en" | "ar"
): string {
  if (!val) return "";
  const str = String(val);
  if (locale !== "ar") return str;
  return str.replace(/\d/g, (d) => ARABIC_INDIC_DIGITS[parseInt(d, 10)]);
}

export function ProfileSummaryCard({ user, locale }: ProfileSummaryCardProps) {
  const member = user.member;

  const phone = member?.phone || "";
  const country =
    member?.country || (locale === "ar" ? "غير محدد" : "Not specified");
  const city = member?.city ? `, ${member.city}` : "";
  const location = `${country}${city}`;
  const experienceYears = member?.yearsOfExperience
    ? formatNumerals(member.yearsOfExperience, locale)
    : locale === "ar"
      ? "غير محدد"
      : "Not specified";

  const expertise = member?.areasOfExpertise || [];
  const industries = member?.industriesServed || [];

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#419257]">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#16162c]">
              {locale === "ar"
                ? "الملف الشخصي والمهني"
                : "Professional Profile"}
            </h3>
            <p className="text-xs text-[#6a6a86]">
              {locale === "ar"
                ? "بيانات الاعتماد والخبرة المسجلة"
                : "Your registered credentials and expertise"}
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Demographics Details Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Email */}
        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#419257]" />
          <div className="min-w-0">
            <span className="block text-[11px] font-semibold text-[#6a6a86]">
              {locale === "ar" ? "البريد الإلكتروني" : "Email Address"}
            </span>
            <span className="block truncate text-xs font-bold text-[#16162c]">
              {user.email}
            </span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#419257]" />
          <div className="min-w-0">
            <span className="block text-[11px] font-semibold text-[#6a6a86]">
              {locale === "ar" ? "رقم الهاتف" : "Phone Number"}
            </span>
            <span className="dir-ltr block truncate text-start text-xs font-bold text-[#16162c]">
              {phone || (locale === "ar" ? "غير مسجل" : "Not recorded")}
            </span>
          </div>
        </div>

        {/* Country / Location */}
        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#419257]" />
          <div className="min-w-0">
            <span className="block text-[11px] font-semibold text-[#6a6a86]">
              {locale === "ar" ? "الدولة / الموقع" : "Country / Location"}
            </span>
            <span className="block truncate text-xs font-bold text-[#16162c]">
              {location}
            </span>
          </div>
        </div>

        {/* Years of Experience */}
        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
          <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-[#419257]" />
          <div className="min-w-0">
            <span className="block text-[11px] font-semibold text-[#6a6a86]">
              {locale === "ar"
                ? "سنوات الخبرة التدريبية"
                : "Years of Experience"}
            </span>
            <span className="block truncate text-xs font-bold text-[#16162c]">
              {experienceYears} {locale === "ar" ? "سنوات" : "years"}
            </span>
          </div>
        </div>
      </div>

      {/* Areas of Expertise Badges */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center gap-2 text-xs font-bold text-[#16162c]">
          <Layers className="h-4 w-4 text-[#419257]" />
          <span>
            {locale === "ar" ? "مجالات الخبرة المعتمدة" : "Areas of Expertise"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {expertise.length > 0 ? (
            expertise.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100/80 px-2.5 py-1 text-xs font-medium text-slate-800"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400">
              {locale === "ar" ? "لا توجد مجالات مسجلة" : "No areas registered"}
            </span>
          )}
        </div>
      </div>

      {/* Industries Served Badges */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center gap-2 text-xs font-bold text-[#16162c]">
          <Building className="h-4 w-4 text-[#419257]" />
          <span>
            {locale === "ar" ? "القطاعات المخدومة" : "Industries Served"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {industries.length > 0 ? (
            industries.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400">
              {locale === "ar"
                ? "لا توجد قطاعات مسجلة"
                : "No industries registered"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
