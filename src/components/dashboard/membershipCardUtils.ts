import type { MembershipStatus } from "@/types/member";

export function formatDate(dateString?: string, isAr?: boolean): string {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * DSH-14: Expired membership must NOT display as "Essential".
 * The actual paid tier name must still be shown (e.g. "Professional Membership (Expired)"),
 * never relabeled as "Essential".
 */
export function getDisplayedTierName(
  tier?: string | null,
  status?: MembershipStatus | string | null,
  isAr?: boolean
): string {
  const effectiveTier = tier || "ESSENTIAL";
  const normalized = effectiveTier.toUpperCase();

  let baseName = "";
  if (normalized === "MASTER") {
    baseName = isAr ? "عضوية خبير معتمد" : "Master Membership";
  } else if (normalized === "PROFESSIONAL") {
    baseName = isAr ? "عضوية مهنية" : "Professional Membership";
  } else {
    baseName = isAr ? "عضوية أساسية" : "Essential Membership";
  }

  // DSH-14: Preserve paid tier name when EXPIRED
  if (status === "EXPIRED") {
    return isAr ? `${baseName} (منتهية)` : `${baseName} (Expired)`;
  }

  return baseName;
}

/**
 * FIX 2: Exhaustive switch for all six MembershipStatus states
 * Catches any unhandled state at compile time via `satisfies never`.
 */
export function getMembershipStatusDetails(
  status: MembershipStatus,
  isAr?: boolean,
  daysUntilRenewal?: number,
  expiryDateFormatted?: string
) {
  switch (status) {
    case "ACTIVE":
      return {
        label: isAr ? "عضوية سارية" : "Active",
        badgeClasses: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dotClass: "bg-emerald-500",
        bannerClasses:
          "border-emerald-200/80 bg-emerald-50/70 text-emerald-900",
        iconType: "active" as const,
        bannerText: isAr
          ? `عضويتك المعتمدة نشطة ومستمرة حتى ${expiryDateFormatted || "—"}.`
          : `Your accredited membership is active and valid until ${expiryDateFormatted || "—"}.`,
      };
    case "GRACE_PERIOD":
      return {
        label: isAr ? "فترة سماح" : "Grace Period",
        badgeClasses: "border-amber-200 bg-amber-50 text-amber-700",
        dotClass: "bg-amber-500",
        bannerClasses: "border-amber-200 bg-amber-50/70 text-amber-900",
        iconType: "grace" as const,
        bannerText: isAr
          ? `عضويتك في فترة سماح. متبقي ${daysUntilRenewal ?? 0} يوم للتجديد قبل تعليق الصلاحيات.`
          : `Your membership is in a grace period. ${daysUntilRenewal ?? 0} days remaining to renew before access is suspended.`,
      };
    case "EXPIRED":
      return {
        label: isAr ? "منتهية الصلاحية" : "Expired",
        badgeClasses: "border-rose-200 bg-rose-50 text-rose-700",
        dotClass: "bg-rose-500",
        bannerClasses: "border-rose-200 bg-rose-50/70 text-rose-900",
        iconType: "expired" as const,
        bannerText: isAr
          ? "انتهت صلاحية عضويتك. يرجى تجديد الاشتراك لاستعادة مزايا الاعتماد والظهور في الدليل."
          : "Your membership has expired. Renew your subscription to restore your benefits and directory standing.",
      };
    case "PENDING_PAYMENT":
      return {
        label: isAr ? "بانتظار الدفع" : "Pending Payment",
        badgeClasses: "border-amber-200 bg-amber-50 text-amber-700",
        dotClass: "bg-amber-500",
        bannerClasses: "border-amber-200 bg-amber-50/70 text-amber-900",
        iconType: "pending" as const,
        bannerText: isAr
          ? "الاشتراك بانتظار إتمام عملية السداد لتفعيل كافة المزايا."
          : "Your membership is pending payment completion.",
      };
    case "SUSPENDED":
      return {
        label: isAr ? "معلقة" : "Suspended",
        badgeClasses: "border-rose-200 bg-rose-50 text-rose-700",
        dotClass: "bg-rose-500",
        bannerClasses: "border-rose-200 bg-rose-50/70 text-rose-900",
        iconType: "suspended" as const,
        bannerText: isAr
          ? "تم تعليق العضوية مؤقتاً. يرجى مراجعة الدعم الفني."
          : "Your membership has been temporarily suspended. Please contact support.",
      };
    case "CANCELLED":
      return {
        label: isAr ? "ملغاة" : "Cancelled",
        badgeClasses: "border-slate-200 bg-slate-100 text-slate-700",
        dotClass: "bg-slate-500",
        bannerClasses: "border-slate-200 bg-slate-50 text-slate-800",
        iconType: "cancelled" as const,
        bannerText: isAr
          ? "تم إلغاء العضوية."
          : "Your membership has been cancelled.",
      };
    default: {
      const _exhaustiveCheck: never = status;
      return {
        label: String(_exhaustiveCheck),
        badgeClasses: "border-slate-200 bg-slate-50 text-slate-600",
        dotClass: "bg-slate-400",
        bannerClasses: "border-slate-200 bg-slate-50 text-slate-600",
        iconType: "expired" as const,
        bannerText: "Status unknown",
      };
    }
  }
}
