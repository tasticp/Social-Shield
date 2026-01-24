import { useState } from 'react';
import { ModesProvider } from './hooks/useModes';
import { TabNavigation } from './components/TabNavigation';
import ReadingScreen from './screens/ReadingScreen';
import TypingScreen from './screens/TypingScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import DaydreamScreen from './screens/DaydreamScreen';
import SettingsScreen from './screens/SettingsScreen';
import { theme } from './lib/theme';

function App() {
  const [activeTab, setActiveTab] = useState('reading');
  const [showSettings, setShowSettings] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'reading':
        return <ReadingScreen onSettingsClick={() => setShowSettings(true)} />;
      case 'typing':
        return <TypingScreen onSettingsClick={() => setShowSettings(true)} />;
      case 'calculator':
        return <CalculatorScreen onSettingsClick={() => setShowSettings(true)} />;
      case 'daydream':
        return <DaydreamScreen onSettingsClick={() => setShowSettings(true)} />;
      default:
        return <ReadingScreen onSettingsClick={() => setShowSettings(true)} />;
    }
  };

  return (
    <ModesProvider>
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.colors.surface,
        overflow: 'hidden',
      }}>
        {showSettings ? (
          <SettingsScreen onBack={() => setShowSettings(false)} />
        ) : (
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange}>
            {renderActiveScreen()}
          </TabNavigation>
        )}
      </div>
    </ModesProvider>
  );
}

export default App;