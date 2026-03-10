import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { preferencesAtom } from "@/store/preferences";
import { isFullScreenAtom } from "@/store/store";

export function FullScreenManager() {
  const isFullScreen = useAtomValue(isFullScreenAtom);
  const preferences = useAtomValue(preferencesAtom);

  useEffect(() => {
    if (!document.fullscreenEnabled) return;

    if (preferences.useFullscreenApi) {
      if (isFullScreen) {
        document.body.requestFullscreen();
      }
    }

    if (!isFullScreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullScreen, preferences.useFullscreenApi]);

  return null;
}
