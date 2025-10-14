import React from "react";
import { Stack } from "expo-router";

// 🚫 FULLY DISABLE Expo Router LinkPreviewContext globally (bug fix)
import * as Router from "expo-router";
try {
  if (Router && typeof Router.disableLinkPreview === "function") {
    Router.disableLinkPreview();
    console.log("✅ Link preview disabled successfully");
  } else {
    console.log("ℹ️ Router.disableLinkPreview not found — safe fallback");
  }
} catch (e) {
  console.log("⚠️ Failed to disable link preview:", e);
}

// ✅ Main root layout (clean, stable)
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
