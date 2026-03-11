import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDrag } from "@use-gesture/react";
import { isMobile } from "react-device-detect";
import type { MangaLanguage } from "@/types";
import { getChapterPageUrl } from "@/api/util";
import { cn } from "@/lib/utils";
import { usePreferredZoomLevel } from "@/store/store";
import { DOUBLE_TAP_THRESHOLD_MS } from "@/constants";
import LuffyRunningAnimation from "/luffy-running-animation.webp";

type Props = {
  chapter: number;
  page: number;
  lang: MangaLanguage;
  isColored?: boolean;
  isZoomedIn?: boolean;
  onDoubleTap?: () => void;
};

export function ChapterPage({
  chapter,
  page,
  lang,
  isColored,
  isZoomedIn,
  onDoubleTap,
}: Props) {
  const preferredZoomLevel = usePreferredZoomLevel();
  const zoomLevel = useMemo(
    () => (isZoomedIn ? preferredZoomLevel : 1),
    [isZoomedIn, preferredZoomLevel],
  );
  const [imgLoaded, setImgLoaded] = useState(false);

  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lastTapRef = useRef(0);
  const zoomOriginPosRef = useRef<
    [xNorm: number, yNorm: number, x: number, y: number]
  >([0, 0, 0, 0]);
  const isDraggingRef = useRef(false);
  const scrollTimeoutRef = useRef(0);

  const recalculateZoomOriginPos = useCallback(() => {
    if (!isZoomedIn) return;
    if (!imgRef.current) return;
    if (!imgContainerRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();
    const containerRect = imgContainerRef.current.getBoundingClientRect();

    const xNorm =
      (containerRect.left + containerRect.width / 2 - imgRect.left) /
      imgRect.width;
    const yNorm =
      (containerRect.top + containerRect.height / 2 - imgRect.top) /
      imgRect.height;
    const x = xNorm * imgRect.width + imgRect.left;
    const y = yNorm * imgRect.height + imgRect.top;

    zoomOriginPosRef.current = [xNorm, yNorm, x, y];
  }, [isZoomedIn]);

  useDrag(
    ({ delta: [dx, dy], tap, last }) => {
      if (!imgContainerRef.current) return;

      isDraggingRef.current = !tap && !last;

      imgContainerRef.current.scrollLeft -= dx;
      imgContainerRef.current.scrollTop -= dy;
      recalculateZoomOriginPos();
    },
    {
      enabled: !isMobile && !!isZoomedIn,
      target: imgContainerRef,
      filterTaps: true,
      eventOptions: { passive: false },
    },
  );

  const onDoubleClickImage = useCallback(
    (e: React.MouseEvent) => {
      onDoubleTap?.();
      if (!imgRef.current) return;
      const imgRect = imgRef.current.getBoundingClientRect();
      zoomOriginPosRef.current = [
        (e.clientX - imgRect.left) / imgRect.width,
        (e.clientY - imgRect.top) / imgRect.height,
        e.clientX,
        e.clientY,
      ];
    },
    [onDoubleTap],
  );

  const onClickImage = useCallback(
    (e: React.MouseEvent) => {
      // I handle double tap detection here
      const now = Date.now();
      if (now - lastTapRef.current < DOUBLE_TAP_THRESHOLD_MS) {
        onDoubleClickImage(e);
        lastTapRef.current = 0; // Triple tap should not equal zoom in + out
      } else {
        lastTapRef.current = now;
      }
    },
    [onDoubleClickImage],
  );

  useEffect(() => {
    setImgLoaded(false);
  }, [chapter, page, isColored, lang]);

  useLayoutEffect(() => {
    const scrollAfterScale = () => {
      // recalculateZoomOriginPos();
      if (!imgContainerRef.current) return;
      if (!imgRef.current) return;

      const imgRect = imgRef.current.getBoundingClientRect();

      // Thanks ChatGPT, unlike scrollBy, this works the same on non-iOS and iOS
      // (at least I found these really really complex calculations by myself...)
      imgContainerRef.current.scrollLeft +=
        imgRect.left +
        zoomOriginPosRef.current[0] * imgRect.width -
        zoomOriginPosRef.current[2];
      imgContainerRef.current.scrollTop +=
        imgRect.top +
        zoomOriginPosRef.current[1] * imgRect.height -
        zoomOriginPosRef.current[3];

      // imgContainerRef.current.scrollBy({
      //   left:
      //     imgRect.left +
      //     zoomOriginPosRef.current[0] * imgRect.width -
      //     zoomOriginPosRef.current[2],
      //   top:
      //     imgRect.top +
      //     zoomOriginPosRef.current[1] * imgRect.height -
      //     zoomOriginPosRef.current[3],
      //   behavior: "instant",
      // });

      recalculateZoomOriginPos();
    };

    const updateScale = () => {
      if (!imgRef.current || !imgContainerRef.current) return;
      if (isDraggingRef.current) return;

      const imgRealRatio =
        imgRef.current.naturalWidth / imgRef.current.naturalHeight;
      const containerRatio =
        imgContainerRef.current.clientWidth /
        imgContainerRef.current.clientHeight;

      imgRef.current.style.minWidth = `${(zoomLevel / Math.max(1, containerRatio / imgRealRatio)) * 100}%`;
      imgRef.current.style.minHeight = `${(zoomLevel / Math.max(1, imgRealRatio / containerRatio)) * 100}%`;

      scrollAfterScale();
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(imgContainerRef.current!);

    const imgEl = imgRef.current;
    imgEl?.addEventListener("load", updateScale);

    return () => {
      observer.disconnect();
      imgEl?.removeEventListener("load", updateScale);
    };
  }, [isZoomedIn, recalculateZoomOriginPos, zoomLevel, lang, isColored]);

  return (
    <div className="flex h-full w-full items-center justify-center select-none">
      <div
        ref={imgContainerRef}
        className={cn(
          "relative flex h-full w-full overflow-auto",
          isZoomedIn && "cursor-move",
        )}
        onClick={onClickImage}
        // onScrollEnd is not that supported yet
        // I found this workaround here, ironic but useful: https://developer.chrome.com/blog/scrollend-a-new-javascript-event
        onScroll={() => {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = window.setTimeout(() => {
            recalculateZoomOriginPos();
          }, 100);
        }}
      >
        <img
          key={`chapter-${chapter}-page-${page}-${lang}-${isColored}`}
          src={getChapterPageUrl(chapter, page, lang, isColored)}
          alt={`Chapter ${chapter} Page ${page}`}
          ref={imgRef}
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
      </div>
    </div>
  );
}
