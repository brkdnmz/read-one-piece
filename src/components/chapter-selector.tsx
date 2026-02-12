import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { GoToChapter } from "./go-to-chapter";
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

  return (
    <div className="relative">
      <GoToChapter />
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
