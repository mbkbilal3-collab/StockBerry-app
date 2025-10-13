import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function LeaderboardScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("balance", "desc"), limit(20));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    } catch (err) {
      console.error("Leaderboard error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Top Miners</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Text style={styles.name}>{item.email || "Anonymous"}</Text>
            <Text style={styles.balance}>{item.balance || 0} SBC</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f1724" },
  title: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 15 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  rank: { color: "gold", fontWeight: "bold" },
  name: { color: "white" },
  balance: { color: "#4ade80", fontWeight: "bold" },
});
