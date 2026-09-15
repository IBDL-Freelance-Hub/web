"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { User as UserIcon, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { MemberDto } from "@/types/api";

export interface ProfilePersonalCardProps {
  user: {
    email: string;
  };
  member: MemberDto;
}

export function ProfilePersonalCard({
  user,
  member,
}: ProfilePersonalCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  return (
    <Card
      as="section"
      aria-labelledby="personal-heading"
      className="flex flex-col justify-between"
    >
      <div>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <UserIcon className="h-5 w-5 text-slate-600" />
            <CardTitle id="personal-heading">
              {isAr ? "البيانات الشخصية" : "Personal details"}
            </CardTitle>
          </div>
        </CardHeader>

        <dl className="mt-2 divide-y divide-slate-100 text-xs">
          <div className="flex items-center justify-between py-3.5">
            <dt className="font-medium text-slate-500">
              {isAr ? "الاسم الكامل" : "Full name"}
            </dt>
            <dd className="text-end font-semibold text-slate-900">
              {isAr && member.fullNameAr
                ? member.fullNameAr
                : member.fullNameEn}
            </dd>
          </div>

          {/* Email (Read-Only PRO-04) */}
          <div className="flex items-center justify-between py-3.5">
            <dt className="flex items-center gap-1.5 font-medium text-slate-500">
              <span>{isAr ? "البريد الإلكتروني" : "Email address"}</span>
              <span title={isAr ? "غير قابل للتعديل" : "Read-only"}>
                <Lock className="h-3 w-3 text-slate-400" />
              </span>
            </dt>
            <dd className="text-end font-semibold text-slate-900">
              {user.email}
            </dd>
          </div>

          <div className="flex items-center justify-between py-3.5">
            <dt className="font-medium text-slate-500">
              {isAr ? "رقم الهاتف المحمول" : "Mobile number"}
            </dt>
            <dd className="dir-ltr text-end font-mono font-semibold text-slate-900">
              {member.phone}
            </dd>
          </div>

          <div className="flex items-center justify-between py-3.5">
            <dt className="font-medium text-slate-500">
              {isAr ? "الدولة" : "Country"}
            </dt>
            <dd className="text-end font-semibold text-slate-900">
              {member.country}
            </dd>
          </div>

          <div className="flex items-center justify-between py-3.5">
            <dt className="font-medium text-slate-500">
              {isAr ? "المدينة" : "City"}
            </dt>
            <dd className="text-end font-semibold text-slate-900">
              {member.city || (
                <span className="font-normal text-slate-400">
                  {isAr ? "غير محددة" : "Not specified"}
                </span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <p className="mt-4 text-[11px] leading-normal text-slate-500">
        {isAr
          ? "البريد الإلكتروني هو معرّف حسابك الرئيسي. لتغيير بريدك، يرجى التواصل مع الدعم الفني."
          : "Your email address is your master identifier. To update it, contact support."}
      </p>
    </Card>
  );
}
