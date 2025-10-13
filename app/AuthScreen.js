import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";
import { theme } from "../theme";   // ✅ Theme import

const auth = getAuth(app);

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.replace("Home");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.replace("Home");
      }
    } catch (error) {
      Alert.alert("Auth Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.muted}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={theme.colors.muted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.link}>
          {isLogin ? "Don’t have an account? Sign Up" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: theme.spacing.large, backgroundColor: theme.colors.background },
  title: { fontSize: theme.fontSize.xl, fontWeight: "bold", color: theme.colors.primary, marginBottom: theme.spacing.large },
  input: { width: "100%", backgroundColor: theme.colors.card, padding: theme.spacing.medium, borderRadius: theme.radius.medium, color: theme.colors.text, marginBottom: theme.spacing.medium },
  buttonPrimary: { backgroundColor: theme.colors.primary, padding: theme.spacing.medium, borderRadius: theme.radius.medium, width: "100%", alignItems: "center", marginBottom: theme.spacing.medium },
  buttonText: { color: theme.colors.text, fontSize: theme.fontSize.medium, fontWeight: "bold" },
  link: { color: theme.colors.secondary, marginTop: theme.spacing.medium }
});
