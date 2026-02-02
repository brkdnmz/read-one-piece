import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { N_CHAPTERS } from "@/constants";

const route = getRouteApi("/(app)/");

export function ChapterSelector() {
  const navigate = useNavigate();
  const { chapter } = route.useSearch();

  return (
    <NativeSelect
      value={chapter}
      onChange={(e) => {
        const selectedChapter = Number(e.target.value);
        navigate({ to: "/", search: { chapter: selectedChapter } });
        // onChangeChapter(selectedChapter);
      }}
    >
      {Array.from({ length: N_CHAPTERS }).map((_, i) => (
        <NativeSelectOption key={i} value={i + 1}>
          {i + 1}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
