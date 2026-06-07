import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/context/ThemeContext';

export default function EntryTab() {
  const { colors } = useTheme();
  const [saved, setSaved] = useState(false);

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

      <TextInput
        placeholder="Schmerzlevel 0–10"
        placeholderTextColor={colors.textSecondary}
        style={{
          backgroundColor: colors.backgroundElement,
          borderWidth: 1,
          borderColor: colors.backgroundSelected,
          borderRadius: 16,
          padding: 16,
          color: colors.text,
          fontSize: 16,
        }}
      />

      <TextInput
        placeholder="Notizen"
        placeholderTextColor={colors.textSecondary}
        multiline
        style={{
          backgroundColor: colors.backgroundElement,
          borderWidth: 1,
          borderColor: colors.backgroundSelected,
          borderRadius: 16,
          padding: 16,
          color: colors.text,
          fontSize: 16,
          height: 140,
          textAlignVertical: 'top',
          marginTop: 12,
        }}
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