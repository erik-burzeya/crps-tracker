import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
    
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIconStyle: {
        display: 'none',
        },
        tabBarStyle: {
        backgroundColor: '#181A1B',
        borderTopColor: '#2D3135',
        borderTopWidth: 1,
        height: 70,
        },

        tabBarActiveTintColor: '#A5D6A7',
        tabBarInactiveTintColor: '#8E9194',

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 8,
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