import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Colors from '../app/constants/Colors';
import GlobalApi from '../Utility/GlobalApi';

export default function VideoScreen({ route }) {
  const { videoId } = route.params;
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoData(videoId);
  }, [videoId]);

  const fetchVideoData = async (videoId) => {
    try {
      let response = await GlobalApi.getCryptoHindi();
      let video = response?.cryptohindis.find((item) => item.id === videoId);
      if (!video) {
        response = await GlobalApi.getCryptogg();
        video = response?.cryptoggs.find((item) => item.id === videoId);
      }
      if (!video) {
        response = await GlobalApi.getFeatureEarning();
        video = response?.featureEarnings.find((item) => item.id === videoId);
      }
      setVideoData(video);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching video data:', error);
      setLoading(false);
    }
  };

  const handleLinkPress = (url) => {
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    } else {
      console.warn('Cannot open URL:', url);
    }
  };

  const handleFullScreen = async () => {
    await Video.setIsFullscreen(true);
  };

  const renderDescriptionWithLinks = () => {
    if (!videoData || !videoData.description) return null;

    const description = videoData.description;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlRegex);
    
    return (
      <Text style={styles.description}>
        {parts.map((part, index) => {
          if (part.match(urlRegex)) {
            return (
              <TouchableOpacity key={index} onPress={() => handleLinkPress(part)}>
                <Text style={styles.link}>{part}</Text>
              </TouchableOpacity>
            );
          }
          return <Text key={index}>{part}</Text>; // Wrap non-link text in Text component
        })}
      </Text>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!videoData) {
    return (
      <View style={styles.container}>
        <Text>Error loading video data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Video
          source={{ uri: videoData.video[0].url }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{videoData.name}</Text>
        {renderDescriptionWithLinks()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.HOME_COLOR
  },
  card: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
    padding: 12,
    width: '90%',
    maxWidth: 400,
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fullscreen: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  description: {
    
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
