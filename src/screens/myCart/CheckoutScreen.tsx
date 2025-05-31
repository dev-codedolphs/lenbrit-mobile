import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';

const CheckoutScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
      <View style={styles.container}>
        <Header title="Checkout" goBack={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/icons/shirt.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionBox}>
            This soft, breathable cotton T-shirt offers comfort and style in one
            perfect package. Ideal for casual hangouts, college wear, or even semi-
            formal layering. The minimal print and slim fit make it suitable for both
            men and women looking for a trendy look without breaking the bank. Worn
            only twice and maintained in excellent condition.
          </Text>

          <View style={styles.detailRow}><Text style={styles.label}>Item</Text><Text style={styles.value}>T Shirt</Text></View>
          <View style={styles.detailRow}><Text style={styles.label}>Category</Text><Text style={styles.value}>Random</Text></View>
          <View style={styles.detailRow}><Text style={styles.label}>Date</Text><Text style={[styles.value, { color: color.Default }]}>10 May to 12 May</Text></View>
          <View style={styles.detailRow}><Text style={styles.label}>Size</Text><Text style={styles.value}>Large</Text></View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Order Info</Text>
          <View style={styles.detailRow}><Text style={styles.subLabel}>Subtotal</Text><Text style={styles.value}>PKR 400</Text></View>
          <View style={styles.detailRow}><Text style={styles.subLabel}>Shipping cost</Text><Text style={styles.value}>PKR 0</Text></View>
          <View style={styles.detailRow}><Text style={styles.label}>Total</Text><Text style={styles.value}>PKR 400</Text></View>
        </ScrollView>

          <Button title="Check out" backgroundColor={color.Default} style={{ marginBottom: 0}} />
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingTop: wp(4),
  },
  imageWrapper: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    padding: hp('2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  image: {
    width: wp('50%'),
    height: hp('25%'),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  descriptionBox: {
    backgroundColor: '#F8F8F8',
    padding: wp('4%'),
    borderRadius: 8,
    fontSize: 13,
    color: '#555',
    marginBottom: hp('2%'),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.2%'),
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  subLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#999',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginVertical: hp('2%'),
  },
  buttonWrapper: {
    backgroundColor: 'red',
    // paddingVertical: hp('0.1%'),
  },
});
