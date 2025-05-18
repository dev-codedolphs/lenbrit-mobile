import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import { color } from '../../theme/colors'
import Button from '../../components/Button'
import ListingCard from '../../components/home/ListingCard';
import * as space from '../../utils/spacer'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { ItemType, OrderItemType } from '../../types/types';

const MyItemsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const listings: ItemType[] = [
    {
      id: '1',
      title: 'T Shirt',
      renter: 'Hira',
      price: 'PKR 500',
      date: '8 May to 10 May',
      rating: '5.0',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      image: require('../../assets/icons/shirt.png'),
    },
    {
      id: '2',
      title: 'Shoes',
      renter: 'Hira',
      price: 'PKR 700',
      date: '14 May to 19 May',
      rating: '',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      image: require('../../assets/icons/watch.png'),
    },
    {
      id: '3',
      title: 'Shoes',
      renter: 'Hira',
      price: 'PKR 700',
      date: '14 May to 19 May',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      rating: '',
      image: require('../../assets/icons/watch.png'),
    },
    {
      id: '4',
      title: 'Shoes',
      renter: 'Hira',
      price: 'PKR 700',
      date: '14 May to 19 May',
      rating: '',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      image: require('../../assets/icons/watch.png'),
    },
    {
      id: '5',
      title: 'Shoes',
      renter: 'Hira',
      price: 'PKR 700',
      date: '14 May to 19 May',
      rating: '',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      image: require('../../assets/icons/watch.png'),
    },
    {
      id: '6',
      title: 'Shoes',
      renter: 'Hira',
      price: 'PKR 700',
      date: '14 May to 19 May',
      rating: '',
      description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
      image: require('../../assets/icons/watch.png'),
    },
  ];
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
         <Button title='Add New Items' backgroundColor={color.Default} onPress={() => navigation.navigate('AddItem')} />
         <space.s2 />
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          renderItem={({ item }: {item: ItemType}) => <ListingCard item={item} />}
        />
      </View>
    </SafeAreaView>
  )
}

export default MyItemsScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: color.White
  },
})