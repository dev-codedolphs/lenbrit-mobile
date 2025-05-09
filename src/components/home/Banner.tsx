// components/home/Banner.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Turn Your Closet Into Cash</Text>
        <Text style={styles.subtitle}>List your items today and start earning by helping others save. Let your style pay for itself!</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add New Items</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../assets/icons/Character.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: '#8D1EFF',
    borderRadius: 12,
    padding: wp('4%'),
    marginVertical: hp('2%'),
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: '#fff',
    fontSize: 12,
    marginVertical: hp('1%'),
  },
  button: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: wp('20%'),
    height: wp('20%'),
    marginLeft: wp('2%'),
  },
});

export default Banner;
