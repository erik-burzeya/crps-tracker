import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

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

  function toggleItem(item: string) {
    if (selected.includes(item)) {
      onChange(selected.filter((value) => value !== item));
    } else {
      onChange([...selected, item]);
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
      }}
    >
      {options.map((item) => {
        const isSelected = selected.includes(item);

        return (
          <TouchableOpacity
            key={item}
            onPress={() => toggleItem(item)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: isSelected
                ? colors.primary
                : colors.backgroundElement,
            }}
          >
            <Text
              style={{
                color: isSelected
                  ? '#000000'
                  : colors.text,
                fontSize: 14,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}