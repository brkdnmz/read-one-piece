import { apiClient } from "./client";
import { getChapterPageUrl } from "./util";

export const FIRST_CHAPTER_PAGES = 57;
export const MAX_PAGES_PER_CHAPTER = 30;

export async function getChapterPageCount(chapter: number): Promise<number> {
  if (chapter === 1) {
    return FIRST_CHAPTER_PAGES;
  }

  const responses = await Promise.all(
    Array.from({ length: MAX_PAGES_PER_CHAPTER }, (_, i) => {
      const pageUrl = getChapterPageUrl(chapter, i + 1);

      // I don't want it to throw error for any status code
      return apiClient.head(pageUrl, { validateStatus: () => true });
    }),
  );

  // this is pretty fast enough, no need to binary search
  for (let page = 0; page < MAX_PAGES_PER_CHAPTER; page++) {
    if (responses[page].status === 404) {
      return page;
    }
  }

  return MAX_PAGES_PER_CHAPTER; // should not reach here, unless Odacchi surprises us
}
