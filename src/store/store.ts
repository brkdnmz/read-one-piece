import { atom, useAtomValue } from "jotai";
import { MangaLanguage } from "@/types";
import { AVAILABLE_ZOOM_LEVELS } from "@/constants";

export const languageAtom = atom<MangaLanguage>(MangaLanguage.EN);
export const isZoomedInAtom = atom(false); // not native zoom, but the page zoom
export const isFullScreenAtom = atom(false);
export const preferredZoomLevelIndexAtom = atom(
  AVAILABLE_ZOOM_LEVELS.findIndex((level) => level === 2),
); // defaults to 2x

export function usePreferredZoomLevel() {
  const index = useAtomValue(preferredZoomLevelIndexAtom);
  return AVAILABLE_ZOOM_LEVELS[index] || AVAILABLE_ZOOM_LEVELS[0];
}
