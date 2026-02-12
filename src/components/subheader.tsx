import { ThemeSwitcher } from "./theme-switcher";
import { NavigationDescription } from "./navigation-description";
import { PrevChapterButton } from "./prev-chapter-button";
import { NextChapterButton } from "./next-chapter-button";
import { ChapterSelector } from "./chapter-selector";
import { PageTracker } from "./page-tracker";
import ChapterText from "/chapter-text-2.png";
import PageText from "/page-text-2.png";
import { LangSwitcher } from "./lang-switcher";
import { Credits } from "./credits";

export function Subheader() {
  return (
    /* Gap for "Go to..." button */
    <div className="grid gap-8">
      <div className="flex items-stretch justify-center gap-3 font-[One_Piece] select-none">
        <div className="flex items-center gap-2">
          {/* "Chapter" text in One Piece style */}
          <img src={ChapterText} className="h-5" />

          <div className="flex">
            <PrevChapterButton />

            <ChapterSelector />

            <NextChapterButton />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* "Page" text in One Piece style */}
          <img src={PageText} className="-mb-0.5 inline h-4.5" />

          <PageTracker />
        </div>

        <div className="flex items-center gap-1">
          <ThemeSwitcher />

          <LangSwitcher />
        </div>
      </div>

      <div>
        <NavigationDescription />

        <Credits />
      </div>
    </div>
  );
}
