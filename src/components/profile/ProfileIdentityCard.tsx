"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "@/components/common/DirectionProvider";
import { Camera, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { MemberDto, MembershipDto } from "@/types/api";

export interface ProfileIdentityCardProps {
  member: MemberDto;
  membership: MembershipDto | null;
  isPublishedInDirectory: boolean;
  initials: string;
}

export function ProfileIdentityCard({
  member,
  membership,
  isPublishedInDirectory,
  initials,
}: ProfileIdentityCardProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  const getTierDisplay = (tier?: string) => {
    if (!tier) return isAr ? "عضوية أساسية" : "Essential Membership";
    const normalized = tier.toUpperCase();
    if (normalized === "MASTER") {
      return isAr ? "عضوية خبير معتمد" : "Master Membership";
    }
    if (normalized === "PROFESSIONAL") {
      return isAr ? "عضوية مهنية" : "Professional Membership";
    }
    return isAr ? "عضوية أساسية" : "Essential Membership";
  };

  return (
    <Card as="section" aria-labelledby="identity-heading">
      <h2 id="identity-heading" className="sr-only">
        {isAr ? "الهوية والملف التعريفي" : "Member Identity Overview"}
      </h2>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar Container */}
          <div className="relative h-20 w-20 shrink-0">
            <div
              className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#141428] text-xl font-bold text-white shadow-md ring-4 ring-slate-100"
              aria-label={member.fullNameEn || "User avatar"}
            >
              {member.photoFileId ? (
                <Image
                  src={`/api/v1/files/${member.photoFileId}`}
                  alt={member.fullNameEn || "Profile photo"}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            {/* Photo change indicator */}
            <div
              className="absolute -end-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-white shadow-xs"
              title={isAr ? "تغيير الصورة الشخصية" : "Change photo"}
            >
              <Camera className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Name, Location & Status Pills */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {isAr && member.fullNameAr
                ? member.fullNameAr
                : member.fullNameEn}
            </h3>
            <p className="text-xs font-medium text-slate-500">
              {member.city ? `${member.city}, ` : ""}
              {member.country}
            </p>

            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Badge variant="neutral" className="gap-1.5 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
                <span>{getTierDisplay(membership?.tier)}</span>
              </Badge>

              <Badge
                variant={isPublishedInDirectory ? "success" : "default"}
                dot
                className="py-1"
              >
                {isPublishedInDirectory
                  ? isAr
                    ? "منشور في دليل المدربين"
                    : "Published in the directory"
                  : isAr
                    ? "غير منشور في الدليل"
                    : "Not published in directory"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Edit Profile (View-Only / Placeholder per spec) */}
        <div className="flex items-center">
          <button
            type="button"
            disabled
            title={
              isAr
                ? "تعديل الملف متاح قريباً"
                : "Edit profile feature coming soon"
            }
            className="inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-[#141428] px-5 py-2.5 text-xs font-semibold text-white opacity-80 shadow-xs select-none"
          >
            {isAr ? "تعديل الملف الشخصي" : "Edit profile"}
          </button>
        </div>
      </div>

      {/* Photo Privacy Explanation Note */}
      <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
        {isAr
          ? "صورتك الشخصية اختيارية ويمكن تغييرها أو إزالتها في أي وقت. تظهر في المنصة وفي دليل المدربين العام فقط في حال نشر ملفك. إضافة الصورة لا ينشر ملفك تلقائياً. بريدك الإلكتروني وهاتفك وسيرتك الذاتية لا تظهر أبداً في الدليل."
          : "Your photo is optional and can be changed or removed at any time. It appears in the Hub, and in the public Trainer Directory only if your profile is published there. Adding a photo does not publish your profile. Your email, mobile, CV and documents are never shown in the directory."}
      </p>
    </Card>
  );
}
