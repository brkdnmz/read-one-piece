import { ThemeSwitcher } from "./theme-switcher";
import { ChapterSelector } from "./chapter-selector";
import { PageTracker } from "./page-tracker";
import ChapterText from "/chapter-text-2.png";
import PageText from "/page-text-2.png";
import { LangSwitcher } from "./lang-switcher";
import { ChapterNavigationButton } from "./chapter-navigation-button";
import { About } from "./about";
import { OrientationSwitcher } from "./orientation-switcher";
import { ColoredSwitcher } from "./colored-switcher";

export function Subheader() {
  return (
    /* pb-5 for "Go to..." button */
    <div className="font-one-piece flex flex-wrap-reverse items-stretch justify-center gap-x-2 gap-y-1 pb-5 select-none">
      <div className="flex items-stretch justify-center gap-2">
        <div className="flex items-center gap-1">
          {/* "Chapter" text in One Piece style */}
          <img src={ChapterText} className="h-5" alt="Chapter" />

          <div className="flex">
            <ChapterNavigationButton direction="prev" />

            <ChapterSelector />

            <ChapterNavigationButton direction="next" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* "Page" text in One Piece style */}
          <img src={PageText} className="-mb-px inline h-4.5" alt="Page" />

          <PageTracker />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <ThemeSwitcher />
        <ColoredSwitcher />
        <LangSwitcher />
        <OrientationSwitcher />
        <About />
      </div>
    </div>
  );
}
