import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { languageAtom } from "@/store/store";

export function LangSwitcher() {
  const [lang, setLang] = useAtom(languageAtom);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setLang(lang === "en" ? "tr" : "en")}
      title="Switch theme"
    >
      {lang === "en" ? "🇬🇧" : "🇹🇷"}
    </Button>
  );
}
