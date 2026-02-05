import { animated, config, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { getChapterPageUrl } from "@/api/util";

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
  const [tapPos, setTapPos] = useState<[number, number]>([0, 0]);
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1, // Scaling is laggy on mobile, but ignoring it for now
    config: {
      ...config.stiff,
    },
  }));

  const imgRef = useRef<HTMLImageElement>(null);
  const lastTapRef = useRef(0);

  const bind = useGesture(
    {
      onDrag: ({ tap, down, offset: [ox, oy], xy }) => {
        if (tap) {
          // Handle double tap for zooming
          const now = Date.now();
          if (now - lastTapRef.current < DOUBLE_TAP_THRESHOLD) {
            setIsZoomedIn((prev) => !prev);
            setTapPos(xy);
            lastTapRef.current = 0; // Triple tap should not equal zoom in + out
          } else {
            lastTapRef.current = now;
          }
        } else {
          if (!isZoomedIn) return;

          api.start({ x: ox, y: oy, immediate: down });
        }
      },
    },
    {
      drag: {
        filterTaps: true,
        from: () => [style.x.get(), style.y.get()],
        bounds: () => {
          if (!imgRef.current) return { left: 0, right: 0, top: 0, bottom: 0 };

          const rect = imgRef.current.getBoundingClientRect();
          const scaledWidth = rect.width * SCALE_FACTOR;
          const scaledHeight = rect.height * SCALE_FACTOR;

          /*
            Transform origin is top center, so I calculated these based on that
          */
          return {
            left: -(scaledWidth - rect.width) / SCALE_FACTOR,
            right: 0, // (scaledWidth - rect.width) / SCALE_FACTOR / 2,
            top: -(scaledHeight - rect.height) / SCALE_FACTOR,
            bottom: 0, // (scaledHeight - rect.height) / SCALE_FACTOR / 2,
          };
        },
        rubberband: true,
      },
    },
  );

  useEffect(() => {
    if (!isZoomedIn) api.start({ x: 0, y: 0, scale: 1 });
    else {
      api.start({
        x: -(tapPos[0] - (imgRef.current?.getBoundingClientRect().left ?? 0)),
        y: -(tapPos[1] - (imgRef.current?.getBoundingClientRect().top ?? 0)),
        scale: SCALE_FACTOR,
      });
    }
  }, [isZoomedIn, api, tapPos]);

  useEffect(() => {
    onZoomChange?.(isZoomedIn);
  }, [isZoomedIn, onZoomChange]);

  return (
    <animated.div className="flex h-full w-full items-center justify-center select-none">
      <animated.img
        key={`chapter-${chapter}-page-${page}-${lang}`}
        src={getChapterPageUrl(chapter, page, lang)}
        alt={`Chapter ${chapter} Page ${page}`}
        {...bind()}
        ref={imgRef}
        className={clsx(
          "h-0 min-h-full origin-top-left object-contain will-change-transform",
          isZoomedIn && "touch-none",
        )}
        style={style}
        loading="lazy"
        draggable={false}
      />
    </animated.div>
  );
}
