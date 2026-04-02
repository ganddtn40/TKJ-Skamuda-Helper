import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';
import IPCalcScreen from './src/screens/IPCalcScreen';
import LANGuideScreen from './src/screens/LANGuideScreen';
import BIOSScreen from './src/screens/BIOSScreen';
import CLIScreen from './src/screens/CLIScreen';
import OSIPortScreen from './src/screens/OSIPortScreen';

// New Screens
import SubnetPracticeScreen from './src/screens/SubnetPracticeScreen';
import TroubleshootScreen from './src/screens/TroubleshootScreen';
import ResistorScreen from './src/screens/ResistorScreen';
import SensorScreen from './src/screens/SensorScreen';
import PinoutScreen from './src/screens/PinoutScreen';
import SnippetScreen from './src/screens/SnippetScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <StatusBar style="light" backgroundColor="transparent" translucent />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="IPCalc" component={IPCalcScreen} />
              <Stack.Screen name="LANGuide" component={LANGuideScreen} />
              <Stack.Screen name="BIOSBeep" component={BIOSScreen} />
              <Stack.Screen name="CLITools" component={CLIScreen} />
              <Stack.Screen name="OSIPort" component={OSIPortScreen} />
              
              <Stack.Screen name="SubnetPractice" component={SubnetPracticeScreen} />
              <Stack.Screen name="Troubleshoot" component={TroubleshootScreen} />
              <Stack.Screen name="Resistor" component={ResistorScreen} />
              <Stack.Screen name="Sensors" component={SensorScreen} />
              <Stack.Screen name="Pinout" component={PinoutScreen} />
              <Stack.Screen name="Snippet" component={SnippetScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
