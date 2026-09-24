"use client";

import React from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { User as UserIcon, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { MemberDto } from "@/types/api";
import type { ProfileFormData } from "@/types/profile";
import { useOptionalProfileContext } from "./ProfileContext";

export interface ProfilePersonalCardProps {
  user?: {
    email: string;
  };
  member?: MemberDto;
  isEditing?: boolean;
  formData?: {
    fullNameEn?: string;
    fullNameAr?: string | null;
    phone?: string;
    country?: string;
    city?: string | null;
  };
  fieldErrors?: Record<string, string[]>;
  onChange?: (field: string, value: string) => void;
}

export function ProfilePersonalCard({
  user: propUser,
  member: propMember,
  isEditing: propIsEditing,
  formData: propFormData,
  fieldErrors: propFieldErrors,
  onChange: propOnChange,
}: ProfilePersonalCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const profileCtx = useOptionalProfileContext();

  const user = propUser || profileCtx?.user || { email: "" };
  const member = profileCtx?.member || propMember || ({} as MemberDto);
  const isEditing =
    propIsEditing !== undefined ? propIsEditing : profileCtx?.mode === "edit";

  const fieldErrors = propFieldErrors || profileCtx?.fieldErrors || {};
  const handleChange = (field: keyof ProfileFormData, value: string) => {
    if (propOnChange) {
      propOnChange(field, value);
    } else if (profileCtx) {
      profileCtx.updateField(field, value);
    }
  };

  const values = {
    fullNameEn:
      propFormData?.fullNameEn ??
      profileCtx?.formData.fullNameEn ??
      member.fullNameEn ??
      "",
    fullNameAr:
      propFormData?.fullNameAr ??
      profileCtx?.formData.fullNameAr ??
      member.fullNameAr ??
      "",
    phone:
      propFormData?.phone ?? profileCtx?.formData.phone ?? member.phone ?? "",
    country:
      propFormData?.country ??
      profileCtx?.formData.country ??
      member.country ??
      "",
    city: propFormData?.city ?? profileCtx?.formData.city ?? member.city ?? "",
  };

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

        {isEditing ? (
          <div className="mt-4 space-y-4">
            {/* Full Name English */}
            <Input
              id="fullNameEn"
              name="fullNameEn"
              label={
                isAr ? "الاسم الكامل (بالإنجليزية) *" : "Full Name (English) *"
              }
              value={values.fullNameEn}
              onChange={(e) => handleChange("fullNameEn", e.target.value)}
              error={fieldErrors.fullNameEn?.[0]}
              placeholder="e.g. John Smith"
              required
            />

            {/* Full Name Arabic */}
            <Input
              id="fullNameAr"
              name="fullNameAr"
              label={isAr ? "الاسم الكامل (بالعربية)" : "Full Name (Arabic)"}
              value={values.fullNameAr}
              onChange={(e) => handleChange("fullNameAr", e.target.value)}
              error={fieldErrors.fullNameAr?.[0]}
              placeholder="مثال: جون سميث"
              dir="rtl"
            />

            {/* Email - Strictly Read-Only (PRO-04, VAL-50) */}
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                label={
                  <span className="flex items-center gap-1.5">
                    <span>{isAr ? "البريد الإلكتروني" : "Email Address"}</span>
                    <span className="inline-flex items-center gap-1 rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
                      <Lock className="h-2.5 w-2.5" />
                      {isAr ? "غير قابل للتعديل" : "Read-only"}
                    </span>
                  </span>
                }
                value={user.email}
                disabled
                helperText={
                  isAr
                    ? "معرّف الحساب الرئيسي للقراءة فقط (PRO-04). لتعديل البريد يرجى التواصل مع الدعم."
                    : "Primary account identifier is read-only (PRO-04). Contact support to change."
                }
              />
            </div>

            {/* Mobile Number - Includes shake animation on 409 clash */}
            <div
              className={
                fieldErrors.phone
                  ? "animate-shake motion-reduce:animate-none"
                  : ""
              }
            >
              <Input
                id="phone"
                name="phone"
                type="tel"
                label={isAr ? "رقم الهاتف المحمول *" : "Mobile Number *"}
                value={values.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={fieldErrors.phone?.[0]}
                placeholder="+201234567890"
                required
                className="dir-ltr text-start font-mono"
              />
            </div>

            {/* Country & City Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="country"
                name="country"
                label={isAr ? "الدولة *" : "Country *"}
                value={values.country}
                onChange={(e) => handleChange("country", e.target.value)}
                error={fieldErrors.country?.[0]}
                placeholder="e.g. Egypt"
                required
              />

              <Input
                id="city"
                name="city"
                label={isAr ? "المدينة *" : "City *"}
                value={values.city}
                onChange={(e) => handleChange("city", e.target.value)}
                error={fieldErrors.city?.[0]}
                placeholder="e.g. Cairo"
                required
              />
            </div>
          </div>
        ) : (
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
        )}
      </div>

      <p className="mt-4 text-[11px] leading-normal text-slate-500">
        {isAr
          ? "البريد الإلكتروني هو معرّف حسابك الرئيسي. لتغيير بريدك، يرجى التواصل مع الدعم الفني."
          : "Your email address is your master identifier. To update it, contact support."}
      </p>
    </Card>
  );
}
