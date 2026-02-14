import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { languageAtom } from "@/store/store";
import { MangaLanguage } from "@/types";

export function LangSwitcher() {
  const [lang, setLang] = useAtom(languageAtom);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        setLang(lang === MangaLanguage.EN ? MangaLanguage.TR : MangaLanguage.EN)
      }
      title="Switch theme"
    >
      {lang === MangaLanguage.EN ? "🇬🇧" : "🇹🇷"}
    </Button>
  );
}
