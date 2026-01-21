import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import theme from '../lib/theme';

const sampleArticles = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i),
  title: `Community update — item ${i + 1}`,
  excerpt: 'Quick summary that looks like a real article. Tap to expand in a real app.',
  category: ['Technology', 'Design', 'Business', 'Science'][i % 4],
  readTime: `${3 + (i % 8)} min read`,
}));

export default function FakeContentList() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderItem = ({ item, index }: { item: typeof sampleArticles[0]; index: number }) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;
    
    const handlePressIn = () => {
      setSelectedId(item.id);
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
        friction: 8,
        tension: 100,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 3,
        tension: 40,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPress={() => {
            // In a real app, this would navigate to article detail
            setSelectedId(selectedId === item.id ? null : item.id);
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          style={[
            styles.card,
            selectedId === item.id && styles.cardSelected
          ]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Article: ${item.title}, Category: ${item.category}, ${item.readTime}`}
          accessibilityHint={`${selectedId === item.id ? 'Selected' : 'Double tap to select'} article for reading`}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.readTime}>{item.readTime}</Text>
          </View>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardExcerpt}>{item.excerpt}</Text>
          {selectedId === item.id && (
            <Text style={styles.expandText}>Tap to read full article →</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={sampleArticles}
      keyExtractor={(i) => i.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      initialNumToRender={6}
      maxToRenderPerBatch={3}
      windowSize={10}
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
    transition: 'all 0.2s ease',
  },
  cardSelected: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  cardTitle: {
    fontSize: theme.type.body,
    fontWeight: '700',
    color: theme.colors.onSurface,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  cardCategory: {
    fontSize: theme.type.caption - 2,
    color: theme.colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.xs,
  },
  readTime: {
    fontSize: theme.type.caption - 1,
    color: theme.colors.onSurfaceMuted,
    fontWeight: '500',
  },
  cardExcerpt: {
    color: theme.colors.onSurfaceMuted,
    fontSize: theme.type.caption,
    lineHeight: 18,
  },
  expandText: {
    color: theme.colors.primary,
    fontSize: theme.type.caption,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});