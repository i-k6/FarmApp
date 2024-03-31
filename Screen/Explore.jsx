import React from 'react';
import { useNavigation } from '@react-navigation/native';
import YoutuberScreen from '../Screen/YoutuberScreen'; // Import Youtubers component

export default function Explore() {
  const navigation = useNavigation();

  return (
    <YoutuberScreen />
  );
}
