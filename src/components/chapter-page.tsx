import { useEffect, useRef, useState } from "react";
import { getChapterPageUrl } from "@/api/util";
import { cn } from "@/lib/utils";

type Props = {
  chapter: number;
  page: number;
  lang: "en" | "tr";
  onZoomChange?: (isZoomedIn: boolean) => void;
};

const DOUBLE_TAP_THRESHOLD = 300;
const SCALE_FACTOR = 2;

export function ChapterPage({ chapter, page, lang, onZoomChange }: Props) {
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [doubleTapPos, setTapPos] = useState<[number, number]>([0, 0]);

  const imgContainerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef(0);

  const onClickImage = (e: React.MouseEvent) => {
    // I handle double tap detection here
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_THRESHOLD) {
      setIsZoomedIn((prev) => !prev);
      setTapPos([e.clientX, e.clientY]);
      lastTapRef.current = 0; // Triple tap should not equal zoom in + out
    } else {
      lastTapRef.current = now;
    }
  };

  useEffect(() => {
    onZoomChange?.(isZoomedIn);
  }, [isZoomedIn, onZoomChange]);

  useEffect(() => {
    if (isZoomedIn) {
      if (!imgContainerRef.current) return;

      const imgContainerRect = imgContainerRef.current.getBoundingClientRect();

      // Scroll to where the user double tapped
      imgContainerRef.current.scrollTo({
        left: doubleTapPos[0] - imgContainerRect.left,
        top: doubleTapPos[1] - imgContainerRect.top,
        behavior: "instant",
      });
    }
  }, [isZoomedIn, doubleTapPos]);

  return (
    <div className="flex h-full w-full items-center justify-center select-none">
      <div
        ref={imgContainerRef}
        className={cn(
          "h-full overflow-auto max-sm:w-full",
          isZoomedIn && "overscroll-none", // disable pull-to-refresh when zoomed in
        )}
        onClick={onClickImage}
      >
        <img
          key={`chapter-${chapter}-page-${page}-${lang}`}
          src={getChapterPageUrl(chapter, page, lang)}
          alt={`Chapter ${chapter} Page ${page}`}
          className="h-0 min-h-full object-contain"
          style={{
            minHeight: isZoomedIn ? `${SCALE_FACTOR * 100}%` : undefined,
            minWidth: isZoomedIn ? `${SCALE_FACTOR * 100}%` : undefined,
          }}
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
  );
}
