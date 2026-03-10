import { useEffect, useRef } from "react";
import type { SwiperRef } from "swiper/react";
import type { RefObject } from "react";
import { DOUBLE_TAP_THRESHOLD_MS } from "@/constants";

export function useReaderGestures(
  readerContainerRef: RefObject<SwiperRef | null>,
  events: {
    onTap?: () => void;
    onDoubleTap?: () => void;
  },
) {
  const _events = useRef(events);

  useEffect(() => {
    _events.current = events;
  }, [events]);

  useEffect(() => {
    const swiper = readerContainerRef.current?.swiper;
    if (!swiper) return;
    let lastTap = 0;
    let tapTimeout = 0;

    const onClick = () => {
      const now = Date.now();
      if (now - lastTap < DOUBLE_TAP_THRESHOLD_MS) {
        clearTimeout(tapTimeout);
        _events.current.onDoubleTap?.();
        lastTap = 0;
      } else {
        tapTimeout = window.setTimeout(() => {
          _events.current.onTap?.();
        }, DOUBLE_TAP_THRESHOLD_MS);
        lastTap = now;
      }
    };

    // this works a little bit different than the Svelte version but anyway
    swiper.on("click", onClick);

    return () => {
      swiper.off("click", onClick);
    };
  }, [readerContainerRef]);
}
