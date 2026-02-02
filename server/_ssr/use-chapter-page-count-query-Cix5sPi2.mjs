import { u as useQuery } from "../_chunks/_libs/@tanstack/react-query.mjs";
import { A as Axios } from "../_libs/axios.mjs";
import { a as atom } from "../_libs/jotai.mjs";
const OnePieceGun = "/read-one-piece/one-piece-gun.png";
const currentPageAtom = atom(1);
const apiBaseUrl = "https://straw-hat.brkdnmz99.workers.dev";
const apiClient = new Axios({
  baseURL: apiBaseUrl
});
function getChapterPageUrl(chapter, page) {
  const chapterSegment = `1${chapter.toString().padStart(4, "0")}000`;
  const url = new URL(
    `/file/mangap/2/${chapterSegment}/${page}.jpeg`,
    apiBaseUrl
  );
  return url.toString();
}
const FIRST_CHAPTER_PAGES = 57;
const MAX_PAGES_PER_CHAPTER = 30;
async function getChapterPageCount(chapter) {
  if (chapter === 1) {
    return FIRST_CHAPTER_PAGES;
  }
  const responses = await Promise.all(
    Array.from({ length: MAX_PAGES_PER_CHAPTER }, (_, i) => {
      const pageUrl = getChapterPageUrl(chapter, i + 1);
      return apiClient.head(pageUrl, { validateStatus: () => true });
    })
  );
  for (let page = 0; page < MAX_PAGES_PER_CHAPTER; page++) {
    if (responses[page].status === 404) {
      return page;
    }
  }
  return MAX_PAGES_PER_CHAPTER;
}
function useChapterPageCounQuery(chapter) {
  return useQuery({
    queryKey: ["chapter-page-count", chapter],
    queryFn: () => getChapterPageCount(chapter),
    staleTime: Infinity
  });
}
export {
  OnePieceGun as O,
  currentPageAtom as c,
  getChapterPageUrl as g,
  useChapterPageCounQuery as u
};
