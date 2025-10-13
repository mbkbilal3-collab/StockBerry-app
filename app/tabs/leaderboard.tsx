import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "@config/firebaseConfig";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export default function LeaderboardScreen() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    loadLeaders();
  }, []);

  const loadLeaders = async () => {
    try {
      const q = query(
        collection(db, "publicProfiles"),
        orderBy("balance", "desc"),
        limit(50)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeaders(data);
    } catch (err) {
      console.error("Error loading leaderboard:", err);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <Text style={styles.name}>{item.displayName || "Unknown"}</Text>
      <Text style={styles.balance}>{item.balance || 0} SBC</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Leaderboard</Text>
      <FlatList
        data={leaders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f1724" },
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  rank: { color: "#4ade80", fontWeight: "bold" },
  name: { color: "white", flex: 1, marginLeft: 10 },
  balance: { color: "gold", fontWeight: "bold" },
});
