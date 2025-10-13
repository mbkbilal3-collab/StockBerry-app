import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { app } from "@config/firebaseConfig";

const db = getFirestore(app);

export default function LeaderboardScreen() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("coins", "desc"), limit(20));
    const unsub = onSnapshot(q, (snap) => {
      setLeaders(snap.docs.map((doc, idx) => ({
        id: doc.id,
        rank: idx + 1,
        ...doc.data(),
      })));
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🏆 Leaderboard</Text>
      <FlatList
        data={leaders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>#{item.rank}</Text>
            <Text style={styles.name}>{item.email}</Text>
            <Text style={styles.coins}>{item.coins || 0} 💰</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" },
  rank: { fontWeight: "bold", width: 40 },
  name: { flex: 1 },
  coins: { fontWeight: "bold", color: "#4CAF50" },
});
