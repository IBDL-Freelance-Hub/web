import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getPublicDirectory } from "@/actions/directoryActions";
import { DirectoryHeader } from "@/components/directory/DirectoryHeader";
import { DirectorySearchInput } from "@/components/directory/DirectorySearchInput";
import { DirectoryFilters } from "@/components/directory/DirectoryFilters";
import { TrainerGrid } from "@/components/directory/TrainerGrid";
import { TrainerCardSkeleton } from "@/components/directory/TrainerCardSkeleton";
import { DirectoryPagination } from "@/components/directory/DirectoryPagination";
import type { DirectorySearchParams } from "@/types/directory";

export const metadata: Metadata = {
  title: "Trainer Directory — IBDL Freelancers Hub",
  description:
    "Discover verified IBDL-certified L&D trainers. Browse by expertise, industry, language, and location to find your perfect training partner.",
  openGraph: {
    title: "Trainer Directory — IBDL Freelancers Hub",
    description:
      "Explore qualified trainers across leadership, sales, HR, coaching, strategy, and more.",
    type: "website",
    siteName: "IBDL Freelancers Hub",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface DirectoryPageProps {
  searchParams: Promise<{
    q?: string;
    expertise?: string;
    industry?: string;
    language?: string;
    page?: string;
  }>;
}

export default async function DirectoryPage({
  searchParams,
}: DirectoryPageProps) {
  // Resolve searchParams (Next 16 async searchParams)
  const resolvedParams = await searchParams;

  const criteria: DirectorySearchParams = {
    q: resolvedParams.q,
    expertise: resolvedParams.expertise,
    industry: resolvedParams.industry,
    language: resolvedParams.language,
    page: resolvedParams.page ? Number(resolvedParams.page) : 1,
  };

  const result = await getPublicDirectory(criteria);
  const hasActiveSearch = !!(resolvedParams.q && resolvedParams.q.trim());

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#1D1D39] pt-24 pb-24"
      aria-label="Trainer directory"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <DirectoryHeader
          totalCount={result.total}
          hasSearch={hasActiveSearch}
          searchQuery={resolvedParams.q}
        />

        {/* Search + Filters Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <DirectorySearchInput defaultValue={resolvedParams.q || ""} />
          <DirectoryFilters
            activeExpertise={resolvedParams.expertise || ""}
            activeIndustry={resolvedParams.industry || ""}
            activeLanguage={resolvedParams.language || ""}
          />
        </div>

        {/* Trainer Grid wrapped in Suspense */}
        <Suspense
          fallback={
            <div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              aria-busy="true"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <TrainerCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <TrainerGrid trainers={result.trainers} />
        </Suspense>

        {/* Pagination */}
        <DirectoryPagination
          currentPage={result.page}
          totalPages={result.totalPages}
          searchParams={resolvedParams as Record<string, string>}
        />
      </div>
    </main>
  );
}
