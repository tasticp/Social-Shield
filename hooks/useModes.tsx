// hooks/useModes.tsx
// Context for storing the user's selected mode and AI toggle.
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Mode = 'default' | 'psychedelic' | 'smart';

type ModesContextValue = {
  mode: Mode;
  setMode: (m: Mode) => void;
  aiEnabled: boolean;
  setAiEnabled: (b: boolean) => void;
};

const STORAGE_KEY = 'modes_v1';

const Defaults: ModesContextValue = {
  mode: 'default',
  setMode: () => {},
  aiEnabled: true,
  setAiEnabled: () => {},
};

const ModesContext = createContext<ModesContextValue>(Defaults);

export const ModesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<Mode>('default');
  const [aiEnabled, setAiEnabledState] = useState<boolean>(true);

  useEffect(() => {
    // load
    AsyncStorage.getItem(STORAGE_KEY)
      .then((s) => {
        if (!s) return;
        const parsed = JSON.parse(s);
        if (parsed?.mode) setModeState(parsed.mode);
        if (typeof parsed?.aiEnabled === 'boolean') setAiEnabledState(parsed.aiEnabled);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const p = { mode, aiEnabled };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(p)).catch(() => {});
  }, [mode, aiEnabled]);

  const value: ModesContextValue = {
    mode,
    setMode: (m: Mode) => setModeState(m),
    aiEnabled,
    setAiEnabled: (b: boolean) => setAiEnabledState(b),
  };

  return <ModesContext.Provider value={value}>{children}</ModesContext.Provider>;
};

export function useModes() {
  return useContext(ModesContext);
}