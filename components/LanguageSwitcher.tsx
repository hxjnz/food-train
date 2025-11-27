'use client';

import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      {locale === 'zh' ? 'EN' : '中文'}
    </Button>
  );
}

