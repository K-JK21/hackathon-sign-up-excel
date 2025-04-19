
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language, useLanguage, useLanguageStore } from "@/utils/i18n";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

const languageNames = {
  ky: "Кыргызча",
  ru: "Русский",
  en: "English",
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('ky')}
          className={language === 'ky' ? 'bg-violet-50 text-violet-600' : ''}
        >
          🇰🇬 {languageNames.ky}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('ru')}
          className={language === 'ru' ? 'bg-violet-50 text-violet-600' : ''}
        >
          🇷🇺 {languageNames.ru}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? 'bg-violet-50 text-violet-600' : ''}
        >
          🇬🇧 {languageNames.en}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
