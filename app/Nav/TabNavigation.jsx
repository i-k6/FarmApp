import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import Tools from '../../Screen/Tools';
import Colors from '../constants/Colors';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'; 
import HomeNavigation from './HomeNavigation';
import ExploreNavigation from './ExploreNavigation';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const isFocused = useIsFocused();

  const getTabIcon = (name, focused) => {
    switch (name) {
      case 'Home':
        return <Entypo name="home" size={24} color={focused ? Colors.SECONDARY : 'black'} />;
      case 'Explore':
        return <MaterialCommunityIcons name="feature-search" size={24} color={focused ? Colors.SECONDARY : 'black'} />;
      case 'Tools':
        return <MaterialCommunityIcons name="tools" size={24} color={focused ? Colors.SECONDARY : 'black'} />;
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.SECONDARY,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ focused }) => getTabIcon('Home', focused),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreNavigation}
        options={{
          tabBarIcon: ({ focused }) => getTabIcon('Explore', focused),
        }}
      />
      <Tab.Screen
        name="Tools"
        component={Tools}
        options={{
          tabBarIcon: ({ focused }) => getTabIcon('Tools', focused),
        }}
      />
    </Tab.Navigator>
  );
}
