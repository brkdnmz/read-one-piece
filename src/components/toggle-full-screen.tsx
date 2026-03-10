import { useAtom } from "jotai";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { Button } from "./ui/button";
import { isFullScreenAtom } from "@/store/store";
import { cn } from "@/lib/utils";

export function ToggleFullScreen() {
  const [isFullScreen, setIsFullScreen] = useAtom(isFullScreenAtom);

  return (
    <div className="relative p-2.5">
      <Button
        size="icon"
        variant="outline"
        onClick={(e) => {
          setIsFullScreen((prev) => !prev);
          e.stopPropagation();
        }}
        className="bg-background/50! z-100 *:size-1/2 after:absolute after:inset-0"
        title={!isFullScreen ? "Enter full screen" : "Exit full screen"}
      >
        <div className="relative">
          <BsFullscreen
            className={cn(
              "absolute inset-0 size-full transition duration-200",
              isFullScreen && "opacity-0",
            )}
          />
          <BsFullscreenExit
            className={cn(
              "absolute inset-0 size-full transition duration-200",
              !isFullScreen && "opacity-0",
            )}
          />
        </div>
      </Button>
    </div>
  );
}
