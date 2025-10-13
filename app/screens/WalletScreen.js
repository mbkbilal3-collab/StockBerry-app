import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { theme } from "../../theme";

export default function WalletScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      loadWallet();
    }
  }, [user]);

  const loadWallet = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        setBalance(snap.data().balance || 0);
      }
    } catch (err) {
      console.error("Wallet error:", err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>💰 Wallet</Text>
      <Text style={styles.balance}>{balance} SBC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, color: "white", marginBottom: 20 },
  balance: { fontSize: 32, fontWeight: "bold", color: "gold" },
});
