import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { createEntryStyles } from '../entry.styles';

type Props = {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
};

export default function MultiSelectChips({
  options,
  selected,
  onChange,
}: Props) {
  const { colors } = useTheme();
  const styles = createEntryStyles(colors);

  function toggleItem(item: string) {
    if (selected.includes(item)) {
      onChange(selected.filter((value) => value !== item));
    } else {
      onChange([...selected, item]);
    }
  }

  return (
    <View
      style={styles.chips}
    >
      {options.map((item) => {
        const isSelected = selected.includes(item);

        return (
          <TouchableOpacity
            key={item}
            onPress={() => toggleItem(item)}
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