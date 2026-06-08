import { useEntries } from '@/context/EntriesContext';
import { useTheme } from '@/context/ThemeContext';
import { ScrollView, Text, View } from 'react-native';

export default function HistoryTab() {
  const { entries } = useEntries();
  console.log(entries);
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        padding: 24,
      }}
    >
      <Text
        style={{
          color: colors.text,
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
            backgroundColor: colors.backgroundSelected,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: colors.text,
              marginBottom: 8,
            }}
          >
            {entry.date}
          </Text>

          <Text
            style={{
              color: colors.text,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Schmerz: {entry.pain}/10
          </Text>

          <Text
            style={{
              color: colors.text,
            }}
          >
            {entry.note}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}