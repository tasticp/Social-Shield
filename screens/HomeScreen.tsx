import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../lib/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}> 
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Welcome to Social Shield</Text>
            <Text style={styles.subtitle}>Your digital companion for focused productivity</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.elevatedSurface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: theme.type.h2,
    fontWeight: '700',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.type.body,
    color: theme.colors.onSurfaceMuted,
    lineHeight: 22,
  },
});