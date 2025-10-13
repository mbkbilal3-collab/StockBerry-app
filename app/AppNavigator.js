import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ✅ Import all screens
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import BonusScreen from "./screens/BonusScreen";
import ReferralScreen from "./Referral";
import AiChatScreen from "./screens/AiChatScreen";
import QRScannerScreen from "./screens/QRScannerScreen";   // 👈 Added QR Scanner

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#111" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Poppins-Bold",
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "🏠 Home" }}
      />
      <Stack.Screen
        name="Bonus"
        component={BonusScreen}
        options={{ title: "💎 Bonus" }}
      />
      <Stack.Screen
        name="Referral"
        component={ReferralScreen}
        options={{ title: "🎁 Referral" }}
      />
      <Stack.Screen
        name="AiChat"
        component={AiChatScreen}
        options={{ title: "🤖 AI Chat" }}
      />
      <Stack.Screen
        name="QRScanner"                     // ✅ New QR Scanner screen
        component={QRScannerScreen}
        options={{ title: "📷 QR Scanner" }}
      />
    </Stack.Navigator>
  );
}