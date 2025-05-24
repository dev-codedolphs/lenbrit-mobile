// components/home/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ArrowForward, NotificationIcon } from '../../assets/icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Touchable } from 'react-native';

interface Prop {
  onPress: () => void;
}

const Header: React.FC<Prop> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.avatar} />
        <View>
          <Text style={styles.welcome}>Welcome Back</Text>
          <Text style={styles.name}>Faraz</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.notification} onPress={onPress}>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
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
    width: 50,
    height: 50,
    borderRadius: wp(20),
    marginRight: wp(3),
  },
  notification: {
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 8,
    padding: wp(3)
  }
});

export default Header;
