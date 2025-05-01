import { create } from "zustand";
import { ThemeType } from "shared/types";

interface ThemeStoreType {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const getInitialTheme = (): ThemeType => {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light"
}

export const useThemeStore = create<ThemeStoreType>()((set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    const current = get().theme;
    const newTheme = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });
  },
  setTheme: (theme) => {
    localStorage.setItem("theme", theme === "dark" ? "dark" : "light");
    set({ theme })
  }
}))