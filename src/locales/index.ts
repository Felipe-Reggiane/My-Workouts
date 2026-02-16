import { en } from "./en";
import { ptBR } from "./pt-BR";

export const translations = {
  "pt-BR": ptBR,
  en: en,
};

export type Translations = typeof ptBR;
export type TranslationKey = keyof Translations;

export { en, ptBR };
