import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
  focused: boolean;
  Icon: any;
  label: string;
  color: string;
}

export default function TabIconWithLabel({ focused, Icon, label, color }: Props) {
  return (
    <View style={styles.container}>
      <View style={[focused && styles.liftedIcon]}>
        {Icon}
      </View>
      {focused && (
        <Text
          style={[styles.label, { color }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: wp(16),
  },
  liftedIcon: {
    marginBottom: 2,
  },
  label: {
    fontSize: wp(3),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 3,
  },
});
