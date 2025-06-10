import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import OrderItem from '../../components/orders/OrderItem';
import TabBar from '../../components/orders/TabBar';
import { OrderItemType } from '../../types/types';

const tabs = ['In Progress', 'Completed', 'Cancelled'];

const orders = Array(8).fill({
  item: 'Soft Cotton T-Shirt',
  renter: 'Hira',
  date: '10 May to 12 May',
  price: 'PKR 400',
  size: 'large',
  description: 'This soft, breathable cotton T-shirt offers comfort and style in one perfect package. Ideal for casual hangouts, college wear, or even semi-formal layering. The minimal print and slim fit make it suitable for both men and women looking for a trendy look without breaking the bank. Worn only twice and maintained in excellent condition.',
  image: require('../../assets/icons/shirt.png'),
  status: 'completed',
});

const OrdersScreen = () => {
  const [selectedTab, setSelectedTab] = useState('In Progress');

  const renderOrder = ({ item }: { item: OrderItemType }) => <OrderItem item={item} />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Orders</Text>
      </View>

      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        onSelect={setSelectedTab}
      />

      <FlatList
        data={orders}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingVertical: hp('2%'),
    alignItems: 'center',
  },
  headerText: {
    fontSize: hp('2.3%'),
    fontWeight: '600',
    color: '#000',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listContent: {
    padding: wp('4%'),
  },
});
