import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { MangaLanguage } from "@/types";
import { getChapterPageCount } from "@/api/api";

export function useChapterPageCounQuery(chapter: number, lang: MangaLanguage) {
  const queryClient = useQueryClient();

  useEffect(() => {
    Object.values(MangaLanguage).forEach((lang) => {
      queryClient.prefetchQuery({
        queryKey: ["chapter-page-count", chapter, lang],
        queryFn: () => getChapterPageCount(chapter, lang),
        staleTime: Infinity,
      });
    });
  }, [chapter, queryClient]);

  return useQuery({
    queryKey: ["chapter-page-count", chapter, lang],
    queryFn: () => getChapterPageCount(chapter, lang),
    staleTime: Infinity,
  });
}
