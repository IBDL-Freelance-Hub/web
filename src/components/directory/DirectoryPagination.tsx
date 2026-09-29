import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DirectoryPaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string | string[] | undefined>;
  locale?: "en" | "ar";
}

function buildPageUrl(
  page: number,
  params: Record<string, string | string[] | undefined>
): string {
  const cleanParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === "page") continue;
    if (typeof value === "string" && value.trim()) {
      cleanParams.set(key, value.trim());
    } else if (Array.isArray(value) && value.length > 0) {
      cleanParams.set(key, value.join(","));
    }
  }
  cleanParams.set("page", String(page));
  const qs = cleanParams.toString();
  return `/directory${qs ? `?${qs}` : ""}`;
}

export function DirectoryPagination({
  currentPage,
  totalPages,
  searchParams = {},
  locale = "en",
}: DirectoryPaginationProps) {
  const isAr = locale === "ar";

  if (totalPages <= 1) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Compute visible page window
  const pageWindow: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageWindow.push(i);
    }
  } else {
    pageWindow.push(1);
    if (currentPage > 3) pageWindow.push("…");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pageWindow.push(i);
    }
    if (currentPage < totalPages - 2) pageWindow.push("…");
    pageWindow.push(totalPages);
  }

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-1.5"
      aria-label={isAr ? "التنقل بين الصفحات" : "Pagination"}
    >
      {/* Previous */}
      {hasPrev ? (
        <Link
          href={buildPageUrl(prevPage, searchParams)}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-[#1d1d39]"
          aria-label={isAr ? "الصفحة السابقة" : "Previous page"}
          scroll={false}
        >
          {isAr ? (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          )}
        </Link>
      ) : (
        <span
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-300"
          aria-disabled="true"
        >
          {isAr ? (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          )}
        </span>
      )}

      {/* Page numbers */}
      {pageWindow.map((page, idx) => {
        if (page === "…") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-8 w-8 items-center justify-center text-xs text-slate-400"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        const isActive = page === currentPage;
        return isActive ? (
          <span
            key={page}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1d1d39] text-xs font-bold text-white shadow-2xs"
            aria-current="page"
            aria-label={
              isAr ? `الصفحة ${page}، الحالية` : `Page ${page}, current`
            }
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={buildPageUrl(page, searchParams)}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-[#1d1d39]"
            aria-label={isAr ? `الصفحة ${page}` : `Page ${page}`}
            scroll={false}
          >
            {page}
          </Link>
        );
      })}

      {/* Next */}
      {hasNext ? (
        <Link
          href={buildPageUrl(nextPage, searchParams)}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-[#1d1d39]"
          aria-label={isAr ? "الصفحة التالية" : "Next page"}
          scroll={false}
        >
          {isAr ? (
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          )}
        </Link>
      ) : (
        <span
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-300"
          aria-disabled="true"
        >
          {isAr ? (
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          )}
        </span>
      )}
    </nav>
  );
}
