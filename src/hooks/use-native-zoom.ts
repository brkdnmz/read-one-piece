import { useLayoutEffect, useState } from "react";

const ZOOM_THRESHOLD = 1.1;

export function useNativeZoom() {
  const [isZoomedIn, setIsZoomedIn] = useState(
    (window.visualViewport?.scale ?? 1) > ZOOM_THRESHOLD,
  );

  useLayoutEffect(() => {
    const onResize = () => {
      if (!window.visualViewport) return;
      const scale = window.visualViewport.scale;
      setIsZoomedIn(scale > ZOOM_THRESHOLD);
    };

    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  return isZoomedIn;
}
