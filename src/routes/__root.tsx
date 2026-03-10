import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import Favicon from "/straw-hats-jolly-roger.png";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Read One Piece",
      },
    ],
    links: [
      {
        rel: "icon",
        href: Favicon,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeadContent />
      {children}
      <Scripts />
    </>
  );
}
