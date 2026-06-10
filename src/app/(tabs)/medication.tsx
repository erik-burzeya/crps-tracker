import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Medication = {
  id: string;
  name: string;
  dosage: string;
  notes?: string;
  frequency?: string;
};

export default function MedicationTab() {
  const { colors } = useTheme();

  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedMedicationIds, setSelectedMedicationIds] = useState<string[]>([]);

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

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const saveMedications = async (newMedications: Medication[]) => {
    try {
      await AsyncStorage.setItem('medications', JSON.stringify(newMedications));
      setMedications(newMedications);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMedication = async (id: string) => {
    const updatedMedications = medications.filter((medication) => medication.id !== id);
    await saveMedications(updatedMedications);
  };

  const toggleMedicationSelection = (id: string) => {
    if (selectedMedicationIds.includes(id)) {
      setSelectedMedicationIds(selectedMedicationIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedMedicationIds([...selectedMedicationIds, id]);
    }
  };

  useEffect(() => {
    loadMedications();
  }, []);

  const saveMedication = async () => {

  if (editingId) {
    const updatedMedications =
      medications.map((medication) =>
        medication.id === editingId
          ? {
              ...medication,
              name: newName,
              dosage: newDosage,
              notes: newNotes,
            }
          : medication
      );

    await saveMedications(
      updatedMedications
    );

    setEditingId(null);
    setNewName('');
    setNewDosage('');
    setNewNotes('');
    setShowAddForm(false);

    return;
  }

  if (!newName.trim()) return;

  const medication: Medication = {
    id: Date.now().toString(),
    name: newName,
    dosage: newDosage,
    notes: newNotes,
  };

  await saveMedications([
    ...medications,
    medication,
  ]);

  setNewName('');
  setNewDosage('');
  setNewNotes('');
  setShowAddForm(false);
};

  const [editingId, setEditingId] =
    useState<string | null>(null);

  return (
    
    <ScrollView
      contentContainerStyle={{ padding: 24 }}
      style={{ flex: 1, backgroundColor: colors.background }}
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
        <Text style={{ color: colors.textSecondary, fontSize: 14, fontWeight: '700' }}>
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
          <Text style={{ color: '#A5D6A7', fontWeight: '700' }}>
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
          } else {
            setEditingId(medication.id);

            setNewName(medication.name);
            setNewDosage(medication.dosage);
            setNewNotes(
              medication.notes || ''
            );

            setShowAddForm(true);
          }
        }}
          key={medication.id}
          onLongPress={() => deleteMedication(medication.id)}
          style={{
            backgroundColor: colors.backgroundElement,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            position: 'relative',
          }}
        >
          {selectionMode && (
            <View
              style={{
                position: 'absolute',
                right: 16,
                top: 16,
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#A5D6A7',
                backgroundColor: selectedMedicationIds.includes(medication.id)
                  ? '#A5D6A7'
                  : 'transparent',
                zIndex: 10,
              }}
            />
          )}

          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>
            {medication.name}
          </Text>

          <Text style={{ color: colors.textSecondary, marginTop: 4 }}>
            {medication.dosage}
          </Text>
        </TouchableOpacity>
      ))}

      {selectionMode && selectedMedicationIds.length > 0 && (
        <TouchableOpacity
          onPress={async () => {
            const updatedMedications = medications.filter(
              (medication) => !selectedMedicationIds.includes(medication.id)
            );
            await saveMedications(updatedMedications);
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
          <Text style={{ color: 'white', fontWeight: '600' }}>
            Ausgewählte löschen
          </Text>
        </TouchableOpacity>
      )}

      {!showAddForm && (
        <TouchableOpacity
          onPress={() => {
            setEditingId(null);
            setNewName('');
            setNewDosage('');
            setNewNotes('');
            setShowAddForm(true);
          }}
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
            Medikament hinzufügen
          </Text>
        </TouchableOpacity>
      )}

      {showAddForm && (
        <View
          style={{
            backgroundColor: colors.backgroundElement,
            padding: 16,
            borderRadius: 16,
            marginTop: 12,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 16,
            }}
          >
            {editingId
              ? 'Medikament bearbeiten'
              : 'Neues Medikament'}
          </Text>
          <TextInput
            placeholder="Medikamentenname"
            placeholderTextColor={colors.textSecondary}
            value={newName}
            onChangeText={setNewName}
            style={{
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.backgroundSelected,
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
            }}
          />
          <TextInput
            placeholder="Dosierung"
            placeholderTextColor={colors.textSecondary}
            value={newDosage}
            onChangeText={setNewDosage}
            style={{
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.backgroundSelected,
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
            }}
          />
          <TextInput
            placeholder="Notizen (optional)"
            placeholderTextColor={colors.textSecondary}
            value={newNotes}
            onChangeText={setNewNotes}
            multiline
            style={{
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.backgroundSelected,
              borderRadius: 12,
              padding: 12,
              minHeight: 80,
              marginBottom: 12,
            }}
          />
          <TouchableOpacity
  onPress={saveMedication}
  style={{
    backgroundColor: '#A5D6A7',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  }}
>
  <Text style={{ color: '#000', fontWeight: '700' }}>
    {editingId
      ? 'Änderungen speichern'
      : 'Medikament speichern'}
  </Text>
</TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowAddForm(false);
              setEditingId(null);
              setNewName('');
              setNewDosage('');
              setNewNotes('');
            }}
            style={{
              marginTop: 8,
              padding: 14,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.textSecondary,
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontWeight: '600',
              }}
            >
              Abbrechen
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
