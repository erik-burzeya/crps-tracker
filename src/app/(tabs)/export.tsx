import { useTheme } from '@/context/ThemeContext';
import { ScrollView, Text } from 'react-native';

export default function ExportTab() {
  
  const { colors } = useTheme();
  
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 24,
      }}
      
      style={{
        flex: 1,
       
        paddingHorizontal: 24,
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
        Export
      </Text>

      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: 300,
          marginBottom: 24,
        }}
      >
        Kommt bald!
      </Text>
    </ScrollView>
  );
}




      

  
