import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CheckersList from '../app/components/Tools/CheckersList';
import ToDo from '../app/components/Tools/ToDo';
import Colors from '../app/constants/Colors';

export default function Tools() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <CheckersList style={styles.checkersList} />
        <View style={styles.gap} />
        <ToDo style={styles.todo} />
        <View style={styles.gap} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: Colors.HOME_COLOR,
    paddingTop: 25,
  },
  container: {
    alignItems: 'center',
  },
  gap: {
    height: 20, // Adjust the gap height as needed
  },
  checkersList: {
    marginBottom: 20, // Add margin to the bottom of CheckersList
  },
  todo: {
    marginBottom: 20, // Add margin to the bottom of ToDo
  },
});
