import { useQuery } from "@tanstack/react-query";
import { getChapterPageCount } from "@/api/api";

export function useChapterPageCounQuery(chapter: number) {
  return useQuery({
    queryKey: ["chapter-page-count", chapter],
    queryFn: () => getChapterPageCount(chapter),
    staleTime: Infinity,
  });
}
