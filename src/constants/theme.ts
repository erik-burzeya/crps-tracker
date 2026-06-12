/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#f3f3f3',
    backgroundElement: '#e5e5e5',
    backgroundSelected: '#c6c6c6',
    textSecondary: '#60646C',

    primary: '#4CAF50',
    primaryLight: '#A5D6A7',
  },

  dark: {
    text: '#ffffff',
    background: '#0e0e0e',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',

    primary: '#A5D6A7',
    primaryLight: '#C8E6C9',
  },

  blue: {
  text: '#f2f2f2',
    background: '#95b0da',
    backgroundElement: '#3b4c7f',
    backgroundSelected: '#2E3135',
    textSecondary: '#8b98ab',

    primary: '#78a1e6',
    primaryLight: '#6e8dd6',
  }
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
export const Typography = {
  title: 32,
  section: 14,
  body: 16,
  caption: 12,
} as const;