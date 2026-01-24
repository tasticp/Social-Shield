import { useState, useEffect } from 'react';
import { theme } from '../lib/theme';

interface ReadingScreenProps {
  onSettingsClick: () => void;
}

export default function ReadingScreen({ onSettingsClick }: ReadingScreenProps) {
  const [text, setText] = useState('');
  const [readingSpeed, setReadingSpeed] = useState(200);
  const [isPlaying, setIsPlaying] = useState(false);

  const sampleText = `Welcome to Reading Mode. This is a focus-friendly reading experience designed to help you consume content more effectively. You can adjust the reading speed, text size, and background color to suit your preferences. The clean interface eliminates distractions and helps you maintain concentration on your reading material.`;

  useEffect(() => {
    setText(sampleText);
  }, []);

  const handleSpeedChange = (speed: number) => {
    setReadingSpeed(speed);
  };

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
        }}>Reading Mode</h1>
        
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
          backgroundColor: theme.colors.elevatedSurface,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          flex: 1,
          overflow: 'auto',
        }}>
          <div style={{
            color: theme.colors.onSurface,
            fontSize: '18px',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
          }}>
            {text}
          </div>
        </div>

        <div style={{
          backgroundColor: theme.colors.elevatedSurface,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
        }}>
          <div style={{
            color: theme.colors.onSurfaceMuted,
            fontSize: '14px',
            marginBottom: theme.spacing.md,
          }}>Reading Speed: {readingSpeed} WPM</div>
          
          <input
            type="range"
            min="100"
            max="500"
            value={readingSpeed}
            onChange={(e) => handleSpeedChange(Number(e.target.value))}
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: theme.colors.outline,
              borderRadius: '2px',
              outline: 'none',
            }}
          />
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            backgroundColor: isPlaying ? theme.colors.warning : theme.colors.primary,
            color: 'white',
            border: 'none',
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Start'} Reading
        </button>
      </div>
    </div>
  );
}