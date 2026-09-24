import React from "react";
import { ExternalLink } from "lucide-react";
import type { MemberDto } from "@/types/api";

export interface ProfileProfessionalDetailsProps {
  member: MemberDto;
  isAr: boolean;
}

export function ProfileProfessionalDetails({
  member,
  isAr,
}: ProfileProfessionalDetailsProps) {
  return (
    <dl className="mt-2 divide-y divide-slate-100 text-xs">
      {/* Years of Experience */}
      <div className="flex items-center justify-between py-3.5">
        <dt className="font-medium text-slate-500">
          {isAr ? "سنوات الخبرة" : "Years of experience"}
        </dt>
        <dd className="text-end font-semibold text-slate-900">
          {member.yearsOfExperience
            ? `${member.yearsOfExperience} ${isAr ? "سنوات" : "years"}`
            : "—"}
        </dd>
      </div>

      {/* Areas of Expertise */}
      <div className="py-3.5">
        <dt className="mb-2 font-medium text-slate-500">
          {isAr ? "مجالات الخبرة" : "Areas of expertise"}
        </dt>
        <dd className="flex flex-wrap gap-1.5">
          {member.areasOfExpertise && member.areasOfExpertise.length > 0 ? (
            member.areasOfExpertise.map((area) => (
              <span
                key={area}
                className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
              >
                {isAr && (area === "Others" || area === "Other")
                  ? "أخرى"
                  : area}
              </span>
            ))
          ) : (
            <span className="font-normal text-slate-400">
              {isAr ? "لم تحدد مجالات بعد" : "None selected"}
            </span>
          )}
        </dd>
      </div>

      {/* Industries Served */}
      <div className="py-3.5">
        <dt className="mb-2 font-medium text-slate-500">
          {isAr ? "القطاعات المخدومة" : "Industries served"}
        </dt>
        <dd className="flex flex-wrap gap-1.5">
          {member.industriesServed && member.industriesServed.length > 0 ? (
            member.industriesServed.map((ind) => (
              <span
                key={ind}
                className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
              >
                {isAr && (ind === "Others" || ind === "Other") ? "أخرى" : ind}
              </span>
            ))
          ) : (
            <span className="font-normal text-slate-400">
              {isAr ? "لم تحدد قطاعات بعد" : "None selected"}
            </span>
          )}
        </dd>
      </div>

      {/* Languages */}
      <div className="py-3.5">
        <dt className="mb-2 font-medium text-slate-500">
          {isAr ? "لغات التدريب" : "Languages"}
        </dt>
        <dd className="flex flex-wrap gap-1.5">
          {member.languages && member.languages.length > 0 ? (
            member.languages.map((lang) => (
              <span
                key={lang}
                className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
              >
                {lang}
              </span>
            ))
          ) : (
            <span className="font-normal text-slate-400">
              {isAr ? "لم تضف لغات بعد" : "None specified"}
            </span>
          )}
        </dd>
      </div>

      {/* LinkedIn Profile */}
      <div className="flex items-center justify-between py-3.5">
        <dt className="font-medium text-slate-500">
          {isAr ? "رابط لينكد إن" : "LinkedIn profile"}
        </dt>
        <dd className="text-end">
          {member.linkedinUrl ? (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span className="max-w-[180px] truncate sm:max-w-xs">
                {member.linkedinUrl.replace(
                  /^https?:\/\/(www\.)?linkedin\.com\/in\//,
                  ""
                )}
              </span>
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="font-normal text-slate-400">
              {isAr ? "لم يضف رابط" : "Not provided"}
            </span>
          )}
        </dd>
      </div>
    </dl>
  );
}
