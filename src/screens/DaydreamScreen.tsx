import { useState, useEffect } from 'react';
import { theme } from '../lib/theme';

interface DaydreamScreenProps {
  onSettingsClick: () => void;
}

export default function DaydreamScreen({ onSettingsClick }: DaydreamScreenProps) {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCycle, setBreathCycle] = useState(4);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!isBreathing) return;

    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathing]);

  useEffect(() => {
    if (!isBreathing) return;

    const cycleTime = counter % (breathCycle * 4);
    
    if (cycleTime < breathCycle) {
      setPhase('inhale');
    } else if (cycleTime < breathCycle * 2) {
      setPhase('hold');
    } else if (cycleTime < breathCycle * 3) {
      setPhase('exhale');
    } else {
      setPhase('rest');
    }
  }, [counter, breathCycle, isBreathing]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'rest': return 'Rest';
    }
  };

  const getCircleSize = () => {
    switch (phase) {
      case 'inhale': return 120;
      case 'hold': return 100;
      case 'exhale': return 60;
      case 'rest': return 40;
    }
  };

  const handleStart = () => {
    setIsBreathing(true);
    setCounter(0);
  };

  const handleStop = () => {
    setIsBreathing(false);
    setCounter(0);
    setPhase('inhale');
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
        }}>Daydream Mode</h1>
        
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
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.xl,
      }}>
        <div style={{
          width: '200px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div
            style={{
              width: `${getCircleSize()}px`,
              height: `${getCircleSize()}px`,
              borderRadius: '50%',
              backgroundColor: theme.colors.primary,
              transition: 'all 1s ease-in-out',
              boxShadow: theme.shadows.lg,
            }}
          />
        </div>

        <div style={{
          textAlign: 'center',
        }}>
          <div style={{
            color: theme.colors.onSurface,
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: theme.spacing.sm,
          }}>
            {getPhaseText()}
          </div>
          
          {isBreathing && (
            <div style={{
              color: theme.colors.onSurfaceMuted,
              fontSize: '16px',
            }}>
              {Math.floor((counter % (breathCycle * 4)) / breathCycle + 1)}/4
            </div>
          )}
        </div>

        {!isBreathing && (
          <div style={{
            backgroundColor: theme.colors.elevatedSurface,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
            width: '100%',
          }}>
            <div style={{
              color: theme.colors.onSurfaceMuted,
              fontSize: '14px',
              marginBottom: theme.spacing.md,
            }}>Breath Duration: {breathCycle} seconds</div>
            
            <input
              type="range"
              min="2"
              max="8"
              value={breathCycle}
              onChange={(e) => setBreathCycle(Number(e.target.value))}
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: theme.colors.outline,
                borderRadius: '2px',
                outline: 'none',
              }}
            />
          </div>
        )}

        <button
          onClick={isBreathing ? handleStop : handleStart}
          style={{
            backgroundColor: isBreathing ? theme.colors.error : theme.colors.success,
            color: 'white',
            border: 'none',
            padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
            borderRadius: theme.borderRadius.md,
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            minWidth: '120px',
          }}
        >
          {isBreathing ? '⏹️ Stop' : '▶️ Start'}
        </button>
      </div>
    </div>
  );
}