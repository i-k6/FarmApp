import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../app/constants/Colors';

export default function TestnetDetailsScreen() {
  const route = useRoute();
  const testnetData = route.params ? route.params.testnetData : null;
  const farmed = route.params ? route.params.farmed : false;
  const [isFarmed, setIsFarmed] = useState(farmed);

  if (!testnetData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Testnet data not available.</Text>
      </SafeAreaView>
    );
  }

  const renderDetailText = () => {
    if (!testnetData.detail) return null;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = testnetData.detail.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(part)}
          >
            <Text style={styles.link}>{part}</Text>
          </TouchableOpacity>
        );
      } else {
        return <Text key={index}>{part}</Text>;
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.bannerContainer}>
          {testnetData.banner && (
            <Image
              source={{ uri: testnetData.banner.url }}
              style={styles.banner}
            />
          )}
          <Text style={styles.title}>{testnetData.name}</Text>
          <TouchableOpacity style={[styles.farmedContainer, isFarmed ? styles.farmedIndicator : null]} onPress={() => setIsFarmed(!isFarmed)}>
            <Text style={styles.farmedIndicator}>{isFarmed ? "✅ Farmed" : "Not Farmed"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          {testnetData.video && testnetData.video.length > 0 && (
            <Video
              source={{ uri: testnetData.video[0].url }}
              style={styles.videoPlayer}
              useNativeControls
              resizeMode="contain"
            />
          )}
          <View style={styles.detailsCard}>
            <Text style={styles.detail}>{renderDetailText()}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.HOME_COLOR
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  banner: {
    width: '90%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  videoPlayer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  detailsCard: {
    padding: 10,
  },
  detail: {
    fontSize: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  farmedContainer: {
    backgroundColor: 'lightgreen',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  farmedIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
