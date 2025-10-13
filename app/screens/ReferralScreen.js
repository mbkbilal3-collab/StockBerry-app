import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function ReferralScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 Invite Friends</Text>
      <Text style={styles.subtitle}>Share your referral code and earn rewards!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center", padding: theme.spacing.large },
  title: { fontSize: theme.fontSize.large, fontFamily: theme.fontFamily.bold, color: theme.colors.primary, marginBottom: theme.spacing.medium },
  subtitle: { fontSize: theme.fontSize.medium, fontFamily: theme.fontFamily.regular, color: theme.colors.text },
});
