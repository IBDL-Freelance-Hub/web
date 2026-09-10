"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

interface DirectionContextValue {
  locale: Locale;
  dir: Direction;
  isRTL: boolean;
  toggleLocale: () => void;
  formatNumber: (num: number | string) => string;
}

const DirectionContext = createContext<DirectionContextValue | undefined>(
  undefined
);

const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const dir: Direction = locale === "ar" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const formatNumber = useCallback(
    (num: number | string): string => {
      const str = String(num);
      if (locale !== "ar") return str;
      return str.replace(
        /\d/g,
        (digit) => ARABIC_INDIC_DIGITS[parseInt(digit, 10)]
      );
    },
    [locale]
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    }
  }, [locale, dir]);

  return (
    <DirectionContext.Provider
      value={{
        locale,
        dir,
        isRTL,
        toggleLocale,
        formatNumber,
      }}
    >
      {children}
    </DirectionContext.Provider>
  );
}

export function useLocale(): DirectionContextValue {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useLocale must be used within a DirectionProvider");
  }
  return context;
}
