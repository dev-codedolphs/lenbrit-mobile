import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowDown, DropDown } from '../../assets/icons';

const filters = ['Size', 'Color', 'Style', 'Gender'];

const Filters = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Filters</Text>
      <View style={styles.container}>
        {filters.map((filter) => (
          <TouchableOpacity key={filter} style={styles.dropdown}>
            <Text style={styles.label}>{filter}</Text>
            <ArrowDown />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: hp(1.5),
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: hp(1.8),
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginRight: 6,
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: '#999',
  },
});
