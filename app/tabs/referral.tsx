import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Share, FlatList, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "@config/firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";

export default function ReferralScreen() {
  const [referralCode, setReferralCode] = useState("");
  const [referrals, setReferrals] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const code = user.uid.slice(0, 6); // short code from UID
      setReferralCode(code);
      loadReferrals(code);
    }
  }, [user]);

  const loadReferrals = async (code) => {
    try {
      const q = query(collection(db, "users"), where("referredBy", "==", code));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setReferrals(data);
    } catch (err) {
      console.error("Referral load error:", err);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    Alert.alert("Copied!", "Referral code copied to clipboard.");
  };

  const shareReferral = async () => {
    try {
      await Share.share({
        message: `Join StockBerry and earn bonus coins! Use my referral code: ${referralCode}`,
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.email || "User"}</Text>
      <Text style={styles.reward}>🎁 Bonus Earned</Text>
    </View>
  );

  return (
    <LinearGradient colors={["#0f1724", "#1e293b"]} style={styles.container}>
      <Text style={styles.title}>Refer & Earn</Text>

      <View style={styles.codeCard}>
        <Text style={styles.code}>{referralCode}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={copyToClipboard}>
            <Text style={styles.btnText}>📋 Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={shareReferral}>
            <Text style={styles.btnText}>🔗 Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtitle}>Your Referrals</Text>
      <FlatList
        data={referrals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ color: "gray", marginTop: 10 }}>No referrals yet.</Text>}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "white", marginBottom: 20 },
  codeCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 25,
  },
  code: { fontSize: 32, color: "#4ade80", fontWeight: "bold", marginBottom: 15 },
  row: { flexDirection: "row", gap: 15 },
  btn: {
    backgroundColor: "#4ade80",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnText: { fontSize: 16, fontWeight: "bold", color: "black" },
  subtitle: { fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 10 },
  item: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: { fontSize: 16, color: "white" },
  reward: { fontSize: 14, color: "#facc15" },
});
