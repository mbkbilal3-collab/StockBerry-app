import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { db } from "@config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const BONUS_AMOUNT = 20;

export default function DailyLoginBonus() {
  const [canClaim, setCanClaim] = useState(false);
  const [lastClaim, setLastClaim] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    checkBonus();
  }, []);

  const checkBonus = async () => {
    const last = await AsyncStorage.getItem("lastLoginBonus");
    if (last) {
      const diff = Date.now() - parseInt(last, 10);
      if (diff > 24 * 60 * 60 * 1000) {
        setCanClaim(true);
      } else {
        setLastClaim(new Date(parseInt(last, 10)).toLocaleString());
        setCanClaim(false);
      }
    } else {
      setCanClaim(true);
    }
  };

  const claimBonus = async () => {
    if (!user) {
      Alert.alert("Login Required", "Please login to claim bonus.");
      return;
    }

    if (!canClaim) {
      Alert.alert("⏳ Already Claimed", "Come back tomorrow for your next bonus!");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      const currentBalance = snap.exists() ? snap.data().balance || 0 : 0;

      await updateDoc(userRef, { balance: currentBalance + BONUS_AMOUNT });

      await AsyncStorage.setItem("lastLoginBonus", Date.now().toString());
      setCanClaim(false);

      Alert.alert("🎉 Bonus Claimed!", `+${BONUS_AMOUNT} SBC added to your account.`);
    } catch (err) {
      console.error("Daily Bonus error:", err);
      Alert.alert("Error", "Could not claim bonus.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 Daily Login Bonus</Text>
      {canClaim ? (
        <TouchableOpacity style={styles.button} onPress={claimBonus}>
          <Text style={styles.buttonText}>Claim +{BONUS_AMOUNT} SBC</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.info}>
          {lastClaim
            ? `Bonus already claimed on ${lastClaim}`
            : "Bonus already claimed. Come back tomorrow."}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f1724" },
  title: { fontSize: 26, fontWeight: "bold", color: "white", marginBottom: 20 },
  button: { backgroundColor: "#4ade80", padding: 15, borderRadius: 12 },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  info: { fontSize: 16, color: "gray", marginTop: 15, textAlign: "center" },
});
