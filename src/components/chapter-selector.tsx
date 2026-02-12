import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { Button } from "./ui/button";
import { N_CHAPTERS } from "@/constants";

const route = getRouteApi("/(app)/");

export function ChapterSelector() {
  const navigate = useNavigate();
  const { chapter } = route.useSearch();

  const options = useMemo(
    () =>
      Array.from({ length: N_CHAPTERS }).map((_, i) => ({
        value: i + 1,
        label: String(i + 1),
      })),
    [],
  );

  const onClickGoTo = () => {
    let enteredValidChapter = false;

    do {
      const newChapter = window.prompt(
        "Enter chapter number (1-" + N_CHAPTERS + "):",
        chapter,
      );
      if (newChapter) {
        const selectedChapter = Number(newChapter);

        if (
          !isNaN(selectedChapter) &&
          selectedChapter >= 1 &&
          selectedChapter <= N_CHAPTERS
        ) {
          navigate({ to: "/", search: { chapter: selectedChapter } });
          enteredValidChapter = true;
        }
      }
    } while (!enteredValidChapter);
  };

  return (
    <div className="relative">
      <Button
        className="absolute inset-x-0 top-full mt-1 h-fit py-1 text-center text-xs italic"
        variant="secondary"
        size="xs"
        onClick={onClickGoTo}
      >
        Go to...
      </Button>
      <NativeSelect
        value={chapter}
        onChange={(e) => {
          const selectedChapter = Number(e.target.value);
          navigate({ to: "/", search: { chapter: selectedChapter } });
        }}
        className="w-15 px-2 py-0 text-center"
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
