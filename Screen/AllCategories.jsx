import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../Utility/GlobalApi"; // Import your API
import Colors from "../app/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

// Function to render the back button
const renderBackButton = (navigation) => {
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default function AllCategories() {
  const [allCategories, setAllCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    GlobalApi.getCategory()
      .then((resp) => {
        setAllCategories(resp?.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleCategoryPress = (categoryName) => {
    switch (categoryName) {
      case "Solana":
        navigation.navigate("all-solanas");
        break;
      case "Testnet":
        navigation.navigate("all-testnets");
        break;
      case "Layer2 Eth":
        navigation.navigate("all-layer2s");
        break;
      case "Dex/Cex":
        navigation.navigate("all-dexes");
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Render the back button */}
        {renderBackButton(navigation)}

        <View
          style={[
            styles.titleContainer,
            Platform.OS === "android" ? styles.androidElevation : styles.defaultElevation // Apply elevation style based on platform
          ]}
        >
          <Text style={styles.title}>All Categories</Text>
        </View>
        <View style={styles.rowContainer}>
          {allCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(category.name)}
              activeOpacity={0.7} // Adjust the opacity of the touch effect
            >
              <View
                style={[
                  styles.itemContainer,
                  Platform.OS === "android" ? styles.androidElevation : styles.defaultElevation // Apply elevation style based on platform
                ]}
              >
                <Image
                  source={{ uri: category?.icon?.url }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <Text style={styles.itemText}>{category.name}</Text>
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
    paddingBottom: 10, // Add padding bottom to enable vertical scrolling
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: Colors.HOME_COLOR,
  },

  //for all titles
  titleContainer: {
    backgroundColor: "blue", // Background color of the elevated card
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white", // Text color of the title
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  itemContainer: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 90,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    padding: 20,
  },
  itemText: {
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemImage: {
    width: 100, // Image takes full width of the container
    height: 85, // Adjust the height as needed
    borderRadius: 90,
    marginTop: 5,
    alignItems: "center",
  },
  defaultElevation: {
    elevation: 3, // Default elevation for iOS
  },
  androidElevation: {
    elevation: 5, // Elevation effect for Android
  },
  backButton: {
    position: "absolute",
    left: 10,
    zIndex: 1,
    marginTop:20
  },
});
