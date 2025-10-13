import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../lib/theme';

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
      </View>
      <TouchableOpacity
        accessibilityLabel="Settings"
        accessibilityRole="button"
        onPress={() => navigation.navigate('Settings' as never)}
        style={styles.button}
      >
        <Ionicons name="settings-outline" size={20} color={theme.colors.onSurface} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
  },
  left: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  title: {
    fontSize: theme.type.h2,
    color: theme.colors.onSurface,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: theme.type.caption,
    color: theme.colors.onSurfaceMuted,
    marginTop: 4,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});