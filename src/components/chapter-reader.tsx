import { Keyboard, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useAtom, useAtomValue } from "jotai";
import { ChapterPage } from "./chapter-page";
import { ZoomLevelChanger } from "./zoom-level-changer";
import { FullScreenOverlay } from "./full-screen-overlay";
import { Fly } from "./fly";
import { PageNavigationButton } from "./page-navigation-button";
import { ToggleFullScreen } from "./toggle-full-screen";
import type { SwiperEvents } from "swiper/types";
import type { SwiperClass, SwiperRef } from "swiper/react";
import type { ComponentProps } from "react";
import type { MangaLanguage } from "@/types";
import { useChapterPageCounQuery } from "@/hooks/use-chapter-page-count-query";
import {
  isColoredAtom,
  isFullScreenAtom,
  isZoomedInAtom,
  orientationAtom,
} from "@/store/store";
import { useCanSwipe } from "@/hooks/use-can-swipe";
import { cn, getMaxPagesForChapter, preloadImage } from "@/lib/utils";
import { useReaderGestures } from "@/hooks/use-reader-gestures";

const route = getRouteApi("/(app)/");

type Props = {
  chapter: number;
  currentPage?: number;
  lang: MangaLanguage;
  swiperProps?: Pick<ComponentProps<typeof Swiper>, "onSlideChange">;
  onSlidePrevFirstPage?: (swiper: SwiperClass) => void;
  onSlideNextLastPage?: (swiper: SwiperClass) => void;
};

export function ChapterReader({
  chapter,
  currentPage = 1,
  lang,
  swiperProps,
  onSlidePrevFirstPage,
  onSlideNextLastPage,
}: Props) {
  const navigate = route.useNavigate();
  const pageCountQuery = useChapterPageCounQuery(chapter, lang);
  const [isPageZoomedIn, setIsPageZoomedIn] = useState<Record<number, boolean>>(
    {},
  );
  const [showOverlayUI, setShowOverlayUI] = useState(true);
  const canSwipe = useCanSwipe();
  const orientation = useAtomValue(orientationAtom);
  const isColored = useAtomValue(isColoredAtom);
  const isFullScreen = useAtomValue(isFullScreenAtom);
  const [isZoomedIn, setIsZoomedIn] = useAtom(isZoomedInAtom);

  const [swiper, setSwiper] = useState<SwiperClass>(); // used at wherever state is needed instead of ref
  const swiperRef = useRef<SwiperRef>(null);

  const pageCount = useMemo(
    () => pageCountQuery.data ?? getMaxPagesForChapter(chapter),
    [chapter, pageCountQuery.data],
  );

  const pages = useMemo(
    () =>
      Array.from({
        length: pageCount,
      }).map((_, pageIndex) => (
        <SwiperSlide
          key={pageIndex}
          lazy
          virtualIndex={pageIndex}
          className="h-full!"
        >
          <ChapterPage
            chapter={chapter}
            page={pageIndex + 1}
            lang={lang}
            isColored={isColored}
            isZoomedIn={isPageZoomedIn[pageIndex]}
            onDoubleTap={() => {
              setIsPageZoomedIn((prev) => ({
                ...prev,
                [pageIndex]: !prev[pageIndex],
              }));
            }}
          />
        </SwiperSlide>
      )),
    [chapter, isColored, isPageZoomedIn, lang, pageCount],
  );

  const onSlidePrevPage = () => {
    if (currentPage > 1) {
      swiperRef.current?.swiper.slidePrev();
    } else {
      if (chapter === 1) return;
      if (!swiperRef.current) return;

      onSlidePrevFirstPage?.(swiperRef.current.swiper);
    }
  };

  const onSlideNextPage = () => {
    // const isLastPage = currentPage === swiperRef.current?.swiper.slides.length;
    const isLastPage = currentPage === pageCount; // this is healthier

    if (!isLastPage) {
      swiperRef.current?.swiper.slideNext();
    } else {
      if (!swiperRef.current) return;

      onSlideNextLastPage?.(swiperRef.current.swiper);
    }
  };

  const resetZoom = () => {
    setIsPageZoomedIn({});
  };

  const onSlideChange = () => {
    resetZoom();
  };

  // Swiping is out of my control, I have to synchronize the search param this way I think
  const onTransitionEnd: SwiperEvents["transitionEnd"] = (swiper) => {
    navigate({
      search: (prev) => ({ ...prev, page: swiper.activeIndex + 1 }),
      replace: true, // more performant
    });
    swiperProps?.onSlideChange?.(swiper);
  };

  useReaderGestures(swiper, {
    onTap: () => setShowOverlayUI((prev) => !prev),
  });

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.allowTouchMove = canSwipe;
  }, [canSwipe]);

  useEffect(() => {
    setIsZoomedIn(Object.values(isPageZoomedIn).some(Boolean));
  }, [isPageZoomedIn, setIsZoomedIn]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetZoom();
  }, [chapter]);

  // When the next chapter has fewer pages, Swiper auto-swiped to the last page,
  // which overshadowed currentPage reset. (e.g. 670 -> 671)
  // So, instead of using useEffect, I now do this during rerender to
  // handle the state correctly before Swiper can interfere.

  // if (prevChapter.current !== chapter) {
  //   swiperRef.current!.swiper.slideTo(currentPage - 1);
  //   prevChapter.current = chapter;
  // }

  // ^ This was not ideal due to some reasons,
  // using onSlideChangeTransitionEnd instead of onTransitionEnd also solves the issue, so yay
  // now return back to using useEffect

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideTo(currentPage - 1);
  }, [currentPage]);

  useEffect(() => {
    navigate({
      search: (prev) => ({ ...prev, page: Math.min(prev.page, pageCount) }),
      replace: true,
    });
  }, [navigate, pageCount]);

  useEffect(() => {
    document.querySelectorAll(".swiper-slide").forEach((slideEl) => {
      const imgEl = slideEl.querySelector("img");
      const imgSrc = imgEl?.getAttribute("src");
      if (!imgSrc) return;
      preloadImage(imgSrc);
    });
  }, [chapter, currentPage, lang, isColored, pageCount, swiper]);

  return (
    <div
      className={cn(
        "relative h-full overflow-hidden",
        isFullScreen && "bg-background absolute inset-0 z-100",
      )}
    >
      <Fly
        show={isZoomedIn}
        from={{ y: "-100%" }}
        className="pointer-events-none absolute top-2.5 left-1/2 z-20 flex -translate-x-1/2 justify-center *:pointer-events-auto"
      >
        <ZoomLevelChanger />
      </Fly>

      {isFullScreen && <FullScreenOverlay show={showOverlayUI} />}

      <Fly
        from={{
          x: "-100%",
        }}
        show={showOverlayUI}
        className="peer/prev absolute top-1/2 left-0 z-10 -translate-y-1/2"
      >
        <PageNavigationButton direction="prev" onClick={onSlidePrevPage} />
      </Fly>
      <Fly
        from={{
          x: "100%",
        }}
        show={showOverlayUI}
        className="peer/next absolute top-1/2 right-0 z-10 -translate-y-1/2"
      >
        <PageNavigationButton direction="next" onClick={onSlideNextPage} />
      </Fly>
      <Fly
        from={{
          x: "100%",
          y: "100%",
        }}
        show={showOverlayUI}
        className="fixed right-0 bottom-0 z-100"
      >
        <ToggleFullScreen />
      </Fly>

      <Swiper
        {...swiperProps}
        key={orientation} // without this, things break when orientation changes
        ref={swiperRef}
        onSwiper={setSwiper}
        initialSlide={currentPage - 1}
        direction={orientation}
        lazyPreloadPrevNext={2}
        allowTouchMove // always allow touch move initially (beware that it seems that it is only used on initialization)
        modules={[Keyboard, Navigation, Virtual]}
        keyboard
        virtual
        className={cn(
          "h-full transition",
          orientation === "horizontal"
            ? "peer-hover/next:-translate-x-2 peer-hover/prev:translate-x-2"
            : "peer-hover/next:-translate-y-2 peer-hover/prev:translate-y-2",
        )}
        wrapperClass="will-change-transform" // this is game changer
        onSlideChange={onSlideChange}
        onSlideChangeTransitionEnd={onTransitionEnd}
      >
        {pages}
      </Swiper>
    </div>
  );
}
