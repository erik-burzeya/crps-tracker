import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function EntryTab() {
  const [saved, setSaved] = useState(false);
  console.log('saved:', saved);
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      }}
    >
      {saved && (
        <View
          style={{
            backgroundColor: 'red',
            padding: 30,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 30,
            }}
          >
            TEST BANNER
          </Text>
        </View>
      )}

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Entry funktioniert
      </Text>

      <Button
        title="Speichern"
        onPress={() => {
          setSaved(true);

          setTimeout(() => {
            setSaved(false);
          }, 3000);
        }}
      />
    </View>
  );
}