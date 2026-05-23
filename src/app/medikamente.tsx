import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Medication {
  id: string;
  name: string;
  dosage: string;
}

export default function MedikamenteScreen() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');

  function addMedication() {
    if (!name.trim()) return;

    const newMedication: Medication = {
      id: Date.now().toString(),
      name,
      dosage,
    };

    setMedications((prev) => [...prev, newMedication]);

    setName('');
    setDosage('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Medikamente</Text>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Name des Medikaments"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Dosierung"
          value={dosage}
          onChangeText={setDosage}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={addMedication}>
          <Text style={styles.buttonText}>Medikament hinzufügen</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.dosage}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardSubtitle: {
    marginTop: 4,
    color: '#525252',
  },
});