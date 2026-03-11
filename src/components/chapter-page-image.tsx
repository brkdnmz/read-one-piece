import { useState } from "react";
import type { Ref } from "react";
import type { MangaLanguage } from "@/types";
import { getChapterPageUrl } from "@/api/util";
import LuffyRunningAnimation from "/luffy-running-animation.webp";

type Props = {
  imgRef: Ref<HTMLImageElement>;
  chapter: number;
  page: number;
  lang: MangaLanguage;
  isColored?: boolean;
};

export function ChapterPageImage({
  imgRef,
  chapter,
  page,
  lang,
  isColored,
}: Props) {
  return (
    <KeyedInnerComponent
      key={`chapter-${chapter}-page-${page}-${lang}-${isColored ? "colored" : "bw"}`}
      imgRef={imgRef}
      chapter={chapter}
      page={page}
      lang={lang}
      isColored={isColored}
    />
  );
}

function KeyedInnerComponent({
  imgRef,
  chapter,
  page,
  lang,
  isColored,
}: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      <img
        ref={imgRef}
        src={getChapterPageUrl(chapter, page, lang, isColored)}
        alt={`Chapter ${chapter} Page ${page}`}
        className="m-auto h-0 min-h-full object-contain"
        loading="lazy"
        draggable={false}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgLoaded(true)}
      />

      {!imgLoaded && (
        <img
          src={LuffyRunningAnimation}
          alt="Loading..."
          className="absolute top-1/2 left-1/2 h-16 -translate-1/2"
        />
      )}
    </>
  );
}
