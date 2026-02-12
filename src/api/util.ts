import { apiBaseUrl } from "./client";

export function getChapterPageUrl(
  chapter: number,
  page: number,
  lang: "tr" | "en" = "en",
): string {
  switch (lang) {
    case "en": {
      // const chapterSegment = `1${chapter.toString().padStart(4, "0")}000`;

      // const url = new URL(
      //   `/file/mangap/2/${chapterSegment}/${page}.jpeg`,
      //   apiBaseUrl,
      // );

      const url = new URL(apiBaseUrl);

      url.searchParams.append("chapter", chapter.toString());
      url.searchParams.append("page", page.toString());

      return url.toString();
    }

    case "tr": {
      // https://mangadenizi.net/uploads/manga/one-piece-renkli/chapters/0479/03.webp
      // https://mangadenizi.net/uploads/manga/one-piece-renkli/chapters/667/03.webp
      if (chapter <= 838) {
        const chapterSegment =
          chapter <= 666 ? chapter.toString().padStart(4, "0") : chapter;

        const url = new URL(
          `https://mangadenizi.net/uploads/manga/one-piece-renkli/chapters/${chapterSegment}/${(
            page + 1
          ) // first page is not part of the manga
            .toString()
            .padStart(2, "0")}.webp`,
          apiBaseUrl,
        );

        return url.toString();
      } else {
        // I put else for clarity, it returns in if block anyway
        // https://mangadenizi.net/uploads/manga/one-piece/chapters/0771/02.webp
        const chapterSegment = chapter.toString().padStart(4, "0");

        const url = new URL(
          `https://mangadenizi.net/uploads/manga/one-piece/chapters/${chapterSegment}/${(
            page + 1
          ) // first page is not part of the manga
            .toString()
            .padStart(2, "0")}.webp`,
          apiBaseUrl,
        );

        return url.toString();
      }
    }
    default:
      return "unknown"; // unreachable
  }
}
