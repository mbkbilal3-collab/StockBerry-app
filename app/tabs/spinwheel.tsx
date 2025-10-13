import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "@config/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SpinWheelScreen() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [canSpin, setCanSpin] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  const rewards = [5, 10, 20, 50, 0]; // Coins that can be won

  useEffect(() => {
    checkLastSpin();
  }, []);

  const checkLastSpin = async () => {
    const lastSpin = await AsyncStorage.getItem("lastSpinTime");
    if (lastSpin) {
      const now = Date.now();
      const diff = now - parseInt(lastSpin, 10);
      if (diff < 24 * 60 * 60 * 1000) {
        setCanSpin(false);
      }
    }
  };

  const spin = async () => {
    if (!user) {
      Alert.alert("Login Required", "Please login to spin the wheel.");
      return;
    }

    if (!canSpin) {
      Alert.alert("⏳ Daily Limit", "You can only spin once every 24 hours.");
      return;
    }

    if (spinning) return;

    setSpinning(true);
    setResult(null);

    // Random reward
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    setTimeout(async () => {
      setResult(reward);
      setSpinning(false);

      if (reward > 0) {
        try {
          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);
          const currentBalance = snap.exists() ? snap.data().balance || 0 : 0;

          await updateDoc(userRef, { balance: currentBalance + reward });
          Alert.alert("🎉 Congratulations!", `You won +${reward} SBC!`);
        } catch (err) {
          console.error("Spin update error:", err);
          Alert.alert("Error", "Could not update balance.");
        }
      } else {
        Alert.alert("😢 Try Again", "No reward this time!");
      }

      // Save spin time
      await AsyncStorage.setItem("lastSpinTime", Date.now().toString());
      setCanSpin(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎡 Spin the Wheel</Text>

      <View style={styles.wheel}>
        <Text style={{ fontSize: 40 }}>🎁</Text>
      </View>

      {result !== null && (
        <Text style={styles.result}>
          {result > 0 ? `You won ${result} SBC!` : "No reward 😢"}
        </Text>
      )}

      <TouchableOpacity style={[styles.button, !canSpin && { backgroundColor: "gray" }]} onPress={spin} disabled={!canSpin || spinning}>
        <Text style={styles.buttonText}>
          {spinning ? "Spinning..." : canSpin ? "Spin Now" : "Come back tomorrow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f1724" },
  title: { fontSize: 28, fontWeight: "bold", color: "white", marginBottom: 20 },
  wheel: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "gold",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 30,
  },
  result: { fontSize: 20, color: "white", marginBottom: 20 },
  button: { backgroundColor: "#4ade80", padding: 15, borderRadius: 12 },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
});
