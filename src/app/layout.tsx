import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { DirectionProvider } from "@/components/common/DirectionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000"
  ),
  title: "IBDL L&D Freelancer Hub — By IBDL Learning Group",
  description:
    "Official workspace and portal for accredited trainers and operations.",
  icons: {
    icon: [
      { url: "/img/favicon.png" },
      { url: "/img/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/img/favicon.png",
    apple: "/img/apple-touch-icon.png",
  },
  openGraph: {
    title: "IBDL L&D Freelancer Hub — By IBDL Learning Group",
    description:
      "Official workspace and portal for accredited trainers and operations.",
    images: ["/img/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[#f8fafc] font-sans text-slate-900">
        <DirectionProvider>
          <ToastProvider>{children}</ToastProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
