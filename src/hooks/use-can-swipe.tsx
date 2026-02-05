import { useEffect, useState } from "react";

const SWIPE_ZOOM_THRESHOLD = 1.1;

export function useCanSwipe() {
  const [canSwipe, setCanSwipe] = useState(
    (window.visualViewport?.scale ?? 0) <= SWIPE_ZOOM_THRESHOLD,
  );

  useEffect(() => {
    const onResize = () => {
      if (!window.visualViewport) return;
      const scale = window.visualViewport.scale;
      setCanSwipe(scale <= SWIPE_ZOOM_THRESHOLD);
    };

    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  return canSwipe;
}
