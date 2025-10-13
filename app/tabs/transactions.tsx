import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "@config/firebaseConfig";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import GradientWrapper from "../components/GradientWrapper";

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) loadTransactions();
  }, [user]);

  const loadTransactions = async () => {
    try {
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    } catch (err) {
      console.error("Error loading transactions:", err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.amount}>+{item.amount} SBC</Text>
      <Text style={styles.date}>{new Date(item.timestamp?.toDate()).toLocaleString()}</Text>
    </View>
  );

  return (
    <GradientWrapper>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ color: "gray" }}>No transactions yet.</Text>}
      />
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", color: "white", margin: 20 },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 18,
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  type: { fontSize: 16, color: "#4ade80", fontWeight: "bold" },
  amount: { fontSize: 16, color: "white" },
  date: { fontSize: 12, color: "#aaa" },
});
