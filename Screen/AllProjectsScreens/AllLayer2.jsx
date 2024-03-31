import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import GlobalApi from '../../Utility/GlobalApi';
import Colors from '../../app/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons library

export default function AllLayer2() {
  const [AllLayer2, setAllLayer2] = useState([]);
  const [farmedIndices, setFarmedIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getLayer2();
    loadFarmedIndices();
  }, []);

  const getLayer2 = () => {
    setLoading(true);
    GlobalApi.getLayer2().then((resp) => {
      setAllLayer2(resp?.l2S);
      setLoading(false);
    }).catch(error => {
      setError(error);
      setLoading(false);
      console.error('Error fetching Layer2 data:', error);
    });
  };

  const loadFarmedIndices = async () => {
    try {
      const farmedIndicesString = await AsyncStorage.getItem('layer2FarmedIndices');
      if (farmedIndicesString !== null) {
        setFarmedIndices(JSON.parse(farmedIndicesString));
      }
    } catch (error) {
      console.error('Error loading farmed indices:', error);
    }
  };

  const saveFarmedIndices = async () => {
    try {
      await AsyncStorage.setItem('layer2FarmedIndices', JSON.stringify(farmedIndices));
    } catch (error) {
      console.error('Error saving farmed indices:', error);
    }
  };

  const handleFarmedPress = (index) => {
    if (farmedIndices.includes(index)) {
      setFarmedIndices(farmedIndices.filter((idx) => idx !== index));
    } else {
      setFarmedIndices([...farmedIndices, index]);
    }
  };

  const handleUnfarmedPress = () => {
    setFarmedIndices([]);
  };

  useEffect(() => {
    saveFarmedIndices();
  }, [farmedIndices]);

  const farmedCount = farmedIndices.length;
  const unfarmedCount = AllLayer2.length - farmedIndices.length;
  const totalCount = AllLayer2.length;

  const renderBackButton = () => {
    return (
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        {renderBackButton()}
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        {renderBackButton()}
        <Text>Error fetching data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {renderBackButton()}
        <View
          style={[
            styles.titleContainer,
            Platform.OS === "android" ? styles.androidElevation : styles.defaultElevation // Apply elevation style based on platform
          ]}
        >
          <Text style={styles.title}>LAYER2 PROJECTS</Text>
        </View>
        <View style={styles.countCard}>
          <Text style={styles.countText}>Total Projects: {totalCount}</Text>
          <Text style={styles.countText}>Farmed: {farmedCount}</Text>
          <Text style={styles.countText}>Unfarmed: {unfarmedCount}</Text>
        </View>
        <View style={styles.rowContainer}>
          {AllLayer2.map((layer2, index) => (
            <TouchableOpacity 
            key={index} 
            onPress={() => navigation.navigate('Layer2-Detail', { layer2Data: layer2, farmed: farmedIndices.includes(index) })}
          >
              <View style={[styles.itemContainer, farmedIndices.includes(index) && styles.farmedItem]}>
                <Text style={styles.itemText}>{layer2.name}</Text>
                <Image source={{ uri: layer2?.banner?.url }} style={styles.itemImage} />
                <TouchableOpacity onPress={() => handleFarmedPress(index)} style={[styles.farmedButton, farmedIndices.includes(index) ? styles.farmedButtonPressed : styles.farmedButtonUnpressed]}>
                  <Text style={styles.farmedButtonText}>{farmedIndices.includes(index) ? 'Farmed' : 'Unfarmed'}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: Colors.HOME_COLOR,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white", // Text color of the title
    textAlign: "center",
  },
  countCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.CountCard,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    width: '90%',
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemContainer: {
    backgroundColor: '#e4d5c7',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    elevation: 3,
    width: '100%',
  },
  itemText: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  itemImage: {
    width: '90%', // Image takes full width of the container
    aspectRatio: 16 / 9, // Aspect ratio of the image
    borderRadius: 10,
    marginTop: 5,
  },
  farmedItem: {
    backgroundColor: 'lightgreen',
  },
  farmedButton: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
  },
  farmedButtonPressed: {
    backgroundColor: 'green',
  },
  farmedButtonUnpressed: {
    backgroundColor: 'red',
  },
  farmedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: { 
    position: 'absolute',
    left: 10,
    marginTop: 20,
  },
  titleContainer: {
    backgroundColor: "blue", // Background color of the elevated card
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    width: "90%",
  }
});
