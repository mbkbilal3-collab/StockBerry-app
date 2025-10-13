import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AIChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🤖 AI Chat Coming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
