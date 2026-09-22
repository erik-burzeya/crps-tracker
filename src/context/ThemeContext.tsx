import { createContext, useContext, useState } from 'react';

import { Colors, type ThemeColors, type ThemeName } from '@/theme';

type ThemeMode = Extract<ThemeName, 'light' | 'dark'>;

type ThemeContextType = {
  themeMode: ThemeMode;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  const colors = Colors[themeMode];

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        colors,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
    );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}