import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator, SafeAreaView, StyleSheet, StatusBar, RefreshControl, Appearance } from 'react-native';
import Header from '../app/components/Header';
import GlobalApi from '../Utility/GlobalApi';
import Category from '../app/components/Category';
import TestnetList from '../app/components/TestnetList';
import SolanaList from '../app/components/SolanaList';
import Layer2List from '../app/components/Layer2List';
import Colors from '../app/constants/Colors';
import DexList from '../app/components/DexList';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarColor, setStatusBarColor] = useState('black'); // Default status bar color

  useEffect(() => {
    getCategory();
    setStatusBarColor(getStatusBarColor()); // Set initial status bar color based on theme
  }, []);

  const getStatusBarColor = () => {
    // Get device theme using Appearance API
    const colorScheme = Appearance.getColorScheme();
    // Return appropriate status bar color based on device theme or predefined colors
    return colorScheme === 'dark' ? 'black' : Colors.HOME_COLOR;
  };

  const getCategory = async () => {
    try {
      const response = await GlobalApi.getCategory();
      setCategories(response?.categories || []);
      setLoading(false);
      setRefreshing(false); // Reset refreshing state after data is fetched
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
      setRefreshing(false); // Reset refreshing state on error
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getCategory(); // Fetch data again when refreshing
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={statusBarColor} />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.PRIMARY_COLOR]} // Color of the refresh indicator
          />
        }
      >
        <View style={styles.container}>
          <Header style={styles.header} />
          <Category categories={categories} />
          {loading ? (
            <ActivityIndicator size="large" color={Colors.PRIMARY_COLOR} />
          ) : (
            <>
              <TestnetList />
              <SolanaList />
              <Layer2List />
              <DexList />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.HOME_COLOR,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 15,
  },
  header: {
    marginTop: 5,
  },
});
