import React from "react";
import Image from "next/image";
import type { MembershipTier } from "@/types/member";

export interface TrainerAvatarProps {
  name: string;
  photoUrl?: string | null;
  tier?: MembershipTier;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-xs",
  md: "h-14 w-14 text-sm",
  lg: "h-20 w-20 text-xl font-bold",
  xl: "h-28 w-28 text-2xl font-bold",
};

const tierRingStyles: Record<MembershipTier, string> = {
  MASTER: "ring-2 ring-amber-400/60 shadow-[0_0_12px_rgba(251,191,36,0.25)]",
  PROFESSIONAL:
    "ring-2 ring-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.25)]",
  ESSENTIAL: "ring-1 ring-slate-600/50",
};

function getInitials(name: string): string {
  if (!name) return "TR";
  const clean = name.replace(
    /^Dr\.\s*|^Eng\.\s*|^Prof\.\s*|د\.\s*|م\.\s*/i,
    ""
  );
  const parts = clean.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (parts[0] || "T").slice(0, 2).toUpperCase();
}

export function TrainerAvatar({
  name,
  photoUrl,
  tier = "ESSENTIAL",
  size = "md",
  className = "",
}: TrainerAvatarProps) {
  const initials = getInitials(name);
  const ringStyle = tierRingStyles[tier] || tierRingStyles.ESSENTIAL;
  const dimensionClass = sizeClasses[size];

  if (photoUrl && photoUrl.startsWith("http")) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full ${dimensionClass} ${ringStyle} ${className}`}
      >
        <Image
          src={photoUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 80px, 120px"
          className="object-cover"
        />
      </div>
    );
  }

  // Graceful initials badge with gradient
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-[#141226] font-semibold text-slate-100 select-none ${dimensionClass} ${ringStyle} ${className}`}
      aria-hidden="true"
    >
      <span>{initials}</span>
    </div>
  );
}
