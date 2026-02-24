import { useSetAtom } from "jotai";
import { Button } from "./ui/button";
import {
  preferredZoomLevelIndexAtom,
  usePreferredZoomLevel,
} from "@/store/store";
import { AVAILABLE_ZOOM_LEVELS } from "@/constants";

export function ZoomLevelChanger() {
  const zoomLevel = usePreferredZoomLevel();
  const setZoomLevelIndex = useSetAtom(preferredZoomLevelIndexAtom);

  return (
    <Button
      variant="outline"
      className="bg-background/40! text-2xs aspect-square size-8! rounded-full border-slate-600! p-2"
      onClick={() => {
        setZoomLevelIndex((prev) => (prev + 1) % AVAILABLE_ZOOM_LEVELS.length);
      }}
    >
      {zoomLevel}×
    </Button>
  );
}
