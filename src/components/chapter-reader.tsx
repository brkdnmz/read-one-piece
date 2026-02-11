import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { ChapterPage } from "./chapter-page";
import type { ComponentProps } from "react";
import type { SwiperClass, SwiperRef } from "swiper/react";
import { useChapterPageCounQuery } from "@/hooks/use-chapter-page-count-query";
import { currentPageAtom } from "@/store/store";
import OnePieceGun from "/one-piece-gun.png";
import { useCanSwipe } from "@/hooks/use-can-swipe";

type Props = {
  chapter: number;
  lang: "en" | "tr";
  swiperProps?: Pick<ComponentProps<typeof Swiper>, "onSlideChange">;
  onSlidePrevFirstPage?: (swiper: SwiperClass) => void;
  onSlideNextLastPage?: (swiper: SwiperClass) => void;
};

export function ChapterReader({
  chapter,
  lang,
  swiperProps,
  onSlidePrevFirstPage,
  onSlideNextLastPage,
}: Props) {
  const pageCountQuery = useChapterPageCounQuery(chapter);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const canSwipe = useCanSwipe();

  const swiperRef = useRef<SwiperRef>(null);

  // got annoyed by the useMemo warning, React Compiler does its job anyway
  const pages = Array.from({ length: pageCountQuery.data ?? 10 }).map(
    (_, pageIndex) => (
      <SwiperSlide key={pageIndex}>
        <ChapterPage
          chapter={chapter}
          page={pageIndex + 1}
          lang={lang}
          onZoomChange={(isZoomedIn) => {
            if (!swiperRef.current) return;
            swiperRef.current.swiper.allowTouchMove = !isZoomedIn && canSwipe;
          }}
        />
      </SwiperSlide>
    ),
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
    const isLastPage = currentPage === pageCountQuery.data; // this is healthier

    if (!isLastPage) {
      swiperRef.current?.swiper.slideNext();
    } else {
      if (!swiperRef.current) return;

      onSlideNextLastPage?.(swiperRef.current.swiper);
    }
  };

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.allowTouchMove = canSwipe;
  }, [canSwipe]);

  // Reset to page 1 when chapter changes
  useEffect(() => {
    swiperRef.current?.swiper.slideTo(0);
    setCurrentPage(1);
  }, [chapter, setCurrentPage]);

  // Slide to the current page when it changes (e.g., via page selector)
  // I think this will be unnecessarily called on slide changes too, but it's okay (I hope xd)
  useEffect(() => {
    swiperRef.current?.swiper.slideTo(currentPage - 1);
  }, [currentPage]);

  return (
    <Swiper
      ref={swiperRef}
      className="h-full touch-auto!"
      modules={[Keyboard, Navigation]}
      keyboard
      allowTouchMove // always allow touch move initially (beware that it seems that it is only used on initialization)
      {...swiperProps}
      onSlideChange={(swiper) => {
        setCurrentPage(swiper.activeIndex + 1);
        swiperProps?.onSlideChange?.(swiper);
      }}
      lazyPreloadPrevNext={2}
      wrapperClass="will-change-[transform]" // this is game changer
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
