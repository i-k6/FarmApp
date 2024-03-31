import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screen/Home';
import AllTestnets from '../../Screen/AllProjectsScreens/AllTestnets';
import Allsolana from '../../Screen/AllProjectsScreens/Allsolana';
import AllLayer2 from '../../Screen/AllProjectsScreens/AllLayer2';
import AllDex from '../../Screen/AllProjectsScreens/AllDex';
import SolanaDetailsScreen from '../../Screen/DetailScreens/SolanaDetailsScreen';
import TestnetDetailsScreen from '../../Screen/DetailScreens/TestnetDetailsScreen';
import Layer2DetailsScreen from '../../Screen/DetailScreens/Layer2DetailsScreen';
import DexDetailsScreen from '../../Screen/DetailScreens/DexDetailsScreen';
import AllCategories from '../../Screen/AllCategories';


const Stack = createStackNavigator()
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,}}>
        <Stack.Screen name='home' component={HomeScreen} />
        <Stack.Screen name='all-testnets' component={AllTestnets} />
        <Stack.Screen name='all-solanas' component={Allsolana} />
        <Stack.Screen name='all-layer2s' component={AllLayer2} />
        <Stack.Screen name='all-dexes' component={AllDex} />
        <Stack.Screen name='Testnet-Detail' component={TestnetDetailsScreen} />
        <Stack.Screen name='Solana-Detail' component={SolanaDetailsScreen} />
        <Stack.Screen name='Layer2-Detail' component={Layer2DetailsScreen} />
        <Stack.Screen name='Dex-Detail' component={DexDetailsScreen} />
        <Stack.Screen name='all-categories' component={AllCategories} />
    </Stack.Navigator>
  )
}