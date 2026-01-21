import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  Platform,
} from 'react-native';
import theme from '../lib/theme';

interface EnhancedButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'operator' | 'function';
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
}

export default function EnhancedButton({
  title,
  variant = 'secondary',
  size = 'medium',
  style,
  children,
  onPress,
  ...props
}: EnhancedButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    // Add haptic feedback
    if (Platform.OS !== 'web') {
      // Will be implemented with proper haptic feedback
    }
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    switch (variant) {
      case 'primary':
        return [
          baseStyle,
          { backgroundColor: theme.colors.primary },
          pressed && { backgroundColor: '#5AD4A6' }
        ];
      case 'operator':
        return [
          baseStyle,
          { backgroundColor: theme.colors.primary },
          pressed && { backgroundColor: '#5AD4A6' }
        ];
      case 'function':
        return [
          baseStyle,
          { backgroundColor: theme.colors.elevatedSurface },
          pressed && { backgroundColor: '#0D1A1C' }
        ];
      default:
        return [
          baseStyle,
          { backgroundColor: theme.colors.surfaceVariant },
          pressed && { backgroundColor: '#0F1D1F' }
        ];
    }
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'primary' || variant === 'operator') {
      return [...baseTextStyle, { color: theme.colors.onPrimary }];
    }
    
    return [...baseTextStyle, { color: theme.colors.onSurface }];
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      {...props}
    >
      {title ? <Text style={getTextStyle()}>{title}</Text> : children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    transition: 'all 0.15s ease',
  },
  small: {
    minHeight: 40,
    paddingHorizontal: 16,
  },
  medium: {
    minHeight: 56,
    paddingHorizontal: 20,
  },
  large: {
    minHeight: 64,
    paddingHorizontal: 24,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 20,
  },
});