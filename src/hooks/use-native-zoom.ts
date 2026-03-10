import { useLayoutEffect, useState } from "react";

const ZOOM_THRESHOLD = 1.1;

export function useNativeZoom() {
  const [isZoomedIn, setIsZoomedIn] = useState(
    (visualViewport?.scale ?? 1) > ZOOM_THRESHOLD,
  );

  useLayoutEffect(() => {
    const onResize = () => {
      if (!visualViewport) return;
      const scale = window.outerWidth / visualViewport.width;
      setIsZoomedIn(scale > ZOOM_THRESHOLD);
    };

    visualViewport?.addEventListener("resize", onResize);

    return () => {
      visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  return isZoomedIn;
}
