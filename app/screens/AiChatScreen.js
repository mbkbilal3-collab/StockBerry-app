import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { theme } from "../theme";

export default function AiChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: "🤖 AI Response for: " + input }]);
    }, 500);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {messages.map((msg, index) => (
          <Text key={index} style={msg.sender === "user" ? styles.userMsg : styles.aiMsg}>
            {msg.text}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Type your message..." placeholderTextColor="#999" />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  chatBox: { flex: 1, padding: 10 },
  userMsg: { alignSelf: "flex-end", backgroundColor: theme.colors.primary, color: "#fff", padding: 10, borderRadius: 8, marginVertical: 4 },
  aiMsg: { alignSelf: "flex-start", backgroundColor: theme.colors.secondary, color: "#fff", padding: 10, borderRadius: 8, marginVertical: 4 },
  inputRow: { flexDirection: "row", padding: 10, borderTopWidth: 1, borderColor: "#333" },
  input: { flex: 1, backgroundColor: "#1e1e1e", color: "#fff", padding: 10, borderRadius: 8 },
  sendButton: { marginLeft: 10, backgroundColor: theme.colors.primary, padding: 12, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  sendText: { color: "#fff", fontWeight: "bold" },
});
