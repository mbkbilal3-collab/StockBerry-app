import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../theme";

export default function BonusScreen() {
  const [bonus, setBonus] = useState(0);

  const addBonus = async () => {
    try {
      const newBonus = bonus + 10;
      setBonus(newBonus);
      await AsyncStorage.setItem("bonus", newBonus.toString());
      Alert.alert("Success", "🎉 Bonus added!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const resetBonus = async () => {
    try {
      setBonus(0);
      await AsyncStorage.removeItem("bonus");
      Alert.alert("Reset", "Bonus reset successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>💎 Premium Bonus</Text>
        <Text style={styles.bonusText}>{bonus} Points</Text>

        <TouchableOpacity style={styles.buttonPrimary} onPress={addBonus}>
          <Text style={styles.buttonText}>Add Bonus</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={resetBonus}>
          <Text style={styles.buttonText}>Reset Bonus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center", padding: theme.spacing.large },
  card: { backgroundColor: theme.colors.card, borderRadius: theme.radius.large, padding: theme.spacing.large, width: "90%", alignItems: "center", elevation: 10 },
  title: { fontSize: theme.fontSize.large, fontWeight: "bold", color: theme.colors.primary, marginBottom: theme.spacing.medium },
  bonusText: { fontSize: theme.fontSize.xl, fontWeight: "bold", color: theme.colors.text, marginBottom: theme.spacing.large },
  buttonPrimary: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.medium, paddingVertical: theme.spacing.small, paddingHorizontal: theme.spacing.large, marginBottom: theme.spacing.medium, width: "80%", alignItems: "center" },
  buttonSecondary: { backgroundColor: theme.colors.secondary, borderRadius: theme.radius.medium, paddingVertical: theme.spacing.small, paddingHorizontal: theme.spacing.large, width: "80%", alignItems: "center" },
  buttonText: { fontSize: theme.fontSize.medium, fontWeight: "600", color: theme.colors.text },
});
