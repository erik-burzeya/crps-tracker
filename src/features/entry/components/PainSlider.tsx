import Slider from '@react-native-community/slider';
import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { Spacing } from '@/theme';
import { createEntryStyles } from '../entry.styles';

interface PainSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function PainSlider({
  value,
  onChange,
}: PainSliderProps) {
  const { colors } = useTheme();
  const styles = createEntryStyles(colors);

  const getDescription = (pain: number) => {
    if (pain <= 1) return 'Kaum spürbar';
    if (pain <= 3) return 'Leicht';
    if (pain <= 5) return 'Mäßig';
    if (pain <= 7) return 'Stark';
    if (pain <= 9) return 'Sehr stark';
    return 'Maximal';
  };

  return (
    <View
      style={styles.card}
    >
      <View
        style={styles.row}
      >
        <Text
          style={styles.label}
        >
          Schmerzintensität
        </Text>

        <Text
          style={styles.value}
        >
          {value}/10
        </Text>
      </View>

        <Slider
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={value}
            onValueChange={onChange}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.backgroundSelected}
            thumbTintColor={colors.primary}
        />

      <Text
        style={[styles.secondary, { marginTop: Spacing.sm }]}
      >
        {getDescription(value)}
      </Text>
    </View>
  );
}