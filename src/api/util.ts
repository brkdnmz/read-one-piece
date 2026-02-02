import { apiBaseUrl } from "./client";

export function getChapterPageUrl(chapter: number, page: number): string {
  const chapterSegment = `1${chapter.toString().padStart(4, "0")}000`;

  const url = new URL(
    `/file/mangap/2/${chapterSegment}/${page}.jpeg`,
    apiBaseUrl,
  );

  return url.toString();
}
