import Slider from '@react-native-community/slider';
import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

interface PainSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function PainSlider({
  value,
  onChange,
}: PainSliderProps) {
  const { colors } = useTheme();

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
      style={{
        backgroundColor: colors.backgroundElement,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          Schmerzintensität
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 24,
            fontWeight: 'bold',
          }}
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
        style={{
          color: colors.textSecondary,
          marginTop: 8,
        }}
      >
        {getDescription(value)}
      </Text>
    </View>
  );
}