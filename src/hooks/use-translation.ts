import { translations } from "@/src/locales";
import { useLanguageStore } from "@/src/stores/language/language.store";

export function useTranslation() {
  const { currentLanguage, setLanguage, toggleLanguage } = useLanguageStore();

  const translateText = translations[currentLanguage];

  return {
    translateText,
    currentLanguage,
    setLanguage,
    toggleLanguage,
  };
}
