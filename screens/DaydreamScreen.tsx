import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import theme from '../lib/theme';

export default function DaydreamScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safe}>
        <Header title="Breathe" subtitle="Daydream mode" />
      </SafeAreaView>

      <View style={styles.center}>
        <View style={styles.card}>
          <Text style={styles.quote}>
            "Look up, breathe out — let the world go soft for a moment."
          </Text>
          <Text style={styles.hint}>Close your eyes, or keep them open — either way you look occupied.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceVariant,
  },
  safe: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.elevatedSurface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  quote: {
    fontSize: theme.type.h1,
    color: theme.colors.onSurface,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  hint: {
    fontSize: theme.type.body,
    color: theme.colors.onSurfaceMuted,
    textAlign: 'center',
  },
});