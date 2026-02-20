import clsx from "clsx";
import { useLayoutEffect, useRef } from "react";
import { useCanSwipe } from "@/hooks/use-can-swipe";

const SIZE = 40;
const PADDING = 10;

export function SwipingBlocked() {
  const canSwipe = useCanSwipe();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const onVisualViewportChange = () => {
      const vv = window.visualViewport;
      if (!vv) return;
      if (!ref.current) return;

      const scaledSize = (SIZE * vv.width) / window.innerWidth;
      const scaledPadding = (PADDING * vv.width) / window.innerWidth;

      ref.current.style.left = `${vv.offsetLeft + vv.width - scaledSize - scaledPadding}px`;
      ref.current.style.top = `${vv.offsetTop + vv.height - scaledSize - scaledPadding}px`;
      ref.current.style.width = `${scaledSize}px`;
    };

    onVisualViewportChange();

    window.visualViewport?.addEventListener("resize", onVisualViewportChange);
    window.visualViewport?.addEventListener("scroll", onVisualViewportChange);

    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        onVisualViewportChange,
      );
      window.visualViewport?.removeEventListener(
        "scroll",
        onVisualViewportChange,
      );
    };
  }, []);

  return (
    // z-index is large so that it appears above Tanstack Devtools
    <div
      ref={ref}
      className={clsx(
        "pointer-events-none fixed z-100000 aspect-square rounded-full opacity-0 transition-opacity duration-250",
        !canSwipe && "opacity-100",
      )}
    >
      {/* Actually MdSwipe but I removed the first path because it was redundant, also messed up the stroke */}
      <svg
        viewBox="0 0 24 24"
        className="absolute h-full w-full fill-rose-600 stroke-black stroke-[0.5]"
        data-tsd-source="/src/components/swiping-blocked.tsx:47:7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m18.89 14.75-4.09-2.04c-.28-.14-.58-.21-.89-.21H13v-6c0-.83-.67-1.5-1.5-1.5S10 5.67 10 6.5v10.74l-3.25-.74a.99.99 0 0 0-.92.28l-.83.84 4.54 4.79c.38.38 1.14.59 1.67.59h6.16c1 0 1.84-.73 1.98-1.72l.63-4.46c.12-.85-.32-1.68-1.09-2.07z"></path>
        <path d="M20.13 3.87C18.69 2.17 15.6 1 12 1S5.31 2.17 3.87 3.87L2 2v5h5L4.93 4.93c1-1.29 3.7-2.43 7.07-2.43s6.07 1.14 7.07 2.43L17 7h5V2l-1.87 1.87z"></path>
      </svg>
    </div>
  );
}
