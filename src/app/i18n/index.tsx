import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { th, type TranslationKeys } from './th';
import { en } from './en';

export type Language = 'th' | 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const translations = { th, en };

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored === 'en' || stored === 'th') ? stored : 'th';
  });

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  const value: I18nContextType = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}