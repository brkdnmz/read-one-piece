import { Keyboard, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { ChapterPage } from "./chapter-page";
import type { SwiperEvents } from "swiper/types";
import type { SwiperClass, SwiperRef } from "swiper/react";
import type { ComponentProps } from "react";
import { useChapterPageCounQuery } from "@/hooks/use-chapter-page-count-query";
import { isZoomedInAtom } from "@/store/store";
import OnePieceGun from "/one-piece-gun.png";
import { useCanSwipe } from "@/hooks/use-can-swipe";
import { getMaxPagesForChapter } from "@/lib/utils";

const route = getRouteApi("/(app)/");

type Props = {
  chapter: number;
  currentPage?: number;
  lang: "en" | "tr";
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
  const pageCountQuery = useChapterPageCounQuery(chapter);
  const canSwipe = useCanSwipe();
  const setIsZoomedIn = useSetAtom(isZoomedInAtom);

  const swiperRef = useRef<SwiperRef>(null);

  // got annoyed by the useMemo warning, React Compiler does its job anyway
  const pages = Array.from({
    length: pageCountQuery.data ?? getMaxPagesForChapter(chapter),
  }).map((_, pageIndex) => (
    <SwiperSlide key={pageIndex} lazy virtualIndex={pageIndex}>
      <ChapterPage
        chapter={chapter}
        page={pageIndex + 1}
        lang={lang}
        onZoomChange={(isZoomedIn) => {
          if (!swiperRef.current) return;
          setIsZoomedIn(isZoomedIn);
        }}
      />
    </SwiperSlide>
  ));

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
    const isLastPage = currentPage === pageCountQuery.data; // this is healthier

    if (!isLastPage) {
      swiperRef.current?.swiper.slideNext();
    } else {
      if (!swiperRef.current) return;

      onSlideNextLastPage?.(swiperRef.current.swiper);
    }
  };

  // Swiping is out of my control, I have to synchronize the search param this way I think
  const onSlideChange: SwiperEvents["slideChange"] = (swiper) => {
    navigate({
      search: (prev) => ({ ...prev, page: swiper.activeIndex + 1 }),
      replace: true, // more performant
    });
    swiperProps?.onSlideChange?.(swiper);
  };

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.allowTouchMove = canSwipe;
  }, [canSwipe]);

  // Slide to the current page when it changes (e.g., via page selector)
  // I think this will be unnecessarily called on slide changes too, but it's okay (I hope xd)
  useEffect(() => {
    swiperRef.current?.swiper.slideTo(currentPage - 1);
  }, [currentPage]);

  return (
    <Swiper
      {...swiperProps}
      ref={swiperRef}
      initialSlide={currentPage - 1}
      lazyPreloadPrevNext={2}
      allowTouchMove // always allow touch move initially (beware that it seems that it is only used on initialization)
      modules={[Keyboard, Navigation, Virtual]}
      keyboard
      virtual={{
        addSlidesBefore: 3,
        addSlidesAfter: 3,
      }}
      className="h-full touch-auto!"
      wrapperClass="will-change-transform" // this is game changer
      onSlideChange={onSlideChange}
    >
      {pages}

      {/* Slide prev */}
      <div
        className="bg-foreground/5 absolute inset-y-0 left-0 z-10 flex w-[10vw] items-center justify-center opacity-0 transition-opacity select-none hover:opacity-100"
        onClick={onSlidePrevPage}
      >
        <img src={OnePieceGun} className="w-1/2" />
      </div>

      {/* Slide next */}
      <div
        className="bg-foreground/5 absolute inset-y-0 right-0 z-10 flex w-[10vw] items-center justify-center opacity-0 transition-opacity select-none hover:opacity-100"
        onClick={onSlideNextPage}
      >
        <img src={OnePieceGun} className="w-1/2 rotate-y-180" />
      </div>
    </Swiper>
  );
}
