import { useEntries } from '@/context/EntriesContext';
import { useTheme } from '@/context/ThemeContext';

import React, { useState } from 'react';

import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HistoryTab() {
  const { entries } = useEntries();
  
  console.log(entries);
  const [selectedEntry, setSelectedEntry] =
  useState<any>(null);
  const { colors } = useTheme();

  return (
  <>
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
          color: colors.text,
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 24,
        }}
      >
        Verlauf
      </Text>

      {entries.map((entry) => (
        <TouchableOpacity
          key={entry.id}
          onPress={() => {
            setSelectedEntry(entry);
          }}
          style={{
            backgroundColor: colors.backgroundSelected,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: colors.text,
              marginBottom: 8,
            }}
          >
            {entry.date}
          </Text>

          <Text
            style={{
              color: colors.text,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Schmerz: {entry.pain}/10
          </Text>

          <Text
            style={{
              color: colors.text,
            }}
          >
            {entry.note}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    <Modal
      visible={selectedEntry !== null}
      animationType="slide"
      transparent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '85%',
            backgroundColor: colors.backgroundElement,
            borderRadius: 20,
            padding: 24,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 16,
            }}
          >
            Detailansicht
          </Text>

          <TouchableOpacity
            onPress={() => setSelectedEntry(null)}
          >
            <Text
              style={{
                color: '#A5D6A7',
                fontWeight: 'bold',
              }}
            >
              Schließen
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </>
);
}