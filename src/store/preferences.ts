import { atomWithStorage } from "jotai/utils";
import type { Orientation } from "@/types";
import { MangaLanguage } from "@/types";

type PreferencesStore = {
  preferredMangaLanguage: MangaLanguage;
  preferredOrientation: Orientation;
  useFullscreenApi: boolean;
};

export const preferencesAtom = atomWithStorage<PreferencesStore>(
  "preferences",
  {
    preferredMangaLanguage: MangaLanguage.EN,
    preferredOrientation: "horizontal",
    useFullscreenApi: false,
  },
  undefined,
  {
    getOnInit: true,
  },
);
