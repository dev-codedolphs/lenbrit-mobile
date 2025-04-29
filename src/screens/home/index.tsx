// Home.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';


const Home = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>How are you feeling this day?</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});

export default Home;
