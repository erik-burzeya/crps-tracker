import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function HomeContent({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.badge}>[Name]</Text>
        <Text style={styles.title}>CRPS TRACKER.</Text>
        <Text style={styles.subtitle}>Einfach täglich tracken.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setActiveTab("NewEntry")}
        >
          <Text style={styles.primaryButtonText}>New Entry</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>View History</Text>
        </TouchableOpacity>

        <View style={styles.mindfulnessContainer}>
          <Text style={styles.subtitle}>
            Atme tief durch. Du machst das gut.
          </Text>
        </View>
      </View>
    </View>
  );
}

function HistoryContent() {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Verlauf & Diagramme</Text>
    </View>
  );
}

function MedikamenteContent() {
  const [medications, setMedications] = useState<
    { id: string; name: string; dosage: string }[]
  >([]);

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");

  function addMedication() {
    if (!name.trim()) return;

    const newMedication = {
      id: Date.now().toString(),
      name,
      dosage,
    };

    setMedications((prev) => [...prev, newMedication]);

    setName("");
    setDosage("");
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Medikamente</Text>

      <View style={{ gap: 12 }}>
        <TextInput
          placeholder="Name des Medikaments"
          placeholderTextColor="#8E9194"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Dosierung"
          placeholderTextColor="#8E9194"
          value={dosage}
          onChangeText={setDosage}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={addMedication}
        >
          <Text style={styles.primaryButtonText}>
            Medikament hinzufügen
          </Text>
        </TouchableOpacity>

        {medications.map((med) => (
          <View key={med.id} style={styles.medicationCard}>
            <Text style={styles.medicationTitle}>{med.name}</Text>

            <Text style={styles.medicationDosage}>
              {med.dosage}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function NewEntryContent() {
  const [saved, setSaved] = useState(false);
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Neuer Eintrag</Text>
      {saved && (
  <View
    style={{
      backgroundColor: "#bad8bb",
      padding: 16,
      borderRadius: 16,
      marginBottom: 16,
    }}
  >
    <Text
      style={{
        color: "#0F1113",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      Eintrag erfolgreich gespeichert!
    </Text>
  </View>
)}

      <TextInput
        placeholder="Schmerzlevel 0-10"
        placeholderTextColor="#8E9194"
        style={styles.input}
      />

      <TextInput
        placeholder="Notizen"
        placeholderTextColor="#8E9194"
        multiline
        style={[
          styles.input,
          {
            height: 120,
            textAlignVertical: "top",
            marginTop: 12,
          },
        ]}
      />

      <TouchableOpacity
        style={[styles.primaryButton, { marginTop: 20 }]}
        onPress={() => {
          setSaved(true);

          setTimeout(() => {
            setSaved(false);
          }, 3000);
        }}
      >
        <Text style={styles.primaryButtonText}>
          Eintrag speichern
        </Text>
</TouchableOpacity>
    </View>
  );
}

function SettingsContent() {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Einstellungen</Text>
    </View>
  );
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeContent setActiveTab={setActiveTab} />;

      case "History":
        return <HistoryContent />;

      case "Medikamente":
        return <MedikamenteContent />;

      case "NewEntry":
        return <NewEntryContent />;

      case "Settings":
        return <SettingsContent />;

      default:
        return <HomeContent setActiveTab={setActiveTab} />;
    }
  };

  const tabs = [
    { id: "Home", label: "Home" },
    { id: "History", label: "Verlauf" },
    { id: "Medikamente", label: "Medikamente" },
    { id: "Settings", label: "Optionen" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {renderContent()}
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>

              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1113",
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  contentContainer: {
    width: "100%",
  },

  header: {
    marginBottom: 50,
  },

  badge: {
    color: "#A5D6A7",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    lineHeight: 42,
    marginBottom: 14,
  },

  subtitle: {
    color: "#8E9194",
    fontSize: 16,
    lineHeight: 24,
  },

  buttonContainer: {
    gap: 16,
  },

  primaryButton: {
    backgroundColor: "#A5D6A7",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#0F1113",
    fontSize: 18,
    fontWeight: "bold",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#2D3135",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "#1A1C1E",
  },

  secondaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  mindfulnessContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1A1C1E",
    borderTopWidth: 1,
    borderTopColor: "#2D3135",
    paddingVertical: 12,
    paddingBottom: 24,
    justifyContent: "space-around",
    alignItems: "center",
  },

  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 44,
  },

  tabText: {
    color: "#8E9194",
    fontSize: 12,
    fontWeight: "600",
  },

  activeTabText: {
    color: "#A5D6A7",
    fontWeight: "bold",
  },

  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#A5D6A7",
    marginTop: 4,
  },

  input: {
    backgroundColor: "#1A1C1E",
    borderWidth: 1,
    borderColor: "#2D3135",
    borderRadius: 16,
    padding: 16,
    color: "white",
    fontSize: 16,
  },

  medicationCard: {
    backgroundColor: "#1A1C1E",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#2D3135",
  },

  medicationTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  medicationDosage: {
    color: "#8E9194",
    marginTop: 4,
  },
});