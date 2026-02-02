import { j as jsxRuntimeExports, r as reactExports } from "../_chunks/_libs/react.mjs";
import { O as Outlet, u as useNavigate, g as getRouteApi } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { b as QueryClient } from "../_chunks/_libs/@tanstack/query-core.mjs";
import { Q as QueryClientProvider } from "../_chunks/_libs/@tanstack/react-query.mjs";
import { S as Slot } from "../_chunks/_libs/@radix-ui/react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { O as OnePieceGun, u as useChapterPageCounQuery, c as currentPageAtom } from "./use-chapter-page-count-query-Cix5sPi2.mjs";
import { u as useAtom } from "../_libs/jotai.mjs";
import { S as Sun, M as Moon, C as ChevronDown } from "../_libs/lucide-react.mjs";
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
import "../_chunks/_libs/@radix-ui/react-compose-refs.mjs";
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
const ThemeProviderContext = reactExports.createContext(null);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = reactExports.useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );
  reactExports.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProviderContext.Provider, { ...props, value, children });
}
const useTheme = () => {
  const context = reactExports.useContext(ThemeProviderContext);
  if (context === null)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
const LogoLeftPart = "/read-one-piece/read-one-piece-font.png";
const LogoRightPart = "/read-one-piece/one-piece-logo.webp";
function Header() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: LogoLeftPart, className: "-mt-0.5 h-16" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: LogoRightPart, className: "h-20" })
  ] });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const effectiveTheme = theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "outline",
      size: "icon",
      onClick: () => setTheme(theme === "light" ? "dark" : "light"),
      title: "Switch theme",
      children: effectiveTheme === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, {})
    }
  );
}
function NavigationDescription() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm text-slate-500 italic", children: "(Use arrow keys or click on sides to navigate pages)" });
}
const route$3 = getRouteApi("/(app)/");
function PrevChapterButton() {
  const navigate = useNavigate();
  const { chapter } = route$3.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "ghost",
      className: "px-1",
      title: "Previous chapter",
      onClick: () => {
        navigate({ to: "/", search: { chapter: chapter - 1 } });
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: OnePieceGun, className: "h-3" })
    }
  );
}
const route$2 = getRouteApi("/(app)/");
function NextChapterButton() {
  const navigate = useNavigate();
  const { chapter } = route$2.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "ghost",
      className: "px-1",
      title: "Next chapter",
      onClick: () => {
        navigate({ to: "/", search: { chapter: chapter + 1 } });
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: OnePieceGun, className: "h-3 rotate-y-180" })
    }
  );
}
function NativeSelect({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group/native-select relative w-fit has-[select:disabled]:opacity-50",
      "data-slot": "native-select-wrapper",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            "data-slot": "native-select",
            "data-size": size,
            className: cn(
              "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              className
            ),
            ...props
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronDown,
          {
            className: "text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none",
            "aria-hidden": "true",
            "data-slot": "native-select-icon"
          }
        )
      ]
    }
  );
}
function NativeSelectOption({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { "data-slot": "native-select-option", ...props });
}
const N_CHAPTERS = 1200;
const route$1 = getRouteApi("/(app)/");
function ChapterSelector() {
  const navigate = useNavigate();
  const { chapter } = route$1.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NativeSelect,
    {
      value: chapter,
      onChange: (e) => {
        const selectedChapter = Number(e.target.value);
        navigate({ to: "/", search: { chapter: selectedChapter } });
      },
      children: Array.from({ length: N_CHAPTERS }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: i + 1, children: i + 1 }, i))
    }
  );
}
const route = getRouteApi("/(app)/");
function PageTracker() {
  const { chapter } = route.useSearch();
  const pageCountQuery = useChapterPageCounQuery(chapter);
  const [currentPage] = useAtom(currentPageAtom);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm tabular-nums", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-[2ch] text-right", children: currentPage }),
    "/",
    pageCountQuery.data ? pageCountQuery.data : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse text-slate-400", children: "..." })
  ] });
}
const ChapterText = "/read-one-piece/chapter-text-2.png";
const PageText = "/read-one-piece/page-text-2.png";
function Subheader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch justify-center gap-4 font-[One_Piece] select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ChapterText, className: "h-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PrevChapterButton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChapterSelector, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextChapterButton, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: PageText, className: "-mb-0.5 inline h-4.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageTracker, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeSwitcher, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationDescription, {})
  ] });
}
const queryClient = new QueryClient();
function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { defaultTheme: "system", storageKey: "vite-ui-theme", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-svh flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Subheader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] }) }) });
}
export {
  RouteComponent as component
};
