import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TextInputProps, Animated, Pressable } from 'react-native';
import theme from '../lib/theme';
import { useModes } from '../hooks/useModes';
import { transformTyping } from '../lib/ai';

// This component intentionally simulates typing. When smart typing is enabled and AI is allowed
// the component will request transformed text from the AI helper and then 'type' it out
// character-by-character to create the illusion of the user being creative/smart.

type Props = TextInputProps & {
  initialText?: string;
};

export default function FakeTyping({ initialText = '' }: Props) {
  const { mode, aiEnabled } = useModes();
  const [displayText, setDisplayText] = useState(initialText);
  const [inputText, setInputText] = useState(initialText);
  const [cursorVisible, setCursorVisible] = useState(true);
  const animBg = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Psychedelic subtle background animation when the mode is psychedelic
    if (mode === 'psychedelic') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animBg, { toValue: 1, duration: 1200, useNativeDriver: false }),
          Animated.timing(animBg, { toValue: 0, duration: 1200, useNativeDriver: false }),
        ])
      ).start();
    } else {
      animBg.stopAnimation();
      Animated.timing(animBg, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    }
  }, [mode, animBg]);

  useEffect(() => {
    let cancelled = false;
    let typingInterval: NodeJS.Timeout | null = null;

    async function runTransform() {
      try {
        const transformed = await transformTyping(inputText + '\u200B');
        if (cancelled) return;
        // animate typing the transformed text
        let idx = 0;
        setDisplayText('');
        typingInterval = setInterval(() => {
          idx += 1;
          setDisplayText(transformed.slice(0, idx));
          if (idx >= transformed.length && typingInterval) {
            clearInterval(typingInterval as NodeJS.Timeout);
            typingInterval = null;
          }
        }, 90) as unknown as NodeJS.Timeout;
      } catch (e) {
        // fallback to raw input
        setDisplayText(inputText);
      }
    }

    if (mode === 'smart' && aiEnabled) {
      const id = setTimeout(() => {
        runTransform();
      }, 300);
      return () => {
        cancelled = true;
        clearTimeout(id);
        if (typingInterval) clearInterval(typingInterval as NodeJS.Timeout);
      };
    }

    // default behavior: mirror input immediately
    setDisplayText(inputText);

    return () => {
      cancelled = true;
      if (typingInterval) clearInterval(typingInterval as NodeJS.Timeout);
    };
  }, [inputText, mode, aiEnabled]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: animBg.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.colors.surface, '#0A2B2F'],
          }) as unknown as string,
        },
      ]}
    >
      {/* Pressing anywhere inside this area will focus the invisible TextInput. */}
      <Pressable onPress={() => inputRef.current?.focus()} style={styles.inner}>
        <Text style={styles.line} numberOfLines={1}>
          {displayText}
          <Text style={styles.cursor}>{cursorVisible ? '|' : ' '}</Text>
        </Text>

        {/*
          The TextInput is placed absolutely to cover the typing area. It has very low
          opacity so it remains interactive for focus/caret, but visually hidden.
          This pattern makes focusing and typing reliable across platforms.
        */}
        <TextInput
          ref={inputRef}
          value={inputText}
          onChangeText={setInputText}
          style={styles.hiddenInput}
          autoCorrect={false}
          autoCapitalize="none"
          caretHidden={false}
          keyboardAppearance="dark"
          placeholder=""
          placeholderTextColor="transparent"
          keyboardType="default"
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  inner: {
    paddingVertical: theme.spacing.sm,
  },
  line: {
    fontSize: theme.type.body,
    color: theme.colors.onSurface,
    paddingVertical: 6,
  },
  cursor: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  hiddenInput: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 48,
    // tiny opacity so platform still shows caret / allows focus reliably
    opacity: 0.02,
    marginTop: 0,
  },
});