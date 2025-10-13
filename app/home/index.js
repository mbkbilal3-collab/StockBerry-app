import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { theme } from "../theme";

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.replace("Auth");
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome to StockBerry</Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogout}>
        <Text style={styles.buttonText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: theme.spacing.large,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.medium,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.large,
    width: "80%",
    alignItems: "center",
    marginBottom: theme.spacing.medium,
  },
  buttonText: {
    fontSize: theme.fontSize.medium,
    fontWeight: "600",
    color: theme.colors.text,
  },
});
