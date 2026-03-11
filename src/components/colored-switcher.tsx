import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { isColoredAtom, languageAtom } from "@/store/store";
import { cn } from "@/lib/utils";
import { MangaLanguage } from "@/types";

const route = getRouteApi("/(app)/");

export function ColoredSwitcher() {
  const chapter = route.useSearch({ select: (search) => search.chapter });
  const lang = useAtomValue(languageAtom);
  const [isColored, setIsColored] = useAtom(isColoredAtom);

  const isTR = useMemo(() => lang === MangaLanguage.TR, [lang]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsColored((prev) => !prev)}
      disabled={isTR}
      title="Switch between colored and black & white"
    >
      <span
        className={cn(
          "icon-[noto--artist-palette] size-1/2 transition",
          ((!isTR && !isColored) || (isTR && chapter > 838)) && "grayscale",
        )}
      />
    </Button>
  );
}
