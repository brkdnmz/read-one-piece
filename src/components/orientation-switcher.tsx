import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { orientationAtom } from "@/store/store";
import { cn } from "@/lib/utils";

export function OrientationSwitcher() {
  const [orientation, setOrientation] = useAtom(orientationAtom);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setOrientation((prev) =>
          prev === "horizontal" ? "vertical" : "horizontal",
        );
      }}
      title="Change orientation"
    >
      <span
        className={cn(
          "icon-[solar--posts-carousel-horizontal-line-duotone] size-1/2 transition-[background-color,transform]",
          orientation === "vertical" && "rotate-z-90",
        )}
      />
    </Button>
  );
}
