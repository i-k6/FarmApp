import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../app/constants/Colors';

export default function SolanaDetailsScreen() {
  const route = useRoute();
  const solanaData = route.params ? route.params.solanaData : null;
  const farmed = route.params ? route.params.farmed : false;

  if (!solanaData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Solana data not available.</Text>
      </SafeAreaView>
    );
  }

  const renderDetailText = () => {
    if (!solanaData.detail) return null;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = solanaData.detail.split(urlRegex);

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
          {solanaData.banner && solanaData.banner.length > 0 && (
            <Image
              source={{ uri: solanaData.banner[0].url }}
              style={styles.banner}
            />
          )}
          <Text style={styles.title}>{solanaData.name}</Text>
          <View style={styles.farmedContainer}>
            <Text style={styles.farmedIndicator}>{farmed ? "✅ Farmed" : "Not Farmed"}</Text>
          </View>
        </View>
        <View style={styles.card}>
          {solanaData.video && solanaData.video.length > 0 && (
            <Video
              source={{ uri: solanaData.video[0].url }}
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
