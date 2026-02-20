import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { GoToChapter } from "./go-to-chapter";
import { useChapterCount } from "@/hooks/use-chapter-count-query";

const route = getRouteApi("/(app)/");

export function ChapterSelector() {
  const navigate = useNavigate();
  const { chapter } = route.useSearch();
  const chapterCount = useChapterCount();

  const options = useMemo(
    () =>
      Array.from({ length: chapterCount }).map((_, i) => ({
        value: i + 1,
        label: String(i + 1),
      })),
    [chapterCount],
  );

  return (
    <div className="relative">
      <GoToChapter />

      {/* Having this many options causes significant transition performance drops, speficially the 'color' transition */}
      {/* Even parents must not have a color transition as NativeSelect would inherit that */}
      {/* So, I had to find a hacky solution for that:) Works well enough */}
      <span className="pointer-events-none absolute top-1/2 left-1/2 z-1 -translate-1/2 text-sm transition">
        {chapter}
      </span>

      <NativeSelect
        value={chapter}
        onChange={(e) => {
          const selectedChapter = Number(e.target.value);
          navigate({ to: "/", search: { chapter: selectedChapter } });
        }}
        className="w-15 px-2 py-0 text-center text-transparent transition-[background-color,border-color]"
        showArrow={false}
      >
        {options.map(({ label, value }) => (
          <NativeSelectOption key={value} value={value}>
            {label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
