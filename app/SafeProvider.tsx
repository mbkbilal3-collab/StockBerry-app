import React from "react";

export function SafeProvider({ children }: { children: React.ReactNode }) {
  let Provider;
  try {
    Provider = require("expo-router/build/views/LinkPreviewContext").LinkPreviewContextProvider;
  } catch {
    Provider = ({ children }: any) => children;
  }
  return <Provider>{children}</Provider>;
}
