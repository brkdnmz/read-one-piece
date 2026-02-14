import { atom } from "jotai";

export const languageAtom = atom<"en" | "tr">("en");
export const isZoomedInAtom = atom(false); // not native zoom, but the page zoom
