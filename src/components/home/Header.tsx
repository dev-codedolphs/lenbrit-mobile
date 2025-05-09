// components/home/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ArrowForward } from '../../assets/icons';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.avatar} />
        <View>
          <Text style={styles.welcome}>Welcome Back</Text>
          <Text style={styles.name}>Faraz</Text>
        </View>
      </View>
      <View style={styles.notification}>
        <ArrowForward />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  welcome: {
    fontSize: 14,
    color: '#555',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  notification: {
    alignSelf: 'center'
  }
});

export default Header;
