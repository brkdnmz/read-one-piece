import { apiClient } from "./client";
import { getChapterPageUrl } from "./util";
import { FIRST_CHAPTER_PAGES, MAX_PAGES_PER_CHAPTER } from "@/constants";

export async function getChapterPageCount(chapter: number): Promise<number> {
  if (chapter === 1) {
    return FIRST_CHAPTER_PAGES;
  }

  let l = 0;
  let r = MAX_PAGES_PER_CHAPTER - 1;

  while (l < r) {
    const mid = Math.floor((l + r + 1) / 2);
    const pageUrl = getChapterPageUrl(chapter, mid + 1);

    // I don't want it to throw error for any status code
    const res = await apiClient.head(pageUrl, { validateStatus: () => true });

    if (res.status === 404) {
      r = mid - 1;
    } else {
      l = mid;
    }
  }

  return l + 1;
}
