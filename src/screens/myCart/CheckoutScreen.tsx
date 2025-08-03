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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';

const CheckoutScreen = () => {
  const route = useRoute<RouteProp<MainStackParamList, 'CheckoutScreen'>>();
  const { item } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  
  const startDate = item?.listing?.startDate && new Date(item?.listing?.startDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  })

  const endDate = item?.listing?.endDate && new Date(item?.listing.endDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  })

  const date = `${startDate} to ${endDate}`
  const subTotal = item.listing.price * item.quantity
  const shippingCost = 50;
  const total = subTotal + shippingCost ;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
      <View style={styles.container}>
        <Header title="Checkout" goBack={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item.listing.images[0].url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionBox}>
            {item.listing.description}
          </Text>

          <View style={styles.detailRow}><Text style={styles.label}>Item</Text><Text style={styles.value}>{item.listing.name}</Text></View>
          <View style={styles.detailRow}><Text style={styles.label}>Category</Text><Text style={styles.value}>{item.listing.category.name}</Text></View>
          <View style={styles.detailRow}><Text style={styles.label}>Date</Text><Text style={[styles.value, { color: color.Default }]}>{date}</Text></View>
          <View style={styles.detailRow}><Text style={styles.label}>Size</Text><Text style={styles.value}>{item.listing.size}</Text></View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Order Info</Text>
          <View style={styles.detailRow}><Text style={styles.subLabel}>Subtotal</Text><Text style={styles.value}>PKR {subTotal}</Text></View>
          <View style={styles.detailRow}><Text style={styles.subLabel}>Shipping cost</Text><Text style={styles.value}>PKR {shippingCost}</Text></View>
          <View style={styles.detailRow}><Text style={styles.label}>Total</Text><Text style={styles.value}>PKR {total.toFixed(2)}</Text></View>
        </ScrollView>

          <Button title="Check out" onPress={() => navigation.navigate('AddressScreen')} backgroundColor={color.Default} style={{ marginBottom: 0}} />
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
