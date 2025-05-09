import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Header from '../../components/home/Header';
import PromoBanner from '../../components/home/Banner';
import QuickStats from '../../components/home/QuickStats';
import YourListings from '../../components/home/YourListings';

interface Item {
  id: string;
  title: string;
  price: string;
  status?: string;
  date: string;
  rating: string;
  image: any;
}

const HomeScreen = () => {

  const listings: Item[] = [
    {
      id: '1',
      title: 'T Shirts',
      price: 'PKR 500',
      date: '8 May to 10 May',
      rating: '5.0',
      image: require('../../assets/icons/shirt.png'),
    },
    {
      id: '2',
      title: 'Shoes',
      price: 'PKR 700',
      date: '14 May to 19 May',
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
      rating: '5.0',
      image: require('../../assets/icons/shirt.png'),
    },
    {
      id: '2',
      title: 'Shoes',
      price: 'PKR 700',
      status: 'Pending',
      date: '14 May to 19 May',
      rating: '',
      image: require('../../assets/icons/watch.png'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <PromoBanner />
      <Text style={{ fontSize: 20, fontWeight: '600'}}>Quick Stats</Text>
      <QuickStats />

      <YourListings title="Your Listings" data={listings} />
      <YourListings title="Incoming Requests" data={requests} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
