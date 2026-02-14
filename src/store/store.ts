import { atom } from "jotai";
import { MangaLanguage } from "@/types";

export const languageAtom = atom<MangaLanguage>(MangaLanguage.EN);
export const isZoomedInAtom = atom(false); // not native zoom, but the page zoom
