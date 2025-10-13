import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import GradientWrapper from "../components/GradientWrapper";

export default function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [refCode, setRefCode] = useState("");

  useEffect(() => {
    if (user) setRefCode(user.uid);
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <GradientWrapper>
      <View style={styles.card}>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.ref}>Referral Code: {refCode}</Text>
        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  email: { fontSize: 18, color: "white", marginBottom: 10 },
  ref: { fontSize: 16, color: "#4ade80", marginBottom: 20 },
  btn: { backgroundColor: "#ef4444", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
