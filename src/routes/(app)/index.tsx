import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import z from "zod";
import { useAtomValue } from "jotai";
import clsx from "clsx";
import "swiper/swiper-bundle.css";
import { isFullScreenAtom, languageAtom } from "@/store/store";
import { ChapterReader } from "@/components/chapter-reader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(app)/")({
  component: App,
  validateSearch: z.object({
    chapter: z.number().min(1).default(1).catch(1),
    page: z.number().min(1).default(1).catch(1),
  }),
});

function App() {
  const { chapter, page } = Route.useSearch();
  const navigate = Route.useNavigate();
  const lang = useAtomValue(languageAtom);
  const isFullScreen = useAtomValue(isFullScreenAtom);

  const swiperContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Without fallback, Await causes all components to disappear (Tanstack inserts "display: none" for some reason) */}
      {/* Using Suspense directly seems better actually, no need to pass fallback */}
      {/* <Await promise={actualPageCount} fallback={<div>Loading...</div>}>
        {(pageCount) => <div>{pageCount}</div>}
      </Await> */}
      <div
        className={cn(
          "flex h-full w-auto flex-col items-center gap-3",
          isFullScreen && "bg-background absolute inset-0 z-100",
        )}
      >
        <div
          ref={swiperContainerRef}
          className={clsx("relative w-full flex-1")}
        >
          <ChapterReader
            chapter={chapter}
            currentPage={page}
            lang={lang}
            onSlidePrevFirstPage={() => {
              if (window.confirm("Go to previous chapter?")) {
                navigate({
                  search: { chapter: chapter - 1, page: 1 },
                });
              }
            }}
            onSlideNextLastPage={() => {
              if (window.confirm("Go to next chapter?")) {
                navigate({
                  search: { chapter: chapter + 1, page: 1 },
                });
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
