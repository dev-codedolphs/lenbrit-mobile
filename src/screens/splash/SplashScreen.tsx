import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { color } from '../../theme/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SplashScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <Image
          source={require('../../assets/icons/logo.png')} // logo
          style={styles.logo}
        />
        <Text style={styles.tagLine}>Lend, Borrow, Repeat </Text>
      </View>
    </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  logo: {
    width: wp(52),
    height: wp(25),
    resizeMode: 'contain',
  },
  tagLine: {
    fontSize: 18,
    fontWeight: '500',
    color: color.Default,
  }
});

export default SplashScreen;
