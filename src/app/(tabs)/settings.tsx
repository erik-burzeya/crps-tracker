import { Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
export default function SettingsTab() {
  const { colors, themeMode, setThemeMode } = useTheme();

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
    </View>
  );
}