import { getRouteApi } from "@tanstack/react-router";
import { Button } from "./ui/button";
import OnePieceGun from "/one-piece-gun.webp";
import { cn } from "@/lib/utils";

const route = getRouteApi("/(app)/");

type Props = {
  direction: "next" | "prev";
};

export function ChapterNavigationButton({ direction }: Props) {
  const navigate = route.useNavigate();

  return (
    <Button
      variant="ghost"
      className="group px-1"
      title={`${direction === "next" ? "Next" : "Previous"} chapter`}
      onClick={() => {
        navigate({
          search: (prev) => ({
            chapter: prev.chapter + (direction === "next" ? 1 : -1),
            page: 1,
          }),
        });
      }}
    >
      <img
        src={OnePieceGun}
        className={cn(
          "h-3 origin-bottom-right transition duration-100 group-active:rotate-z-15",
          direction === "next" && "-translate-x-full rotate-y-180",
        )}
        alt={`Go to ${direction} chapter`}
      />
    </Button>
  );
}
