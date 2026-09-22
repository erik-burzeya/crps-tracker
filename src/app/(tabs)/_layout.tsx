import { Radii, Shadows } from '@/theme';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  const { colors, themeMode } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,

        tabBarStyle: {
          position: 'absolute',

          left: 16,
          right: 16,
          bottom: 16,

          height: 70,

          borderRadius: Radii.tabBar,

          borderColor: colors.border,

          borderWidth: themeMode === 'light' ? 2.5 : 1,

          overflow: 'hidden',
          ...Shadows.tabBar,
        },

        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              borderRadius: Radii.tabBar,
              overflow: 'hidden',
            }}
          >
            <BlurView
              intensity={65}
              tint={themeMode === 'light' ? 'light' : 'dark'}
              style={{
                flex: 1,
              }}
            />

            {/*Glasreflex */}
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: colors.surface,
                opacity: themeMode === 'light' ? 0.1 : 0.2,
              }}
            />
          </View>

),
      }}
    >
      <Tabs.Screen
        name="entry"
        options={{
          headerShown: false,
          title: 'Verlauf',
          tabBarIcon: () => (
            <Image
              source={
                themeMode === 'light'
                  ? require('../../../assets/Icons/Icons_dark.001.png')
                  : require('../../../assets/images/Icons/Icons.001.png')
              }
              style={{ width: 26, height: 26, alignItems: 'center',justifyContent: 'center', marginTop: 6}}
            />
          ),
        }}
      />

     <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: 'Verlauf',
          tabBarIcon: () => (
            <Image
              source={
                themeMode === 'light'
                  ? require('../../../assets/Icons/Icons_dark.002.png')
                  : require('../../../assets/images/Icons/Icons.002.png')
              }
              style={{ width: 26, height: 26, alignItems: 'center',justifyContent: 'center', marginTop: 6 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="medication"
        options={{
          headerShown: false,
          title: 'Verlauf',
          tabBarIcon: () => (
            <Image
              source={
                themeMode === 'light'
                  ? require('../../../assets/Icons/Icons_dark.003.png')
                  : require('../../../assets/images/Icons/Icons.003.png')
              }
              style={{ width: 38, height: 38, alignItems: 'center',justifyContent: 'center', marginTop: 6 }}
            />
          ),
        }}
      />

      <Tabs.Screen
  name="settings"
  options={{
    headerShown: false,
    title: 'Verlauf',
    tabBarIcon: () => (
      <Image
        source={
          themeMode === 'light'
            ? require('../../../assets/Icons/Icons_dark.004.png')
            : require('../../../assets/images/Icons/Icons.004.png')
        }
        style={{ width: 26, height: 26, alignItems: 'center',justifyContent: 'center', marginTop: 6 }}
      />
    ),
  }}
/>

      <Tabs.Screen
  name="export"
  options={{
    headerShown: false,
    title: 'Verlauf',
    tabBarIcon: () => (
      <Image
        source={
          themeMode === 'light'
            ? require('../../../assets/Icons/Icons_dark.005.png')
            : require('../../../assets/images/Icons/Icons.005.png')
        }
        style={{ width: 26, height: 26, alignItems: 'center',justifyContent: 'center', marginTop: 6 }}
      />
          ),
        }}
      />
    </Tabs>
  );
}