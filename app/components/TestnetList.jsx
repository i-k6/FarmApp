import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import GlobalApi from "../../Utility/GlobalApi";
import { useNavigation } from "@react-navigation/native";

export default function TestnetList() {
  const [testnetList, setTestnetList] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    getTestnet();
  }, []);

  const getTestnet = () => {
    GlobalApi.getTestnet().then((resp) => {
      console.log("RESP-", resp);
      setTestnetList(resp?.testnets);
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("all-testnets")}>
        <Text style={{ marginTop: 15, fontWeight: 'bold' }}>Testnets | View All</Text>
      </TouchableOpacity>
      <FlatList
        data={testnetList}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Testnet-Detail", { testnetData: item })}>
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
