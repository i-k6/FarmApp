import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import Colors from "../constants/Colors";

export default function Header() {
  const navigation = useNavigation();

  const springValue = useRef(new Animated.Value(1)).current;
  const waveValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(waveValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(waveValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    waveAnimation.start();

    return () => {
      waveAnimation.stop();
    };
  }, [waveValue]);

  const handleDonatePress = () => {
    Animated.sequence([
      Animated.spring(springValue, {
        toValue: 0.8,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(springValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    navigation.navigate("Donate");
  };

  const handleDiscordPress = () => {
    Linking.openURL("https://discord.com/invite/rhxdhMweMd");
  };

  const handleTwitterPress = () => {
    Linking.openURL("https://twitter.com/FarmAppOfficial");
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>👋</Text>
        <Text style={styles.wavingText}>Hello Farmooors!</Text>
        <TouchableOpacity onPress={handleTwitterPress}>
          <Entypo name="twitter" size={20} color="#1DA1F2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDiscordPress}>
        <Fontisto name="discord" size={20} color="#7289d9" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { transform: [{ scale: springValue }] }]}
          onPress={handleDonatePress}
        >
          <Text style={styles.buttonText}>Donate</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[styles.note, styles.eyeCatchingNote]}>
          ⚠️ This app requires an internet connection...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: Colors.CIRCLE_COLOR,
    borderRadius: 25,
    elevation: 5,
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    marginRight: 10,
  },
  wavingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  note: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
  eyeCatchingNote: {
    fontWeight: "bold",
    color: "red",
    marginBottom: 5,
  },
  communityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  communityLink: {
    marginLeft: 10,
    color: Colors.SECONDARY,
    textDecorationLine: "underline",
  },
});
