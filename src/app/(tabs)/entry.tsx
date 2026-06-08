import PainSlider from '@/components/entry/PainSlider';
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
const [painLevel, setPainLevel] = useState(5);

import { useTheme } from '@/context/ThemeContext';

export default function EntryTab() {
  const { colors } = useTheme();
  const [saved, setSaved] = useState(false);
  const [painLevel, setPainLevel] = useState(5);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 24,
        paddingTop: 40,
      }}
    >
      <Text
        style={{
          color: '#A5D6A7',
          fontSize: 14,
          fontWeight: '700',
          marginBottom: 12,
        }}
      >
        CRPS TRACKER
      </Text>

      <Text
        style={{
          color: colors.text,
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 8,
        }}
      >
        Neuer Eintrag
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          marginBottom: 24,
        }}
      >
        Schmerzwerte und Notizen erfassen.
      </Text>

      {saved && (
        <View
          style={{
            backgroundColor: '#BAD8BB',
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: '#0F1113',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Eintrag erfolgreich gespeichert!
          </Text>
        </View>
      )}

     <PainSlider
        value={painLevel}
        onChange={setPainLevel}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#A5D6A7',
          paddingVertical: 18,
          borderRadius: 18,
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={() => {
          setSaved(true);

          setTimeout(() => {
            setSaved(false);
          }, 3000);
        }}
      >
        <Text
          style={{
            color: '#0F1113',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Eintrag speichern
        </Text>
      </TouchableOpacity>
    </View>
  );
}