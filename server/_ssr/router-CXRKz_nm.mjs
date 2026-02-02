import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { z } from "../_libs/zod.mjs";
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
const Favicon = "/read-one-piece/straw-hats-jolly-roger.png";
const appCss = "/read-one-piece/assets/styles-3127dLCr.css";
const Route$2 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Read One Piece"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "icon",
        href: Favicon
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { suppressHydrationWarning: true, children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$1 = () => import("./route-Po78RxBO.mjs");
const Route$1 = createFileRoute("/(app)")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-CQOpZLQZ.mjs");
const Route = createFileRoute("/(app)/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  validateSearch: z.object({
    chapter: z.number().min(1).default(1).catch(1)
  })
  // loaderDeps: ({ search: { chapter } }) => ({ chapter }),
  // loader: ({ deps: { chapter } }) => {
  //   const pageCount = getChapterPageCount(chapter);
  //   return { guessedPageCount: 10, actualPageCount: pageCount };
  // },
});
const appRouteRoute = Route$1.update({
  id: "/(app)",
  getParentRoute: () => Route$2
});
const appIndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => appRouteRoute
});
const appRouteRouteChildren = {
  appIndexRoute
};
const appRouteRouteWithChildren = appRouteRoute._addFileChildren(
  appRouteRouteChildren
);
const rootRouteChildren = {
  appRouteRoute: appRouteRouteWithChildren
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    basepath: "/read-one-piece/",
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingMinMs: 0
    // Blank page because of this, set to 0 to fix it: https://github.com/TanStack/router/issues/2183
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r
};
