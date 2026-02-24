import { useEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { isMobile } from "react-device-detect";
import type { MangaLanguage } from "@/types";
import { getChapterPageUrl } from "@/api/util";
import { cn } from "@/lib/utils";

type Props = {
  chapter: number;
  page: number;
  lang: MangaLanguage;
  onZoomChange?: (isZoomedIn: boolean) => void;
};

const DOUBLE_TAP_THRESHOLD = 300;
const SCALE_FACTOR = 2;
export function ChapterPage({ chapter, page, lang, onZoomChange }: Props) {
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [doubleTapPos, setDoubleTapPos] = useState<[number, number]>([0, 0]);
  const [scale, setScale] = useState({ width: 1, height: 1 });

  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lastTapRef = useRef(0);

  useGesture(
    {
      onDrag: ({ delta: [dx, dy], down }) => {
        if (!isZoomedIn || !down) return;

        imgContainerRef.current?.scrollBy({
          left: -dx,
          top: -dy,
          behavior: "instant",
        });
      },
    },
    {
      target: isMobile ? undefined : imgContainerRef,
    },
  );

  const onClickImage = (e: React.MouseEvent) => {
    // I handle double tap detection here
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_THRESHOLD) {
      setIsZoomedIn((prev) => !prev);
      onZoomChange?.(!isZoomedIn);
      setDoubleTapPos([e.clientX, e.clientY]);
      lastTapRef.current = 0; // Triple tap should not equal zoom in + out
    } else {
      lastTapRef.current = now;
    }
  };

  useEffect(() => {
    if (isZoomedIn) {
      if (!imgContainerRef.current) return;
      if (scale.width === 1 && scale.height === 1) return;

      const imgContainerRect = imgContainerRef.current.getBoundingClientRect();

      const prevImgHeight = imgContainerRef.current.scrollHeight / SCALE_FACTOR;
      const prevImgWidth = imgContainerRef.current.scrollWidth / SCALE_FACTOR;

      const leftDiff = (imgContainerRect.width - prevImgWidth) / 2;
      const topDiff = (imgContainerRect.height - prevImgHeight) / 2;

      imgContainerRef.current.scrollTo({
        left:
          (doubleTapPos[0] - imgContainerRect.left) * (scale.width - 1) -
          leftDiff,
        top:
          (doubleTapPos[1] - (imgContainerRect.top + topDiff)) *
            (SCALE_FACTOR - 1) -
          topDiff,
        behavior: "instant",
      });
    }
  }, [isZoomedIn, doubleTapPos, scale.width, scale.height]);

  useEffect(() => {
    if (!isZoomedIn) return;

    const updateScale = () => {
      if (!imgRef.current || !imgContainerRef.current) return;

      const imgRealRatio =
        imgRef.current.naturalWidth / imgRef.current.naturalHeight;
      const containerRatio =
        imgContainerRef.current.clientWidth /
        imgContainerRef.current.clientHeight;

      setScale({
        width: SCALE_FACTOR / Math.max(1, containerRatio / imgRealRatio),
        height: SCALE_FACTOR / Math.max(1, imgRealRatio / containerRatio),
      });
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(imgContainerRef.current!);
    return () => {
      observer.disconnect();
    };
  }, [isZoomedIn]);

  return (
    <div className="flex h-full w-full items-center justify-center select-none">
      <div
        ref={imgContainerRef}
        className={cn(
          "flex h-full w-full overflow-auto",
          isZoomedIn && "cursor-move overscroll-none", // disable pull-to-refresh when zoomed in
        )}
        onClick={onClickImage}
      >
        <img
          key={`chapter-${chapter}-page-${page}-${lang}`}
          src={getChapterPageUrl(chapter, page, lang)}
          alt={`Chapter ${chapter} Page ${page}`}
          ref={imgRef}
          className="m-auto h-0 min-h-full object-contain"
          style={{
            minHeight: isZoomedIn ? `${scale.height * 100}%` : undefined,
            minWidth: isZoomedIn ? `${scale.width * 100}%` : undefined,
          }}
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
  );
}
