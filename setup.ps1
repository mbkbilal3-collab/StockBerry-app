$app = @'
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 StockBerry Premium 🔥</Text>
      <Text style={styles.subtitle}>Ultra Premium CRM + AI + Scanner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E6F4FE" },
  title: { fontSize: 28, fontWeight: "bold", color: "#222" },
  subtitle: { fontSize: 16, color: "#555", marginTop: 8 },
});
'@

$app | Out-File -FilePath .\App.js -Encoding utf8
Write-Host "✅ App.js written" -ForegroundColor Green

# Check required image files
$req = @("android-icon-foreground.png","android-icon-background.png","android-icon-monochrome.png","splash-icon.png","favicon.png")
$missing = @()
foreach ($f in $req) { if (-not (Test-Path ".\assets\images\$f")) { $missing += $f } }

if ($missing.Count -gt 0) {
  Write-Host "`nMISSING IMAGE FILES: $($missing -join ', ')" -ForegroundColor Red
  Write-Host "👉 Please copy your PREMIUM images into: .\assets\images" -ForegroundColor Yellow
  explorer .\assets\images
  Read-Host "Press Enter here to continue AFTER adding the images"
} else {
  Write-Host "✅ All required images present." -ForegroundColor Green
}

Write-Host "`n📦 Installing required Expo packages..." -ForegroundColor Cyan
npx expo install expo-font expo-linear-gradient expo-barcode-scanner @react-native-async-storage/async-storage react-native-svg @expo/vector-icons lottie-react-native lottie-ios react-native-gesture-handler react-native-screens react-native-safe-area-context expo-sharing

Write-Host "`n🚀 Starting Expo (clearing cache)..." -ForegroundColor Cyan
npx expo start -cetup
