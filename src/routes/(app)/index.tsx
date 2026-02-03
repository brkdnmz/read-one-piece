import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import z from "zod";
import { useAtom } from "jotai";
import type { SwiperRef } from "swiper/react";
import "swiper/swiper-bundle.css";
import { currentPageAtom, languageAtom } from "@/store/store";
import { getChapterPageUrl } from "@/api/util";
import { useChapterPageCounQuery } from "@/hooks/use-chapter-page-count-query";
import OnePieceGun from "/one-piece-gun.png";

export const Route = createFileRoute("/(app)/")({
  component: App,
  validateSearch: z.object({
    chapter: z.number().min(1).default(1).catch(1),
  }),
  // loaderDeps: ({ search: { chapter } }) => ({ chapter }),
  // loader: ({ deps: { chapter } }) => {
  //   const pageCount = getChapterPageCount(chapter);
  //   return { guessedPageCount: 10, actualPageCount: pageCount };
  // },
});

function App() {
  const navigate = Route.useNavigate();
  const { chapter: currentChapter } = Route.useSearch();
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [lang] = useAtom(languageAtom);
  // const { guessedPageCount, actualPageCount } = Route.useLoaderData();
  const pageCountQuery = useChapterPageCounQuery(currentChapter);

  const swiperRef = useRef<SwiperRef>(null);

  /* 
    I think it's better that the page count is determined beforehand,
    because what if img couldn't be loaded due to other issues than 404?
  */
  // # of pages equals the last successfully loaded page (pageIndex is 0-indexed)
  // const onPageImageError = (pageIndex: number) => {
  //   // setPageCount((prev) => Math.min(prev, pageIndex));
  // };

  const onSlidePrevPage = () => {
    if (currentPage > 1) {
      swiperRef.current?.swiper.slidePrev();
    } else {
      swiperRef.current?.swiper.slideTo(0);
      navigate({
        search: { chapter: currentChapter - 1 },
      });
    }
  };

  const onSlideNextPage = () => {
    const isLastPage = currentPage === swiperRef.current?.swiper.slides.length;

    if (!isLastPage) {
      swiperRef.current?.swiper.slideNext();
    } else {
      swiperRef.current?.swiper.slideTo(0);
      navigate({ search: { chapter: currentChapter + 1 } });
    }
  };

  useEffect(() => {
    swiperRef.current?.swiper.slideTo(0);
    setCurrentPage(1);
  }, [currentChapter]);

  return (
    <>
      {/* Without fallback, Await causes all components to disappear (Tanstack inserts "display: none" for some reason) */}
      {/* Using Suspense directly seems better actually, no need to pass fallback */}
      {/* <Await promise={actualPageCount} fallback={<div>Loading...</div>}>
        {(pageCount) => <div>{pageCount}</div>}
      </Await> */}
      <div className="flex h-full flex-col items-center gap-3">
        <div className="relative w-full flex-1">
          <Swiper
            ref={swiperRef}
            className="h-full touch-auto!"
            modules={[Keyboard, Navigation]}
            keyboard
            allowTouchMove={false}
            lazyPreloadPrevNext={2}
            onSlideChange={(swiper) => {
              setCurrentPage(swiper.activeIndex + 1);
            }}
          >
            {Array.from({ length: pageCountQuery.data ?? 10 }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="flex h-full w-full items-center justify-center select-none">
                  <img
                    key={`chapter-${currentChapter}-page-${i + 1}-${lang}`}
                    src={getChapterPageUrl(currentChapter, i + 1, lang)}
                    alt={`Chapter ${currentChapter} Page ${i + 1}`}
                    className="h-0 min-h-full w-auto object-contain"
                    // loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

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
        </div>
      </div>
    </>
  );
}
