import { useI18n } from '../i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">
          <Globe className="w-4 h-4" />
          <span className="flex-1 text-left">{language === 'th' ? 'ภาษาไทย' : 'English'}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuItem
          onClick={() => setLanguage('th')}
          className={language === 'th' ? 'bg-indigo-50' : ''}
        >
          🇹🇭 ภาษาไทย
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'bg-indigo-50' : ''}
        >
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}