import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ListingCard from './ListingCard';
import { ListingItem } from '../../types/types';
import RequestCard from './RequestCard';

interface Item {
  id: string;
  title: string;
  price: string;
  status?: string;
  description: string;
  renter?: string;
  date: string;
  rating: string;
  image: any;
}

interface YourListingsProps {
  title: string;
  data: ListingItem[];
  onPress: () => void;
  from: string;
}

const YourListings: React.FC<YourListingsProps> = ({ title, data, onPress, from }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {data?.length > 0 && (
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {data?.length < 1 ? (
        <Text style={styles.emptyText}>No listings available yet.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item?.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) =>
            from === 'requests' ? (
              <RequestCard item={item} />
            ) : (
              <ListingCard item={item} from={from} />
            )
          }
        />
      )}
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
  emptyText: {
    fontSize: 14,
    color: '#888',
    paddingBottom: 40,
    marginTop: 10,
    textAlign: 'center'
  }
});

export default YourListings;
