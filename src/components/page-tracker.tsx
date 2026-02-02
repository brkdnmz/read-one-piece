import { getRouteApi } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { currentPageAtom } from "@/store/store";
import { useChapterPageCounQuery } from "@/hooks/use-chapter-page-count-query";

const route = getRouteApi("/(app)/");

export function PageTracker() {
  const { chapter } = route.useSearch();
  // const { actualPageCount } = route.useLoaderData();
  const pageCountQuery = useChapterPageCounQuery(chapter);

  const [currentPage] = useAtom(currentPageAtom);

  return (
    <span className="text-sm tabular-nums">
      <span className="inline-block w-[2ch] text-right">{currentPage}</span>/
      {pageCountQuery.data ? (
        pageCountQuery.data
      ) : (
        <span className="animate-pulse text-slate-400">...</span>
      )}
      {/* <Await
        promise={actualPageCount}
        fallback={<span className="animate-pulse text-slate-400">...</span>}
      >
        {(pageCount) => <span>{pageCount}</span>}
      </Await> */}
    </span>
  );
}
