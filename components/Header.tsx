import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../lib/theme';

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  const navigation = useNavigation();
  const [pressed, setPressed] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        style={[
          styles.button,
          pressed && styles.buttonPressed
        ]}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons 
            name="settings-outline" 
            size={20} 
            color={pressed ? theme.colors.primary : theme.colors.onSurface} 
          />
        </Animated.View>
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
    borderRadius: theme.radii.md,
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
  },
  buttonPressed: {
    backgroundColor: theme.colors.elevatedSurface,
  },
});