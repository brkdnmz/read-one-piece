import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import SunPiratesJollyRoger from "/sun-pirates-jolly-roger.svg";
import MoonMoonFruit from "/moon-moon-fruit.webp";

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
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={effectiveTheme}
          initial={{ opacity: 0, transform: "scale(0.7)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          exit={{ opacity: 0, transform: "scale(0.7)" }}
          transition={{
            transform: { type: "spring", stiffness: 500, damping: 20 },
          }}
          className="absolute"
        >
          {effectiveTheme === "light" ? (
            <img src={SunPiratesJollyRoger} className="h-5" />
          ) : (
            <img src={MoonMoonFruit} className="h-5" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
