import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "./ui/button";
import {
  isZoomedInAtom,
  preferredZoomLevelIndexAtom,
  usePreferredZoomLevel,
} from "@/store/store";
import { AVAILABLE_ZOOM_LEVELS } from "@/constants";
import { cn } from "@/lib/utils";

export function ZoomLevelChanger() {
  const isZoomedIn = useAtomValue(isZoomedInAtom);
  const zoomLevel = usePreferredZoomLevel();
  const setZoomLevelIndex = useSetAtom(preferredZoomLevelIndexAtom);

  return (
    <Button
      variant="outline"
      className={cn(
        "bg-background/40! text-2xs aspect-square size-8! rounded-full border-slate-600! p-2",
        !isZoomedIn && "pointer-events-none opacity-0",
      )}
      onClick={() => {
        setZoomLevelIndex((prev) => (prev + 1) % AVAILABLE_ZOOM_LEVELS.length);
      }}
    >
      {zoomLevel}×
    </Button>
  );
}
