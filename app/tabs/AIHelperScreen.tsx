import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

export default function AIHelperScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const res = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [...messages, newMessage],
      }, {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      });

      const reply = res.data.choices[0].message;
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Unable to connect to AI" }]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat}>
        {messages.map((msg, i) => (
          <Text key={i} style={msg.role === "user" ? styles.user : styles.bot}>
            {msg.content}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask AI anything..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.button}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  chat: { flex: 1, marginBottom: 10 },
  user: { alignSelf: "flex-end", backgroundColor: "#DCF8C6", padding: 8, margin: 4, borderRadius: 6 },
  bot: { alignSelf: "flex-start", backgroundColor: "#EEE", padding: 8, margin: 4, borderRadius: 6 },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6 },
  button: { marginLeft: 8, backgroundColor: "#4CAF50", padding: 10, borderRadius: 6 },
});
