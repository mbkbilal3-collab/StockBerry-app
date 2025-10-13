import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

function SingleCoin() {
  const translateY = useRef(new Animated.Value(-50)).current;
  const translateX = Math.random() * width;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: height + 50,
      duration: 6000 + Math.random() * 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 6000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.coin,
        {
          left: translateX,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    />
  );
}

export default function FloatingCoins({ count = 12 }) {
  return (
    <View style={StyleSheet.absoluteFill}>
      {Array.from({ length: count }).map((_, i) => (
        <SingleCoin key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  coin: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "gold",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
