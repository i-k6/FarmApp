import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"; // Import SafeAreaView
import GlobalApi from "../../Utility/GlobalApi";
import { useNavigation } from "@react-navigation/native";

export default function Layer2List() {
  const [layer2List, setLayer2List] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    getLayer2();
  }, []);

  const getLayer2 = () => {
    GlobalApi.getLayer2().then((resp) => {
      console.log("RESP-", resp);
      setLayer2List(resp?.l2S || []); // Accessing l2S property from data
    }).catch(error => {
      console.error('Error fetching Layer2 data:', error);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("all-layer2s")}>
          <Text style={{ marginTop: 15, fontWeight: 'bold' }}>Layer2 | View All</Text>
        </TouchableOpacity>
        <FlatList
          data={layer2List}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Layer2-Detail", { layer2Data: item })}>
              <View
                style={{
                  padding: 5,
                  marginRight: 5,
                  borderRadius: 20,
                  marginTop: 2,
                }}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item?.banner?.url }}
                    style={styles.bannerImage}
                  />
                </View>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: 200,
    height: 120,
    borderRadius: 10,
  },
  name: {
    marginTop: 5,
    fontWeight: 'bold',
  },
});
