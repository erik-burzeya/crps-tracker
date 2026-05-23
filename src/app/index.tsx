import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 1. Inhalt für den Home-Screen (Dein Original-Code)
function HomeContent() {
  return (
    <View style={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.badge}>[Name]</Text>
        <Text style={styles.title}>CRPS TRACKER.</Text>
        <Text style={styles.subtitle}>Einfach täglich tracken.</Text>
      </View>

      {/* Main Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>New Entry</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>View History</Text>
        </TouchableOpacity>

        {/* Calm Mindfulness Footer */}
        <View style={styles.mindfulnessContainer}>
          <Text style={styles.subtitle}>
            Atme tief durch. Du machst das gut.
          </Text>
        </View>
      </View>
    </View>
  );
}

// Platzhalter-Inhalte für die anderen 3 Tabs
function HistoryContent() {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Verlauf & Diagramme</Text>
    </View>
  );
}

function AnalyticsContent() {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Statistiken & Insights</Text>
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

// Hauptkomponente mit Tab-Navigation
export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<string>("Home");

  // Funktion, die den passenden Screen basierend auf dem aktiven Tab zurückgibt
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeContent />;
      case "History":
        return <HistoryContent />;
      case "Analytics":
        return <AnalyticsContent />;
      case "Settings":
        return <SettingsContent />;
      default:
        return <HomeContent />;
    }
  };

  // Definition der 4 Tabs
  const tabs = [
    { id: "Home", label: "Home" },
    { id: "History", label: "Verlauf" },
    { id: "Medikamente", label: "Medikamente" },
    { id: "Settings", label: "Optionen" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Aktiver Bildschirminhalt */}
      <View style={styles.mainContent}>
        {renderContent()}
      </View>

      {/* 4 Tabs ganz unten */}
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
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
              {/* Kleiner Indikator-Punkt unter dem aktiven Text */}
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
  
  // Stile für die Platzhalter-Screens
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

  // Stile für die untere TabBar
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1A1C1E",
    borderTopWidth: 1,
    borderTopColor: "#2D3135",
    paddingVertical: 12,
    paddingBottom: 24, // Zusätzlicher Platz für iPhones ohne Home-Button
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
    color: "#A5D6A7", // Passend zu deiner Akzentfarbe
    fontWeight: "bold",
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#A5D6A7",
    marginTop: 4,
  },
});
