import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import GradientWrapper from "../components/GradientWrapper";

export default function AIHelperScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: "🤖 This is AI demo reply for: " + input }]);
    }, 800);
    setInput("");
  };

  const renderItem = ({ item }) => (
    <View style={[styles.msg, item.sender === "user" ? styles.userMsg : styles.aiMsg]}>
      <Text style={styles.msgText}>{item.text}</Text>
    </View>
  );

  return (
    <GradientWrapper>
      <Text style={styles.title}>AI Helper</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ padding: 15 }}
      />
      <View style={styles.inputBar}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Ask me..." placeholderTextColor="#aaa" />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "bold", color: "white", margin: 15 },
  msg: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: "75%",
  },
  userMsg: {
    backgroundColor: "#4ade80",
    alignSelf: "flex-end",
  },
  aiMsg: {
    backgroundColor: "rgba(255,255,255,0.1)",
    alignSelf: "flex-start",
  },
  msgText: { color: "white" },
  inputBar: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  input: { flex: 1, color: "white", padding: 10 },
  sendBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 8,
  },
});
