import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Medication = {
  id: string;
  name: string;
  dosage: string;
  notes?: string;
};

export default function MedicationTab() {
  const { colors } = useTheme();

  const [medications, setMedications] = useState<Medication[]>([]);

   const [selectionMode, setSelectionMode] = useState(false);

  const [selectedMedicationIds, setSelectedMedicationIds] =
    useState<string[]>([]);

  const loadMedications = async () => {
    try {
      const saved = await AsyncStorage.getItem('medications');

      if (saved) {
        setMedications(JSON.parse(saved));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveMedications = async (
    newMedications: Medication[]
  ) => {
    try {
      await AsyncStorage.setItem(
        'medications',
        JSON.stringify(newMedications)
      );

      setMedications(newMedications);
    } catch (error) {
      console.error(error);
    }
  };

  const addMedication = async () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: 'Ibuprofen',
      dosage: '400 mg',
    };

    await saveMedications([
      ...medications,
      newMedication,
    ]);
  };

  const deleteMedication = async (id: string) => {
    const updatedMedications = medications.filter(
      (medication) => medication.id !== id
    );

    await saveMedications(updatedMedications);
  };

  const toggleMedicationSelection = (id: string) => {
    if (selectedMedicationIds.includes(id)) {
      setSelectedMedicationIds(
        selectedMedicationIds.filter(
          (selectedId) => selectedId !== id
        )
      );
    } else {
      setSelectedMedicationIds([
        ...selectedMedicationIds,
        id,
      ]);
    }
  };
  
  useEffect(() => {
    loadMedications();
  }, []);

 
    
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
<View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    }}
  >
    <Text
      style={{
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: '700',
      }}
    >
      AKTUELLE MEDIKAMENTE
    </Text>

    <TouchableOpacity
      onPress={() => {
        setSelectionMode(!selectionMode);

        if (selectionMode) {
          setSelectedMedicationIds([]);
        }
      }}
    >
      <Text
        style={{
          color: '#A5D6A7',
          fontWeight: '700',
        }}
      >
        {selectionMode ? 'FERTIG' : 'AUSWÄHLEN'}
      </Text>
    </TouchableOpacity>
      </View>




      {medications.map((medication) => (
      <TouchableOpacity
        onPress={() => {
          if (selectionMode) {
            toggleMedicationSelection(
              medication.id
            );
          }
        }}
        key={medication.id}
        onLongPress={() => deleteMedication(medication.id)}
        style={{
          backgroundColor: colors.backgroundElement,
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            fontWeight: '600',
          }}
        >
         {selectionMode && (
          <View
            style={{
              position: 'absolute',
              right: 16,
              top: 8,
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#A5D6A7',
              backgroundColor:
                selectedMedicationIds.includes(
                  medication.id
                )
                  ? '#A5D6A7'
                  : 'transparent',
              marginBottom: 12,
            }}
          />
        )}
          {medication.name}
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 4,
          }}
        >
          {medication.dosage}
        </Text>
       
      </TouchableOpacity>
    ))}

{selectionMode &&
  selectedMedicationIds.length > 0 && (
    <TouchableOpacity
      onPress={async () => {
        const updatedMedications =
          medications.filter(
            (medication) =>
              !selectedMedicationIds.includes(
                medication.id
              )
          );

        await saveMedications(
          updatedMedications
        );



        setSelectedMedicationIds([]);
          }}
          style={{
            backgroundColor: '#EF5350',
            padding: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
            }}
          >
            Ausgewählte löschen
          </Text>
        </TouchableOpacity>
      )}

      
      <TouchableOpacity
        onPress={addMedication}
        style={{
          backgroundColor: '#A5D6A7',
          padding: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Text
          style={{
            color: '#000',
            fontWeight: '600',
          }}
        >
          Test-Medikament hinzufügen
        </Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}