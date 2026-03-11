import { useAtom, useSetAtom } from "jotai";
import { useId } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "./ui/field";
import { NativeSelect } from "./ui/native-select";
import ShipWheel from "/ship-wheel.png";
import { Checkbox } from "./ui/checkbox";
import type { Orientation } from "@/types";
import { preferencesAtom } from "@/store/preferences";
import { MangaLanguage } from "@/types";
import { isColoredAtom, orientationAtom } from "@/store/store";

export function Settings() {
  const setOrientation = useSetAtom(orientationAtom);
  const setIsColored = useSetAtom(isColoredAtom);
  const [preferences, setPreferences] = useAtom(preferencesAtom);
  const uid = useId();

  return (
    <Dialog>
      <DialogTrigger
        render={
          <div className="fixed top-0 left-0 p-2.5 leading-0">
            <Button
              variant="outline"
              size="icon"
              className="group text-muted-foreground p-0.5 after:absolute after:inset-0"
              title="Settings"
            >
              <img
                src={ShipWheel}
                alt="Ship Wheel"
                className="transition group-active:-rotate-z-360 group-active:transition-none"
              />
            </Button>
          </div>
        }
        nativeButton={false}
      />
      <DialogContent initialFocus={false}>
        <DialogHeader>
          <DialogTitle className="text-center font-[Anime_Ace]">
            Settings
          </DialogTitle>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <FieldLabel>Preferred manga language</FieldLabel>
            <NativeSelect
              value={preferences.preferredMangaLanguage}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  preferredMangaLanguage: e.target.value as MangaLanguage,
                }))
              }
            >
              <option value={MangaLanguage.EN}>🇺🇸 English</option>
              <option value={MangaLanguage.TR}>🇹🇷 Türkçe</option>
            </NativeSelect>
            <FieldDescription>
              One Piece defaults to this language on your further visits.
              Currently selected language won't be affected.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Preferred orientation</FieldLabel>
            <NativeSelect
              value={preferences.preferredOrientation}
              onChange={(e) => {
                const newOrientation = e.target.value as Orientation;
                setPreferences((prev) => ({
                  ...prev,
                  preferredOrientation: newOrientation,
                }));
                setOrientation(newOrientation);
              }}
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel>Preferred manga color</FieldLabel>
            <NativeSelect
              value={
                preferences.isColoredPreferred ? "colored" : "black-and-white"
              }
              onChange={(e) => {
                setPreferences((prev) => ({
                  ...prev,
                  isColoredPreferred: e.target.value === "colored",
                }));
                setIsColored(e.target.value === "colored");
              }}
            >
              <option value="black-and-white">Black & white</option>
              <option value="colored">Colored</option>
            </NativeSelect>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Checkbox
              id={`${uid}-use-fullscreen-api`}
              checked={preferences.useFullscreenApi}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({
                  ...prev,
                  useFullscreenApi: checked,
                }))
              }
              disabled={!document.fullscreenEnabled}
            />
            <FieldLabel htmlFor={`${uid}-use-fullscreen-api`} className="block">
              Enable browser's full screen mode
              {!document.fullscreenEnabled && (
                <div className="text-muted-foreground italic">
                  (Not supported in your browser)
                </div>
              )}
            </FieldLabel>
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose
            render={
              // https://github.com/dcastil/tailwind-merge/blob/main/docs/limitations.md#you-need-to-use-labels-in-ambiguous-arbitrary-value-classes
              <Button className="text-2xs font-[family-name:Anime_Ace] font-bold">
                I'm done!
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
