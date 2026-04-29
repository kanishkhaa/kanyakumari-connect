import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en } from "./en";
import { ta } from "./ta";

export type Lang = "en" | "ta";

type Dict = typeof en;

const dicts: Record<Lang, Dict> = { en, ta: ta as Dict };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof Dict) => string;
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("kaniya.lang") as Lang) || "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("kaniya.lang", l);
    document.documentElement.lang = l === "ta" ? "ta" : "en";
  };

  useEffect(() => {
    document.documentElement.lang = lang === "ta" ? "ta" : "en";
  }, [lang]);

  const t = (key: keyof Dict) => dicts[lang][key] ?? dicts.en[key] ?? String(key);

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
