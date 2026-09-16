import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { ActivateDispatcher } from "@/components/auth/ActivateDispatcher";
import { Check } from "lucide-react";

export const metadata = {
  title: "Activate Account — IBDL Freelancers Hub",
  description:
    "Set your password and activate your IBDL Freelancers Hub account.",
};

export default async function ActivatePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("flh_locale")?.value as "en" | "ar") || "en";

  const benefits = [
    {
      en: "Set up your secure password once to complete registration",
      ar: "عيّن كلمة مرور آمنة لمرة واحدة لإتمام تسجيلك في المنصة",
    },
    {
      en: "Unlock 3 free diagnostic assessments automatically",
      ar: "احصل على وصول فوري ومجاني لـ ٣ تقييمات تشخيصية دولية",
    },
    {
      en: "Start building and managing your trainer visibility",
      ar: "ابدأ في بناء هويتك التدريبية وإدارة ملفك المهني المعتمد",
    },
  ];

  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      {/* Left Column: Server-Rendered Dark Branding Panel (Desktop Only) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#141428] bg-gradient-to-br from-[#141428] via-[#1d1d39] to-[#0d0d1c] px-8 pt-6 pb-8 text-white sm:px-12 sm:pt-8 lg:flex lg:px-16 lg:pt-8 lg:pb-12">
        {/* Ambient Lighting & Visual Layers */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <div className="hero__photo opacity-75" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141428] via-[#141428]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1c] via-transparent to-[#141428]/50" />
        </div>

        {/* Top Header: Freelancers Hub White Logo */}
        <div className="relative z-10 flex h-8 items-center">
          <Link href="/" className="inline-block">
            <Image
              src="/Logos/FLH-white.png"
              alt={
                locale === "ar"
                  ? "شعار منصة المستقلين IBDL"
                  : "IBDL Freelancers Hub Logo"
              }
              width={160}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center Value Proposition */}
        <div className="relative z-10 my-auto max-w-md py-12">
          <h2 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
            {locale === "ar"
              ? "تفعيل حسابك في المنصة."
              : "Activate your Hub account."}
          </h2>

          <p className="mb-8 text-sm leading-relaxed text-white/70 sm:text-base">
            {locale === "ar"
              ? "خطوة واحدة أخيرة لتأمين حسابك وتعيين كلمة المرور الخاصة بك للوصول إلى لوحة التحكم وكافة مزايا العضوية."
              : "One final step to secure your account with a password and unlock your member dashboard and diagnostic tools."}
          </p>

          <ul className="space-y-3.5 text-sm font-medium text-white/85">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{locale === "ar" ? benefit.ar : benefit.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 text-xs font-medium text-white/40">
          © 2026 IBDL Learning Group
        </div>
      </div>

      {/* Right Column: Interactive Client Leaf (ActivateDispatcher) */}
      <div className="relative flex flex-col items-center justify-center bg-white">
        <ActivateDispatcher />
      </div>
    </main>
  );
}
