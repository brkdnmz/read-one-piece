import { useQuery } from "@tanstack/react-query";
import { getChapterCount } from "@/api/api";
import { ESTIMATED_CHAPTER_COUNT } from "@/constants";

export function useChapterCount() {
  const query = useQuery({
    queryKey: ["chapter-count"],
    queryFn: getChapterCount,
    staleTime: Infinity,
  });

  return query.data ?? ESTIMATED_CHAPTER_COUNT;
}
