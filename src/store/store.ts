import { atom, createStore, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { preferencesAtom } from "./preferences";
import type { MangaLanguage } from "@/types";
import { AVAILABLE_ZOOM_LEVELS } from "@/constants";

const store = createStore();
export const languageAtom = atom<MangaLanguage>(
  store.get(preferencesAtom).preferredMangaLanguage,
);
export const orientationAtom = atom(
  store.get(preferencesAtom).preferredOrientation,
);
export const isColoredAtom = atom(
  store.get(preferencesAtom).isColoredPreferred,
);
export const isZoomedInAtom = atom(false); // not native zoom, but the page zoom
export const isFullScreenAtom = atom(false);
export const preferredZoomLevelIndexAtom = atom(
  AVAILABLE_ZOOM_LEVELS.findIndex((level) => level === 2),
); // defaults to 2x
export const aboutReadBeforeAtom = atomWithStorage(
  "about-read-before",
  false,
  undefined,
  { getOnInit: true },
);

export function usePreferredZoomLevel() {
  const index = useAtomValue(preferredZoomLevelIndexAtom);
  return AVAILABLE_ZOOM_LEVELS[index] || AVAILABLE_ZOOM_LEVELS[0];
}
