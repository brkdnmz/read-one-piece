import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import z from "zod";
import { useAtomValue } from "jotai";
import clsx from "clsx";
import "swiper/swiper-bundle.css";
import { languageAtom } from "@/store/store";
import { ChapterReader } from "@/components/chapter-reader";

export const Route = createFileRoute("/(app)/")({
  component: App,
  validateSearch: z.object({
    chapter: z.number().min(1).default(1).catch(1),
  }),
});

function App() {
  const navigate = Route.useNavigate();
  const { chapter: currentChapter } = Route.useSearch();
  const lang = useAtomValue(languageAtom);

  const swiperContainerRef = useRef<HTMLDivElement>(null);

  // const bind = useDrag(
  //   ({ tap, offset: [ox, oy] }) => {
  //     console.log(ox, oy);

  //     if (style.scale.get() === 1.5) {
  //       api.start({ x: ox, y: oy, immediate: true });
  //     }

  //     if (tap) {
  //       const now = Date.now();
  //       if (now - lastTap.current < 300) {
  //         const prevZoomedIn = style.scale.get() > 1;
  //         if (!prevZoomedIn) {
  //           api.start({ x: 0, y: 0, scale: 1.5 });
  //         } else {
  //           api.start({ x: 0, y: 0, scale: 1 });
  //         }
  //         if (swiperRef.current)
  //           swiperRef.current.swiper.allowTouchMove = prevZoomedIn;
  //         lastTap.current = 0;
  //       } else lastTap.current = now;
  //     }
  //   },
  //   {
  //     // target: swiperContainerRef,
  //     bounds: {
  //       left: (-imgRef.current?.clientWidth * 0.5) / 2,
  //       right: (imgRef.current?.clientWidth * 0.5) / 2,
  //       top: -imgRef.current?.clientHeight * 0.5,
  //       bottom: 0, // (swiperContainerRef.current?.clientHeight * 0.5) / 1.5,
  //     },
  //     from: () => [style.x.get(), style.y.get()],
  //   },
  // );

  return (
    <>
      {/* Without fallback, Await causes all components to disappear (Tanstack inserts "display: none" for some reason) */}
      {/* Using Suspense directly seems better actually, no need to pass fallback */}
      {/* <Await promise={actualPageCount} fallback={<div>Loading...</div>}>
        {(pageCount) => <div>{pageCount}</div>}
      </Await> */}
      <div className="flex h-full flex-col items-center gap-3">
        <div
          ref={swiperContainerRef}
          className={clsx("relative w-full flex-1")}
        >
          <ChapterReader
            chapter={currentChapter}
            lang={lang}
            onSlidePrevFirstPage={(swiper) => {
              if (window.confirm("Go to previous chapter?")) {
                swiper.slideTo(0);
                navigate({
                  search: { chapter: currentChapter - 1 },
                });
              }
            }}
            onSlideNextLastPage={(swiper) => {
              if (window.confirm("Go to next chapter?")) {
                swiper.slideTo(0);
                navigate({
                  search: { chapter: currentChapter + 1 },
                });
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
