import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { languageAtom } from "@/store/store";
import { MangaLanguage } from "@/types";
import { cn } from "@/lib/utils";

export function LangSwitcher() {
  const [lang, setLang] = useAtom(languageAtom);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        setLang(lang === MangaLanguage.EN ? MangaLanguage.TR : MangaLanguage.EN)
      }
      className="relative overflow-hidden"
      title="Switch theme"
    >
      <span
        className={cn(
          "absolute transition",
          lang === MangaLanguage.TR && "-translate-y-full opacity-0",
        )}
      >
        🇺🇸
      </span>
      <span
        className={cn(
          "absolute transition",
          lang === MangaLanguage.EN && "translate-y-full opacity-0",
        )}
      >
        🇹🇷
      </span>
    </Button>
  );
}
