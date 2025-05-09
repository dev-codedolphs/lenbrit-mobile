import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const stats = [
  { label: 'Item Listed', value: '34' },
  { label: 'Item Rented', value: '7' },
  { label: 'Earnings', value: 'PKR 20,560' },
];

const QuickStats = () => {
  return (
    <View style={styles.container}>
      {stats.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.values}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1.5),
  },
  card: {
    backgroundColor: '#F8F8F8',
    width: 'auto',
    paddingVertical: wp(4),
    paddingHorizontal: wp(3.5),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 14,
    color: '#999',
    fontWeight: '400',
  },
  values: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: hp(1),
  }
});

export default QuickStats;