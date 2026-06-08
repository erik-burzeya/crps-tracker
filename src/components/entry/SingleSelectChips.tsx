import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

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

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {options.map((item) => {
        const isSelected = selected === item;

        return (
          <TouchableOpacity
            key={item}
            onPress={() => onChange(item)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 8,
              marginBottom: 8,
              backgroundColor: isSelected
                ? colors.primary
                : colors.backgroundElement,
            }}
          >
            <Text
              style={{
                color: isSelected ? '#000000' : colors.text,
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