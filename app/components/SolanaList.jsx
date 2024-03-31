import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"; // Import SafeAreaView
import GlobalApi from "../../Utility/GlobalApi";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function SolanaList() {
  const [solanaList, setSolanaList] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    getSolana();
  }, []);

  const getSolana = () => {
    GlobalApi.getSolana().then((resp) => {
      console.log("RESP-", resp);
      setSolanaList(resp?.solanas); // Accessing data property
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.HOME_COLOR }}> 
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("all-solanas")}>
          <Text style={{ marginTop: 15, fontWeight: 'bold' }}>Solana Projects | View All</Text>
        </TouchableOpacity>
        <FlatList
          data={solanaList}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Solana-Detail", { solanaData:item })}>
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
                    source={{ uri: item?.banner[0]?.url }} // Accessing the first element of the banner array
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
