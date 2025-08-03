import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/home/Header';
import PromoBanner from '../../components/home/Banner';
import QuickStats from '../../components/home/QuickStats';
import YourListings from '../../components/home/YourListings';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import authSlice from '../auth/redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import { CosmeticsIcon, ElectronicsIcon, ShirtIcon } from '../../assets/icons';
import SearchBar from './SearchBar';
import Filters from './Filters';
import userSlice from '../redux/Slice';
import { ListingItem } from '../../types/types';
import HomeSkeleton from '../../components/home/HomeSkeleton';

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
  const { orders, cart, categories, products, loading } = useSelector((state:any) => state.user);
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
      if (!loading && products?.length > 0 ) {
        setIsInitialLoading(false);
      }
    }, [loading, products?.length]);


  useEffect(() => {
    const getuser = async () => {
      dispatch(authSlice.actions.getUserInfo({}))
      dispatch(userSlice.actions.getAllCategories({}));
      dispatch(userSlice.actions.getAllProducts({}));
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

  const TopProducts: Item[] = [
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

  const NewlyAddedProducts: Item[] = [
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

  // const requests: Item[] = [
  //   {
  //     id: '1',
  //     title: 'T Shirts',
  //     price: 'PKR 500',
  //     status: 'Pending',
  //     date: '8 May to 10 May',
  //     renter: 'Ali',
  //     description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
  //     rating: '5.0',
  //     image: require('../../assets/icons/shirt.png'),
  //   },
  //   {
  //     id: '2',
  //     title: 'Shoes',
  //     price: 'PKR 700',
  //     status: 'Pending',
  //     date: '14 May to 19 May',
  //     renter: 'Ahmad',
  //     description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
  //     rating: '4.8',
  //     image: require('../../assets/icons/watch.png'),
  //   },
  // ];

  const Categories = [
    {
      id: '1',
      label: 'Cloths',
      icon: ShirtIcon,
    },
    {
      id: '2',
      label: 'Cosmetics',
      icon: CosmeticsIcon,
    },
    {
      id: '3',
      label: 'Electronics',
      icon: ElectronicsIcon,
    },
  ];

  const requests = products?.filter((item: ListingItem) =>
    Array.isArray(item.CustomOffer) && item.CustomOffer.length > 0
  );
  
  const approvedItems = products?.filter((item: ListingItem) => item.status === 'APPROVED');

  if (isInitialLoading) {
    return <HomeSkeleton />
  }

  return (
    <SafeAreaView >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Header onPress={() => navigation.navigate('NotificationsScreen')} />
        <PromoBanner />

        {/* borrower UI */}
        {user?.role === 'BORROWER' &&
          <>
            <SearchBar />
            <Filters />
            <View style={{ marginTop: hp(1) }}>
              <View style={styles.categoryHeader}>
                <Text style={styles.title}>Category</Text>
                <TouchableOpacity onPress={() => console.log('category click')}>
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={Categories}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.card}>
                    <View style={styles.categoryIconContainer}>
                      <item.icon />
                    </View>
                    <Text style={styles.label}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* <YourListings title="Top Items" data={TopProducts} onPress={() => navigation.navigate('Tabs', { screen: 'MyItems' })} /> */}
            <YourListings title="Newly Added" data={approvedItems} onPress={() => navigation.navigate('OffersScreen')} from='products' />
          </>
        }

        {/* Lender UI */}
        {
          user?.role === 'LENDER' &&
          <>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Quick Stats</Text>
            <QuickStats />
            <YourListings title="Your Listings" data={products} onPress={() => navigation.navigate('Tabs', { screen: 'MyItems' })} from='listingsHome' />
            <YourListings title="Incoming Requests" data={requests} onPress={() => navigation.navigate('OffersScreen')} from='requests' />
          </>
        }

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A020F0',
    alignSelf:'flex-end'
  },
  card: {
    backgroundColor: '#F3F3F3',
    borderRadius: wp(2),
    padding: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(3),
  },
  categoryIconContainer: {
    backgroundColor: 'white',
    width: wp(11),
    height: wp(11),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    marginRight: wp(2)
  },
  icon: {
    width: 36,
    height: 36,
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});

export default HomeScreen;
