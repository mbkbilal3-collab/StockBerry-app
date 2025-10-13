import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "@config/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";

export default function AdminDashboard() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBalance: 0,
    activeUsers: 0,
    topMiners: [],
  });

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      // Total users
      const usersSnap = await getDocs(collection(db, "users"));
      const totalUsers = usersSnap.size;

      let totalBalance = 0;
      let topMiners = [];
      let activeUsers = 0;
      const now = Date.now();

      usersSnap.forEach((doc) => {
        const data = doc.data();
        totalBalance += data.balance || 0;

        // Active user = mined in last 24h
        if (data.lastMined && now - data.lastMined.toMillis() < 24 * 60 * 60 * 1000) {
          activeUsers++;
        }
      });

      // Top miners
      const q = query(collection(db, "users"), orderBy("balance", "desc"), limit(5));
      const topSnap = await getDocs(q);
      topMiners = topSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      setStats({ totalUsers, totalBalance, activeUsers, topMiners });
    } catch (err) {
      console.error("Admin stats error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Admin Dashboard</Text>

      <Text style={styles.stat}>👤 Total Users: {stats.totalUsers}</Text>
      <Text style={styles.stat}>💰 Total SBC: {stats.totalBalance}</Text>
      <Text style={styles.stat}>🔥 Active (24h): {stats.activeUsers}</Text>

      <Text style={[styles.title, { marginTop: 20 }]}>🏆 Top 5 Miners</Text>
      <FlatList
        data={stats.topMiners}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Text style={styles.stat}>
            #{index + 1} {item.email || "Unknown"} — {item.balance || 0} SBC
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f1724" },
  title: { fontSize: 22, fontWeight: "bold", color: "gold", marginBottom: 10 },
  stat: { fontSize: 16, color: "white", marginVertical: 4 },
});
