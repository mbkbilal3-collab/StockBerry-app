import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@config/firebaseConfig";

export default function ProfileScreen({ navigation }) {
  const auth = getAuth(app);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.replace("Auth");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: { marginTop: 20, backgroundColor: "#f44336", padding: 12, borderRadius: 6 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
