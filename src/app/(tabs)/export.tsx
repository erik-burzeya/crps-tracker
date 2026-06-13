import { useTheme } from '@/context/ThemeContext';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function ExportTab() {
  const { colors } = useTheme();

  const [timeRange, setTimeRange] = useState<
    '30d' | '3m' | '6m' | 'all'
  >('3m');

  const handleExport = async () => {
  try {
    const html = `
      <html>
        <body>
          <h1>CRPS-Verlaufsbericht</h1>

          <p>Zeitraum: ${timeRange}</p>

          <h2>Testbericht</h2>

          <p>Dieser PDF-Export funktioniert.</p>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html,
    });

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: '700',
          color: colors.text,
          marginBottom: 24,
        }}
      >
        Export
      </Text>

      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: colors.text,
          marginBottom: 16,
        }}
      >
        Zeitraum
      </Text>

      <Pressable
        onPress={() => setTimeRange('30d')}
        style={{ marginBottom: 12 }}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>
          {timeRange === '30d' ? '◉' : '○'} Letzte 30 Tage
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setTimeRange('3m')}
        style={{ marginBottom: 12 }}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>
          {timeRange === '3m' ? '◉' : '○'} Letzte 3 Monate
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setTimeRange('6m')}
        style={{ marginBottom: 12 }}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>
          {timeRange === '6m' ? '◉' : '○'} Letzte 6 Monate
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setTimeRange('all')}
        style={{ marginBottom: 32 }}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>
          {timeRange === 'all' ? '◉' : '○'} Gesamter Verlauf
        </Text>
      </Pressable>

      <Pressable
        onPress={handleExport}
        style={{
          backgroundColor: '#A5D6A7',
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#000',
          }}
        >
          PDF-Bericht erstellen
        </Text>
      </Pressable>

      <View>
        <Text
          style={{
            color: colors.text,
            fontWeight: '600',
            marginBottom: 8,
          }}
        >
          Der Bericht enthält:
        </Text>

        <Text style={{ color: colors.text }}>
          • Schmerzstatistiken
        </Text>
        <Text style={{ color: colors.text }}>
          • Schwellungshäufigkeit
        </Text>
        <Text style={{ color: colors.text }}>
          • Temperaturstörungen
        </Text>
        <Text style={{ color: colors.text }}>
          • Hautveränderungen
        </Text>
        <Text style={{ color: colors.text }}>
          • Schmerzqualitäten
        </Text>
        <Text style={{ color: colors.text }}>
          • Trigger
        </Text>
        <Text style={{ color: colors.text }}>
          • Medikamentenliste
        </Text>
      </View>
    </ScrollView>
  );
}