import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ReadingScreen from './screens/ReadingScreen';
import TypingScreen from './screens/TypingScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import DaydreamScreen from './screens/DaydreamScreen';
import SettingsScreen from './screens/SettingsScreen';
import theme from './lib/theme';
import { ModesProvider } from './hooks/useModes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        tabBarIcon: ({ color, size }) => {
          let name: React.ComponentProps<typeof Ionicons>['name'] = 'ellipse';
          if (route.name === 'Reading') name = 'book';
          if (route.name === 'Typing') name = 'pencil';
          if (route.name === 'Calculator') name = 'calculator';
          if (route.name === 'Daydream') name = 'cloud';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Reading" component={ReadingScreen} />
      <Tab.Screen name="Typing" component={TypingScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
      <Tab.Screen name="Daydream" component={DaydreamScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ModesProvider>
      <SafeAreaProvider style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ presentation: 'modal', headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ModesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
});