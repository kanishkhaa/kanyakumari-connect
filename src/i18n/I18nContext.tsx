import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en } from "./en";
import { ta } from "./ta";
import { saveCollection } from "@/lib/supabaseContent";

export type Lang = "en" | "ta";

type Dict = typeof en;

const dicts: Record<Lang, Dict> = { en, ta: ta as Dict };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof Dict) => string;
  tData: (enText?: string, taText?: string) => string;
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("kaniya.lang") as Lang) || "en";
  });

  const setLang = async (l: Lang) => {
    setLangState(l);
    localStorage.setItem("kaniya.lang", l);
    document.documentElement.lang = l === "ta" ? "ta" : "en";
    await saveCollection("user_lang_preference", { lang: l });
  };

  useEffect(() => {
    document.documentElement.lang = lang === "ta" ? "ta" : "en";
  }, [lang]);

  const t = (key: keyof Dict) => dicts[lang]?.[key] ?? dicts.en[key] ?? String(key);

  const tData = (enText?: string, taText?: string) => {
    if (lang === "ta" && taText) return taText;
    return enText || "";
  };

  return <I18nCtx.Provider value={{ lang, setLang, t, tData }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}

