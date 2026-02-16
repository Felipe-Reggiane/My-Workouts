import { create } from "zustand";

export type Language = "pt-BR" | "en";

type LanguageState = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: "en",
  setLanguage: (language) => set({ currentLanguage: language }),
  toggleLanguage: () =>
    set((state) => ({
      currentLanguage: state.currentLanguage === "pt-BR" ? "en" : "pt-BR",
    })),
}));
