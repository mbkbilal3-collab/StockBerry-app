import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientWrapper({ children }) {
  const colors = [
    ["#0f1724", "#1e293b"],
    ["#1e293b", "#334155"],
    ["#0f1724", "#1e293b"],
  ];

  const colorIndex = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorIndex, { toValue: 1, duration: 8000, useNativeDriver: false }),
        Animated.timing(colorIndex, { toValue: 2, duration: 8000, useNativeDriver: false }),
        Animated.timing(colorIndex, { toValue: 0, duration: 8000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const bgColors = colors[Math.floor(colorIndex.__getValue())];

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
