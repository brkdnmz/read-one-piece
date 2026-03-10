import { useAtomValue } from "jotai";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import OnePieceGun from "/one-piece-gun.webp";
import { orientationAtom } from "@/store/store";

type Props = HTMLAttributes<HTMLButtonElement> & {
  direction: "prev" | "next";
};

export function PageNavigationButton({
  direction,
  className,
  ...restProps
}: Props) {
  const orientation = useAtomValue(orientationAtom);

  return (
    <button
      {...restProps}
      title={`Slide ${direction}`}
      className={cn(
        "border-none bg-transparent p-2.5 transition-[scale] duration-100 active:scale-85",
        className,
      )}
    >
      <div className="flex aspect-square items-center justify-center rounded-full bg-slate-800/70!">
        <img
          src={OnePieceGun}
          className={cn(
            "w-14 p-2 transition",
            orientation === "vertical" && "rotate-90",
            direction === "next" && "rotate-y-180",
          )}
          alt={`Slide ${direction}`}
        />
      </div>
    </button>
  );
}
