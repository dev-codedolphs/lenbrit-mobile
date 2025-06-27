import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SearchIcon } from '../../assets/icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for something.."
        placeholderTextColor="#999"
        style={styles.input}
      />
      <TouchableOpacity>
       <SearchIcon />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    height: hp(6),
    alignSelf: 'center',
    marginVertical: hp(1),
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },
});
