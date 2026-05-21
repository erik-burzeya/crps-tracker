import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.badge}>CRPS Tracker</Text>

        <Text style={styles.title}>
          Track symptoms, pain, and progress.
        </Text>

        <Text style={styles.subtitle}>
          Simple daily tracking designed for calm and clarity.
        </Text>
      </View>

      {/* Main Buttons */}
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            New Entry
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            View History
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1113",
    paddingHorizontal: 24,
    justifyContent: "center",
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
});