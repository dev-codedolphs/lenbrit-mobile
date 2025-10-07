import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import OrderItem from '../../components/orders/OrderItem';
import TabBar from '../../components/orders/TabBar';
import { OrderItemType } from '../../types/types';
import { OrderActive } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../redux/Slice';

const tabs = ['In Progress', 'Completed', 'Cancelled'];

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state:any) => state.user);
  const [selectedTab, setSelectedTab] = useState('In Progress');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(userSlice.actions.getAllOrders({}));
  }, [])

  useEffect(() => {
    if (orders){
      setIsLoading(false);
    }
  }, [orders])

  const renderOrder = ({ item }: { item: OrderItemType }) => <OrderItem item={item} />
  const filteredOrders = orders?.filter((order: any) => order.status === selectedTab.toUpperCase().replace(' ', '_'));
  const flattenedOrderItems = filteredOrders.flatMap((order: any) =>
    order.orderItems.map((item: any) => ({
      ...item,
      orderId: order.id,
      status: order.status,
      createdAt: order.createdAt,
    }))
  );

  const OrderItemSkeleton = () => {
    return (
      <View style={styles.card}>
        <ContentLoader
          speed={1}
          width={'100%'}
          height={hp('15%')}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <Rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </ContentLoader>
      </View>
    );
  };

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

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => <OrderItemSkeleton />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : filteredOrders.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <View style={{ padding: wp(4), backgroundColor: '#F5F5F5', borderRadius: wp(10) }}>
            <OrderActive />
          </View>
          <Text style={styles.emptyStateText}>No {selectedTab.toLowerCase()} orders yet.</Text>
        </View>
      ) : (
        <FlatList
          data={flattenedOrderItems}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderOrder}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: hp('2%'),
    borderRadius: 10,
    overflow: 'hidden',
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: hp('2%'),
    marginTop: hp(1.5),
    color: '#999',
    textAlign: 'center',
  },
});
