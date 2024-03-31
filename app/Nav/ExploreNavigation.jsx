import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../../Screen/Explore';
import VideoScreen from '../../Screen/VideoScreen'
import Youtubers from '../../Screen/YoutuberScreen';
import CryptoHindi from '../components/Youtubers/CryptoHindi';
import Cryptogg from '../components/Youtubers/Cryptogg';
import Feature from '../components/Youtubers/Feature';



const Stack = createStackNavigator()
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,}}>
        <Stack.Screen name='explore' component={ExploreScreen} />
        <Stack.Screen name='YoutuberScreen' component={Youtubers} />
        <Stack.Screen name='VideoScreen' component={VideoScreen} />
        <Stack.Screen name='CryptoHindi' component={CryptoHindi} />
        <Stack.Screen name='Cryptogg' component={Cryptogg} />
        <Stack.Screen name='Feature' component={Feature} />
    </Stack.Navigator>
  )
}