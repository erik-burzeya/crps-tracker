import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { createEntryStyles } from '../entry.styles';

type Props = {
  options: string[];
  selected: string | null;
  onChange: (value: string) => void;
};

export default function SingleSelectChips({
  options,
  selected,
  onChange,
}: Props) {
  const { colors } = useTheme();
  const styles = createEntryStyles(colors);

  return (
    <View
      style={styles.chips}
    >
      {options.map((item) => {
        const isSelected = selected === item;

        return (
          <TouchableOpacity
            key={item}
            onPress={() => onChange(item)}
            style={[
              styles.chip,
              { backgroundColor: isSelected ? colors.primary : colors.surface },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: isSelected ? colors.onPrimary : colors.textPrimary },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}