import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    basepath: "/read-one-piece/",
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingMinMs: 0, // Blank page because of this, set to 0 to fix it: https://github.com/TanStack/router/issues/2183
  });

  return router;
};
