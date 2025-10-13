import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
const logo = require(\x27../assets/logo.png\x27);

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Auth Error", error.message);
    }
  };

  return (
    <LinearGradient colors={["#0d0d0d", "#1a1a1a", "#262626"]} style={styles.container}>
      <View style={styles.logoContainer}>
      </View>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/home")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 25 },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logo: { width: 150, height: 150, resizeMode: "contain", marginBottom: 25 },
  logo: { width: 150, height: 150, borderRadius: 75, resizeMode: "contain" },
  title: { fontSize: 26, fontWeight: "700", textAlign: "center", color: "#FFD700", marginBottom: 25 },
  input: { backgroundColor: "#333", borderRadius: 10, padding: 12, color: "#fff", fontSize: 16, marginBottom: 15 },
  button: { backgroundColor: "#FFD700", borderRadius: 10, paddingVertical: 12, marginTop: 10 },
  buttonText: { color: "#000", fontWeight: "700", fontSize: 18, textAlign: "center" },
  linkText: { color: "#aaa", textAlign: "center", marginTop: 15 },
});
