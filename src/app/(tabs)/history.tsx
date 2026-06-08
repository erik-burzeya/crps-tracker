import { ScrollView, Text, View } from 'react-native';

export default function HistoryTab() {
  const entries = [
    {
      id: 1,
      date: '08.06.2026',
      pain: 6,
      note: 'Heute längerer Spaziergang.',
    },
    {
      id: 2,
      date: '07.06.2026',
      pain: 4,
      note: 'Morgens deutlich besser.',
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#0F1113',
      }}
      contentContainerStyle={{
        padding: 24,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 24,
        }}
      >
        Verlauf
      </Text>

      {entries.map((entry) => (
        <View
          key={entry.id}
          style={{
            backgroundColor: '#1A1D21',
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: '#AAAAAA',
              marginBottom: 8,
            }}
          >
            {entry.date}
          </Text>

          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Schmerz: {entry.pain}/10
          </Text>

          <Text
            style={{
              color: 'white',
            }}
          >
            {entry.note}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}