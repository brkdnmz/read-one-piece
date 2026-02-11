import { useAtomValue } from "jotai";
import { useNativeZoom } from "./use-native-zoom";
import { isZoomedInAtom } from "@/store/store";

export function useCanSwipe() {
  const isZoomedInNative = useNativeZoom();
  const isZoomedIn = useAtomValue(isZoomedInAtom);

  return !isZoomedInNative && !isZoomedIn;
}
