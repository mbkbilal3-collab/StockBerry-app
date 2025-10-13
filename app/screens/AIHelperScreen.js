import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";

export default function AIHelperScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { role: "user", content: input };
    setMessages([...messages, newMsg]);
    setInput("");

    // dummy response
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: "🤖 This is a demo AI reply." }]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat}>
        {messages.map((msg, i) => (
          <Text key={i} style={{ color: msg.role === "user" ? "cyan" : "orange", marginBottom: 6 }}>
            {msg.role}: {msg.content}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type here..."
          placeholderTextColor="gray"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724", padding: 10 },
  chat: { flex: 1, marginBottom: 10 },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "white",
    padding: 10,
    borderRadius: 8,
  },
  sendBtn: { marginLeft: 8, backgroundColor: "#4ade80", padding: 10, borderRadius: 8 },
  sendText: { color: "black", fontWeight: "bold" },
});
