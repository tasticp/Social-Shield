import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import FakeTyping from '../components/FakeTyping';
import theme from '../lib/theme';

export default function TypingScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safe}>
        <Header title="Notes" subtitle="Drafts" />
      </SafeAreaView>
      <FakeTyping />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  safe: {
    backgroundColor: theme.colors.surface,
  },
});