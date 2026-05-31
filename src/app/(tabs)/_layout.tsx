import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="entry"
        options={{ title: 'Entry' }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: 'History' }}
      />
      <Tabs.Screen
        name="medication"
        options={{ title: 'Medication' }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'Settings' }}
      />
      <Tabs.Screen
      name="export" 
      options={{ title: 'Export' }} 
      />
      </Tabs>
  );
}