import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../../Utility/GlobalApi";

export default function DexList() {
  const [dexList, setDexList] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    getDex();
  }, []);

  const getDex = () => {
    GlobalApi.getDex().then((resp) => {
      console.log("RESP-", resp);
      setDexList(resp?.dexes || []);
    }).catch(error => {
      console.error('Error fetching Dex data:', error);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("all-dexes")}>
          <Text style={{ marginTop: 15, fontWeight: 'bold' }}>Dex | View All</Text>
        </TouchableOpacity>
        <FlatList
          data={dexList}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Dex-Detail", { dexData: item })}>
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
