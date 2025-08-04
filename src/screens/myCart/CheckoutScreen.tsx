import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { useSelector } from 'react-redux';
import { ArrowBack, ArrowForward } from '../../assets/icons';
import { CartItem } from '../../types/types';

const CheckoutScreen = () => {
  const cart = useSelector((state: any) => state.user.cart);
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const subTotal = cart.reduce(
    (sum: number, item: any) => sum + item.listing.price * item.quantity,
    0
  );
  const shippingCost = 50;
  const total = subTotal + shippingCost;

  let currentOffset = 0;
  const handleArrowPress = (direction: 'left' | 'right') => {
    const screenWidth = wp('100%');
    currentOffset += direction === 'right' ? screenWidth : -screenWidth;
    scrollRef.current?.scrollTo({ x: currentOffset, animated: true });
  };

  function formatDate(dateString: string | undefined | null): string | null {
    if (!dateString) return null;

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
      });
    } catch (error) {
      console.warn('Invalid date:', dateString);
      return null;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: wp(4) }}>
          <Header title="Checkout" goBack={() => navigation.goBack()} />
        </View>

        <View style={styles.sliderContainer}>
          <TouchableOpacity style={styles.leftArrow} onPress={() => handleArrowPress('left')}>
            <ArrowBack width={20} height={38} />
          </TouchableOpacity>

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={wp('100%')}
            snapToAlignment="center"
            contentContainerStyle={{ paddingHorizontal: wp(4), alignItems: 'center', }}
          >
            {cart.map((item: CartItem, index: number) => {
              const imageSrc = item.listing.images?.[0]?.url
                ? { uri: item.listing.images[0].url }
                : require('../../assets/images/default.jpg');
              const isLast = index === cart.length - 1;

              return (
                <View key={index}
                  style={[
                    styles.card,
                    !isLast && { marginRight: wp('4%') } // margin only if not last
                  ]}
                >
                  <View style={{ padding: wp('3%') }}>
                    <Image source={imageSrc} style={styles.image} />
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionBox}>
                      {item.listing.description}
                    </Text>

                    <View style={styles.detailRow}><Text style={styles.label}>Item</Text><Text style={styles.value}>{item.listing.name}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.label}>Category</Text><Text style={styles.value}>{item.listing.category.name}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.label}>Date</Text><Text style={[styles.value, { color: color.Default }]}>{formatDate(item?.listing?.startDate)} to {formatDate(item?.listing?.endDate)}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.label}>Size</Text><Text style={styles.value}>{item.listing.size}</Text></View>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <TouchableOpacity style={styles.rightArrow} onPress={() => handleArrowPress('right')}>
            <ArrowForward width={20} height={38} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: wp(4) }}>
          <View style={styles.separator} />
          <Text style={styles.sectionTitle}>Order Info</Text>
          <View style={styles.detailRow}><Text style={styles.subLabel}>Subtotal</Text><Text style={styles.value}>PKR {subTotal}</Text></View>
          <View style={styles.detailRow}><Text style={styles.subLabel}>Shipping cost</Text><Text style={styles.value}>PKR {shippingCost}</Text></View>
          <View style={styles.detailRow}><Text style={styles.label}>Total</Text><Text style={styles.value}>PKR {total.toFixed(2)}</Text></View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Check out"
            onPress={() => navigation.navigate('AddressScreen')}
            backgroundColor={color.Default}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: wp(4),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: wp(4),
    backgroundColor: color.White,
  },
  imageWrapper: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    padding: hp('2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
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
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
  },
  buttonWrapper: {
    backgroundColor: 'red',
    // paddingVertical: hp('0.1%'),
  },

  sliderContainer: {
    marginVertical: hp('1%'),
    position: 'relative',
  },
  card: {
    width: wp('100%') - wp(4) * 2,
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: hp('20%'),
    borderRadius: 8,
  },
  sliderItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: hp('1%'),
  },
  sliderItemDesc: {
    fontSize: 13,
    color: '#555',
    marginTop: hp('0.5%'),
  },
  leftArrow: {
    position: 'absolute',
    left: wp('2%'),
    top: '40%',
    zIndex: 1,
  },
  rightArrow: {
    position: 'absolute',
    right: wp('2%'),
    top: '40%',
    zIndex: 1,
  },

});
