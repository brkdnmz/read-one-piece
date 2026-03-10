import {
  ESTIMATED_CHAPTER_COUNT,
  FIRST_CHAPTER_PAGES,
  MAX_PAGES_PER_CHAPTER,
} from "../constants";
import { MangaLanguage } from "../types";
import { apiClient } from "./client";

export async function getChapterCount(): Promise<number> {
  return await apiClient
    .get("/chapter-count")
    .then((res) => res.data.count)
    .catch(() => ESTIMATED_CHAPTER_COUNT);
}

export async function getChapterPageCount(
  chapter: number,
  lang: MangaLanguage,
): Promise<number> {
  if (chapter === 1 && lang === MangaLanguage.EN) {
    return FIRST_CHAPTER_PAGES;
  }

  return await apiClient
    .get("/page-count", {
      // I require the page param also, don't you dare question
      params: { chapter, page: 1, lang },
    })
    .then((res) => res.data.count - +(lang === MangaLanguage.TR))
    .catch(() => MAX_PAGES_PER_CHAPTER);
}
