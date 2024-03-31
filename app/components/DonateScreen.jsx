import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import Colors from '../constants/Colors';

export default function DonateScreen() {
  const walletAddress = '0x3245F174459EEaB88dd57f3eA92d62fD2ef54D5b';

  const handleCopyToClipboard = () => {
    Clipboard.setString(walletAddress);
    alert('Wallet address copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: Colors.SECONDARY }]}>
        <Text style={styles.letter}>
          Hey👋 Crypto Farmers! 🌱🚜
          {"\n\n"}
          Hope you're riding the crypto waves! 🏄‍♂️
          {"\n\n"}
          We're the brains behind this FarmApp, on a mission to arm crypto farmers like you with the tools and knowledge to conquer the airdrop landscape. 💪📈
          {"\n\n"}
          Feeling the urge to make a difference? Feel free to channel your crypto energy and send your contribution to our wallet address:
        </Text>
        <TouchableOpacity onPress={handleCopyToClipboard}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{walletAddress}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.letter}>
          Thanks for being a fellow crypto crusader. Your support means everything to us, and together, we'll navigate the crypto cosmos with flair. 🚀🌌
          {"\n\n"}
          Stay epic! ❤️
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.HOME_COLOR,
  },
  card: {
    width: '90%',
    height: '90%',
    backgroundColor: Colors.SECONDARY,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  letter: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  addressContainer: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 20,
    marginTop: 5, // Reduced marginTop
    marginBottom: 0, // Reduced marginBottom
  },
  address: {
    color: 'gray',
    textAlign: 'center',
  },
});
