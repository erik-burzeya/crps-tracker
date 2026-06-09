import { Spacing } from '@/constants/theme';
import { useEntries } from '@/context/EntriesContext';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';

import {
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
export default function SettingsTab() {
  const { colors, themeMode, setThemeMode } = useTheme();
  
  const { clearEntries } = useEntries();

  const [showDeleteAllModal, setShowDeleteAllModal] =
    useState(false);

  const openGithub = () => {
    console.log('GitHub pressed');
    Linking.openURL('https://github.com/erik-burzeya/crps-tracker');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: Spacing.four,
        paddingTop: 24,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 32,
          fontWeight: '700',
          marginBottom: Spacing.five,
        }}
      >
        Einstellungen
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          fontWeight: '600',
          marginBottom: Spacing.three,
        }}
      >
        APPEARANCE
      </Text>

      <View
        style={{
          backgroundColor: colors.backgroundElement,
          borderRadius: 16,
          padding: Spacing.three,
          marginBottom: Spacing.five,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            marginBottom: Spacing.three,
          }}
        >
          Theme
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: Spacing.three,
          }}
        >
          <TouchableOpacity
            onPress={() => setThemeMode('light')}
            style={{
              flex: 1,
              backgroundColor:
                themeMode === 'light' ? colors.backgroundSelected : colors.backgroundElement,
              borderWidth: themeMode === 'light' ? 2 : 0,
              borderColor: colors.text,
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontWeight: '600',
              }}
            >
              Light
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setThemeMode('dark')}
            style={{
              flex: 1,
              backgroundColor:
                themeMode === 'dark'
                  ? colors.backgroundSelected
                  : colors.backgroundElement,
              borderWidth: themeMode === 'dark' ? 2 : 0,
              borderColor: colors.text,
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontWeight: '600',
              }}
            >
              Dark
            </Text>
          </TouchableOpacity>
        </View>
      </View>



      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          fontWeight: '600',
          marginBottom: Spacing.three,
        }}
      >
        ABOUT
      </Text>

      <View
        style={{
          backgroundColor: colors.backgroundElement,
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        <TouchableOpacity
          onPress={openGithub}
          style={{
            padding: Spacing.three,
            borderBottomWidth: 1,
            borderBottomColor: colors.backgroundSelected,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
            }}
          >
            GitHub Repository
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: Spacing.three,
            borderBottomWidth: 1,
            borderBottomColor: colors.backgroundSelected,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
            }}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>

        <View
          style={{
            padding: Spacing.three,
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 16,
            }}
          >
            Version 0.1.0
          </Text>
        </View>
        
      </View>
      <TouchableOpacity
  onPress={() => {
    setShowDeleteAllModal(true);
  }}
  style={{
    marginBottom: Spacing.four,
    marginTop: Spacing.four,
  }}
>
  <Text
    style={{
      color: '#FF6B6B',
      fontWeight: 'bold',
    }}
  >
    Gesamten Verlauf löschen
  </Text>
</TouchableOpacity>
      <Modal
  visible={showDeleteAllModal}
  transparent
  animationType="fade"
  
>
  
  <View
  style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  }}
>
  <BlurView
    intensity={25}
    tint={themeMode === 'dark' ? 'dark' : 'light'}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  />

  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.35)',
    }}
  />

  {/* Dein bestehendes Popup */}
    <View
      style={{
        backgroundColor: colors.backgroundElement,
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 12,
        }}
      >
        Gesamten Verlauf löschen?
      </Text>

      <Text
        style={{
          color: colors.text,
          marginBottom: 24,
          opacity: 0.8,
        }}
      >
        Alle gespeicherten Einträge werden dauerhaft gelöscht.
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={() => setShowDeleteAllModal(false)}
        >
          <Text
            style={{
              color: '#A5D6A7',
              fontWeight: 'bold',
            }}
          >
            Abbrechen
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            clearEntries();
            setShowDeleteAllModal(false);
          }}
        >
          <Text
            style={{
              color: '#FF6B6B',
              fontWeight: 'bold',
            }}
          >
            Alles löschen
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
}