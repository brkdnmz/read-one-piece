import { AnimatePresence, motion } from "motion/react";
import type { HTMLMotionProps, ValueKeyframesDefinition } from "motion/react";
import { cubicOut } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & {
  show?: boolean;
  from?: { x?: ValueKeyframesDefinition; y?: ValueKeyframesDefinition };
  animateIn?: boolean;
  animateOut?: boolean;
};

export function Fly({
  show,
  from,
  animateIn = true,
  animateOut = true,
  ...restProps
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          {...restProps}
          initial={animateIn ? { opacity: 0, ...from } : undefined}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={animateOut ? { opacity: 0, ...from } : undefined}
          transition={{ type: "keyframes", duration: 0.2, ease: cubicOut }}
        />
      )}
    </AnimatePresence>
  );
}
