'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'zh',
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('locale') as Locale;
    if (saved && (saved === 'zh' || saved === 'en')) {
      setLocaleState(saved);
    } else {
      // Set default to English
      setLocaleState('en');
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

