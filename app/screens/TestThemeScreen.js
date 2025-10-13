import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";

export default function TestThemeScreen() {
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { fontFamily: "Poppins-Bold" }]}>
        StockBerry Premium Look
      </Text>
      <TouchableOpacity style={[styles.button, theme.shadow]}>
        <Text style={styles.buttonText}>Check Shadow</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, color: theme.colors.text, marginBottom: 20 },
  button: {
    backgroundColor: theme.colors.accent,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: { color: "#000", fontFamily: "Poppins" },
});
