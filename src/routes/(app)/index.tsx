import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { useAtomValue } from "jotai";
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

  return (
    <div
      className={cn(
        "h-full",
        isFullScreen && "bg-background absolute inset-0 z-100",
      )}
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
  );
}
