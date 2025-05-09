import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ListingCard from './ListingCard';

interface Item {
  id: string;
  title: string;
  price: string;
  status?: string;
  date: string;
  rating: string;
  image: any;
}

interface YourListingsProps {
  title: string;
  data: Item[];
}

const YourListings: React.FC<YourListingsProps> = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ListingCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
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
});

export default YourListings;
