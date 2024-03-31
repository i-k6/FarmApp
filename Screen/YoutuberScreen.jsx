import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native'; // Import ScrollView
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import GlobalApi from '../Utility/GlobalApi';
import Colors from '../app/constants/Colors';

export default function Youtubers() {
  const [youtubers, setYoutubers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GlobalApi.getYoutuber();
        setYoutubers(response?.youtubers || []);
      } catch (error) {
        console.error('Error fetching Youtubers:', error);
      }
    }
    fetchData();
  }, []);

  const getScreenName = (name) => {
    switch (name) {
      case 'Crypto Hindi':
        return 'CryptoHindi';
      case 'Crypto GG (Loot Money)':
        return 'Cryptogg';
      case 'Feature Earning':
        return 'Feature';
      default:
        return null;
    }
  };

  const handleYoutuberPress = (name) => {
    const screenName = getScreenName(name);
    if (screenName) {
      navigation.navigate(screenName);
    } else {
      console.error('Screen name is undefined or null.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {youtubers.map((youtuber, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handleYoutuberPress(youtuber.name)}>
            <Text style={styles.name}>{youtuber.name}</Text>
            <Image source={{ uri: youtuber.banner[0]?.url }} style={styles.banner} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.HOME_COLOR,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 5,
  },
});
