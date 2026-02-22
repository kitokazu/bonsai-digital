"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import enDict from "@/dictionaries/en.json";
import jaDict from "@/dictionaries/ja.json";

export type Dictionary = typeof enDict;
export type Locale = "en" | "ja";

const dictionaries: Record<Locale, Dictionary> = {
  en: enDict,
  ja: jaDict,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

interface LocaleContextValue {
  locale: Locale;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  dictionary: enDict,
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const dictionary = getDictionary(locale);

  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const { locale, dictionary } = useContext(LocaleContext);
  return { t: dictionary, locale };
}
