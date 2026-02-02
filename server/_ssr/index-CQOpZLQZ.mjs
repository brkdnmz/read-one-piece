import { r as reactExports, j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { S as Swiper, K as Keyboard, N as Navigation, a as SwiperSlide } from "../_libs/swiper.mjs";
import { R as Route } from "./router-CXRKz_nm.mjs";
import { u as useChapterPageCounQuery, g as getChapterPageUrl, O as OnePieceGun, c as currentPageAtom } from "./use-chapter-page-count-query-Cix5sPi2.mjs";
import { u as useAtom } from "../_libs/jotai.mjs";
import "../_chunks/_libs/@tanstack/react-router.mjs";
import "../_libs/tiny-warning.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "../_chunks/_libs/@tanstack/react-query.mjs";
import "../_chunks/_libs/@tanstack/query-core.mjs";
import "../_libs/axios.mjs";
import "../_chunks/_libs/form-data.mjs";
import "../_libs/combined-stream.mjs";
import "../_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "../_chunks/_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/proxy-from-env.mjs";
import "http2";
import "../_chunks/_libs/follow-redirects.mjs";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_chunks/_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "zlib";
import "events";
function App() {
  const navigate = Route.useNavigate();
  const {
    chapter: currentChapter
  } = Route.useSearch();
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const pageCountQuery = useChapterPageCounQuery(currentChapter);
  const swiperRef = reactExports.useRef(null);
  const onSlidePrevPage = () => {
    if (currentPage > 1) {
      swiperRef.current?.swiper.slidePrev();
    } else {
      swiperRef.current?.swiper.slideTo(0);
      navigate({
        search: {
          chapter: currentChapter - 1
        }
      });
    }
  };
  const onSlideNextPage = () => {
    const isLastPage = currentPage === swiperRef.current?.swiper.slides.length;
    if (!isLastPage) {
      swiperRef.current?.swiper.slideNext();
    } else {
      swiperRef.current?.swiper.slideTo(0);
      navigate({
        search: {
          chapter: currentChapter + 1
        }
      });
    }
  };
  reactExports.useEffect(() => {
    swiperRef.current?.swiper.slideTo(0);
    setCurrentPage(1);
  }, [currentChapter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full flex-col items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Swiper, { ref: swiperRef, className: "h-full touch-auto!", modules: [Keyboard, Navigation], keyboard: true, allowTouchMove: false, lazyPreloadPrevNext: 2, onSlideChange: (swiper) => {
      setCurrentPage(swiper.activeIndex + 1);
    }, children: Array.from({
      length: pageCountQuery.data ?? 10
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: getChapterPageUrl(currentChapter, i + 1),
        alt: `Chapter ${currentChapter} Page ${i + 1}`,
        className: "h-0 min-h-full w-auto object-contain"
      },
      `chapter-${currentChapter}-page-${i + 1}`
    ) }) }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground/5 absolute inset-y-0 left-0 z-10 flex w-[10vw] items-center justify-center opacity-0 transition-opacity select-none hover:opacity-100", onClick: onSlidePrevPage, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: OnePieceGun, className: "w-1/2" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground/5 absolute inset-y-0 right-0 z-10 flex w-[10vw] items-center justify-center opacity-0 transition-opacity select-none hover:opacity-100", onClick: onSlideNextPage, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: OnePieceGun, className: "w-1/2 rotate-y-180" }) })
  ] }) }) });
}
export {
  App as component
};
