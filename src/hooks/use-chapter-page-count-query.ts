import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { MangaLanguage } from "@/types";
import { getChapterPageCount } from "@/api/api";

export function useChapterPageCounQuery(
  chapter: number,
  lang: MangaLanguage,
  isColored: boolean = false,
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    Object.values(MangaLanguage).forEach((lang) => {
      queryClient.prefetchQuery({
        queryKey: ["chapter-page-count", chapter, lang, isColored],
        queryFn: () => getChapterPageCount(chapter, lang, isColored),
        staleTime: Infinity,
      });
    });
  }, [chapter, isColored, queryClient]);

  return useQuery({
    queryKey: ["chapter-page-count", chapter, lang, isColored],
    queryFn: () => getChapterPageCount(chapter, lang, isColored),
    staleTime: Infinity,
  });
}
