import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Platform } from 'react-native';
import GlobalApi from '../../Utility/GlobalApi';
import Colors from '../../app/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons library

export default function Allsolana() {
  const [Allsolana, setAllsolana] = useState([]);
  const [completedIndices, setCompletedIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getSolana();
    loadCompletedIndices();
  }, []);

  const getSolana = () => {
    setLoading(true);
    GlobalApi.getSolana().then((resp) => {
      setAllsolana(resp?.solanas);
      setLoading(false);
    }).catch(error => {
      setError(error);
      setLoading(false);
      console.error('Error fetching Solana data:', error);
    });
  };

  const loadCompletedIndices = async () => {
    try {
      const completedIndicesString = await AsyncStorage.getItem('completedIndices');
      if (completedIndicesString !== null) {
        setCompletedIndices(JSON.parse(completedIndicesString));
      }
    } catch (error) {
      console.error('Error loading completed indices:', error);
    }
  };

  const saveCompletedIndices = async () => {
    try {
      await AsyncStorage.setItem('completedIndices', JSON.stringify(completedIndices));
    } catch (error) {
      console.error('Error saving completed indices:', error);
    }
  };

  const handleCompletedPress = (index) => {
    if (completedIndices.includes(index)) {
      setCompletedIndices(completedIndices.filter((idx) => idx !== index));
    } else {
      setCompletedIndices([...completedIndices, index]);
    }
  };

  useEffect(() => {
    saveCompletedIndices();
  }, [completedIndices]);

  const completedCount = completedIndices.length;
  const incompleteCount = Allsolana.length - completedIndices.length;
  const totalCount = Allsolana.length;

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
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
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
            Platform.OS === 'android' ? styles.androidElevation : styles.defaultElevation // Apply elevation style based on platform
          ]}
        >
          <Text style={styles.title}>SOLANA PROJECTS</Text>
        </View>
        <View style={styles.countCard}>
          <Text style={styles.countText}>Total Projects: {totalCount}</Text>
          <Text style={styles.countText}>Farmed: {completedCount}</Text>
          <Text style={styles.countText}>Unfarmed: {incompleteCount}</Text>
        </View>
        <View style={styles.rowContainer}>
          {Allsolana.map((solana, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => navigation.navigate('Solana-Detail', { solanaData: solana, farmed: completedIndices.includes(index) })}
            >
              <View style={[styles.itemContainer, completedIndices.includes(index) && styles.completedItem]}>
                <Text style={styles.itemText}>{solana.name}</Text>
                {solana.banner && solana.banner[0] && solana.banner[0].url ? (
                  <Image source={{ uri: solana.banner[0].url }} style={styles.itemImage} />
                ) : null}
                <TouchableOpacity onPress={() => handleCompletedPress(index)} style={[styles.completedButton, completedIndices.includes(index) ? styles.completedButtonPressed : styles.completedButtonUnpressed]}>
                  <Text style={styles.completedButtonText}>{completedIndices.includes(index) ? 'Farmed' : 'Unfarmed'}</Text>
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
  completedItem: {
    backgroundColor: 'lightgreen',
  },
  completedButton: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
  },
  completedButtonPressed: {
    backgroundColor: 'green',
  },
  completedButtonUnpressed: {
    backgroundColor: 'red',
  },
  completedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Text color of the title
    textAlign: 'center',
  },
  titleContainer: {
    backgroundColor: 'blue', // Background color of the elevated card
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    width: "90%",
  },
  defaultElevation: {
    elevation: 3, // Default elevation for iOS
  },
  androidElevation: {
    elevation: 5, // Elevation effect for Android
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
});
