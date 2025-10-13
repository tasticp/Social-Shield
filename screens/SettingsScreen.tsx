// screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import theme from '../lib/theme';
import { useModes } from '../hooks/useModes';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { mode, setMode, aiEnabled, setAiEnabled } = useModes();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.close} accessibilityRole="button">
          <Text style={styles.closeText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mode</Text>
        <TouchableOpacity style={styles.option} onPress={() => setMode('default')}>
          <Text style={[styles.optionText, mode === 'default' ? styles.optionActive : null]}>Default</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setMode('psychedelic')}>
          <Text style={[styles.optionText, mode === 'psychedelic' ? styles.optionActive : null]}>Psychedelic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setMode('smart')}>
          <Text style={[styles.optionText, mode === 'smart' ? styles.optionActive : null]}>Smart typing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smart typing AI</Text>
        <View style={styles.row}>
          <Text style={styles.optionText}>AI enabled</Text>
          <Switch
            value={aiEnabled}
            onValueChange={(v) => setAiEnabled(v)}
            trackColor={{ false: '#111', true: theme.colors.primary }}
            thumbColor={aiEnabled ? '#fff' : '#222'}
            accessibilityLabel="Toggle AI assistance"
          />
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.onSurface,
    fontSize: theme.type.h2,
    fontWeight: '700',
  },
  close: {},
  closeText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  section: {
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    color: theme.colors.onSurfaceMuted,
    marginBottom: theme.spacing.sm,
  },
  option: {
    paddingVertical: theme.spacing.sm,
  },
  optionText: {
    color: theme.colors.onSurface,
    fontSize: theme.type.body,
  },
  optionActive: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
});