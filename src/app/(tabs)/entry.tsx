// -------------------------------------
// Imports
// -------------------------------------

import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ScrollView } from 'react-native';

import MultiSelectChips from '@/components/entry/MultiSelectChips';
import PainSlider from '@/components/entry/PainSlider';
import SingleSelectChips from '@/components/entry/SingleSelectChips';
import { useTheme } from '@/context/ThemeContext';

import { ADDITIONAL_SYMPTOMS } from '@/constants/additionalSymptoms';

import { PAIN_QUALITIES } from '@/constants/painQualities';
import { TRIGGERS } from '@/constants/triggers';


import {
  SKIN_COLORS,
  TEMPERATURE_FEELINGS,
} from '@/constants/autonomic';


export default function EntryTab() {

  const { colors } = useTheme();

  // -------------------------------------
  // Constants
  // -------------------------------------

  const DEFAULT_PAIN_LEVEL = 5;

  // -------------------------------------
  // State
  // -------------------------------------

  const [saved, setSaved] = useState(false);

  

  const [painLevel, setPainLevel] =
    useState(DEFAULT_PAIN_LEVEL);

  const [painQualities, setPainQualities] =
    useState<string[]>([]);

  const [triggers, setTriggers] =
    useState<string[]>([]);

  const [temperatureFeeling, setTemperatureFeeling] =
    useState<string | null>(null);

  const [skinColor, setSkinColor] =
    useState<string | null>(null);

  const [swelling, setSwelling] =
    useState<boolean | null>(null);

  // -------------------------------------
  // Additional Symptoms
  // -------------------------------------

  const [selectedSymptom, setSelectedSymptom] =
    useState<string | null>(null);

  const [symptomIntensity, setSymptomIntensity] =
    useState(5);

  const [additionalSymptoms, setAdditionalSymptoms] =
    useState<
      {
        symptom: string;
        intensity: number;
      }[]
    >([]);


  // -------------------------------------
  // Notes
  // -------------------------------------

  const [notes, setNotes] = useState('');


  // -------------------------------------
  // Helper Functions
  // -------------------------------------

 const resetForm = () => {
  setPainLevel(DEFAULT_PAIN_LEVEL);
  setPainQualities([]);
  setTriggers([]);

  setTemperatureFeeling(null);
  setSkinColor(null);
  setSwelling(null);

  setSelectedSymptom(null);
  setSymptomIntensity(5);
  setAdditionalSymptoms([]);
  
  setNotes('');
};
    
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 24,
        paddingTop: 40,
      }}
    >
      <Text
        style={{
          color: '#A5D6A7',
          fontSize: 14,
          fontWeight: '700',
          marginBottom: 12,
        }}
      >
        CRPS TRACKER
      </Text>

      <Text
        style={{
          color: colors.text,
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 8,
        }}
      >
        Neuer Eintrag
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          marginBottom: 24,
        }}
      >
        Schmerzwerte und Notizen erfassen.
      </Text>

      {saved && (
        <View
          style={{
            backgroundColor: '#BAD8BB',
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: '#0F1113',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Eintrag erfolgreich gespeichert!
          </Text>
        </View>
      )}
      {/* -------------------------------------
          Schmerzqualität
      ------------------------------------- */}
      <PainSlider
        value={painLevel}
        onChange={setPainLevel}
      />

      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 12,
          marginTop: 24,
        }}
      >
        Schmerzqualität
      </Text>

      <MultiSelectChips
        options={PAIN_QUALITIES}
        selected={painQualities}
        onChange={setPainQualities}
      />

      {/* -------------------------------------
          Trigger
      ------------------------------------- */}

      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 12,
          marginTop: 24,
        }}
      >
        Trigger
      </Text>

      <MultiSelectChips
        options={TRIGGERS}
        selected={triggers}
        onChange={setTriggers}
      />

      {/* -------------------------------------
          Temperaturgefühl
      ------------------------------------- */}
        <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 12,
          marginTop: 24,
        }}
      >
        Temperaturgefühl
      </Text>

      <SingleSelectChips
        options={TEMPERATURE_FEELINGS}
        selected={temperatureFeeling}
        onChange={setTemperatureFeeling}
/>
      {/* -------------------------------------
          Temperaturgefühl
      ------------------------------------- */}
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 12,
          marginTop: 24,
        }}
      >
        Hautfarbe
      </Text>

      <SingleSelectChips
        options={SKIN_COLORS}
        selected={skinColor}
        onChange={setSkinColor}
      />
      {/* -------------------------------------
          Schwellung
      ------------------------------------- */}
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 12,
          marginTop: 24,
        }}
      >
        Schwellung
      </Text>

      <SingleSelectChips
        options={['Ja', 'Nein']}
        selected={
          swelling === null
            ? null
            : swelling
            ? 'Ja'
            : 'Nein'
        }
        onChange={(value) =>
          setSwelling(value === 'Ja')
        }
      />

        {/* -------------------------------------
            Zusätzliche Symptome
        ------------------------------------- */}

        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 12,
            marginTop: 24,
          }}
        >
          Zusätzliche Symptome
        </Text>

        <SingleSelectChips
          options={ADDITIONAL_SYMPTOMS}
          selected={selectedSymptom}
          onChange={setSelectedSymptom}
        />

        <PainSlider
          value={symptomIntensity}
          onChange={setSymptomIntensity}
        />

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 12,
          }}
          onPress={() => {
            if (!selectedSymptom) return;

            setAdditionalSymptoms([
              ...additionalSymptoms,
              {
                symptom: selectedSymptom,
                intensity: symptomIntensity,
              },
            ]);

            setSelectedSymptom(null);
            setSymptomIntensity(5);
          }}
        >
          <Text
            style={{
              color: '#0F1113',
              fontWeight: 'bold',
            }}
          >
            Symptom hinzufügen
          </Text>
        </TouchableOpacity>




        {additionalSymptoms.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: colors.backgroundElement,
              padding: 12,
              borderRadius: 12,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: colors.text,
              }}
            >
              {item.symptom} ({item.intensity}/10)
            </Text>
          </View>
        ))}


      {/* -------------------------------------
          Notizen
      ------------------------------------- */}

      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 12,
          marginTop: 24,
        }}
      >
        Notizen
      </Text>

      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Freitext für Beobachtungen, Medikamente, besondere Ereignisse ..."
        placeholderTextColor={colors.textSecondary}
        multiline
        textAlignVertical="top"
        style={{
          backgroundColor: colors.backgroundElement,
          color: colors.text,
          borderRadius: 16,
          padding: 16,
          minHeight: 120,
          fontSize: 16,
        }}
      />


      {/* -------------------------------------
          Speichern
      ------------------------------------- */}

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

          resetForm();

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
    
  </ScrollView>
  
  );
}