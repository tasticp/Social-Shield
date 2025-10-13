import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import theme from '../lib/theme';

const sampleArticles = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i),
  title: `Community update — item ${i + 1}`,
  excerpt: 'Quick summary that looks like a real article. Tap to expand in a real app.',
}));

export default function FakeContentList() {
  return (
    <FlatList
      data={sampleArticles}
      keyExtractor={(i) => i.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardExcerpt}>{item.excerpt}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: theme.spacing.md,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: theme.colors.elevatedSurface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderColor: theme.colors.outline,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: theme.type.body,
    fontWeight: '700',
    color: theme.colors.onSurface,
    marginBottom: 6,
  },
  cardExcerpt: {
    color: theme.colors.onSurfaceMuted,
    fontSize: theme.type.caption,
  },
});