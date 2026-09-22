import '@/global.css';
import { Platform } from 'react-native';

export {
  Colors,
  Fonts,
  Radii,
  Shadows,
  Spacing,
  Typography,
} from '@/theme';
export type { ThemeColor, ThemeColors, ThemeName } from '@/theme';

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
