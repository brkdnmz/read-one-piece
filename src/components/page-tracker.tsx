import { getRouteApi } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { PageSelector } from "./page-selector";
import { currentPageAtom } from "@/store/store";
import { useChapterPageCounQuery } from "@/hooks/use-chapter-page-count-query";

const route = getRouteApi("/(app)/");

export function PageTracker() {
  const { chapter } = route.useSearch();
  // const { actualPageCount } = route.useLoaderData();
  const pageCountQuery = useChapterPageCounQuery(chapter);

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  return (
    <div className="flex items-center text-sm">
      {/* <span className="inline-block w-[2ch] text-right">{currentPage}</span> */}
      <PageSelector
        currentPage={currentPage}
        nPages={pageCountQuery.data ?? 10}
        onChoosePage={(page) => {
          setCurrentPage(page);
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
      {/* <Await
        promise={actualPageCount}
        fallback={<span className="animate-pulse text-slate-400">...</span>}
      >
        {(pageCount) => <span>{pageCount}</span>}
      </Await> */}
    </div>
  );
}
