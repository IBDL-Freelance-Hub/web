import React from "react";
import {
  LayoutDashboard,
  Inbox,
  Bell,
  Store,
  FileCheck2,
  Award,
  ShieldCheck,
  User,
  Crown,
  FileBadge,
  Receipt,
  Shield,
  Users,
  MessageSquare,
} from "lucide-react";

export interface NavItemConfig {
  href: string;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string }>;
  isLive: boolean;
  badge?: {
    textEn: string;
    textAr: string;
    variant?: "comingSoon" | "count";
  };
}

export interface NavGroupConfig {
  titleEn: string;
  titleAr: string;
  items: NavItemConfig[];
}

export const NAVIGATION_GROUPS: readonly NavGroupConfig[] = [
  {
    titleEn: "WORKSPACE",
    titleAr: "مساحة العمل",
    items: [
      {
        href: "/overview",
        labelEn: "Dashboard",
        labelAr: "لوحة التحكم",
        icon: LayoutDashboard,
        isLive: true,
      },
      {
        href: "/requests",
        labelEn: "Requests",
        labelAr: "الطلبات",
        icon: Inbox,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
      {
        href: "/notifications",
        labelEn: "Notifications",
        labelAr: "الإشعارات",
        icon: Bell,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
    ],
  },
  {
    titleEn: "MARKETPLACE & RECOGNITION",
    titleAr: "السوق والاعتماد",
    items: [
      {
        href: "/marketplace",
        labelEn: "Marketplace",
        labelAr: "سوق العمل",
        icon: Store,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
      {
        href: "/assessments",
        labelEn: "Assessments",
        labelAr: "التقييمات",
        icon: FileCheck2,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
      {
        href: "/certification",
        labelEn: "Certification",
        labelAr: "الشهادات المهنية",
        icon: Award,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
      {
        href: "/accreditation",
        labelEn: "Accreditation",
        labelAr: "الاعتماد",
        icon: ShieldCheck,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
    ],
  },
  {
    titleEn: "ACCOUNT",
    titleAr: "الحساب",
    items: [
      {
        href: "/profile",
        labelEn: "My Profile",
        labelAr: "الملف الشخصي",
        icon: User,
        isLive: true,
      },
      {
        href: "/membership",
        labelEn: "Membership",
        labelAr: "العضوية",
        icon: Crown,
        isLive: true,
      },
      {
        href: "/certificates",
        labelEn: "Certificates",
        labelAr: "الشهادات",
        icon: FileBadge,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
      {
        href: "/transactions",
        labelEn: "Transactions",
        labelAr: "المعاملات المالية",
        icon: Receipt,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
      {
        href: "/settings/security",
        labelEn: "Security & Sessions",
        labelAr: "الأمان والجلسات",
        icon: Shield,
        isLive: true,
      },
    ],
  },
  {
    titleEn: "COMMUNITY",
    titleAr: "المجتمع",
    items: [
      {
        href: "/directory",
        labelEn: "Trainer Directory",
        labelAr: "دليل المدربين",
        icon: Users,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
      {
        href: "/community",
        labelEn: "Community",
        labelAr: "مجتمع المدربين",
        icon: MessageSquare,
        isLive: false,
        badge: {
          textEn: "Coming soon",
          textAr: "قريباً",
          variant: "comingSoon",
        },
      },
    ],
  },
] as const;
