import { useModes } from '../hooks/useModes';
import { theme } from '../lib/theme';

interface SettingsScreenProps {
  onBack: () => void;
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const { modes, toggleMode } = useModes();

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
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        gap: theme.spacing.sm,
      }}>
        <button
          onClick={onBack}
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
          ←
        </button>
        
        <h1 style={{
          color: theme.colors.onSurface,
          fontSize: '24px',
          fontWeight: '600',
          margin: 0,
        }}>Settings</h1>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.lg,
      }}>
        <div>
          <h2 style={{
            color: theme.colors.onSurface,
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: theme.spacing.md,
          }}>App Modes</h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.sm,
          }}>
            {modes.map((mode) => (
              <div
                key={mode.id}
                style={{
                  backgroundColor: theme.colors.elevatedSurface,
                  padding: theme.spacing.lg,
                  borderRadius: theme.borderRadius.lg,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{
                    color: theme.colors.onSurface,
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}>
                    {mode.name}
                  </div>
                  <div style={{
                    color: theme.colors.onSurfaceMuted,
                    fontSize: '14px',
                  }}>
                    {mode.description}
                  </div>
                </div>
                
                <button
                  onClick={() => toggleMode(mode.id)}
                  style={{
                    width: '50px',
                    height: '26px',
                    backgroundColor: mode.enabled ? theme.colors.primary : theme.colors.outline,
                    borderRadius: '13px',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      backgroundColor: 'white',
                      borderRadius: '11px',
                      position: 'absolute',
                      top: '2px',
                      left: mode.enabled ? '26px' : '2px',
                      transition: 'left 0.2s',
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{
            color: theme.colors.onSurface,
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: theme.spacing.md,
          }}>About</h2>
          
          <div style={{
            backgroundColor: theme.colors.elevatedSurface,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
          }}>
            <div style={{
              color: theme.colors.onSurfaceMuted,
              fontSize: '14px',
              lineHeight: '1.6',
            }}>
              <div><strong>Social Shield v1.0.0</strong></div>
              <div style={{ marginTop: theme.spacing.sm }}>
                A minimal-dependency web application for focus, productivity, and well-being.
              </div>
              <div style={{ marginTop: theme.spacing.sm }}>
                <strong>Dependencies:</strong> 0 external dependencies
              </div>
              <div style={{ marginTop: theme.spacing.sm }}>
                <strong>Technology:</strong> Pure React, TypeScript, Vite
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}