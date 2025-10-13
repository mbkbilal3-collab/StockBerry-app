import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function TestThemeScreen() {
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={{ color: theme.colors.text, fontSize: 20 }}>
        Hello from Themed Screen!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
