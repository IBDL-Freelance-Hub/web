"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/authActions";
import { useLocale } from "@/components/common/DirectionProvider";
import { LogOut, Loader2 } from "lucide-react";

interface SecureLogoutButtonProps {
  className?: string;
  variant?: "header" | "full";
}

export function SecureLogoutButton({
  className = "",
  variant = "header",
}: SecureLogoutButtonProps) {
  const { locale } = useLocale();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  const isFull = variant === "full";

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      aria-label={
        locale === "ar" ? "تسجيل الخروج من الحساب" : "Sign out of your account"
      }
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:ring-2 focus:ring-red-500/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
        isFull
          ? "w-full bg-red-500/10 px-4 py-3 text-red-500 hover:bg-red-500 hover:text-white"
          : "border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
      } ${className}`}
    >
      {isLoggingOut ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin text-red-400" />
          <span>
            {locale === "ar" ? "جاري تسجيل الخروج..." : "Signing out..."}
          </span>
        </>
      ) : (
        <>
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          <span>{locale === "ar" ? "تسجيل الخروج" : "Sign out"}</span>
        </>
      )}
    </button>
  );
}
