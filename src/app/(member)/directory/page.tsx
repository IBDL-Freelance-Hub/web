import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getCurrentMember } from "@/lib/auth";
import { getPublicDirectory } from "@/actions/directoryActions";
import { DirectoryHeader } from "@/components/directory/DirectoryHeader";
import { DirectoryListingBanner } from "@/components/directory/DirectoryListingBanner";
import { DirectorySearchInput } from "@/components/directory/DirectorySearchInput";
import { DirectoryFilters } from "@/components/directory/DirectoryFilters";
import { TrainerGrid } from "@/components/directory/TrainerGrid";
import { TrainerCardSkeleton } from "@/components/directory/TrainerCardSkeleton";
import { DirectoryPagination } from "@/components/directory/DirectoryPagination";
import type { DirectorySearchParams } from "@/types/directory";

export const metadata: Metadata = {
  title: "Trainer Directory — IBDL Freelancers Hub",
  description:
    "Member-exclusive directory of accredited freelance professionals. Connect with fellow trainers across disciplines, industries, and regions.",
  robots: {
    index: false,
    follow: false,
  },
};

interface DirectoryPageProps {
  searchParams: Promise<{
    q?: string;
    country?: string;
    expertise?: string;
    industry?: string;
    page?: string;
  }>;
}

export default async function MemberDirectoryPage({
  searchParams,
}: DirectoryPageProps) {
  const [resolvedParams, memberData] = await Promise.all([
    searchParams,
    getCurrentMember(),
  ]);

  const currentMemberId = memberData?.user?.id;
  const isPublished = memberData?.member?.directoryOptIn === true;

  const criteria: DirectorySearchParams = {
    q: resolvedParams.q,
    expertise: resolvedParams.expertise,
    industry: resolvedParams.industry,
    page: resolvedParams.page ? Number(resolvedParams.page) : 1,
  };

  const result = await getPublicDirectory(criteria);

  return (
    <div className="space-y-5">
      {/* Page Header: Community breadcrumb + Title + Subtitle */}
      <DirectoryHeader />

      {/* Your Listing Banner */}
      <DirectoryListingBanner isPublished={isPublished} />

      {/* Search + Filters — single row matching the design */}
      <div className="flex flex-wrap items-center gap-3">
        <DirectorySearchInput defaultValue={resolvedParams.q || ""} />
        <DirectoryFilters
          activeCountry={resolvedParams.country || ""}
          activeExpertise={resolvedParams.expertise || ""}
          activeIndustry={resolvedParams.industry || ""}
          totalCount={result.total}
        />
      </div>

      {/* Trainer Grid with Suspense Streaming */}
      <Suspense
        fallback={
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            aria-busy="true"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <TrainerCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <TrainerGrid
          trainers={result.trainers}
          currentMemberId={currentMemberId}
        />
      </Suspense>

      {/* Pagination Bar */}
      <DirectoryPagination
        currentPage={result.page}
        totalPages={result.totalPages}
        searchParams={resolvedParams as Record<string, string>}
      />
    </div>
  );
}
