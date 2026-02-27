import { useAtom } from "jotai";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { isFullScreenAtom } from "@/store/store";
import { cn } from "@/lib/utils";

export function ToggleFullScreen() {
  const [isFullScreen, setIsFullScreen] = useAtom(isFullScreenAtom);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") {
        setIsFullScreen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsFullScreen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setIsFullScreen]);

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={(e) => {
        setIsFullScreen((prev) => !prev);
        e.stopPropagation();
      }}
      className="bg-background/50! text-muted-foreground absolute right-2.5 bottom-2.5 z-100 *:size-1/2"
      title={!isFullScreen ? "Enter full screen" : "Exit full screen"}
    >
      <BsFullscreen
        className={cn(
          "absolute transition duration-200",
          isFullScreen && "opacity-0",
        )}
      />
      <BsFullscreenExit
        className={cn(
          "absolute transition duration-200",
          !isFullScreen && "opacity-0",
        )}
      />
    </Button>
  );
}
