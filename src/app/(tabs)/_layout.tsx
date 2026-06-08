import { Tabs } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,
        
        tabBarStyle: {
          backgroundColor: colors.backgroundElement,
          borderTopColor: colors.backgroundSelected,
          borderTopWidth: 1,
          height: 80,
        },

        tabBarIconStyle: {
          display: 'none',
        },
        
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,

        tabBarItemStyle: {
          justifyContent: 'center',
          paddingVertical: 0,
        },
        

      }}
    >
      <Tabs.Screen
        name="entry"
        options={{ title: 'Home' }}
      />

      <Tabs.Screen
        name="history"
        options={{ title: 'Verlauf' }}
      />

      <Tabs.Screen
        name="medication"
        options={{ title: 'Medikamente' }}
      />

      <Tabs.Screen
        name="settings"
        options={{ title: 'Einstellungen' }}
      />

      <Tabs.Screen
        name="export"
        options={{ title: 'Export' }}
      />
    </Tabs>
  );
}