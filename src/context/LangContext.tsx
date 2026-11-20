import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lang } from '../types';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: 'ltr' | 'rtl';
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, dir: 'ltr' });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);
  return <Ctx.Provider value={{ lang, setLang, dir }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
