import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export default function SettingsScreen() {
  const [dark, setDark] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#111" : "#fff" }]}>
      <Text style={[styles.heading, { color: dark ? "#fff" : "#000" }]}>⚙ Settings</Text>
      <View style={styles.row}>
        <Text style={{ color: dark ? "#fff" : "#000" }}>Dark Mode</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={{ marginTop: 20, color: dark ? "#aaa" : "#555" }}>App Version: 2.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
});
