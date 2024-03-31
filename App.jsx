// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './app/Nav/TabNavigation';
import DonateScreen from './app/components/DonateScreen'; // Import the Donate screen component

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Define your main navigation */}
        <Stack.Screen name="Main" component={TabNavigation} options={{ headerShown: false }} />

        {/* Define the Donate screen */}
        <Stack.Screen name="Donate" component={DonateScreen} options={{ title: 'Donate', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
