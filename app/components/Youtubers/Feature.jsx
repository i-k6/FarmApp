import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import GlobalApi from '../../../Utility/GlobalApi';
import Colors from '../../constants/Colors';

export default function Feature() {
  const [videoList, setVideoList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchVideoList();
  }, []);

  const fetchVideoList = async () => {
    try {
      const response = await GlobalApi.getFeatureEarning();
      const videos = response?.featureEarnings.map((video) => ({
        id: video.id,
        name: video.name,
        thumbnail: video.thumbnail ? video.thumbnail.url : null,
      }));
      setVideoList(videos || []);
    } catch (error) {
      console.error('Error fetching video list:', error);
    }
  };

  const handlePress = (item) => {
    navigation.navigate('VideoScreen', { videoId: item.id });
  };

  const renderBackButton = () => {
    return (
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.card}>
          {item.thumbnail && (
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          )}
          <Text style={styles.videoName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {renderBackButton()}
        <Text style={styles.title}>VideoList</Text>
      </View>
      <Text style={styles.disclaimer}>All the video credits are for the respective creator of these videos.</Text>
      <FlatList
        data={videoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.HOME_COLOR,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
    marginBottom: 10, // Add margin bottom to create space between header and list
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:5
  },
  backButton: { 
    position: 'absolute',
    left: 10,
  },
  disclaimer: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red', // Make the text red
    marginBottom: 5,
    fontSize: 8,
  },
  
  contentContainer: {
    justifyContent: 'center', // Center cards horizontally
    alignItems: 'center', // Center cards vertically
    paddingTop: 10, // Add padding at top for space
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
    width: 350,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  videoName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center', // Align text in center
  },
});
