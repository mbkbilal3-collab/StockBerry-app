import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@config/firebaseConfig";

export default function Login({ navigation }: any) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await setDoc(doc(db, "users", userCred.user.uid), { email: userCred.user.email, balance: 0, lastMine: null, referralCode: userCred.user.uid.slice(0,6), transactions: [] });
      Alert.alert("Signed up", "Account created.");
    } catch (e) { Alert.alert("Signup error", e.message); }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Logged in", "Welcome back!");
    } catch (e) { Alert.alert("Login error", e.message); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StockBerry</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}><Text style={styles.btnText}>Login</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.btn, {backgroundColor:"#4CAF50"}]} onPress={handleSignup}><Text style={styles.btnText}>Signup</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#071024", justifyContent:"center", padding:20 },
  title:{ color:"#fff", fontSize:28, textAlign:"center", marginBottom:20 },
  input:{ backgroundColor:"#fff", padding:12, borderRadius:8, marginBottom:12 },
  btn:{ backgroundColor:"#2196F3", padding:12, borderRadius:8, marginBottom:8 },
  btnText:{ color:"#fff", textAlign:"center", fontWeight:"700" }
});
