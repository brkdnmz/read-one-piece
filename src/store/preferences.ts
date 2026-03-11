import { atomWithStorage } from "jotai/utils";
import type { Orientation } from "@/types";
import { MangaLanguage } from "@/types";

type PreferencesStore = {
  preferredMangaLanguage: MangaLanguage;
  preferredOrientation: Orientation;
  isColoredPreferred: boolean;
  useFullscreenApi: boolean;
};

export const preferencesAtom = atomWithStorage<PreferencesStore>(
  "preferences",
  {
    preferredMangaLanguage: MangaLanguage.EN,
    preferredOrientation: "horizontal",
    isColoredPreferred: false,
    useFullscreenApi: false,
  },
  undefined,
  {
    getOnInit: true,
  },
);
