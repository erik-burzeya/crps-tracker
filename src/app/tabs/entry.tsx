import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function EntryTab() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#0F1113',
      }}
    >
      <View
        style={{
          marginBottom: 50,
        }}
      >
        <Text
          style={{
            color: '#A5D6A7',
            fontSize: 14,
            fontWeight: '700',
            marginBottom: 12,
          }}
        >
          [Name]
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 34,
            fontWeight: 'bold',
            marginBottom: 14,
          }}
        >
          CRPS TRACKER.
        </Text>

        <Text
          style={{
            color: '#8E9194',
            fontSize: 16,
          }}
        >
          Einfach täglich tracken.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#A5D6A7',
          paddingVertical: 18,
          borderRadius: 18,
          alignItems: 'center',
        }}
        onPress={() => router.push('/new-entry')}
      >
        <Text
          style={{
            color: '#0F1113',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Neuer Eintrag
        </Text>
      </TouchableOpacity>
    </View>
  );
}