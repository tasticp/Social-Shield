import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import FakeContentList from '../components/FakeContentList';
import theme from '../lib/theme';

export default function ReadingScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safe}>
        <Header title="Today" subtitle="Top reads" />
      </SafeAreaView>
      <FakeContentList />
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