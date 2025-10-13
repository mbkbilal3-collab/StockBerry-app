import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Animated } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { app } from "@config/firebaseConfig";
import { mineCoins } from "../utils/mining";
import { giveDailyBonus } from "../utils/dailyBonus";
import FloatingCoins from "../components/FloatingCoins";
import GradientWrapper from "../components/GradientWrapper";

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const glowAnim = new Animated.Value(0.7);

  useEffect(() => {
    if (user) {
      applyDailyBonus(user.uid).then((res) => console.log(res.message));
    }
    // Balance load
    (async () => {
      const lastBalance = parseInt((await AsyncStorage.getItem("balance")) || "0");
      setBalance(lastBalance);

      // Daily Bonus
      const bonusResult = await giveDailyBonus();
      if (bonusResult.success) {
        setBalance(bonusResult.balance);
        Alert.alert("Daily Bonus", bonusResult.message);
      }
    })();

    // Mascot glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.6, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <GradientWrapper>
      <FloatingCoins />

      <Text style={styles.title}>StockBerry Mining</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceValue}>{balance} SBC</Text>
      </View>

      <Animated.View style={[styles.glow, { opacity: glowAnim }]}>
        <LottieView source={require("../../assets/mascot.json")} autoPlay loop style={{ width: 130, height: 130 }} />
      </Animated.View>
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "bold", color: "white", marginTop: 60, marginBottom: 20 },
  balanceCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  balanceLabel: { color: "#aaa", fontSize: 18 },
  balanceValue: { fontSize: 36, color: "white", fontWeight: "bold" },
  glow: {
    marginTop: 30,
    shadowColor: "#4ade80",
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
});
