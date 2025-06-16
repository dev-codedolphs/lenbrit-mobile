import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/home/Header';
import PromoBanner from '../../components/home/Banner';
import QuickStats from '../../components/home/QuickStats';
import YourListings from '../../components/home/YourListings';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import authSlice from '../auth/redux/Slice';
import { useDispatch, useSelector } from 'react-redux';

interface Item {
  id: string;
  title: string;
  price: string;
  status?: string;
  date: string;
  description: string;
  renter?: string;
  rating: string;
  image: any;
}

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state:any) => state.auth);
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  useEffect(() => {
    const getuser = async () => {
      dispatch(authSlice.actions.getUserInfo())
    }

    getuser();
  }, [])

  const listings: Item[] = [
    {
      id: '1',
      title: 'T Shirts',
      price: 'PKR 500',
      date: '8 May to 10 May',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      rating: '5.0',
      image: require('../../assets/icons/shirt.png'),
    },
    {
      id: '2',
      title: 'Shoes',
      price: 'PKR 700',
      date: '14 May to 19 May',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      rating: '',
      image: require('../../assets/icons/watch.png'),
    },
  ];

  const requests: Item[] = [
    {
      id: '1',
      title: 'T Shirts',
      price: 'PKR 500',
      status: 'Pending',
      date: '8 May to 10 May',
      renter: 'Ali',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      rating: '5.0',
      image: require('../../assets/icons/shirt.png'),
    },
    {
      id: '2',
      title: 'Shoes',
      price: 'PKR 700',
      status: 'Pending',
      date: '14 May to 19 May',
      renter: 'Ahmad',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      rating: '4.8',
      image: require('../../assets/icons/watch.png'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Header onPress={() => navigation.navigate('NotificationsScreen')} />
        <PromoBanner />
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Quick Stats</Text>
        <QuickStats />

        <YourListings title="Your Listings" data={listings} onPress={() => navigation.navigate('Tabs', {screen: 'MyItems'})} />
        <YourListings title="Incoming Requests" data={requests} onPress={() => navigation.navigate('OffersScreen')} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
