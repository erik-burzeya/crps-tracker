import { StyleSheet } from 'react-native';

import { Radii, Spacing, Typography, type ThemeColors } from '@/theme';

export function createEntryStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: Radii.lg,
      padding: Spacing.md,
      marginBottom: Spacing.md,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    label: {
      color: colors.textPrimary,
      ...Typography.body,
      fontWeight: '600',
    },
    value: {
      color: colors.textPrimary,
      fontSize: 24,
      fontWeight: '700',
    },
    secondary: {
      color: colors.textSecondary,
      ...Typography.bodySmall,
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: Radii.pill,
    },
    chipText: {
      ...Typography.bodySmall,
    },
  });
}
