import { atom } from "jotai";

export const currentPageAtom = atom(1);
export const languageAtom = atom<"en" | "tr">("en");
export const isZoomedInAtom = atom(false); // not native zoom, but the page zoom
