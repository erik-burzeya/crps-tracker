import { useTheme } from '@/context/ThemeContext';
import { ScrollView, Text } from 'react-native';

export default function MedicationTab() {
  const { colors } = useTheme();
  

return (
  <ScrollView
    contentContainerStyle={{
      padding: 24,
    }}

    style={{
      flex: 1,
      backgroundColor: colors.background,
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
      Medikamente
    </Text>
  </ScrollView>
);

}