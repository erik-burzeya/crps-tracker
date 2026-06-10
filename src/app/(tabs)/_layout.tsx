import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Image, View } from 'react-native';

export default function TabsLayout() {
  const { colors } = useTheme();

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

          backgroundColor: 'transparent',

          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.35)',

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
              tint="dark"
              style={{
                flex: 1,
              }}
            />

            {/*Glasreflex */}
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.20)',
              }}
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="entry"
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <Image
              source={require('../../../assets/images/Icons/Icons.001.png')}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'Verlauf',
          tabBarIcon: () => (
            <Image
              source={require('../../../assets/images/Icons/Icons.002.png')}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="medication"
        options={{
          title: 'Medikamente',
          tabBarIcon: () => (
            <Image
              source={require('../../../assets/images/Icons/Icons.003.png')}
              style={{ width: 37, height: 37 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Einstellungen',
          tabBarIcon: () => (
            <Image
              source={require('../../../assets/images/Icons/Icons.004.png')}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="export"
        options={{
          title: 'Export',
          tabBarIcon: () => (
            <Image
              source={require('../../../assets/images/Icons/Icons.005.png')}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}