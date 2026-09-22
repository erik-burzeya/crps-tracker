/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme as useAppTheme } from '@/context/ThemeContext';

export function useTheme() {
  return useAppTheme().colors;
}
