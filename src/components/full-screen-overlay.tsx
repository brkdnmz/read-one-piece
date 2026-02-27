import { getRouteApi } from "@tanstack/react-router";
import { PageTracker } from "./page-tracker";
import { Fly } from "./fly";

const route = getRouteApi("/(app)/");

type Props = {
  show?: boolean;
};

export function FullScreenOverlay({ show }: Props) {
  const chapter = route.useSearch({ select: (s) => s.chapter });

  return (
    <Fly
      show={show}
      from={{ y: "100%" }}
      animateOut={false}
      className="bg-background/50 absolute bottom-2 left-1/2 z-100 flex -translate-x-1/2 items-center gap-2 rounded-lg px-1 py-0.5 font-[One_Piece] text-sm"
    >
      <div className="flex items-center gap-1">
        <span>Chapter {chapter}</span>
      </div>
      <PageTracker />
    </Fly>
  );
}
