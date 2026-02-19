import { getRouteApi } from "@tanstack/react-router";
import { PageSelector } from "./page-selector";
import { useChapterPageCounQuery } from "@/hooks/use-chapter-page-count-query";
import { getMaxPagesForChapter } from "@/lib/utils";

const route = getRouteApi("/(app)/");

export function PageTracker() {
  const { chapter, page } = route.useSearch();
  const navigate = route.useNavigate();
  const pageCountQuery = useChapterPageCounQuery(chapter);

  return (
    <div className="flex items-center text-sm transition">
      <PageSelector
        currentPage={page}
        nPages={pageCountQuery.data ?? getMaxPagesForChapter(chapter)}
        onChoosePage={(newPage) => {
          navigate({ search: (prev) => ({ ...prev, page: newPage }) });
        }}
      />
      /
      <span className="w-[2ch]">
        {pageCountQuery.data ? (
          pageCountQuery.data
        ) : (
          <span className="animate-pulse text-slate-400">...</span>
        )}
      </span>
    </div>
  );
}
