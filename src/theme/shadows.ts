import { Platform } from 'react-native';

export const Shadows = {
  card: Platform.select({
    ios: { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
    android: { elevation: 4 },
    default: {},
  }),
  tabBar: Platform.select({
    ios: { shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
    android: { elevation: 12 },
    default: {},
  }),
} as const;
