import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { useAtomValue } from "jotai";
import "swiper/swiper-bundle.css";
import { languageAtom } from "@/store/store";
import { ChapterReader } from "@/components/chapter-reader";

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

  return (
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
  );
}
