import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function NewEntryScreen() {
  const [saved, setSaved] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F1113',
        paddingHorizontal: 24,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 34,
          fontWeight: 'bold',
          marginBottom: 24,
        }}
      >
        Neuer Eintrag
      </Text>

      {saved && (
        <View
          style={{
            backgroundColor: '#bad8bb',
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: '#0F1113',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Eintrag erfolgreich gespeichert!
          </Text>
        </View>
      )}

      <TextInput
        placeholder="Schmerzlevel 0-10"
        placeholderTextColor="#8E9194"
        style={{
          backgroundColor: '#1A1C1E',
          borderWidth: 1,
          borderColor: '#2D3135',
          borderRadius: 16,
          padding: 16,
          color: 'white',
          fontSize: 16,
        }}
      />

      <TextInput
        placeholder="Notizen"
        placeholderTextColor="#8E9194"
        multiline
        style={{
          backgroundColor: '#1A1C1E',
          borderWidth: 1,
          borderColor: '#2D3135',
          borderRadius: 16,
          padding: 16,
          color: 'white',
          fontSize: 16,
          height: 120,
          textAlignVertical: 'top',
          marginTop: 12,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#A5D6A7',
          paddingVertical: 18,
          borderRadius: 18,
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={() => {
          setSaved(true);

          setTimeout(() => {
            setSaved(false);
          }, 3000);
        }}
      >
        <Text
          style={{
            color: '#0F1113',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Eintrag speichern
        </Text>
      </TouchableOpacity>
    </View>
  );
}