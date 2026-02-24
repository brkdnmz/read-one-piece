import { useAtom } from "jotai";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { Button } from "./ui/button";
import { isFullScreenAtom } from "@/store/store";
import { cn } from "@/lib/utils";

export function ToggleFullScreen() {
  const [isFullScreen, setIsFullScreen] = useAtom(isFullScreenAtom);

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={(e) => {
        setIsFullScreen((prev) => !prev);
        e.stopPropagation();
      }}
      className={cn(
        "text-muted-foreground absolute top-2.5 right-2.5 z-100 opacity-100 *:size-1/2",
        isFullScreen && "opacity-50",
      )}
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
