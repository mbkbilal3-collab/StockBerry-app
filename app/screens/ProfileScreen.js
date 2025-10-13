import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { theme } from "../../theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Bilal Khan</Text>
        <Text style={styles.email}>bilal@example.com</Text>

        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.large,
    borderRadius: theme.radius.large,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 10,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: theme.spacing.medium },
  name: { fontSize: theme.fontSize.large, fontWeight: "bold", color: theme.colors.text, marginBottom: theme.spacing.small },
  email: { fontSize: theme.fontSize.medium, color: theme.colors.muted, marginBottom: theme.spacing.large },
  buttonPrimary: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.medium, padding: theme.spacing.medium, width: "80%", alignItems: "center", marginBottom: theme.spacing.medium },
  buttonSecondary: { backgroundColor: theme.colors.secondary, borderRadius: theme.radius.medium, padding: theme.spacing.medium, width: "80%", alignItems: "center" },
  buttonText: { color: theme.colors.text, fontWeight: "bold" },
});
