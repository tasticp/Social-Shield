import React, { useState } from 'react';
import { theme } from '../lib/theme';

interface TypingScreenProps {
  onSettingsClick: () => void;
}

export default function TypingScreen({ onSettingsClick }: TypingScreenProps) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'normal' | 'focus' | 'zen'>('normal');

  const handleTextTransform = (input: string) => {
    switch (mode) {
      case 'focus':
        return input.toLowerCase().replace(/[^a-z\s]/g, '');
      case 'zen':
        return input.split('').map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join('');
      default:
        return input;
    }
  };

  const transformedText = handleTextTransform(text);

  return (
    <div style={{
      padding: theme.spacing.lg,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.surface,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
      }}>
        <h1 style={{
          color: theme.colors.onSurface,
          fontSize: '24px',
          fontWeight: '600',
          margin: 0,
        }}>Typing Mode</h1>
        
        <button
          onClick={onSettingsClick}
          style={{
            background: 'none',
            border: `1px solid ${theme.colors.outline}`,
            color: theme.colors.onSurface,
            padding: theme.spacing.sm,
            borderRadius: theme.borderRadius.md,
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ⚙️
        </button>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.lg,
      }}>
        <div style={{
          display: 'flex',
          gap: theme.spacing.sm,
        }}>
          {(['normal', 'focus', 'zen'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: theme.spacing.sm,
                backgroundColor: mode === m ? theme.colors.primary : theme.colors.elevatedSurface,
                color: mode === m ? 'white' : theme.colors.onSurface,
                border: `1px solid ${theme.colors.outline}`,
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'capitalize',
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing here..."
          style={{
            flex: 1,
            backgroundColor: theme.colors.elevatedSurface,
            color: theme.colors.onSurface,
            border: `1px solid ${theme.colors.outline}`,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            fontSize: '16px',
            lineHeight: '1.6',
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />

        {mode !== 'normal' && (
          <div style={{
            backgroundColor: theme.colors.elevatedSurface,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
            border: `1px solid ${theme.colors.primary}`,
          }}>
            <div style={{
              color: theme.colors.onSurfaceMuted,
              fontSize: '12px',
              marginBottom: theme.spacing.sm,
            }}>Transformed ({mode} mode):</div>
            <div style={{
              color: theme.colors.onSurface,
              fontSize: '16px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              minHeight: '60px',
            }}>
              {transformedText || 'Transformed text will appear here...'}
            </div>
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: theme.spacing.sm,
          color: theme.colors.onSurfaceMuted,
          fontSize: '14px',
        }}>
          <span>Words: {text.split(/\s+/).filter(w => w.length > 0).length}</span>
          <span>•</span>
          <span>Characters: {text.length}</span>
        </div>
      </div>
    </div>
  );
}