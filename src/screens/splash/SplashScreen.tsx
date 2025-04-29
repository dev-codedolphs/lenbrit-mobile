import React from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/icons/Splash.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
      <Image
          source={require('../../assets/icons/logo.png')} // logo
          style={styles.logo}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // optional overlay tint
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
