import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import theme from '../lib/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  style?: any;
  children?: React.ReactNode;
}

export function Skeleton({ width = '100%', height = 20, style }: SkeletonProps) {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulseAnimation.start();
    
    return () => pulseAnimation.stop();
  }, [opacityAnim]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
}

export function CardSkeleton() {
  return (
    <View style={styles.card}>
      <Skeleton height={24} width="60%" style={styles.titleSkeleton} />
      <Skeleton height={16} width="100%" style={styles.lineSkeleton} />
      <Skeleton height={16} width="80%" style={styles.lineSkeleton} />
    </View>
  );
}

export function ListSkeleton({ items = 3 }: { items?: number }) {
  return (
    <View style={styles.list}>
      {Array.from({ length: items }).map((_, index) => (
        <View key={index} style={styles.listItem}>
          <Skeleton height={40} width={40} style={styles.avatarSkeleton} />
          <View style={styles.textContainer}>
            <Skeleton height={16} width="70%" style={styles.listTitleSkeleton} />
            <Skeleton height={14} width="90%" style={styles.listSubtitleSkeleton} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function ButtonSkeleton() {
  return (
    <Skeleton height={48} width={120} style={styles.buttonSkeleton} />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.radii.sm,
  },
  card: {
    backgroundColor: theme.colors.elevatedSurface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  titleSkeleton: {
    marginBottom: theme.spacing.sm,
  },
  lineSkeleton: {
    marginBottom: theme.spacing.xs,
  },
  list: {
    padding: theme.spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.sm,
  },
  avatarSkeleton: {
    marginRight: theme.spacing.md,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  listTitleSkeleton: {
    marginBottom: theme.spacing.xs,
  },
  listSubtitleSkeleton: {
    marginTop: theme.spacing.xs,
  },
  buttonSkeleton: {
    borderRadius: 999,
    alignSelf: 'center',
  },
});