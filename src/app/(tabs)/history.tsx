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
      animationType="fade"
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
    marginBottom: 20,
  }}
        >
          Detailansicht
        </Text>

        <Text
          style={{
            color: colors.text,
            marginBottom: 8,
          }}
        >
          Datum: {selectedEntry?.date}
        </Text>

        <Text
          style={{
            color: colors.text,
            marginBottom: 16,
          }}
        >
          Schmerz: {selectedEntry?.pain}/10
        </Text>

        <Text
          style={{
            color: colors.text,
            fontWeight: 'bold',
            marginBottom: 6,
          }}
        >
          Notiz
        </Text>

        <Text
          style={{
            color: colors.text,
            marginBottom: 20,
          }}
        >
          {selectedEntry?.note || 'Keine Notiz vorhanden'}
        </Text>



          <Text
          style={{
            color: colors.text,
            fontWeight: 'bold',
            marginBottom: 6,
          }}
          >
            Schmerzqualitäten
          </Text>
            
          {selectedEntry?.painQualities?.length > 0 ? (
            selectedEntry.painQualities.map(
              (quality: string, index: number) => (
                <Text
                  key={index}
                  style={{
                    color: colors.text,
                    marginBottom: 4,
                  }}
                >
                  • {quality}
                </Text>
              )
            )
          ) : (
            <Text
              style={{
                color: colors.text,
                marginBottom: 12,
                opacity: 0.7,
              }}
            >
              Keine Angaben
            </Text>
          )}


          <Text
            style={{
              color: colors.text,
              fontWeight: 'bold',
              marginTop: 12,
              marginBottom: 6,
            }}
          >
            Trigger
          </Text>

          {selectedEntry?.triggers?.length > 0 ? (
            selectedEntry.triggers.map(
              (trigger: string, index: number) => (
                <Text
                  key={index}
                  style={{
                    color: colors.text,
                    marginBottom: 4,
                  }}
                >
                  • {trigger}
                </Text>
              )
            )
          ) : (
            <Text
              style={{
                color: colors.text,
                marginBottom: 12,
                opacity: 0.7,
              }}
            >
              Keine Angaben
            </Text>
          )}

          <Text
            style={{
              color: colors.text,
              fontWeight: 'bold',
              marginTop: 12,
              marginBottom: 8,
            }}
          >
            Körperliche Symptome
          </Text>

          <Text
            style={{
              color: colors.text,
              marginBottom: 6,
            }}
          >
            Temperaturgefühl: {selectedEntry?.temperatureFeeling || 'Keine Angabe'}
          </Text>

          <Text
            style={{
              color: colors.text,
              marginBottom: 6,
            }}
          >
            Hautfarbe: {selectedEntry?.skinColor || 'Keine Angabe'}
          </Text>

          <Text
            style={{
              color: colors.text,
              marginBottom: 12,
            }}
          >
            Schwellung:{' '}
            {selectedEntry?.swelling === true
              ? 'Ja'
              : selectedEntry?.swelling === false
              ? 'Nein'
              : 'Keine Angabe'}
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