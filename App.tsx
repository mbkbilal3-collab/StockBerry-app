import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// ✅ Global Error Boundary to catch runtime crashes (shows on screen instead of white)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }
  componentDidCatch(error, info) {
    console.error("🔥 Runtime error:", error, info);
    this.setState({ error, info });
  }
  render() {
    if (this.state.error) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🚨 Runtime Error</Text>
          <Text style={styles.err}>{String(this.state.error)}</Text>
          {this.state.info && <Text style={styles.info}>{JSON.stringify(this.state.info)}</Text>}
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

import AppRoot from './app/_layout'; // ✅ adjust this if your main entry differs (expo-router)

export default function App() {
  return (
    <ErrorBoundary>
      <AppRoot />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'flex-start' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  err: { color: 'red', marginBottom: 8 },
  info: { color: '#333', fontSize: 12 },
});
