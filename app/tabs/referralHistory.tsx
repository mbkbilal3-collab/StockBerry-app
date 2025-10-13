import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "@config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ReferralHistoryScreen() {
  const [referrals, setReferrals] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      loadReferrals();
    }
  }, [user]);

  const loadReferrals = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("referredBy", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReferrals(data);
    } catch (err) {
      console.error("Error loading referrals:", err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.coins}>+50 SBC Bonus</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Referral History</Text>
      <FlatList
        data={referrals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: "gray" }}>No referrals yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 15 },
  item: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  email: { fontSize: 16, color: "white" },
  coins: { fontSize: 14, color: "#4ade80", fontWeight: "bold" },
});
