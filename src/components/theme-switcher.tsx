import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import SunPiratesJollyRoger from "/sun-pirates-jolly-roger.svg";
import MoonMoonFruit from "/moon-moon-fruit.webp";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      title="Switch theme"
      className="relative overflow-hidden"
    >
      <img
        src={SunPiratesJollyRoger}
        className={cn(
          "absolute h-5 transition",
          effectiveTheme === "dark" && "-translate-y-full opacity-0",
        )}
        alt="Switch to dark theme"
      />
      <img
        src={MoonMoonFruit}
        className={cn(
          "absolute h-5 transition",
          effectiveTheme === "light" && "translate-y-full opacity-0",
        )}
        alt="Switch to light theme"
      />
    </Button>
  );
}
