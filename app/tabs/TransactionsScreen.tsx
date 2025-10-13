import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getFirestore, collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@config/firebaseConfig";

const db = getFirestore(app);

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);
  const auth = getAuth(app);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "users", auth.currentUser.uid, "transactions"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTransactions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.type}>{item.type}</Text>
            <Text>{item.amount} Coins</Text>
            <Text style={styles.date}>{new Date(item.timestamp?.toDate()).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  type: { fontWeight: "bold", color: "#4CAF50" },
  date: { fontSize: 12, color: "gray" },
});
