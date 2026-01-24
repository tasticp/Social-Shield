import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AppMode {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface ModesContextType {
  modes: AppMode[];
  toggleMode: (id: string) => void;
  isModeEnabled: (id: string) => boolean;
}

const defaultModes: AppMode[] = [
  {
    id: 'reading',
    name: 'Reading Mode',
    description: 'Focus-friendly reading experience',
    enabled: true,
  },
  {
    id: 'typing',
    name: 'Typing Mode',
    description: 'Enhanced text input experience',
    enabled: true,
  },
  {
    id: 'calculator',
    name: 'Calculator Mode',
    description: 'Quick calculations',
    enabled: true,
  },
  {
    id: 'daydream',
    name: 'Daydream Mode',
    description: 'Relaxation and breathing exercises',
    enabled: true,
  },
];

const ModesContext = createContext<ModesContextType | undefined>(undefined);

export function ModesProvider({ children }: { children: ReactNode }) {
  const [modes, setModes] = useState<AppMode[]>(defaultModes);

  const toggleMode = (id: string) => {
    setModes(prev => 
      prev.map(mode => 
        mode.id === id ? { ...mode, enabled: !mode.enabled } : mode
      )
    );
  };

  const isModeEnabled = (id: string) => {
    return modes.find(mode => mode.id === id)?.enabled ?? false;
  };

  return (
    <ModesContext.Provider value={{ modes, toggleMode, isModeEnabled }}>
      {children}
    </ModesContext.Provider>
  );
}

export function useModes() {
  const context = useContext(ModesContext);
  if (!context) {
    throw new Error('useModes must be used within a ModesProvider');
  }
  return context;
}