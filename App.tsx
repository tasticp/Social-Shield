import React from 'react';
import { StyleSheet, Animated } from 'react-native';
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
          backgroundColor: theme.colors.elevatedSurface,
          borderTopColor: theme.colors.outline,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 85,
          borderRadius: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'ellipse';
          
          if (route.name === 'Reading') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Typing') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Calculator') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Daydream') {
            iconName = focused ? 'cloud' : 'cloud-outline';
          }
          
          return (
            <Ionicons 
              name={iconName} 
              size={focused ? 24 : 22} 
              color={color} 
            />
          );
        },
      })}
    >
      <Tab.Screen 
        name="Reading" 
        component={ReadingScreen}
        options={{
          tabBarLabel: 'Read',
          tabBarAccessibilityLabel: 'Reading mode - browse articles and content',
        }}
      />
      <Tab.Screen 
        name="Typing" 
        component={TypingScreen}
        options={{
          tabBarLabel: 'Type',
          tabBarAccessibilityLabel: 'Typing mode - smart text transformation',
        }}
      />
      <Tab.Screen 
        name="Calculator" 
        component={CalculatorScreen}
        options={{
          tabBarLabel: 'Calculate',
          tabBarAccessibilityLabel: 'Calculator mode - quick math operations',
        }}
      />
      <Tab.Screen 
        name="Daydream" 
        component={DaydreamScreen}
        options={{
          tabBarLabel: 'Breathe',
          tabBarAccessibilityLabel: 'Daydream mode - relaxation and focus',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ModesProvider>
      <SafeAreaProvider style={styles.container}>
        <NavigationContainer
          theme={{
            colors: {
              background: theme.colors.surface,
              border: theme.colors.outline,
              card: theme.colors.elevatedSurface,
              notification: theme.colors.primary,
              primary: theme.colors.primary,
              text: theme.colors.onSurface,
            },
            dark: true,
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              animationDuration: 250,
            }}
          >
            <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{ 
                presentation: 'modal', 
                headerShown: false,
                animation: 'slide_from_bottom',
                animationDuration: 300,
              }} 
            />
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