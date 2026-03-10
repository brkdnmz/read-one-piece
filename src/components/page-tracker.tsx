import { getRouteApi } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { PageSelector } from "./page-selector";
import { useChapterPageCounQuery } from "@/hooks/use-chapter-page-count-query";
import { getMaxPagesForChapter } from "@/lib/utils";
import { languageAtom } from "@/store/store";

const route = getRouteApi("/(app)/");

export function PageTracker() {
  const { chapter, page } = route.useSearch();
  const navigate = route.useNavigate();
  const lang = useAtomValue(languageAtom);
  const pageCountQuery = useChapterPageCounQuery(chapter, lang);

  return (
    <div className="flex items-center text-sm">
      <PageSelector
        currentPage={page}
        nPages={pageCountQuery.data ?? getMaxPagesForChapter(chapter)}
        onChoosePage={(newPage) => {
          navigate({ search: (prev) => ({ ...prev, page: newPage }) });
        }}
      />
      <span className="transition">
        /
        <span className="inline-block w-[2ch]">
          {pageCountQuery.data ? (
            pageCountQuery.data
          ) : (
            <span className="animate-pulse text-slate-400">...</span>
          )}
        </span>
      </span>
    </div>
  );
}
