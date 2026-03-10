import { useAtom } from "jotai";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import ThousandSunny from "/thousand-sunny.webp";
import RobinChopper from "/robin-chopper.webp";
import { IwwaSwipe } from "./icons/iwwa-swipe";
import { Kbd, KbdGroup } from "./ui/kbd";
import { cn } from "@/lib/utils";
import { aboutReadBeforeAtom } from "@/store/store";
import FrankySuper from "/franky-super.png";

export function About() {
  const [aboutReadBefore, setAboutReadBefore] = useAtom(aboutReadBeforeAtom);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          setAboutReadBefore(true);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="group text-muted-foreground p-0.5"
            title="About"
          >
            <img
              src={ThousandSunny}
              alt="Thousand Sunny Logo"
              className={cn(
                "transition group-active:scale-85 group-active:transition-none",
                !aboutReadBefore && "about-not-read",
              )}
            />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-[Anime_Ace]">
            About
          </DialogTitle>
          <DialogDescription className="italic">
            Hope you have <span className="font-[Anime_Ace]">SUUUUPER</span>{" "}
            <img
              src={FrankySuper}
              alt="Franky Super Pose"
              className="inline h-6 align-baseline"
            />{" "}
            fun!
          </DialogDescription>
        </DialogHeader>

        <img
          src={RobinChopper}
          alt="Robin Chopper"
          className="m-auto h-40 rounded-lg"
        />

        <ul className="text-sm">
          <li>
            Press on the manga page to toggle the overlay UI.{" "}
            <span className="text-muted-foreground italic">
              (The interaction is a bit delayed because of the double tap
              interaction.)
            </span>
          </li>
          <li>
            To navigate pages:
            <ul>
              <li>
                Swipe left/right{" "}
                <IwwaSwipe className="stroke-muted-foreground inline size-4" />{" "}
                (up/down in vertical mode)
              </li>
              <li>Press the buttons on both sides</li>
              <li>
                Press the arrow keys{" "}
                <KbdGroup>
                  <Kbd>←</Kbd>
                  <Kbd>→</Kbd>
                </KbdGroup>{" "}
                (
                <KbdGroup>
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                </KbdGroup>{" "}
                in vertical mode)
              </li>
            </ul>
          </li>
          <li>The top bar explains itself enough:)</li>
          <li>
            Double tap to toggle zoom. Swipe navigation is disabled when zoomed
            in; an indicator will appear on the top right corner.
          </li>
          <li>
            Press the icon on the bottom right corner or <Kbd>F</Kbd> to toggle
            full screen. You can also press <Kbd>Esc</Kbd> to exit full screen.
          </li>
        </ul>

        <DialogFooter>
          <DialogClose
            render={
              // https://github.com/dcastil/tailwind-merge/blob/main/docs/limitations.md#you-need-to-use-labels-in-ambiguous-arbitrary-value-classes
              <Button className="font-[family-name:Anime_Ace] font-bold">
                Gotcha!
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
