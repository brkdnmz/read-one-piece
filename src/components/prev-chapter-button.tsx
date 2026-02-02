import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import OnePieceGun from "/one-piece-gun.png";

const route = getRouteApi("/(app)/");

export function PrevChapterButton() {
  const navigate = useNavigate();
  const { chapter } = route.useSearch();

  return (
    <Button
      variant="ghost"
      className="px-1"
      title="Previous chapter"
      onClick={() => {
        navigate({ to: "/", search: { chapter: chapter - 1 } });
      }}
    >
      <img src={OnePieceGun} className="h-3" />
    </Button>
  );
}
