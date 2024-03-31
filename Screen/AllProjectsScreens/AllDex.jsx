import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import GlobalApi from '../../Utility/GlobalApi';
import Colors from '../../app/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function AllDex() {
  const [allDex, setAllDex] = useState([]);
  const [farmedIndices, setFarmedIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getDex();
    loadFarmedIndices();
  }, []);

  const getDex = () => {
    setLoading(true);
    GlobalApi.getDex().then((resp) => {
      setAllDex(resp?.dexes);
      setLoading(false);
    }).catch(error => {
      setError(error);
      setLoading(false);
      console.error('Error fetching Dex data:', error);
    });
  };

  const loadFarmedIndices = async () => {
    try {
      const farmedIndicesString = await AsyncStorage.getItem('dexFarmedIndices');
      if (farmedIndicesString !== null) {
        setFarmedIndices(JSON.parse(farmedIndicesString));
      }
    } catch (error) {
      console.error('Error loading farmed indices:', error);
    }
  };

  const saveFarmedIndices = async () => {
    try {
      await AsyncStorage.setItem('dexFarmedIndices', JSON.stringify(farmedIndices));
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
  const unfarmedCount = allDex.length - farmedIndices.length;
  const totalCount = allDex.length;

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
            Platform.OS === "android" ? styles.androidElevation : styles.defaultElevation 
          ]}
        >
          <Text style={styles.title}>DEX PROJECTS</Text>
        </View>
        <View style={styles.countCard}>
          <Text style={styles.countText}>Total Dex: {totalCount}</Text>
          <Text style={styles.countText}>Farmed: {farmedCount}</Text>
          <Text style={styles.countText}>Unfarmed: {unfarmedCount}</Text>
        </View>
        <View style={styles.rowContainer}>
          {allDex.map((dex, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => navigation.navigate('Dex-Detail', { dexData: dex, farmed: farmedIndices.includes(index) })}
            >
              <View style={[styles.itemContainer, farmedIndices.includes(index) && styles.farmedItem]}>
                <Text style={styles.itemText}>{dex.name}</Text>
                <Image source={{ uri: dex?.banner?.url }} style={styles.itemImage} />
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
    color: "white", 
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
    width: '90%', 
    aspectRatio: 16 / 9, 
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
    backgroundColor: "blue", 
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    width: "90%",
  }
});
