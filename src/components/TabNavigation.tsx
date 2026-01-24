import React, { ReactNode } from 'react';
import { theme } from '../lib/theme';

interface TabButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ icon, label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.sm,
        backgroundColor: 'transparent',
        border: 'none',
        color: isActive ? theme.colors.primary : theme.colors.onSurfaceMuted,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderRadius: theme.borderRadius.md,
        fontSize: '11px',
        fontWeight: '600',
        gap: '4px',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = theme.colors.elevatedSurface;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <span style={{ fontSize: '20px' }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

export function TabNavigation({ activeTab, onTabChange, children }: TabNavigationProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      backgroundColor: theme.colors.surface,
    }}>
      <div style={{
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {children}
      </div>
      
      <div style={{
        display: 'flex',
        backgroundColor: theme.colors.elevatedSurface,
        borderTop: `1px solid ${theme.colors.outline}`,
        padding: theme.spacing.sm,
        paddingBottom: '8px',
        height: '85px',
        boxShadow: theme.shadows.sm,
      }}>
        <TabButton
          icon="📖"
          label="Read"
          isActive={activeTab === 'reading'}
          onClick={() => onTabChange('reading')}
        />
        <TabButton
          icon="✏️"
          label="Type"
          isActive={activeTab === 'typing'}
          onClick={() => onTabChange('typing')}
        />
        <TabButton
          icon="🧮"
          label="Calculate"
          isActive={activeTab === 'calculator'}
          onClick={() => onTabChange('calculator')}
        />
        <TabButton
          icon="☁️"
          label="Breathe"
          isActive={activeTab === 'daydream'}
          onClick={() => onTabChange('daydream')}
        />
      </div>
    </div>
  );
}