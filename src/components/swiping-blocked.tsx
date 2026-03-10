import { useEffect, useRef } from "react";
import { Fly } from "./fly";
import { IwwaSwipe } from "./icons/iwwa-swipe";
import { useCanSwipe } from "@/hooks/use-can-swipe";

const SIZE = 36;
const MARGIN = 10;
const PADDING = 4;
const BORDER_WIDTH = 1.5;

export function SwipingBlocked() {
  const canSwipe = useCanSwipe();
  const divRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const onVisualViewportChange = () => {
      const vv = window.visualViewport;
      if (!vv) return;
      if (!divRef.current) return;
      if (!svgRef.current) return;

      const scale = window.outerWidth / vv.width;

      const scaledSize = SIZE / scale;
      const scaledMargin = MARGIN / scale;
      const scaledBorder = BORDER_WIDTH / scale;
      const scaledInnerPadding = PADDING / scale;
      const scaledStrokeWidth = BORDER_WIDTH / scale;

      divRef.current.style.margin = `${scaledMargin}px`;
      divRef.current.style.left = `${vv.offsetLeft + vv.width - scaledSize - 2 * scaledMargin}px`;
      divRef.current.style.top = `${vv.offsetTop}px`;
      divRef.current.style.width = `${scaledSize}px`;
      divRef.current.style.height = `${scaledSize}px`;
      divRef.current.style.borderWidth = `${scaledBorder}px`;
      divRef.current.style.padding = `${scaledInnerPadding}px`;
      svgRef.current.style.strokeWidth = `${scaledStrokeWidth}px`;
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
  }, [canSwipe]);

  return (
    <Fly
      ref={divRef}
      show={!canSwipe}
      from={{ x: "100%", y: "-100%" }}
      className="bg-background/50 pointer-events-none fixed z-100 overflow-hidden rounded-full border-rose-600 transition-[background-color]"
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full stroke-rose-600"
        viewBox="0 0 1 1"
      >
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <IwwaSwipe className="h-full w-full transition" />
    </Fly>
  );
}
