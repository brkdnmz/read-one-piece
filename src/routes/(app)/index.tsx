import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { useAtomValue, useSetAtom } from "jotai";
import "swiper/swiper-bundle.css";
import { useEffect } from "react";
import { isFullScreenAtom, languageAtom } from "@/store/store";
import { ChapterReader } from "@/components/chapter-reader";

export const Route = createFileRoute("/(app)/")({
  component: App,
  validateSearch: z.object({
    chapter: z.number().min(1).default(1).catch(1),
    page: z.number().min(1).default(1).catch(1),
  }),
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ deps: { search } }) => ({ search }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Read One Piece${import.meta.env.DEV ? " (Dev)" : ""} | Ch. ${loaderData?.search.chapter}`,
      },
    ],
  }),
});

function App() {
  const { chapter, page } = Route.useSearch();
  const navigate = Route.useNavigate();
  const lang = useAtomValue(languageAtom);
  const setIsFullScreen = useSetAtom(isFullScreenAtom);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") {
        setIsFullScreen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsFullScreen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [setIsFullScreen]);

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
