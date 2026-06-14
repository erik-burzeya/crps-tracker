import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Image, View } from 'react-native';

export default function TabsLayout() {
  const { colors } = useTheme();
  const { themeMode } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,

        tabBarStyle: {
          position: 'absolute',

          left: 16,
          right: 16,
          bottom: 16,

          height: 80,

          borderRadius: 28,

          borderColor:
          themeMode === 'light'
            ? 'rgba(13, 13, 13, 0.12)'
            : 'rgba(255,255,255,0.35)',

          borderWidth: themeMode === 'light' ? 2.5 : 1,

          overflow: 'hidden',

          

          elevation: 12,
        },

        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              borderRadius: 28,
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
                position: 'absolute',
                backgroundColor:
              themeMode === 'light'
                ? 'rgba(255,255,255,0.10)'
                : 'rgba(255,255,255,0.20)',
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
              style={{ width: 28, height: 28 }}
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
              style={{ width: 28, height: 28 }}
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
              style={{ width: 38, height: 38 }}
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
        style={{ width: 28, height: 28 }}
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
        style={{ width: 28, height: 28 }}
      />
          ),
        }}
      />
    </Tabs>
  );
}