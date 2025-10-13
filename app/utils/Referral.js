import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { theme } from "./app/theme";

export default function ReferralScreen() {
  const [referralCode, setReferralCode] = useState("");

  const handleReferral = () => {
    if (referralCode.trim() === "") {
      Alert.alert("Error", "Please enter a referral code.");
    } else {
      Alert.alert("Success", `🎉 Referral code "${referralCode}" applied!`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>🎁 Apply Referral Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Referral Code"
          value={referralCode}
          onChangeText={setReferralCode}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.button} onPress={handleReferral}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.large,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.large,
    padding: theme.spacing.large,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: theme.fontSize.large,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.medium,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: theme.radius.medium,
    padding: theme.spacing.small,
    fontSize: theme.fontSize.medium,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.medium,
    paddingVertical: theme.spacing.small,
    alignItems: "center",
  },
  buttonText: {
    fontSize: theme.fontSize.medium,
    fontFamily: theme.fontFamily.semibold,
    color: "#fff",
  },
});
