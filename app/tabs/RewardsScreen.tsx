import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@config/firebaseConfig";

const db = getFirestore(app);
const auth = getAuth(app);

export default function RewardsScreen() {
  const [claimedToday, setClaimedToday] = useState(false);

  useEffect(() => {
    checkDailyClaim();
  }, []);

  const checkDailyClaim = async () => {
    if (!auth.currentUser) return;
    const ref = doc(db, "users", auth.currentUser.uid);
    const snap = await getDoc(ref);
    const today = new Date().toDateString();
    if (snap.exists() && snap.data().lastClaim === today) {
      setClaimedToday(true);
    }
  };

  const claimDailyReward = async () => {
    if (!auth.currentUser) return;
    if (claimedToday) {
      Alert.alert("Already claimed today!");
      return;
    }
    const ref = doc(db, "users", auth.currentUser.uid);
    await updateDoc(ref, {
      coins: increment(50),
      lastClaim: new Date().toDateString(),
    });
    setClaimedToday(true);
    Alert.alert("You got 50 daily coins!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎁 Rewards</Text>
      <TouchableOpacity style={styles.button} onPress={claimDailyReward}>
        <Text style={styles.text}>{claimedToday ? "Already Claimed" : "Claim Daily Reward"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 6 },
  text: { color: "#fff", fontWeight: "bold" },
});
