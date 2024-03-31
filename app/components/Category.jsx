import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native'; // Add Platform from 'react-native'
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook

export default function Category({ categories }) {
  const [activeIndex, setActiveIndex] = useState();
  const scaleValues = categories.map(() => new Animated.Value(1));
  const navigation = useNavigation(); // Initializing navigation

  const handlePress = (index, name) => {
    setActiveIndex(index);
    switch (name) {
      case 'Solana':
        navigation.navigate('all-solanas');
        break;
      case 'Testnet':
        navigation.navigate('all-testnets');
        break;
      case 'Layer2 Eth':
        navigation.navigate('all-layer2s');
        break;
      case 'Dex/Cex':
        navigation.navigate('all-dexes');
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate("all-categories")}>
        <Text style={{ marginTop: 15, fontWeight: 'bold' }}>Categories | View All</Text>
      </TouchableOpacity>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item, index }) => {
          const scale = scaleValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.95, 1],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={[
                styles.container,
                activeIndex === index && { borderWidth: 1, borderColor: 'blue' },
                { transform: [{ scale }] },
                Platform.OS === 'android' ? styles.androidElevation : styles.defaultElevation // Add elevation style based on platform
              ]}
            >
              <TouchableOpacity onPress={() => handlePress(index, item.name)} style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: item?.icon?.url }}
                  style={{
                    marginTop: 5,
                    width: 50,
                    height: 50,
                    borderRadius: 99,
                    objectFit: 'contain'
                  }}
                />
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{item?.name}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 90,
    marginTop: 5,
    marginRight: 10,
  },
  defaultElevation: {
    elevation: 3, // Default elevation for iOS
  },
  androidElevation: {
    elevation: 5, // Elevation effect for Android
  },
});
